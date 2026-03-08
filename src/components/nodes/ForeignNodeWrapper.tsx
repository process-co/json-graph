import type { ReactNode, ReactElement } from 'react';

export interface ForeignNodeWrapperProps {
  width: number | undefined;
  height: number | undefined;
  children?: ReactNode;
  isObject: boolean;
  nodeId?: string;
  isHighlighted?: boolean;
}

/**
 * Port of jsontree ForeignNodeWrapper. React Flow renders nodes in HTML so we use a div
 * instead of foreignObject; same dimensions and overflow.
 */
export function ForeignNodeWrapper({
  width,
  height,
  children,
  isObject,
  nodeId,
  isHighlighted,
}: ForeignNodeWrapperProps): ReactElement {
  return (
    <div
      className="pui:font-monolisa pui:overflow-hidden pui:font-medium pui:!pointer-events-auto"
      data-node-id={nodeId}
      style={{
        width,
        height,
        // overflow: 'hidden',
        // fontFamily: 'ui-monospace, monospace',
        // fontWeight: 500,
        textAlign: isObject ? 'left' : 'center',
        // pointerEvents: 'all',
       // backgroundColor: isHighlighted ? 'rgba(255, 214, 52, 0.15)' : undefined,
      }}
    >
      {children}
    </div>
  );
}
