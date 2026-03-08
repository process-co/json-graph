import type { ReactElement } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { theme } from '../../theme';
import { getKeyColor, getValueColor } from '../../utils/getColors';

export function RootNode({ data }: NodeProps): ReactElement {
  const raw = data?.text;
  const rows: [string, string][] = Array.isArray(raw) ? raw : [];
  const singleLine = !Array.isArray(raw) ? (raw as string) ?? '' : null;
  const keyColor = getKeyColor({ objectKey: true });

  return (
    <div
      style={{
        background: theme.rootNodeBg,
        border: `1px solid ${theme.nodeBorder}`,
        borderRadius: '8px',
        padding: '10px 12px',
        fontSize: '12px',
        fontFamily: 'monospace',
        minWidth: '60px',
        minHeight: '28px',
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: theme.edgeStroke }} />
      <Handle type="source" position={Position.Right} style={{ background: theme.edgeStroke }} />
      {rows.length > 0
        ? rows.map(([k, v], i) => (
            <div key={i} style={{ display: 'flex', gap: '6px', alignItems: 'baseline', lineHeight: 1.5 }}>
              <span style={{ color: keyColor }}>{k}:</span>
              <span style={{ color: getValueColor(String(v)) }}>{typeof v === 'string' ? v : String(v)}</span>
            </div>
          ))
        : singleLine !== null && (
            <span style={{ color: theme.text }}>{singleLine || '(empty)'}</span>
          )}
    </div>
  );
}
