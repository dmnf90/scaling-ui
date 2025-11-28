import React, { useState } from 'react';
import {
    Collapsible, CollapsibleTrigger, CollapsibleContent,
    Button, Tabs, TabsList, TabsTrigger, TabsContent
} from '../../../src/index.js';
import { ChevronsUpDown } from 'lucide-react';

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
        <div className={`p-6 border border-border rounded-lg ${className}`}>
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

export default function CollapsiblePage() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Collapsible</h1>
                <p className="text-lg text-muted-foreground">
                    An interactive component which expands/collapses a panel.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Collapsible, CollapsibleTrigger, CollapsibleContent } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <p className="text-muted-foreground mb-4">
                    A simple collapsible section with trigger and content.
                </p>
                <Example
                    preview={
                        <Collapsible className="w-[350px] space-y-2">
                            <div className="flex items-center justify-between space-x-4 px-4">
                                <h4 className="text-sm font-semibold">
                                    @peduarte starred 3 repositories
                                </h4>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm" className="w-9 p-0">
                                        <ChevronsUpDown className="h-4 w-4" />
                                        <span className="sr-only">Toggle</span>
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                            <div className="rounded-md border border-border px-4 py-3 font-mono text-sm">
                                @radix-ui/primitives
                            </div>
                            <CollapsibleContent className="space-y-2">
                                <div className="rounded-md border border-border px-4 py-3 font-mono text-sm">
                                    @radix-ui/colors
                                </div>
                                <div className="rounded-md border border-border px-4 py-3 font-mono text-sm">
                                    @stitches/react
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    }
                    code={`<Collapsible className="w-[350px] space-y-2">
    <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
            @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
                <ChevronsUpDown className="h-4 w-4" />
            </Button>
        </CollapsibleTrigger>
    </div>
    <div className="rounded-md border px-4 py-3 font-mono text-sm">
        @radix-ui/primitives
    </div>
    <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @stitches/react
        </div>
    </CollapsibleContent>
</Collapsible>`}
                />
            </Section>

            <Section title="Default Open">
                <p className="text-muted-foreground mb-4">
                    Use defaultOpen to have the collapsible open initially.
                </p>
                <Example
                    preview={
                        <Collapsible defaultOpen className="w-[350px] space-y-2">
                            <div className="flex items-center justify-between space-x-4 px-4">
                                <h4 className="text-sm font-semibold">
                                    Open by default
                                </h4>
                                <CollapsibleTrigger asChild>
                                    <Button variant="ghost" size="sm" className="w-9 p-0">
                                        <ChevronsUpDown className="h-4 w-4" />
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                            <CollapsibleContent className="space-y-2">
                                <div className="rounded-md border border-border px-4 py-3 text-sm">
                                    This content is visible by default.
                                </div>
                                <div className="rounded-md border border-border px-4 py-3 text-sm">
                                    Click the button to collapse.
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    }
                    code={`<Collapsible defaultOpen className="w-[350px] space-y-2">
    <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold">Open by default</h4>
        <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
                <ChevronsUpDown className="h-4 w-4" />
            </Button>
        </CollapsibleTrigger>
    </div>
    <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 text-sm">
            This content is visible by default.
        </div>
    </CollapsibleContent>
</Collapsible>`}
                />
            </Section>

            <Section title="Controlled">
                <p className="text-muted-foreground mb-4">
                    Control the open state with open and onOpenChange props.
                </p>
                <Example
                    preview={
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-sm">State: {isOpen ? 'Open' : 'Closed'}</span>
                                <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)}>
                                    Toggle
                                </Button>
                            </div>
                            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px] space-y-2">
                                <div className="flex items-center justify-between space-x-4 px-4">
                                    <h4 className="text-sm font-semibold">
                                        Controlled collapsible
                                    </h4>
                                    <CollapsibleTrigger asChild>
                                        <Button variant="ghost" size="sm" className="w-9 p-0">
                                            <ChevronsUpDown className="h-4 w-4" />
                                        </Button>
                                    </CollapsibleTrigger>
                                </div>
                                <CollapsibleContent className="space-y-2">
                                    <div className="rounded-md border border-border px-4 py-3 text-sm">
                                        Content controlled by external state.
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        </div>
                    }
                    code={`const [isOpen, setIsOpen] = useState(false);

<Collapsible open={isOpen} onOpenChange={setIsOpen}>
    <div className="flex items-center justify-between">
        <h4>Controlled collapsible</h4>
        <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
                <ChevronsUpDown className="h-4 w-4" />
            </Button>
        </CollapsibleTrigger>
    </div>
    <CollapsibleContent>
        <div>Content controlled by external state.</div>
    </CollapsibleContent>
</Collapsible>`}
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
                                <td className="p-4 font-mono text-sm">open</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Controlled open state</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">defaultOpen</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">false</td>
                                <td className="p-4 text-sm">Initial open state (uncontrolled)</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">onOpenChange</td>
                                <td className="p-4 text-sm text-muted-foreground">function</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Callback when open state changes</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
