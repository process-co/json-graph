# @process.co/json-graph

[<img src="https://img.shields.io/npm/v/%40process.co%2Fjson-graph" />](https://www.npmjs.com/package/@process.co/json-graph)
[<img src="https://img.shields.io/github/v/release/process-co/json-graph" />](https://github.com/process-co/json-graph/releases/latest)
[<img alt="GitHub package.json version (branch)" src="https://img.shields.io/github/package-json/v/process-co/json-graph/main?color=%23AA00AA" />](https://github.com/process-co/json-graph#main)

Render JSON data as an interactive graph using React Flow and ELK layout.

> [!IMPORTANT]
> This package is developed in the Process.co monorepo and synced to `process-co/json-graph`.
> Direct edits in the standalone repo may be overwritten by automation.

## Installation

```bash
npm install @process.co/json-graph
```

### Latest development version

```bash
npm install git+https://github.com/process-co/json-graph.git#main
```

## Quick start

```tsx
import { JsonGraph } from '@process.co/json-graph';
import '@process.co/json-graph/styles.css';

const data = {
  user: {
    name: 'Ada',
    age: 36,
  },
  tags: ['admin', 'beta'],
};

export function Example() {
  return <JsonGraph json={data} className="h-[520px] w-full" />;
}
```

## API

### `JsonGraph`

```ts
interface JsonGraphProps {
  json: string | object;
  className?: string;
}
```

- `json`: JSON string or plain object/array to visualize.
- `className`: Optional class for sizing/layout of the container.

### `parseJsonToGraph`

```ts
import { parseJsonToGraph } from '@process.co/json-graph';
```

Parses JSON into internal graph nodes and edges before layout:

```ts
const parsed = parseJsonToGraph({ a: 1, b: { c: true } });
// parsed.nodes, parsed.edges
```

Also exported types:

- `GraphNode`
- `GraphEdge`
- `ParseResult`

## Development

From the monorepo package directory:

```bash
pnpm build
pnpm test
pnpm storybook
```

## Links

- Package source (monorepo): `process-co/json-graph`
- Published repository: https://github.com/process-co/json-graph
- npm: https://www.npmjs.com/package/@process.co/json-graph
