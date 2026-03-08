import { describe, it, expect } from 'vitest';
import { parseJsonToGraph } from './jsonParser';

describe('parseJsonToGraph', () => {
  it('returns nodes and edges for a simple object', () => {
    const result = parseJsonToGraph('{"a":1,"b":2}');
    expect(result).toHaveProperty('nodes');
    expect(result).toHaveProperty('edges');
    expect(Array.isArray(result.nodes)).toBe(true);
    expect(Array.isArray(result.edges)).toBe(true);
    expect(result.nodes.length).toBeGreaterThan(0);
  });

  it('returns empty nodes and edges for invalid JSON', () => {
    const result = parseJsonToGraph('not json');
    expect(result.nodes).toEqual([]);
    expect(result.edges).toEqual([]);
  });

  it('accepts object input by stringifying', () => {
    const result = parseJsonToGraph({ x: 1, y: [2, 3] });
    expect(result.nodes.length).toBeGreaterThan(0);
  });
});
