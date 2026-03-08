import ELK from 'elkjs/lib/elk.bundled.js';
import type { GraphNode, GraphEdge } from '../parser/types';
import { calculateNodeSize } from '../parser/calculateNodeSize';
import { getDisplayLabel, isCountOnlyRows } from '../utils/getDisplayLabel';

/**
 * Reaflow defaultLayoutOptions from reaflow/src/layout/elkLayout.ts.
 * Only elk.direction is overridden to RIGHT (jsontree default).
 */
const defaultLayoutOptions: Record<string, string> = {
  'elk.nodeLabels.placement': 'INSIDE V_CENTER H_RIGHT',
  'elk.algorithm': 'org.eclipse.elk.layered',
  'elk.direction': 'RIGHT',
  'layered.crossingMinimization.forceNodeModelOrder': 'true',
  'org.eclipse.elk.layered.layering.strategy': 'INTERACTIVE',
  'org.eclipse.elk.edgeRouting': 'ORTHOGONAL',
  'elk.layered.unnecessaryBendpoints': 'true',
  'elk.layered.spacing.edgeNodeBetweenLayers': '50',
  'org.eclipse.elk.layered.nodePlacement.bk.fixedAlignment': 'BALANCED',
  'org.eclipse.elk.layered.cycleBreaking.strategy': 'DEPTH_FIRST',
  'org.eclipse.elk.insideSelfLoops.activate': 'true',
  separateConnectedComponents: 'false',
  'spacing.componentComponent': '70',
  spacing: '75',
  'spacing.nodeNodeBetweenLayers': '70',
};

export type LayoutOptions = Partial<typeof defaultLayoutOptions>;

export interface XYFlowNode {
  id: string;
  position: { x: number; y: number };
  width: number;
  height: number;
  data: GraphNode['data'] & { text?: GraphNode['text'] };
  type?: string;
  sourcePosition?: 'left' | 'right' | 'top' | 'bottom';
  targetPosition?: 'left' | 'right' | 'top' | 'bottom';
}

export interface XYFlowEdge {
  id: string;
  source: string;
  target: string;
  /** Id of source handle (Edge API uses sourceHandle). */
  sourceHandle?: string;
  /** Id of target handle (Edge API uses targetHandle). */
  targetHandle?: string;
}

const elk = new ELK();

/**
 * Run elk layout on parser output and return nodes/edges in React Flow format
 * (position, sourcePosition/targetPosition for direction RIGHT).
 */
export async function getLayoutedElements(
  nodes: GraphNode[],
  edges: GraphEdge[],
  options: LayoutOptions = {}
): Promise<{ nodes: XYFlowNode[]; edges: XYFlowEdge[] }> {
  const layoutOptions = { ...defaultLayoutOptions, ...options };
  const isHorizontal = layoutOptions['elk.direction'] === 'RIGHT';

  const elkGraph = {
    id: 'root',
    layoutOptions,
    children: nodes.map((node) => {
      const isParent = node.data?.isParent ?? false;
      if (Array.isArray(node.text) && isCountOnlyRows(node.text)) {
        const label = getDisplayLabel(node.text, node.data?.type ?? 'object');
        const { width, height } = calculateNodeSize(label, isParent);
        return { id: node.id, width, height };
      }
      return { id: node.id, width: node.width, height: node.height };
    }),
    edges: edges.map((e) => ({
      id: e.id,
      sources: [e.source],
      targets: [e.target],
    })),
  };

  const layoutedGraph = await elk.layout(elkGraph);
  const targetIds = new Set(edges.map((e) => e.target));
  const rootId = nodes.find((n) => !targetIds.has(n.id))?.id;

  const layoutedNodes: XYFlowNode[] = (layoutedGraph.children ?? []).map((elkNode) => {
    const original = nodes.find((n) => n.id === elkNode.id);
    const w = elkNode.width ?? original?.width ?? 150;
    const h = elkNode.height ?? original?.height ?? 50;
    const data = original?.data ? { ...original.data, text: original.text, width: w, height: h } : { width: w, height: h };
    if (original?.id === rootId) {
      (data as Record<string, unknown>).isRoot = true;
    }
    return {
      id: elkNode.id,
      position: { x: elkNode.x ?? 0, y: elkNode.y ?? 0 },
      width: w,
      height: h,
      data,
      sourcePosition: (isHorizontal ? 'right' : 'bottom') as XYFlowNode['sourcePosition'],
      targetPosition: (isHorizontal ? 'left' : 'top') as XYFlowNode['targetPosition'],
    };
  });

  return {
    nodes: layoutedNodes,
    edges: edges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      type: 'default',
    })),
  };
}
