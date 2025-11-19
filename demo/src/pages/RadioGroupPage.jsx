import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem, Label, Tabs, TabsList, TabsTrigger, TabsContent } from '../../../src/index.js';

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

export default function RadioGroupPage() {
    const [plan, setPlan] = useState('free');
    const [notification, setNotification] = useState('all');

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Radio Group</h1>
                <p className="text-lg text-muted-foreground">
                    A set of checkable buttons where only one can be checked at a time.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { RadioGroup, RadioGroupItem } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <Example
                    className="flex-col items-start"
                    preview={
                        <RadioGroup value={plan} onValueChange={setPlan}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="free" />
                                <Label>Free</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="pro" />
                                <Label>Pro</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="enterprise" />
                                <Label>Enterprise</Label>
                            </div>
                        </RadioGroup>
                    }
                    code={`const [value, setValue] = useState('free');

<RadioGroup value={value} onValueChange={setValue}>
    <div className="flex items-center space-x-2">
        <RadioGroupItem value="free" />
        <Label>Free</Label>
    </div>
    <div className="flex items-center space-x-2">
        <RadioGroupItem value="pro" />
        <Label>Pro</Label>
    </div>
    <div className="flex items-center space-x-2">
        <RadioGroupItem value="enterprise" />
        <Label>Enterprise</Label>
    </div>
</RadioGroup>`}
                />
            </Section>

            <Section title="With Descriptions">
                <Example
                    className="flex-col items-start"
                    preview={
                        <RadioGroup value={notification} onValueChange={setNotification} className="w-full max-w-sm">
                            <div className="flex items-start space-x-2">
                                <RadioGroupItem value="all" className="mt-1" />
                                <div className="flex flex-col">
                                    <Label>All notifications</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Receive all notifications
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-2">
                                <RadioGroupItem value="mentions" className="mt-1" />
                                <div className="flex flex-col">
                                    <Label>Mentions only</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Only receive notifications when mentioned
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-2">
                                <RadioGroupItem value="none" className="mt-1" />
                                <div className="flex flex-col">
                                    <Label>None</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Do not receive any notifications
                                    </p>
                                </div>
                            </div>
                        </RadioGroup>
                    }
                    code={`<RadioGroup value={value} onValueChange={setValue}>
    <div className="flex items-start space-x-2">
        <RadioGroupItem value="all" className="mt-1" />
        <div className="flex flex-col">
            <Label>All notifications</Label>
            <p className="text-sm text-muted-foreground">
                Receive all notifications
            </p>
        </div>
    </div>
    {/* More options... */}
</RadioGroup>`}
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
                                <td className="p-4 font-mono text-sm">RadioGroup</td>
                                <td className="p-4 font-mono text-sm">value</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">Selected value</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">RadioGroup</td>
                                <td className="p-4 font-mono text-sm">onValueChange</td>
                                <td className="p-4 text-sm text-muted-foreground">function</td>
                                <td className="p-4 text-sm">Change handler</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">RadioGroupItem</td>
                                <td className="p-4 font-mono text-sm">value</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">The value of this item</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">RadioGroupItem</td>
                                <td className="p-4 font-mono text-sm">disabled</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">Whether item is disabled</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
