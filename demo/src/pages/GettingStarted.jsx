import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Separator } from '../../../src/index.js';
import { Github, PackageCheck } from 'lucide-react';
import { CodeBlock } from '../components';

export default function GettingStarted() {
    return (
        <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-2">Getting Started</h1>
            <p className="text-lg text-muted-foreground mb-12">
                Learn how to install and use Scaling UI in your React project.
            </p>

            {/* Installation */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <PackageCheck className="w-6 h-6" />
                    Installation
                </h2>
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-muted-foreground mb-4">
                            Install Scaling UI via npm:
                        </p>
                        <CodeBlock code="npm install scaling-ui" language="bash" />
                    </CardContent>
                </Card>
            </div>

            <Separator className="mb-12" />

            {/* Usage */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-muted-foreground mb-4">
                            Import components and styles in your React application:
                        </p>
                        <div className="mb-4">
                            <CodeBlock code={`import { Button } from 'scaling-ui';
import 'scaling-ui/styles.css';

function App() {
    return <Button>Click me</Button>;
}`} />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Each component can be imported individually for optimal tree-shaking.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Separator className="mb-12" />

            {/* Features */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Features</h2>
                <div className="grid gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">React & Tailwind CSS</CardTitle>
                            <CardDescription>
                                Built with React 18 and Tailwind CSS v4 for modern styling and performance.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Simple, Composable Components</CardTitle>
                            <CardDescription>
                                No complex context providers or setup required. Just import and use.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Fully Accessible</CardTitle>
                            <CardDescription>
                                ARIA attributes, keyboard navigation, and focus management built-in.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Tree-shakeable</CardTitle>
                            <CardDescription>
                                Import only what you need. Unused components won't bloat your bundle.
                            </CardDescription>
                        </CardHeader>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">TypeScript Support</CardTitle>
                            <CardDescription>
                                Full type definitions included for better developer experience.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>

            <Separator className="mb-12" />

            {/* Next Steps */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
                <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">→</span>
                                <span>Browse the component library in the sidebar to see examples</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">→</span>
                                <span>Check out each component page for detailed usage and code examples</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">→</span>
                                <span>Customize components with your own Tailwind classes</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">→</span>
                                <div className="flex items-center gap-2">
                                    <span>Visit the</span>
                                    <a
                                        href="https://github.com/dmnf90/scaling-ui"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-primary hover:underline"
                                    >
                                        <Github className="w-4 h-4" />
                                        GitHub repository
                                    </a>
                                    <span>for source code and contributions</span>
                                </div>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
