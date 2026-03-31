import { useCallback, useLayoutEffect, useMemo, useRef, useState, type ReactElement } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  useUpdateNodeInternals,
  ReactFlowProvider,
  type Node,
  type Edge,
  Position,
  ControlButton,
  type Viewport,
} from '@xyflow/react';
// import '@xyflow/react/dist/style.css';
import '../styles/globals.css';
import { clsx } from 'clsx';
import { parseJsonToGraph } from '../parser/jsonParser';
import { getLayoutedElements } from '../layout/getLayoutedElements';
import { useJsonGraphStore, getVisibleNodeIds } from '../store/useJsonGraphStore';
import { theme } from '../theme';
import { CustomNode } from './nodes/CustomNode';
import { JsonGraphEdge } from './edges/JsonGraphEdge';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './ui/tooltip';
import { Slider } from './ui/slider';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlassMinus, faMagnifyingGlassPlus, faSquareDashed, faUndo, faRedo } from '@fortawesome/pro-regular-svg-icons';

const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  default: JsonGraphEdge,
};

export interface JsonGraphProps {
  json: string | object;
  className?: string;
}

function JsonGraphInner({ json, className }: JsonGraphProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [error, setError] = useState<string | null>(null);
  const [allNodes, setAllNodes] = useState<Node[]>([]);
  const [allEdges, setAllEdges] = useState<Edge[]>([]);
  const { fitView, getZoom, zoomIn, zoomOut, zoomTo } = useReactFlow();
  const updateNodeInternals = useUpdateNodeInternals();
  const collapsedParents = useJsonGraphStore((s) => s.collapsedParents);
  const resetStore = useJsonGraphStore((s) => s.reset);

  const [zoom, setZoom] = useState(getZoom());

  const [zoomPopoverOpen, setZoomPopoverOpen] = useState(false);

  const handleZoomIn = () => {
    zoomIn().then(() => {
      setZoom(getZoom());
    });
  };

  const handleZoomOut = () => {
    zoomOut().then(() => {
      setZoom(getZoom());
    });
  };

  const handleFitView = () => {
    // Use centralized focus method to fit the active group
    fitView?.({ padding: 0.2, duration: 0, minZoom: zoom , maxZoom: zoom });
    // Update zoom ref after animation completes
    setTimeout(() => {
      setZoom(getZoom());
    }, 450);
  };

  const handleZoomChange = (value: number[]) => {
    if (value[0] !== undefined) {
      zoomTo(value[0], { duration: 0 }).then(() => {
        setZoom(getZoom());
      });
    }
  };

  const handleViewportChange = (viewport: Viewport) => {
    setZoom(viewport.zoom);
  };

  const runLayout = useCallback(() => {
    setError(null);
    resetStore();
    let jsonStr: string;
    try {
      jsonStr = typeof json === 'string' ? json : JSON.stringify(json);
    } catch {
      setError('Invalid JSON');
      return;
    }
    const parsed = parseJsonToGraph(jsonStr);
    if (parsed.nodes.length === 0 && parsed.edges.length === 0) {
      try {
        JSON.parse(jsonStr);
      } catch {
        setError('Invalid JSON');
        return;
      }
    }
    getLayoutedElements(parsed.nodes, parsed.edges)
      .then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
        const withType = layoutedNodes.map((n) => ({
          ...n,
          type: 'custom',
        })) as Node[];
        setAllNodes(withType);
        setAllEdges(layoutedEdges);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Layout failed'));
  }, [json, setNodes, setEdges, fitView, resetStore]);

  useLayoutEffect(() => {
    runLayout();
  }, [runLayout]);

  const { visibleNodes, visibleEdges } = useMemo(() => {
    if (allNodes.length === 0 || allEdges.length === 0) {
      return { visibleNodes: allNodes, visibleEdges: allEdges };
    }
    const rootIds = allNodes
      .filter((n) => !allEdges.some((e) => e.target === n.id))
      .map((n) => n.id);
    const visibleIds = getVisibleNodeIds(rootIds, allEdges, collapsedParents);
    const filteredEdges = allEdges.filter(
      (e) => visibleIds.has(e.source) && visibleIds.has(e.target)
    );

    const outgoingBySource = new Map<string, typeof filteredEdges>();
    for (const e of filteredEdges) {
      if (!outgoingBySource.has(e.source)) outgoingBySource.set(e.source, []);
      outgoingBySource.get(e.source)!.push(e);
    }
    // Preserve parser/document order when assigning source handles (do not sort by target id),
    // so e.g. first case stays top, second case below, matching ELK and data order.

    const edgeSourceHandleId = new Map<string, string>();
    for (const [, arr] of outgoingBySource) {
      arr.forEach((e, i) => edgeSourceHandleId.set(e.id, `source-${i}`));
    }

    const visibleEdges: Edge[] = filteredEdges.map((e) => {
      const sourceHandle = edgeSourceHandleId.get(e.id) ?? undefined;
      return { ...e, sourceHandle } as Edge;
    });

    const visibleNodes: Node[] = allNodes.filter((n) => visibleIds.has(n.id)).map((n) => {
      const sourceCount = outgoingBySource.get(n.id)?.length ?? 0;
      const data = {
        ...n.data,
        sourceHandleCount: Math.max(1, sourceCount),
        targetHandleCount: 1,
      };
      return { ...n, data };
    });

    return { visibleNodes, visibleEdges };
  }, [allNodes, allEdges, collapsedParents]);

  useLayoutEffect(() => {
    setNodes(visibleNodes);
    setEdges(visibleEdges);
  }, [visibleNodes, visibleEdges, setNodes, setEdges]);

  useLayoutEffect(() => {
    if (visibleNodes.length === 0) return;
    const nodeIds = visibleNodes.map((n) => n.id);
    let raf2Id: number | null = null;
    const raf1Id = requestAnimationFrame(() => {
      raf2Id = requestAnimationFrame(() => {
        nodeIds.forEach((id) => updateNodeInternals(id));
      });
    });
    return () => {
      cancelAnimationFrame(raf1Id);
      if (raf2Id !== null) cancelAnimationFrame(raf2Id);
    };
  }, [visibleNodes, updateNodeInternals]);

  const fitViewToHeight = useCallback(() => {
    if (visibleNodes.length > 0) {
      requestAnimationFrame(() => {
        fitView?.({ padding: 0.2, duration: 0 });
      });
    }
  }, [fitView, visibleNodes.length]);

  useLayoutEffect(() => {
    fitViewToHeight();
  }, [fitViewToHeight]);

  const containerRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => fitViewToHeight());
    ro.observe(el);
    return () => ro.disconnect();
  }, [fitViewToHeight]);

  if (error) {
    return (
      <div
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme.canvasBackground,
          color: '#f7768e',
          fontSize: '14px',
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={clsx(className, 'dataVisualizationGraph')} // this is to avoid conflicts with the global styles
      style={{ width: '100%', height: '100%', background: theme.canvasBackground }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={{
          type: 'default',
          style: { stroke: theme.edgeStroke },
          markerEnd: { type: 'arrowclosed', width: 20, height: 20 },
        }}
        onViewportChange={handleViewportChange}

        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={true}
        zoomOnPinch={true}
        zoomOnDoubleClick={true}
        // zoomOnScroll={true}
        panOnScroll={true}
        fitView
        fitViewOptions={{ padding: 0.2, minZoom: 0.7, maxZoom: 2 }}
        onInit={() => fitView?.({ padding: 0.2, duration: 0, minZoom: 0.7, maxZoom: 2 })}
        minZoom={0.1}
        maxZoom={2}
      >
        {/* <Controls position="bottom-left" /> */}

        <Controls showZoom={false} fitViewOptions={{ padding: 0.2, maxZoom: 0.75 }} showInteractive={false} showFitView={false} position="bottom-left" orientation="horizontal" className="pui:!bg-[#282A3A] pui:!shadow-none pui:!border-gray-700 pui:border-1 pui:ring-2 pui:ring-gray-400/25 pui:overflow-hidden pui:rounded-sm pui:scale-100 pui:[&>]:-m-t-0 pui:!ml-3"
        // [&>:first-child]:rounded-l-xxs [&>:last-child]:rounded-r-xxs
        >
          <ControlButton onClick={() => handleZoomOut()} className="pui:disabled:pointer-events-none pui:disabled:select-none pui:disabled:cursor-not-allowed pui:!bg-[#282A3A] pui:!text-white" >
            <Tooltip><TooltipTrigger className="pui:pt-1 pui:-mt-1" asChild><FontAwesomeIcon icon={faMagnifyingGlassMinus} /></TooltipTrigger><TooltipContent>Zoom Out</TooltipContent></Tooltip>
          </ControlButton>
          <Popover open={zoomPopoverOpen} onOpenChange={setZoomPopoverOpen}>
            <PopoverTrigger asChild>
              <ControlButton className="pui:disabled:pointer-events-none pui:disabled:select-none pui:disabled:cursor-not-allowed pui:!text-[8px] pui:!w-10 pui:font-mono pui:!bg-[#282A3A] pui:!text-white" >{(zoom * 100).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + '%'}</ControlButton>
            </PopoverTrigger>
            <PopoverContent className="pui:!w-50 pui:!-ml-6.5 pui:!mb-2 pui:!shadow-none pui:border-purple-600 pui:ring-2 pui:ring-purple-600/20" side="top" align="start">
              <div className="pui:space-y-2 ">
                <div className="pui:text-xs pui:font-medium">Zoom Level: <span className="pui:font-mono">{(zoom * 100).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + '%'}</span></div>
                <Slider
                  min={0.1}
                  max={2}
                  step={0.1}
                  value={[zoom as number]}
                  onValueChange={handleZoomChange}
                  className="pui:w-full"
                />
                <div className="pui:flex pui:justify-between pui:text-xs pui:text-muted-foreground pui:font-mono">
                  <span>10%</span>
                  <span>200%</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <ControlButton onClick={() => handleZoomIn()} className="pui:disabled:pointer-events-none pui:disabled:select-none pui:disabled:cursor-not-allowed pui:!bg-[#282A3A] pui:!text-white" >
            <Tooltip ><TooltipTrigger className="pui:pt-1 pui:-mt-1" asChild><FontAwesomeIcon icon={faMagnifyingGlassPlus} /></TooltipTrigger><TooltipContent>Zoom In</TooltipContent></Tooltip>
          </ControlButton>
          <ControlButton onClick={() => handleFitView()} className="pui:disabled:pointer-events-none pui:disabled:select-none pui:disabled:cursor-not-allowed pui:!bg-[#282A3A] pui:!text-white" >
            <Tooltip><TooltipTrigger className="pui:pt-1 pui:-mt-1" asChild><FontAwesomeIcon icon={faSquareDashed} /></TooltipTrigger><TooltipContent>Fit View</TooltipContent></Tooltip>
          </ControlButton>
          {/* <ControlButton onClick={() => undo()} disabled={!canUndo() || !editMode} className="disabled:pointer-events-none disabled:select-none disabled:cursor-not-allowed" >
              <Tooltip><TooltipTrigger className="pt-1 -mt-1" asChild><FontAwesomeIcon icon={faUndo} /></TooltipTrigger><TooltipContent>Undo</TooltipContent></Tooltip>
            </ControlButton>
            <ControlButton onClick={() => redo()} disabled={!canRedo() || !editMode} className="disabled:pointer-events-none disabled:select-none disabled:cursor-not-allowed" >
              <Tooltip><TooltipTrigger className="pt-1 -mt-1" asChild><FontAwesomeIcon icon={faRedo} /></TooltipTrigger><TooltipContent>Redo</TooltipContent></Tooltip>
            </ControlButton> */}
        </Controls>

        <Background color={theme.canvasDots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}

export function JsonGraph(props: JsonGraphProps): ReactElement {
  return (
    <ReactFlowProvider>
      <JsonGraphInner {...props} />
    </ReactFlowProvider>
  );
}
