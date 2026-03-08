import type { Preview } from '@storybook/react';
import '@process.co/json-graph/styles.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#1a1b26' }],
    },
  },
  decorators: [
    (Story) => (
    
      <div style={{ width: '100%', height: '400px', background: '#1a1b26' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
