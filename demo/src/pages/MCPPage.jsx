import React from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    Separator,
    Badge,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Alert,
    AlertDescription,
} from '../../../src/index.js';
import { Bot, Settings, Wrench, Database, Zap, ExternalLink, CheckCircle2 } from 'lucide-react';
import { CodeBlock } from '../components';

export default function MCPPage() {
    const claudeDesktopConfig = `{
    "mcpServers": {
        "scaling-ui": {
            "url": "https://mcp.ui.scaling.pt/sse"
        }
    }
}`;

    const cursorConfig = `{
    "mcpServers": {
        "scaling-ui": {
            "url": "https://mcp.ui.scaling.pt/sse"
        }
    }
}`;

    const claudeCodeConfig = `{
    "mcpServers": {
        "scaling-ui": {
            "url": "https://mcp.ui.scaling.pt/sse"
        }
    }
}`;

    const listComponentsExample = `// Tool: list_components
// Lists all 47 available components with descriptions

{
    "total": 47,
    "components": [
        { "name": "Button", "description": "A versatile button with multiple variants" },
        { "name": "Card", "description": "Composable container for content" },
        { "name": "Dialog", "description": "Modal window for user interaction" },
        ...
    ]
}`;

    const getDocsExample = `// Tool: get_component_docs
// Get full documentation for any component

// Input: { "componentName": "Button" }
// Returns: props, variants, examples, and sub-components`;

    const generateSnippetExample = `// Tool: generate_component_snippet
// Generate ready-to-use code snippets

// Input:
{
    "componentName": "Button",
    "variant": "destructive",
    "size": "lg",
    "children": "Delete Item"
}

// Output:
import { Button } from 'scaling-ui';

<Button variant="destructive" size="lg">
    Delete Item
</Button>`;

    return (
        <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-2">MCP Integration</h1>
            <p className="text-lg text-muted-foreground mb-12">
                Use AI assistants to help you build with Scaling UI components through the Model Context Protocol.
            </p>

            {/* What is MCP */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Bot className="w-6 h-6" />
                    What is MCP?
                </h2>
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-muted-foreground mb-4">
                            The <strong>Model Context Protocol (MCP)</strong> is an open standard that allows AI assistants
                            to access external tools and data sources. Our MCP server provides AI assistants with complete
                            knowledge of all 47 Scaling UI components, including props, variants, and usage examples.
                        </p>
                        <div className="grid sm:grid-cols-3 gap-4 mt-6">
                            <div className="flex items-start gap-3">
                                <Wrench className="w-5 h-5 text-primary mt-0.5" />
                                <div>
                                    <p className="font-medium">6 Tools</p>
                                    <p className="text-sm text-muted-foreground">Search, browse, and generate code</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Database className="w-5 h-5 text-primary mt-0.5" />
                                <div>
                                    <p className="font-medium">47 Components</p>
                                    <p className="text-sm text-muted-foreground">Full documentation available</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Zap className="w-5 h-5 text-primary mt-0.5" />
                                <div>
                                    <p className="font-medium">Real-time</p>
                                    <p className="text-sm text-muted-foreground">Always up-to-date with latest version</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Separator className="mb-12" />

            {/* Configuration */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Settings className="w-6 h-6" />
                    Configuration
                </h2>
                <p className="text-muted-foreground mb-6">
                    Add the Scaling UI MCP server to your preferred AI assistant:
                </p>

                <Tabs defaultValue="claude-desktop" className="mb-6">
                    <TabsList>
                        <TabsTrigger value="claude-desktop">Claude Desktop</TabsTrigger>
                        <TabsTrigger value="claude-code">Claude Code</TabsTrigger>
                        <TabsTrigger value="cursor">Cursor</TabsTrigger>
                    </TabsList>

                    <TabsContent value="claude-desktop">
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-muted-foreground mb-4">
                                    Add to your Claude Desktop configuration file:
                                </p>
                                <p className="text-sm text-muted-foreground mb-2">
                                    <strong>macOS:</strong> <code className="bg-muted px-1 rounded">~/Library/Application Support/Claude/claude_desktop_config.json</code>
                                </p>
                                <p className="text-sm text-muted-foreground mb-4">
                                    <strong>Windows:</strong> <code className="bg-muted px-1 rounded">%APPDATA%\Claude\claude_desktop_config.json</code>
                                </p>
                                <CodeBlock code={claudeDesktopConfig} language="json" />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="claude-code">
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-muted-foreground mb-4">
                                    Add to your Claude Code settings:
                                </p>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Open Claude Code settings and add to your MCP servers configuration:
                                </p>
                                <CodeBlock code={claudeCodeConfig} language="json" />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="cursor">
                        <Card>
                            <CardContent className="pt-6">
                                <p className="text-muted-foreground mb-4">
                                    Add to your Cursor MCP configuration:
                                </p>
                                <p className="text-sm text-muted-foreground mb-4">
                                    <strong>Location:</strong> <code className="bg-muted px-1 rounded">~/.cursor/mcp.json</code>
                                </p>
                                <CodeBlock code={cursorConfig} language="json" />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription>
                        After adding the configuration, restart your AI assistant to connect to the MCP server.
                    </AlertDescription>
                </Alert>
            </div>

            <Separator className="mb-12" />

            {/* Available Tools */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <Wrench className="w-6 h-6" />
                    Available Tools
                </h2>
                <p className="text-muted-foreground mb-6">
                    The MCP server provides these tools for AI assistants:
                </p>

                <div className="grid gap-4">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-lg">list_components</CardTitle>
                                <Badge variant="secondary">Discovery</Badge>
                            </div>
                            <CardDescription>
                                List all 47 available components with their descriptions. Great for exploring what's available.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-lg">get_component_docs</CardTitle>
                                <Badge variant="secondary">Documentation</Badge>
                            </div>
                            <CardDescription>
                                Get detailed documentation for a specific component including all props, variants, default values, and usage examples.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-lg">get_component_props</CardTitle>
                                <Badge variant="secondary">Documentation</Badge>
                            </div>
                            <CardDescription>
                                Get just the props documentation for a component - useful for quick reference.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-lg">get_component_examples</CardTitle>
                                <Badge variant="secondary">Examples</Badge>
                            </div>
                            <CardDescription>
                                Get real-world usage examples for a component, extracted from our demo pages.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-lg">generate_component_snippet</CardTitle>
                                <Badge>Code Generation</Badge>
                            </div>
                            <CardDescription>
                                Generate ready-to-use code snippets with specified variant, size, and props.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-lg">search_components</CardTitle>
                                <Badge variant="secondary">Discovery</Badge>
                            </div>
                            <CardDescription>
                                Search for components by name, description, or functionality.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>

            <Separator className="mb-12" />

            {/* Usage Examples */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Usage Examples</h2>
                <p className="text-muted-foreground mb-6">
                    Here's how AI assistants can use these tools:
                </p>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Listing Components</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CodeBlock code={listComponentsExample} language="javascript" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Getting Documentation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CodeBlock code={getDocsExample} language="javascript" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Generating Code</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CodeBlock code={generateSnippetExample} language="javascript" />
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Separator className="mb-12" />

            {/* Server Info */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Server Information</h2>
                <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">SSE Endpoint</p>
                                <p className="font-mono text-sm">https://mcp.ui.scaling.pt/sse</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Health Check</p>
                                <p className="font-mono text-sm">https://mcp.ui.scaling.pt/health</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Protocol</p>
                                <p className="font-mono text-sm">MCP over SSE</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Authentication</p>
                                <p className="font-mono text-sm">None (Public)</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <a
                                href="https://mcp.ui.scaling.pt/health"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
                            >
                                Check server status
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
