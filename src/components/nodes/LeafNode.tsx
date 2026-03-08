import type { ReactElement } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { theme } from '../../theme';
import { getKeyColor, getValueColor } from '../../utils/getColors';

export function LeafNode({ data }: NodeProps): ReactElement {
  const text = data?.text;
  const keyColor = getKeyColor({ objectKey: true });

  if (Array.isArray(text)) {
    const rows = text as [string, string][];
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
        }}
      >
        <Handle type="target" position={Position.Left} style={{ background: theme.edgeStroke }} />
        <Handle type="source" position={Position.Right} style={{ background: theme.edgeStroke }} />
        {rows.map(([k, v], i) => (
          <div key={i} style={{ display: 'flex', gap: '6px', alignItems: 'baseline', lineHeight: 1.48 }}>
            <span style={{ color: keyColor }}>{k}:</span>
            <span style={{ color: getValueColor(String(v)) }}>{typeof v === 'string' ? v : String(v)}</span>
          </div>
        ))}
      </div>
    );
  }

  const label = (text as string) ?? '';
  return (
    <div
      style={{
        background: theme.nodeBg,
        color: theme.text,
        border: `1px solid ${theme.nodeBorder}`,
        borderRadius: '5px',
        padding: '8px 12px',
        fontSize: '12px',
        fontFamily: 'monospace',
        minWidth: '40px',
        minHeight: '24px',
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: theme.edgeStroke }} />
      <Handle type="source" position={Position.Right} style={{ background: theme.edgeStroke }} />
      {label}
    </div>
  );
}
