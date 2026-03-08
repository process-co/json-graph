import type { ReactElement } from 'react';
import {
  getBezierPath,
  BaseEdge,
  Position,
  type EdgeProps,
} from '@xyflow/react';
import { theme } from '../../theme';

/**
 * Custom Bezier edge to match Reaflow's Edge (cubic Bezier path + arrow).
 * Adds a short straight run-off at the source so the curve begins away from the node boundary.
 * markerEnd must be the resolved string (url(#id)); passing an object causes marker-end="[object Object]" on the SVG.
 */
export function JsonGraphEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition = Position.Right,
  targetPosition = Position.Left,
  markerEnd,
}: EdgeProps): ReactElement {
  const runOff = theme.edgeRunoff;
  const runOffX =
    sourcePosition === Position.Right ? sourceX + runOff
    : sourcePosition === Position.Left ? sourceX - runOff
    : sourceX;
  const runOffY =
    sourcePosition === Position.Bottom ? sourceY + runOff
    : sourcePosition === Position.Top ? sourceY - runOff
    : sourceY;
  const hasRunOff = runOffX !== sourceX || runOffY !== sourceY;

  const [path] = getBezierPath({
    sourceX: hasRunOff ? runOffX : sourceX,
    sourceY: hasRunOff ? runOffY : sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const curveStart = path.indexOf(' C');
  const curvePart = curveStart >= 0 ? path.slice(curveStart) : path;
  const fullPath =
    hasRunOff
      ? `M ${sourceX},${sourceY} L ${runOffX},${runOffY}${curvePart}`
      : path;

  return (
    <BaseEdge
      id={id}
      path={fullPath}
      style={{ stroke: theme.edgeStroke, strokeWidth: '1px' }}
      markerEnd={markerEnd}
    />
  );
}
