/**
 * MCP Tools Registration
 */

import { z } from 'zod';
import { getComponentByName, searchComponents, getComponents } from '../data/componentRegistry.js';

/**
 * Register all MCP tools
 * @param {McpServer} server - MCP server instance
 * @param {Object} componentData - Loaded component data
 */
export function registerTools(server, componentData) {
    // Tool: list_components
    server.tool(
        'list_components',
        'List all available components in the scaling-ui library with their descriptions',
        {},
        async () => {
            const components = getComponents();

            const componentList = components.map(c => ({
                name: c.name,
                description: c.description || 'No description available',
                subComponents: c.subComponents?.map(s => s.name) || []
            }));

            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify({
                        total: componentList.length,
                        components: componentList
                    }, null, 2)
                }]
            };
        }
    );

    // Tool: get_component_docs
    server.tool(
        'get_component_docs',
        'Get detailed documentation for a specific component including props, variants, examples, and sub-components',
        {
            componentName: z.string().describe('Name of the component (e.g., "Button", "Dialog", "Tabs")')
        },
        async ({ componentName }) => {
            const component = getComponentByName(componentName);

            if (!component) {
                return {
                    content: [{
                        type: 'text',
                        text: `Component "${componentName}" not found. Use the list_components tool to see all available components.`
                    }],
                    isError: true
                };
            }

            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(component, null, 2)
                }]
            };
        }
    );

    // Tool: get_component_props
    server.tool(
        'get_component_props',
        'Get just the props documentation for a specific component',
        {
            componentName: z.string().describe('Name of the component')
        },
        async ({ componentName }) => {
            const component = getComponentByName(componentName);

            if (!component) {
                return {
                    content: [{
                        type: 'text',
                        text: `Component "${componentName}" not found.`
                    }],
                    isError: true
                };
            }

            const propsDoc = {
                name: component.name,
                imports: component.imports,
                props: component.props,
                variants: component.variants,
                defaultVariants: component.defaultVariants
            };

            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify(propsDoc, null, 2)
                }]
            };
        }
    );

    // Tool: generate_component_snippet
    server.tool(
        'generate_component_snippet',
        'Generate a code snippet for a component with specified configuration and props',
        {
            componentName: z.string().describe('Component name (e.g., "Button", "Input")'),
            variant: z.string().optional().describe('Variant to use (e.g., "primary", "outline")'),
            size: z.string().optional().describe('Size to use (e.g., "sm", "md", "lg")'),
            children: z.string().optional().describe('Content/children for the component'),
            props: z.record(z.string()).optional().describe('Additional props as key-value pairs')
        },
        async ({ componentName, variant, size, children, props: additionalProps }) => {
            const component = getComponentByName(componentName);

            if (!component) {
                return {
                    content: [{
                        type: 'text',
                        text: `Component "${componentName}" not found.`
                    }],
                    isError: true
                };
            }

            // Build props string
            const propsList = [];

            if (variant) {
                propsList.push(`variant="${variant}"`);
            }
            if (size) {
                propsList.push(`size="${size}"`);
            }
            if (additionalProps) {
                for (const [key, value] of Object.entries(additionalProps)) {
                    if (value === 'true') {
                        propsList.push(key);
                    } else if (value === 'false') {
                        propsList.push(`${key}={false}`);
                    } else if (value.startsWith('{') || value.startsWith('(')) {
                        propsList.push(`${key}=${value}`);
                    } else {
                        propsList.push(`${key}="${value}"`);
                    }
                }
            }

            const propsStr = propsList.length > 0 ? ' ' + propsList.join(' ') : '';
            const childContent = children || 'Content';

            // Determine if component is self-closing or has children
            const selfClosingComponents = ['Input', 'Separator', 'Spinner', 'Progress', 'Skeleton', 'Switch', 'Checkbox', 'Slider'];
            const isSelfClosing = selfClosingComponents.includes(component.name);

            let snippet;
            if (isSelfClosing) {
                snippet = `${component.imports}

<${component.name}${propsStr} />`;
            } else {
                snippet = `${component.imports}

<${component.name}${propsStr}>
    ${childContent}
</${component.name}>`;
            }

            return {
                content: [{
                    type: 'text',
                    text: snippet
                }]
            };
        }
    );

    // Tool: search_components
    server.tool(
        'search_components',
        'Search for components by name, description, or prop functionality',
        {
            query: z.string().describe('Search query (e.g., "form", "modal", "navigation")')
        },
        async ({ query }) => {
            const matches = searchComponents(query);

            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify({
                        query,
                        resultCount: matches.length,
                        results: matches.map(c => ({
                            name: c.name,
                            description: c.description,
                            hasSubComponents: (c.subComponents?.length || 0) > 0
                        }))
                    }, null, 2)
                }]
            };
        }
    );

    // Tool: get_component_examples
    server.tool(
        'get_component_examples',
        'Get usage examples for a specific component',
        {
            componentName: z.string().describe('Name of the component')
        },
        async ({ componentName }) => {
            const component = getComponentByName(componentName);

            if (!component) {
                return {
                    content: [{
                        type: 'text',
                        text: `Component "${componentName}" not found.`
                    }],
                    isError: true
                };
            }

            if (!component.examples || component.examples.length === 0) {
                return {
                    content: [{
                        type: 'text',
                        text: `No examples available for "${componentName}". Use the get_component_docs tool for full documentation.`
                    }]
                };
            }

            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify({
                        component: component.name,
                        examples: component.examples
                    }, null, 2)
                }]
            };
        }
    );

    console.log('Registered 6 MCP tools');
}
