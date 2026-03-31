/**
 * Theme constants for json-graph (dark theme, aligned with jsontree reference).
 */
export const theme = {
  canvasBackground: '#282A3A',
  canvasDots: 'var(--color-gray-700)',
  rootNodeBg: '#3A3A4A',
  nodeBg: 'rgb(43, 44, 62)',
  /** Subtle outline; matches reference "very thin, light grey line" */
  nodeBorder: 'rgb(71, 88, 114)',
  text: 'rgb(233, 150, 122)',
  countText: 'rgb(255,255,255)',
  key: '#B0B0B0',
  edgeStroke: '#888888',
  /** Vertical spacing (px) between multiple source handles; offset from center uses (i - (n-1)/2) * this. */
  handleSpacing: 6,
  /** Run-off distance (px) so edge Bezier starts slightly off the node, matching Reaflow/jsontree port appearance. */
  edgeRunoff: 12,
  /** Transparent so ports are hidden but still present for edge connections */
  handleStyle: {
    background: 'transparent',
    border: 'none',
    opacity: 0,
  } as const,
} as const;

/** Handle style with position for React Flow Handle (used by node source handles). */
export const defaultHandleStyle = { ...theme.handleStyle, position: 'absolute' as const };

export type Theme = typeof theme;
