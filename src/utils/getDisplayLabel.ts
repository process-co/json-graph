/** Value looks like a child count: [n] or {n} */
const COUNT_SUFFIX = /^[\[\{]?\d+[\]\}]?$/;

export function isCountOnlyRows(text: unknown): boolean {
  if (!Array.isArray(text) || text.length === 0) return false;
  return (text as [string, string][]).every(
    (row) => Array.isArray(row) && row.length >= 2 && COUNT_SUFFIX.test(String(row[1]).trim())
  );
}

/**
 * Single-line label for compact view.
 * For count-only rows (key: [n] or key: {n}) returns e.g. "conditions [0]".
 */
export function getDisplayLabel(text: unknown, type: string): string {
  if (typeof text === 'string') return text;
  if (Array.isArray(text) && text.length > 0) {
    const first = text[0];
    const key = Array.isArray(first) ? first[0] : first;
    const val = Array.isArray(first) && first.length >= 2 ? first[1] : '';
    return `${String(key ?? 'object')} ${String(val)}`.trim();
  }
  return type === 'array' ? '[]' : '{}';
}
