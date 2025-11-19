import React from 'react';
import { Separator, Tabs, TabsList, TabsTrigger, TabsContent } from '../../../src/index.js';

function Section({ title, children }) {
    return (
        <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            {children}
        </div>
    );
}

function CodeBlock({ code }) {
    return (
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">{code}</code>
        </pre>
    );
}

function Demo({ children, className = '' }) {
    return (
        <div className={`flex flex-wrap gap-4 items-center p-6 border border-border rounded-lg ${className}`}>
            {children}
        </div>
    );
}

function Example({ preview, code, className = '' }) {
    return (
        <Tabs defaultValue="preview" className="mb-4">
            <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
                <Demo className={className}>{preview}</Demo>
            </TabsContent>
            <TabsContent value="code">
                <CodeBlock code={code} />
            </TabsContent>
        </Tabs>
    );
}

export default function SeparatorPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Separator</h1>
                <p className="text-lg text-muted-foreground">
                    Visually or semantically separates content.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Separator } from 'scaling-ui';`} />
            </Section>

            <Section title="Horizontal">
                <p className="text-muted-foreground mb-4">
                    The default orientation is horizontal.
                </p>
                <Example
                    className="flex-col items-stretch"
                    preview={
                        <div className="w-full">
                            <div className="space-y-1">
                                <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
                                <p className="text-sm text-muted-foreground">
                                    An open-source UI component library.
                                </p>
                            </div>
                            <Separator className="my-4" />
                            <div className="flex h-5 items-center space-x-4 text-sm">
                                <div>Blog</div>
                                <Separator orientation="vertical" />
                                <div>Docs</div>
                                <Separator orientation="vertical" />
                                <div>Source</div>
                            </div>
                        </div>
                    }
                    code={`<div>
    <div className="space-y-1">
        <h4 className="text-sm font-medium">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
            An open-source UI component library.
        </p>
    </div>
    <Separator className="my-4" />
    <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
    </div>
</div>`}
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
                                <td className="p-4 font-mono text-sm">orientation</td>
                                <td className="p-4 text-sm text-muted-foreground">
                                    'horizontal' | 'vertical'
                                </td>
                                <td className="p-4 text-sm">'horizontal'</td>
                                <td className="p-4 text-sm">The orientation of the separator</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">decorative</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">true</td>
                                <td className="p-4 text-sm">Whether the separator is purely decorative</td>
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
        </div>
    );
}
