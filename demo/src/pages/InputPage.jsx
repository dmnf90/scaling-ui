import React from 'react';
import { Input, Label, Tabs, TabsList, TabsTrigger, TabsContent } from '../../../src/index.js';
import { Mail, Lock, Search } from 'lucide-react';

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

export default function InputPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Input</h1>
                <p className="text-lg text-muted-foreground">
                    A text input field with multiple variants and sizes.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Input } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm">
                            <Input placeholder="Enter text..." />
                        </div>
                    }
                    code={`<Input placeholder="Enter text..." />`}
                />
            </Section>

            <Section title="With Label">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter your email" />
                        </div>
                    }
                    code={`<div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="Enter your email" />
</div>`}
                />
            </Section>

            <Section title="Sizes">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm space-y-3">
                            <Input inputSize="sm" placeholder="Small input" />
                            <Input inputSize="md" placeholder="Medium input" />
                            <Input inputSize="lg" placeholder="Large input" />
                        </div>
                    }
                    code={`<Input inputSize="sm" placeholder="Small input" />
<Input inputSize="md" placeholder="Medium input" />
<Input inputSize="lg" placeholder="Large input" />`}
                />
            </Section>

            <Section title="Input Types">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm space-y-3">
                            <Input type="email" placeholder="Email" />
                            <Input type="password" placeholder="Password" />
                            <Input type="number" placeholder="Number" />
                            <Input type="date" />
                            <Input type="file" />
                        </div>
                    }
                    code={`<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
<Input type="number" placeholder="Number" />
<Input type="date" />
<Input type="file" />`}
                />
            </Section>

            <Section title="Error State">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm space-y-2">
                            <Label htmlFor="error-input">Username</Label>
                            <Input id="error-input" variant="error" placeholder="Enter username" />
                            <p className="text-sm text-destructive">This field is required</p>
                        </div>
                    }
                    code={`<div className="space-y-2">
    <Label htmlFor="error-input">Username</Label>
    <Input variant="error" placeholder="Enter username" />
    <p className="text-sm text-destructive">This field is required</p>
</div>`}
                />
            </Section>

            <Section title="Disabled">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm">
                            <Input disabled placeholder="Disabled input" />
                        </div>
                    }
                    code={`<Input disabled placeholder="Disabled input" />`}
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
                                <td className="p-4 font-mono text-sm">type</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">'text'</td>
                                <td className="p-4 text-sm">HTML input type</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">inputSize</td>
                                <td className="p-4 text-sm text-muted-foreground">'sm' | 'md' | 'lg'</td>
                                <td className="p-4 text-sm">'md'</td>
                                <td className="p-4 text-sm">Size variant</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">variant</td>
                                <td className="p-4 text-sm text-muted-foreground">'default' | 'error'</td>
                                <td className="p-4 text-sm">'default'</td>
                                <td className="p-4 text-sm">Visual variant</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">disabled</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">false</td>
                                <td className="p-4 text-sm">Whether input is disabled</td>
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
