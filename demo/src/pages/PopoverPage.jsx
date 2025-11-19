import React from 'react';
import { Popover, PopoverTrigger, PopoverContent, Button, Tabs, TabsList, TabsTrigger, TabsContent } from '../../../src/index.js';

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

export default function PopoverPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Popover</h1>
                <p className="text-lg text-muted-foreground">
                    Displays rich content in a portal, triggered by a button.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Popover, PopoverTrigger, PopoverContent } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <Example
                    className="flex-col items-center"
                    preview={
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline">Open popover</Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Dimensions</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Set the dimensions for the layer.
                                    </p>
                                </div>
                            </PopoverContent>
                        </Popover>
                    }
                    code={`<Popover>
    <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
    </PopoverTrigger>
    <PopoverContent>
        <div className="space-y-2">
            <h4 className="font-medium">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
                Set the dimensions for the layer.
            </p>
        </div>
    </PopoverContent>
</Popover>`}
                />
            </Section>

            <Section title="Alignment">
                <Example
                    className="flex-col items-center gap-4"
                    preview={
                        <>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline">Align Start</Button>
                                </PopoverTrigger>
                                <PopoverContent align="start">
                                    <p className="text-sm">Aligned to start</p>
                                </PopoverContent>
                            </Popover>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline">Align Center</Button>
                                </PopoverTrigger>
                                <PopoverContent align="center">
                                    <p className="text-sm">Aligned to center</p>
                                </PopoverContent>
                            </Popover>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline">Align End</Button>
                                </PopoverTrigger>
                                <PopoverContent align="end">
                                    <p className="text-sm">Aligned to end</p>
                                </PopoverContent>
                            </Popover>
                        </>
                    }
                    code={`<PopoverContent align="start">...</PopoverContent>
<PopoverContent align="center">...</PopoverContent>
<PopoverContent align="end">...</PopoverContent>`}
                />
            </Section>
        </div>
    );
}
