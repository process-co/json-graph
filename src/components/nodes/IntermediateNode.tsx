import type { ReactElement } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { theme } from '../../theme';
import { getKeyColor } from '../../utils/getColors';
import { LinkBreakButton } from './LinkBreakButton';
import { useJsonGraphStore } from '../../store/useJsonGraphStore';

export function IntermediateNode({ data, id }: NodeProps): ReactElement {
  const label = typeof data?.text === 'string' ? data.text : '';
  const isParent = Boolean(data?.isParent);
  const childrenCount = Number(data?.childrenCount) || 0;
  const type = (data?.type as string) ?? 'object';
  const keyColor = getKeyColor({ parent: true, type });

  const collapsedParents = useJsonGraphStore((s) => s.collapsedParents);
  const expandNodes = useJsonGraphStore((s) => s.expandNodes);
  const collapseNodes = useJsonGraphStore((s) => s.collapseNodes);
  const isExpanded = !collapsedParents.includes(id);

  const handleExpand = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isExpanded) collapseNodes(id);
    else expandNodes(id);
  };

  return (
    <div
      style={{
        background: theme.nodeBg,
        border: `1px solid ${theme.nodeBorder}`,
        borderRadius: '5px',
        padding: '8px 12px', 
        fontSize: '12px',
        fontFamily: 'monospace',
        minWidth: '60px',
        minHeight: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: theme.edgeStroke }} />
      <span style={{ color: keyColor, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {label}
      </span>
      {isParent && childrenCount > 0 && (
        <>
          <span style={{ color: theme.countText, fontSize: '11px' }}>
            {type === 'array' ? `[${childrenCount}]` : `{${childrenCount}}`}
          </span>
          <LinkBreakButton isExpanded={isExpanded} onClick={handleExpand} />
        </>
      )}
      <Handle type="source" position={Position.Right} style={{ background: theme.edgeStroke }} />
    </div>
  );
}
