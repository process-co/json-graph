/**
 * Key/value colors for node content (ported from jsontree getColors).
 * Returns inline style color for dark theme.
 */
export interface GetKeyColorOptions {
  parent?: boolean;
  type?: string;
  objectKey?: boolean;
}

export function getKeyColor({ parent, type, objectKey }: GetKeyColorOptions): string {
  if (parent) {
    if (type === 'array') return '#ff8c00'; // orange
    return '#00bfff'; // deepskyblue
  }
  if (objectKey) {
    return '#5eb9eb'; // jsontree dark key (crimson -> #5eb9eb in dark)
  }
  return '#d3d3d3'; // gray-300
}

export function getValueColor(value: string): string {
  if (!Number.isNaN(Number(value))) return '#32cd32'; // limegreen
  if (value === 'true') return 'oklch(72.3% 0.219 149.579)'; // lightgreen
  if (value === 'false') return '#FF3C82'; // red
  if (value === 'null') return '#808080'; // gray
  return 'rgb(233, 150, 122)'; // light orange/peach for string values (reference)
}
