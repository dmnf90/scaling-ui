import React from 'react';
import { Badge } from '../../../src/index.js';
import { Section, Demo, Example, CodeBlock } from '../components';

export default function BadgePage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Badge</h1>
                <p className="text-lg text-muted-foreground">
                    Displays a badge or a component that looks like a badge.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Badge } from 'scaling-ui';`} />
            </Section>

            <Section title="Variants">
                <p className="text-muted-foreground mb-4">
                    Available in multiple color variants.
                </p>
                <Example
                    preview={
                        <>
                            <Badge variant="default">Default</Badge>
                            <Badge variant="secondary">Secondary</Badge>
                            <Badge variant="destructive">Destructive</Badge>
                            <Badge variant="outline">Outline</Badge>
                            <Badge variant="success">Success</Badge>
                            <Badge variant="warning">Warning</Badge>
                        </>
                    }
                    code={`<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>`}
                />
            </Section>

            <Section title="Props">
                <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-muted">
                            <tr>
                                <th className="text-left p-4 font-semibold">Prop</th>
                                <th className="text-left p-4 font-semibold">Type</th>
                                <th className="text-left p-4 font-semibold">Default</th>
                                <th className="text-left p-4 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">variant</td>
                                <td className="p-4 text-sm text-muted-foreground">
                                    'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'
                                </td>
                                <td className="p-4 text-sm">'default'</td>
                                <td className="p-4 text-sm">Visual style variant</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">className</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Additional CSS classes</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="Examples">
                <p className="text-muted-foreground mb-4">Common usage scenarios</p>
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm">Status:</span>
                                <Badge variant="success">Active</Badge>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm">Notifications:</span>
                                <Badge variant="destructive">5</Badge>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm">Version:</span>
                                <Badge variant="outline">v2.1.0</Badge>
                            </div>
                        </div>
                    }
                    code={`<div className="flex items-center gap-2">
    <span>Status:</span>
    <Badge variant="success">Active</Badge>
</div>
<div className="flex items-center gap-2">
    <span>Notifications:</span>
    <Badge variant="destructive">5</Badge>
</div>`}
                />
            </Section>
        </div>
    );
}
