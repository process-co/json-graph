import type { Meta, StoryObj } from '@storybook/react';
import { JsonGraph } from './JsonGraph';

const meta: Meta<typeof JsonGraph> = {
  component: JsonGraph,
  title: 'JsonGraph',
};
export default meta;

type Story = StoryObj<typeof JsonGraph>;

const sampleObject = { name: 'Alice', age: 30, active: true };
const sampleNested = { a: 1, b: [2, 3], c: { x: 'y' } };

export const Default: Story = {
  args: {
    json: sampleObject,
    className: 'h-full w-full',
  },
};

export const Nested: Story = {
  args: {
    json: sampleNested,
    className: 'h-full w-full',
  },
};

export const ArrayRoot: Story = {
  args: {
    json: [1, 2, { foo: 'bar' }],
    className: 'h-full w-full',
  },
};

/** JSON with primitive key-value pairs (id, label, enabled, etc.) so property-block nodes render. */
const withPropertyBlocks = {
  "cases": [
    {
      "id": "6c2699556e90ftO3",
      "label": "",
      "condition": {
        "id": "XCF699556e9M7193",
        "logic": "and",
        "conditions": [
          {
            "id": "6j699556e96LlhG2",
            "value": {
              "type": "expression",
              "format": "template",
              "expression": "{{steps.getMailingListMembers_1.results[1].address}}"
            },
            "operator": "string_equals"
          }
        ]
      }
    },
    {
      "id": "UvRuxM69865853J6",
      "label": "Second Case ",
      "enabled": true,
      "condition": {
        "logic": "or",
        "conditions": [
          {
            "id": "c5817ab7-b832-439e-ba93-3e00afb20d22",
            "value": {
              "type": "expression",
              "format": "template",
              "expression": "{{steps.getMailingListMembers_1.results[0].address.toLocaleUpperCase()}}"
            },
            "operator": "string_equals"
          },
          {
            "id": "c6e2fc7e-cd3c-44b9-89b0-830f8eb8aafa",
            "value": {
              "type": "expression",
              "format": "template",
              "expression": "{{steps.getMailingListMembers_1.results[2].address.toLocaleLowerCase()}}"
            },
            "operator": "string_equals"
          },
          {
            "id": "025e5c2d-2d29-4cf1-bdc9-b09901474141",
            "logic": "or",
            "conditions": [
              {
                "id": "cca691e4-f4a5-47bb-973b-f4c4afc6f4e7",
                "value": {
                  "type": "expression",
                  "format": "template",
                  "expression": "{{steps.getMailingListMembers_1.results[1].address}}"
                },
                "operator": "string_equals"
              },
              {
                "id": "6eaea044-37c6-4d93-8ae4-9d9ed3b48e3e",
                "value": "",
                "operator": "is_not_null"
              }
            ]
          }
        ]
      },
      "expression": ""
    }
  ],
  "defaultLabel": "",
  "enableDefault": false
};

export const WithPropertyBlocks: Story = {
  args: {
    json: withPropertyBlocks,
    className: 'h-full w-full',
  },
};
