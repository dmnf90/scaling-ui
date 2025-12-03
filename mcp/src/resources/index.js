/**
 * MCP Resources Registration
 */

import { getComponents, getComponentByName, getRegistryMetadata } from '../data/componentRegistry.js';

/**
 * Register all MCP resources
 * @param {McpServer} server - MCP server instance
 * @param {Object} componentData - Loaded component data
 */
export function registerResources(server, componentData) {
    // Resource: List all components
    server.resource(
        'components-list',
        'scaling-ui://components',
        async () => {
            const components = getComponents();
            const metadata = getRegistryMetadata();

            return {
                contents: [{
                    uri: 'scaling-ui://components',
                    mimeType: 'application/json',
                    text: JSON.stringify({
                        generatedAt: metadata.generatedAt,
                        total: metadata.totalComponents,
                        components: components.map(c => ({
                            name: c.name,
                            description: c.description,
                            uri: `scaling-ui://component/${c.name.toLowerCase()}`,
                            propsCount: c.props?.length || 0,
                            hasSubComponents: (c.subComponents?.length || 0) > 0
                        }))
                    }, null, 2)
                }]
            };
        }
    );

    // Resource template: Individual component documentation
    server.resource(
        'component-docs',
        'scaling-ui://component/{name}',
        async (uri) => {
            // Extract component name from URI
            const match = uri.match(/scaling-ui:\/\/component\/(.+)/);
            if (!match) {
                return {
                    contents: [{
                        uri,
                        mimeType: 'text/plain',
                        text: 'Invalid component URI'
                    }]
                };
            }

            const componentName = match[1];
            const component = getComponentByName(componentName);

            if (!component) {
                return {
                    contents: [{
                        uri,
                        mimeType: 'text/plain',
                        text: `Component "${componentName}" not found`
                    }]
                };
            }

            return {
                contents: [{
                    uri,
                    mimeType: 'application/json',
                    text: JSON.stringify(component, null, 2)
                }]
            };
        }
    );

    // Register static resources for each component
    const components = componentData?.components || [];
    for (const component of components) {
        const uri = `scaling-ui://component/${component.name.toLowerCase()}`;

        server.resource(
            `component-${component.name.toLowerCase()}`,
            uri,
            async () => ({
                contents: [{
                    uri,
                    mimeType: 'application/json',
                    text: JSON.stringify(component, null, 2)
                }]
            })
        );
    }

    console.log(`Registered ${components.length + 2} MCP resources`);
}
