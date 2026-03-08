import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  outDir: 'dist',
  clean: true,
  minify: process.env.NODE_ENV === 'production',
  sourcemap: true,
  treeshake: true,
  splitting: false,
  // Bundle commonly used utilities to avoid peer dependency issues
  // External dependencies that should NOT be bundled
  // These should be provided by the consuming application
  noExternal: [
    // All @radix-ui components
    /^@radix-ui\//,
    // All @fortawesome packages
    /^@fortawesome\//,
    // // Other peer dependencies
    'clsx',
    'tailwind-merge',
    'elkjs',
    'jsonc-parser',
  ],
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'zustand',
    '@monaco-editor/react',
  ],
});

