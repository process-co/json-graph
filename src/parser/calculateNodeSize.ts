/**
 * Pure function: compute width/height for a node from its text content.
 * No store or global state (ported from jsontree, stripped of useTree/useStored).
 */

const CHAR_WIDTH = 7.4;
const CHAR_HEIGHT = 16;
const NODE_TOTAL_PADDING = 20;
const WIDTH_OFFSET = 4;
const MAX_WIDTH = 700;

export function calculateNodeSize(
  text: string | [string, string][],
  isParent = false
): { width: number; height: number } {
  let lines: string[] = [];
  if (typeof text !== "string") {
    lines = text.map(([k, v]) => `${k}: ${JSON.stringify(v).slice(0, 80)}`);
  } else {
    lines.push(text);
  }
  if (lines.length === 0) return { width: 45, height: 45 };

  let maxLen = 0;
  for (const line of lines) {
    if (line.length > maxLen) maxLen = line.length;
  }
  let width = Math.round(CHAR_WIDTH * maxLen + NODE_TOTAL_PADDING + WIDTH_OFFSET);
  let height = CHAR_HEIGHT * lines.length + NODE_TOTAL_PADDING;

  if (isParent) width += 100;
  if (width > MAX_WIDTH) width = MAX_WIDTH;
  return { width, height };
}
