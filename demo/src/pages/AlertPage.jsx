import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '../../../src/index.js';
import { AlertCircle, CheckCircle, AlertTriangle, Info, Terminal } from 'lucide-react';
import { Section, Demo, Example, CodeBlock } from '../components';

export default function AlertPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Alert</h1>
                <p className="text-lg text-muted-foreground">
                    Displays a callout for user attention.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Alert, AlertTitle, AlertDescription } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <p className="text-muted-foreground mb-4">
                    Alerts display important messages to users.
                </p>
                <Example
                    className="flex-col items-start"
                    preview={
                        <Alert className="w-full max-w-lg">
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>Heads up!</AlertTitle>
                            <AlertDescription>
                                You can add components to your app using the cli.
                            </AlertDescription>
                        </Alert>
                    }
                    code={`<Alert>
    <Terminal className="h-4 w-4" />
    <AlertTitle>Heads up!</AlertTitle>
    <AlertDescription>
        You can add components to your app using the cli.
    </AlertDescription>
</Alert>`}
                />
            </Section>

            <Section title="Variants">
                <p className="text-muted-foreground mb-4">
                    Use different variants to convey different types of messages.
                </p>
                <Example
                    className="flex-col items-start gap-4"
                    preview={
                        <div className="w-full max-w-lg space-y-4">
                            <Alert>
                                <Info className="h-4 w-4" />
                                <AlertTitle>Default</AlertTitle>
                                <AlertDescription>
                                    This is a default alert for general information.
                                </AlertDescription>
                            </Alert>

                            <Alert variant="info">
                                <Info className="h-4 w-4" />
                                <AlertTitle>Info</AlertTitle>
                                <AlertDescription>
                                    This is an informational alert.
                                </AlertDescription>
                            </Alert>

                            <Alert variant="success">
                                <CheckCircle className="h-4 w-4" />
                                <AlertTitle>Success</AlertTitle>
                                <AlertDescription>
                                    Your changes have been saved successfully.
                                </AlertDescription>
                            </Alert>

                            <Alert variant="warning">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Warning</AlertTitle>
                                <AlertDescription>
                                    Your session is about to expire in 5 minutes.
                                </AlertDescription>
                            </Alert>

                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    Your session has expired. Please log in again.
                                </AlertDescription>
                            </Alert>
                        </div>
                    }
                    code={`<Alert>
    <Info className="h-4 w-4" />
    <AlertTitle>Default</AlertTitle>
    <AlertDescription>This is a default alert.</AlertDescription>
</Alert>

<Alert variant="info">
    <Info className="h-4 w-4" />
    <AlertTitle>Info</AlertTitle>
    <AlertDescription>This is an informational alert.</AlertDescription>
</Alert>

<Alert variant="success">
    <CheckCircle className="h-4 w-4" />
    <AlertTitle>Success</AlertTitle>
    <AlertDescription>Your changes have been saved.</AlertDescription>
</Alert>

<Alert variant="warning">
    <AlertTriangle className="h-4 w-4" />
    <AlertTitle>Warning</AlertTitle>
    <AlertDescription>Your session is about to expire.</AlertDescription>
</Alert>

<Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>Your session has expired.</AlertDescription>
</Alert>`}
                />
            </Section>

            <Section title="Without Icon">
                <p className="text-muted-foreground mb-4">
                    Alerts work without icons too.
                </p>
                <Example
                    className="flex-col items-start"
                    preview={
                        <Alert className="w-full max-w-lg" variant="info">
                            <AlertTitle>New update available</AlertTitle>
                            <AlertDescription>
                                A new software update is available. Click here to download and install.
                            </AlertDescription>
                        </Alert>
                    }
                    code={`<Alert variant="info">
    <AlertTitle>New update available</AlertTitle>
    <AlertDescription>
        A new software update is available.
    </AlertDescription>
</Alert>`}
                />
            </Section>

            <Section title="Props">
                <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-muted">
                            <tr>
                                <th className="text-left p-4 font-semibold">Component</th>
                                <th className="text-left p-4 font-semibold">Prop</th>
                                <th className="text-left p-4 font-semibold">Type</th>
                                <th className="text-left p-4 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">Alert</td>
                                <td className="p-4 font-mono text-sm">variant</td>
                                <td className="p-4 text-sm text-muted-foreground">"default" | "destructive" | "success" | "warning" | "info"</td>
                                <td className="p-4 text-sm">The visual style variant</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">Alert</td>
                                <td className="p-4 font-mono text-sm">className</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">Additional CSS classes</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">AlertTitle</td>
                                <td className="p-4 font-mono text-sm">className</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">Additional CSS classes</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">AlertDescription</td>
                                <td className="p-4 font-mono text-sm">className</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">Additional CSS classes</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
