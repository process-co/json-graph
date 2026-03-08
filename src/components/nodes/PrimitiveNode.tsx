import type { ReactElement } from 'react';
import type { NodeProps } from '@xyflow/react';

const BG = '#2B2C3E';
const TEXT = '#E6E6E6';
const BORDER = '#3d3e52';

export function PrimitiveNode({ data }: NodeProps): ReactElement {
  const text = (data?.text as string) ?? '';
  return (
    <div
      style={{
        background: BG,
        color: TEXT,
        border: `1px solid ${BORDER}`,
        borderRadius: '6px',
        padding: '8px 12px',
        fontSize: '12px',
        fontFamily: 'monospace',
        minWidth: '40px',
        minHeight: '24px',
      }}
    >
      {text}
    </div>
  );
}
