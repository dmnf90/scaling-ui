/**
 * MCP Server for scaling-ui component library
 * Provides component documentation, props, and code generation tools
 */

import Fastify from 'fastify';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { registerTools } from './tools/index.js';
import { registerResources } from './resources/index.js';
import { loadComponentData } from './data/componentRegistry.js';

const PORT = process.env.PORT || 3009;
const HOST = process.env.HOST || '0.0.0.0';

// Create Fastify instance
const app = Fastify({
    logger: true
});

// Store active SSE transports by session ID
const transports = new Map();

// Load component data
let componentData = null;

async function initializeServer() {
    // Load component documentation
    componentData = await loadComponentData();
    console.log(`Loaded documentation for ${componentData.totalComponents} components`);
}

/**
 * Create a new MCP server instance with tools and resources
 */
function createMcpServer() {
    const server = new McpServer({
        name: 'scaling-ui-mcp',
        version: '1.0.0'
    });

    // Register tools
    registerTools(server, componentData);

    // Register resources
    registerResources(server, componentData);

    return server;
}

// Health check endpoint
app.get('/health', async () => {
    return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        components: componentData?.totalComponents || 0
    };
});

// Info endpoint
app.get('/', async () => {
    return {
        name: 'scaling-ui-mcp',
        version: '1.0.0',
        description: 'MCP server for scaling-ui React component library',
        endpoints: {
            health: '/health',
            sse: '/sse',
            messages: '/messages'
        },
        components: componentData?.totalComponents || 0
    };
});

// SSE endpoint for MCP connection
app.get('/sse', async (request, reply) => {
    console.log('New SSE connection');

    // Hijack the response so Fastify doesn't manage it
    reply.hijack();

    const res = reply.raw;

    // Create MCP server and transport
    const mcpServer = createMcpServer();
    const transport = new SSEServerTransport('/messages', res);

    // Handle connection close
    request.raw.on('close', () => {
        console.log('SSE connection closed');
        // Remove from transports map using sessionId if available
        if (transport.sessionId) {
            transports.delete(transport.sessionId);
        }
    });

    // Connect MCP server to transport (this starts the transport)
    await mcpServer.connect(transport);

    // Store transport with its session ID after connection
    if (transport.sessionId) {
        transports.set(transport.sessionId, transport);
        console.log(`SSE session started: ${transport.sessionId}`);
    }
});

// Messages endpoint for MCP communication
app.post('/messages', async (request, reply) => {
    const sessionId = request.query.sessionId;

    if (!sessionId || !transports.has(sessionId)) {
        reply.code(400);
        return { error: 'Invalid or missing session ID' };
    }

    const transport = transports.get(sessionId);

    try {
        // handlePostMessage needs the response object to send replies
        await transport.handlePostMessage(request.body, reply.raw);
        reply.hijack(); // Let the transport handle the response
    } catch (error) {
        console.error('Error handling message:', error);
        reply.code(500);
        return { error: error.message };
    }
});

// CORS preflight
app.options('*', async (request, reply) => {
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    reply.header('Access-Control-Allow-Headers', 'Content-Type');
    return {};
});

// Add CORS headers to all responses
app.addHook('onSend', async (request, reply) => {
    reply.header('Access-Control-Allow-Origin', '*');
});

// Start server
async function start() {
    try {
        // Initialize component data
        await initializeServer();

        // Start Fastify
        await app.listen({ port: PORT, host: HOST });
        console.log(`\nscaling-ui MCP Server running at http://${HOST}:${PORT}`);
        console.log(`SSE endpoint: http://${HOST}:${PORT}/sse`);
        console.log(`Health check: http://${HOST}:${PORT}/health\n`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

start();
