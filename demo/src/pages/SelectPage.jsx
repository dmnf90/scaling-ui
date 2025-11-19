import React, { useState } from 'react';
import { Select, Label, Tabs, TabsList, TabsTrigger, TabsContent } from '../../../src/index.js';

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

export default function SelectPage() {
    const [country, setCountry] = useState('');

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Select</h1>
                <p className="text-lg text-muted-foreground">
                    Displays a list of options for the user to pick from - triggered by a button.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Select } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm">
                            <Select>
                                <option value="">Select a fruit...</option>
                                <option value="apple">Apple</option>
                                <option value="banana">Banana</option>
                                <option value="orange">Orange</option>
                                <option value="mango">Mango</option>
                            </Select>
                        </div>
                    }
                    code={`<Select>
    <option value="">Select a fruit...</option>
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="orange">Orange</option>
    <option value="mango">Mango</option>
</Select>`}
                />
            </Section>

            <Section title="With Label">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Select
                                id="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Select a country...</option>
                                <option value="us">United States</option>
                                <option value="uk">United Kingdom</option>
                                <option value="ca">Canada</option>
                                <option value="au">Australia</option>
                            </Select>
                        </div>
                    }
                    code={`const [country, setCountry] = useState('');

<div className="space-y-2">
    <Label htmlFor="country">Country</Label>
    <Select
        id="country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
    >
        <option value="">Select a country...</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
        <option value="au">Australia</option>
    </Select>
</div>`}
                />
            </Section>

            <Section title="Error State">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm space-y-2">
                            <Label htmlFor="language">Language</Label>
                            <Select id="language" variant="error">
                                <option value="">Select a language...</option>
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                            </Select>
                            <p className="text-sm text-destructive">Please select a language</p>
                        </div>
                    }
                    code={`<div className="space-y-2">
    <Label htmlFor="language">Language</Label>
    <Select variant="error">
        <option value="">Select a language...</option>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
    </Select>
    <p className="text-sm text-destructive">Please select a language</p>
</div>`}
                />
            </Section>

            <Section title="Disabled">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm">
                            <Select disabled>
                                <option value="">Disabled select...</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                            </Select>
                        </div>
                    }
                    code={`<Select disabled>
    <option value="">Disabled select...</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
</Select>`}
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
                                <td className="p-4 font-mono text-sm">disabled</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">false</td>
                                <td className="p-4 text-sm">Whether select is disabled</td>
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
