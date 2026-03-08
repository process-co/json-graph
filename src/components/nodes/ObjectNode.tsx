import type { ReactElement } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { theme, defaultHandleStyle } from '../../theme';
import { getValueColor } from '../../utils/getColors';
import { ForeignNodeWrapper } from './ForeignNodeWrapper';
import { TextRenderer } from './TextRenderer';
import { LinkIcon, LinkBreakIcon } from '../icons';
import { useJsonGraphStore } from '../../store/useJsonGraphStore';
import { LinkBreakButton } from './LinkBreakButton';

/**
 * Line-by-line port of jsontree ObjectNode. Renders key-value rows.
 * Uses node-level width/height from props when not in data (React Flow passes these).
 * Shows expand/collapse button when node has children (isParent + childrenCount).
 */
export function ObjectNode(props: NodeProps): ReactElement {
  const { data, id, width: nodeWidth, height: nodeHeight } = props;
  const text = data?.text;
  const dataWidth = (data as { width?: number })?.width;
  const dataHeight = (data as { height?: number })?.height;
  const width = dataWidth ?? nodeWidth ?? 200;
  const height = dataHeight ?? nodeHeight ?? 80;
  const isEmpty = (data as { isEmpty?: boolean })?.isEmpty;
  const isParent = Boolean((data as { isParent?: boolean })?.isParent);
  const childrenCount = Number((data as { childrenCount?: number })?.childrenCount) || 0;
  const type = ((data as { type?: string })?.type ?? 'object') as string;
  const sourceHandleCount = Math.max(1, Number((data as { sourceHandleCount?: number }).sourceHandleCount) || 1);

  const collapsedParents = useJsonGraphStore((s) => s.collapsedParents);
  const expandNodes = useJsonGraphStore((s) => s.expandNodes);
  const collapseNodes = useJsonGraphStore((s) => s.collapseNodes);
  const isExpanded = !collapsedParents.includes(id);
  const hasCollapse = childrenCount > 0;

  const handleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isExpanded) collapseNodes(id);
    else expandNodes(id);
  };

  const rows = (Array.isArray(text) ? text : []) as [string, string][];
  const sourceMarginTop = (i: number) => (i - (sourceHandleCount - 1) / 2) * theme.handleSpacing;

  return (
    <>
      <Handle type="target" position={Position.Left} style={theme.handleStyle} />
      {isEmpty ? null : (
        <ForeignNodeWrapper isObject width={width} height={height}>
          <span style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <span style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', flex: 1, minWidth: 0 }}>
              {rows.map((val, idx) => {
                const keyStr = JSON.stringify(val[0]).replaceAll('"', '');
                const valStr = String(val[1]);
                return (
                  <span
                    key={idx}
                    className="pui:px-2.5 pui:pr-0.5 pui:leading-[17.8px]"
                    style={{
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      lineHeight: '17.8px',
                    }}
                  >
                    <span
                      style={{
                        color: '#5eb9eb',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {keyStr}:{' '}
                    </span>
                    <TextRenderer innerText={valStr} style={{ color: getValueColor(valStr) }} />
                  </span>
                );
              })}
            </span>
            <span style={{ display: 'flex', height: '100%', alignItems: 'center', gap: '4px', color: theme.text, flexShrink: 0 }}>
              {isParent && childrenCount > 0 && (
                <span style={{ paddingLeft: '4px', paddingRight: '4px', fontSize: '12px' }}>
                  {type === 'array' ? `[${childrenCount}]` : `{${childrenCount}}`}
                </span>
              )}
              {isParent && hasCollapse && (
                <LinkBreakButton isExpanded={isExpanded} onClick={handleExpand} />
              )}
            </span>
          </span>
        </ForeignNodeWrapper>
      )}
      {Array.from({ length: sourceHandleCount }, (_, i) => (
        <Handle
          key={`source-${i}`}
          type="source"
          position={Position.Right}
          id={`source-${i}`}
          style={{
            ...defaultHandleStyle,
            top: '50%',
            marginTop: sourceMarginTop(i),
            left: '100%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </>
  );
}
