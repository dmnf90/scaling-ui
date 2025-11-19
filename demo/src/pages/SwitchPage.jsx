import React, { useState } from 'react';
import { Switch, Label, Tabs, TabsList, TabsTrigger, TabsContent } from '../../../src/index.js';

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

export default function SwitchPage() {
    const [enabled, setEnabled] = useState(false);
    const [notifications, setNotifications] = useState(true);

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Switch</h1>
                <p className="text-lg text-muted-foreground">
                    A control that allows users to toggle between two states.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Switch } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <Example
                    preview={
                        <div className="flex items-center space-x-2">
                            <Switch
                                checked={enabled}
                                onClick={() => setEnabled(!enabled)}
                            />
                            <Label>Airplane Mode</Label>
                        </div>
                    }
                    code={`const [enabled, setEnabled] = useState(false);

<div className="flex items-center space-x-2">
    <Switch
        checked={enabled}
        onClick={() => setEnabled(!enabled)}
    />
    <Label>Airplane Mode</Label>
</div>`}
                />
            </Section>

            <Section title="With Label">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="flex items-center justify-between w-full max-w-sm">
                            <div className="space-y-0.5">
                                <Label htmlFor="notifications">Email notifications</Label>
                                <p className="text-sm text-muted-foreground">
                                    Receive emails about your account activity
                                </p>
                            </div>
                            <Switch
                                id="notifications"
                                checked={notifications}
                                onClick={() => setNotifications(!notifications)}
                            />
                        </div>
                    }
                    code={`<div className="flex items-center justify-between">
    <div className="space-y-0.5">
        <Label htmlFor="notifications">Email notifications</Label>
        <p className="text-sm text-muted-foreground">
            Receive emails about your account activity
        </p>
    </div>
    <Switch
        id="notifications"
        checked={notifications}
        onClick={() => setNotifications(!notifications)}
    />
</div>`}
                />
            </Section>

            <Section title="Disabled">
                <Example
                    preview={
                        <>
                            <div className="flex items-center space-x-2">
                                <Switch disabled checked={false} />
                                <Label>Disabled off</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch disabled checked={true} />
                                <Label>Disabled on</Label>
                            </div>
                        </>
                    }
                    code={`<Switch disabled checked={false} />
<Switch disabled checked={true} />`}
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
                                <td className="p-4 font-mono text-sm">checked</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">false</td>
                                <td className="p-4 text-sm">Whether switch is on</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">disabled</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">false</td>
                                <td className="p-4 text-sm">Whether switch is disabled</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">onClick</td>
                                <td className="p-4 text-sm text-muted-foreground">function</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Click handler</td>
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
