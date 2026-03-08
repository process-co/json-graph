import type { ReactElement } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { theme, defaultHandleStyle } from '../../theme';
import { getKeyColor } from '../../utils/getColors';
import { ForeignNodeWrapper } from './ForeignNodeWrapper';
import { TextRenderer } from './TextRenderer';
import { LinkIcon, LinkBreakIcon } from '../icons';
import { useJsonGraphStore } from '../../store/useJsonGraphStore';
import { LinkBreakButton } from './LinkBreakButton';

/**
 * Line-by-line port of jsontree TextNode. Label + [n]/{n} + expand button.
 */
export function TextNode({ data, id }: NodeProps): ReactElement {
  const text = data?.text;
  const width = (data as { width?: number })?.width;
  const height = (data as { height?: number })?.height;
  const nodeData = data ?? {};
  const isParent = Boolean((nodeData as { isParent?: boolean }).isParent);
  const childrenCount = Number((nodeData as { childrenCount?: number }).childrenCount) || 0;
  const type = ((nodeData as { type?: string }).type ?? 'object') as string;
  const sourceHandleCount = Math.max(1, Number((nodeData as { sourceHandleCount?: number }).sourceHandleCount) || 1);

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

  const labelColor = getKeyColor({ parent: isParent, type });
  const sourceMarginTop = (i: number) => (i - (sourceHandleCount - 1) / 2) * theme.handleSpacing;

  return (
    <>
      <Handle type="target" position={Position.Left} style={theme.handleStyle} />
      <ForeignNodeWrapper width={width} height={height} isObject={false} nodeId={id}>
        <span
          style={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: '4px',
            paddingRight: '4px',
          }}
        >
          <span
            style={{
              display: 'flex',
              height: '100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              color: labelColor,
            }}
          >
            <TextRenderer
              innerText={typeof text === 'string' ? text : JSON.stringify(text ?? '').replaceAll('"', '')}
              style={{ fontSize: isParent ? '12px' : '10px' }}
            />
          </span>
          <span style={{ display: 'flex', height: '100%', alignItems: 'center', gap: '4px', color: theme.text }}>
            {isParent && childrenCount > 0 && (
              <span style={{ paddingLeft: '4px', paddingRight: '4px', fontSize: '12px', color: theme.countText }}>
                {type === 'array' ? `[${childrenCount}]` : `{${childrenCount}}`}
              </span>
            )}
            {isParent && hasCollapse && (
              <LinkBreakButton isExpanded={isExpanded} onClick={handleExpand} />
            )}
          </span>
        </span>
      </ForeignNodeWrapper>
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
