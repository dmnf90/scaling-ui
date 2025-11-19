import React, { useState } from 'react';
import { Form, Field, Input, Button, Tabs, TabsList, TabsTrigger, TabsContent } from '../../../src/index.js';

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

export default function FormPage() {
    const [submittedData, setSubmittedData] = useState(null);

    const handleSubmit = (e) => {
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        setSubmittedData(data);
    };

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Form</h1>
                <p className="text-lg text-muted-foreground">
                    A form wrapper with automatic submit handling and spacing.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Form } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm">
                            <Form onSubmit={handleSubmit}>
                                <Field label="Email" htmlFor="email">
                                    <Input id="email" name="email" type="email" required />
                                </Field>
                                <Field label="Password" htmlFor="password">
                                    <Input id="password" name="password" type="password" required />
                                </Field>
                                <Button type="submit">Sign In</Button>
                            </Form>
                            {submittedData && (
                                <div className="mt-4 p-3 bg-muted rounded-md">
                                    <p className="text-sm font-medium">Submitted:</p>
                                    <pre className="text-xs mt-1">{JSON.stringify(submittedData, null, 2)}</pre>
                                </div>
                            )}
                        </div>
                    }
                    code={`const [data, setData] = useState(null);

const handleSubmit = (e) => {
    const formData = new FormData(e.target);
    setData(Object.fromEntries(formData));
};

<Form onSubmit={handleSubmit}>
    <Field label="Email" htmlFor="email">
        <Input id="email" name="email" type="email" required />
    </Field>
    <Field label="Password" htmlFor="password">
        <Input id="password" name="password" type="password" required />
    </Field>
    <Button type="submit">Sign In</Button>
</Form>`}
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
                                <td className="p-4 font-mono text-sm">onSubmit</td>
                                <td className="p-4 text-sm text-muted-foreground">function</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Submit handler (preventDefault is automatic)</td>
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
