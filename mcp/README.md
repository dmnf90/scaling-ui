# scaling-ui MCP Server

MCP (Model Context Protocol) server for the scaling-ui React component library. Provides AI assistants with component documentation, props, usage examples, and code generation tools.

## Features

- **Component Documentation**: Full documentation for all 40+ components
- **Props Information**: Detailed prop types, defaults, and descriptions
- **Code Examples**: Real usage examples from the demo application
- **Code Generation**: Generate component snippets with specified props
- **Search**: Find components by name or description

## Installation

```bash
cd mcp
npm install
```

## Building Component Data

Before running the server, build the component documentation:

```bash
npm run build:data
```

This scans all components in `src/components/` and demo pages in `demo/src/pages/` to generate `src/data/components.json`.

## Running the Server

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

The server runs on port 3009 by default. Set the `PORT` environment variable to change this.

## Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Server information |
| `/health` | GET | Health check |
| `/sse` | GET | SSE endpoint for MCP connection |
| `/messages` | POST | MCP message handler |

## MCP Tools

| Tool | Description |
|------|-------------|
| `list_components` | List all available components |
| `get_component_docs` | Get full documentation for a component |
| `get_component_props` | Get props documentation only |
| `get_component_examples` | Get usage examples |
| `generate_component_snippet` | Generate code snippet with props |
| `search_components` | Search components by query |

## MCP Resources

| URI | Description |
|-----|-------------|
| `scaling-ui://components` | List of all components |
| `scaling-ui://component/{name}` | Individual component documentation |

## Deployment

### nginx Configuration

Copy `nginx/mcp.ui.scaling.pt` to `/etc/nginx/sites-available/`:

```bash
sudo cp nginx/mcp.ui.scaling.pt /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/mcp.ui.scaling.pt /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSL Certificate

```bash
sudo certbot --nginx -d mcp.ui.scaling.pt
```

### systemd Service

```bash
sudo cp systemd/scaling-ui-mcp.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable scaling-ui-mcp
sudo systemctl start scaling-ui-mcp
```

## Testing

Test the health endpoint:

```bash
curl http://localhost:3009/health
```

Test with an MCP client or use the SSE endpoint directly:

```bash
curl http://localhost:3009/sse
```

## License

MIT
