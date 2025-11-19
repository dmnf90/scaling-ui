import React from 'react';
import { Textarea, Label, Tabs, TabsList, TabsTrigger, TabsContent } from '../../../src/index.js';

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

export default function TextareaPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Textarea</h1>
                <p className="text-lg text-muted-foreground">
                    A multi-line text input field.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Textarea } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm">
                            <Textarea placeholder="Type your message here..." />
                        </div>
                    }
                    code={`<Textarea placeholder="Type your message here..." />`}
                />
            </Section>

            <Section title="With Label">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm space-y-2">
                            <Label htmlFor="message">Your message</Label>
                            <Textarea id="message" placeholder="Type your message here..." />
                        </div>
                    }
                    code={`<div className="space-y-2">
    <Label htmlFor="message">Your message</Label>
    <Textarea id="message" placeholder="Type your message here..." />
</div>`}
                />
            </Section>

            <Section title="Resize Options">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm space-y-4">
                            <div className="space-y-2">
                                <Label>Vertical resize (default)</Label>
                                <Textarea resize="vertical" placeholder="Can resize vertically..." />
                            </div>
                            <div className="space-y-2">
                                <Label>No resize</Label>
                                <Textarea resize="none" placeholder="Cannot resize..." />
                            </div>
                            <div className="space-y-2">
                                <Label>Both directions</Label>
                                <Textarea resize="both" placeholder="Can resize both ways..." />
                            </div>
                        </div>
                    }
                    code={`<Textarea resize="vertical" placeholder="Vertical..." />
<Textarea resize="none" placeholder="No resize..." />
<Textarea resize="both" placeholder="Both..." />`}
                />
            </Section>

            <Section title="Error State">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" variant="error" placeholder="Tell us about yourself" />
                            <p className="text-sm text-destructive">Bio is required</p>
                        </div>
                    }
                    code={`<div className="space-y-2">
    <Label htmlFor="bio">Bio</Label>
    <Textarea variant="error" placeholder="Tell us about yourself" />
    <p className="text-sm text-destructive">Bio is required</p>
</div>`}
                />
            </Section>

            <Section title="Disabled">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm">
                            <Textarea disabled placeholder="Disabled textarea" />
                        </div>
                    }
                    code={`<Textarea disabled placeholder="Disabled textarea" />`}
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
                                <td className="p-4 text-sm text-muted-foreground">'default' | 'error'</td>
                                <td className="p-4 text-sm">'default'</td>
                                <td className="p-4 text-sm">Visual variant</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">resize</td>
                                <td className="p-4 text-sm text-muted-foreground">'none' | 'vertical' | 'horizontal' | 'both'</td>
                                <td className="p-4 text-sm">'vertical'</td>
                                <td className="p-4 text-sm">Resize behavior</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">disabled</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">false</td>
                                <td className="p-4 text-sm">Whether textarea is disabled</td>
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
