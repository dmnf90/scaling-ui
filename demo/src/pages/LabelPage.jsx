import React from 'react';
import { Label, Input, Checkbox } from '../../../src/index.js';
import { Section, Demo, Example, CodeBlock } from '../components';

export default function LabelPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Label</h1>
                <p className="text-lg text-muted-foreground">
                    Renders an accessible label associated with form controls.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Label } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <p className="text-muted-foreground mb-4">
                    Use with form inputs to improve accessibility.
                </p>
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="flex flex-col gap-2 w-full max-w-sm">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter your email" />
                        </div>
                    }
                    code={`<div className="flex flex-col gap-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="Enter your email" />
</div>`}
                />
            </Section>

            <Section title="Required Fields">
                <p className="text-muted-foreground mb-4">
                    Add a required indicator with the required prop.
                </p>
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="flex flex-col gap-2 w-full max-w-sm">
                            <Label htmlFor="username" required>Username</Label>
                            <Input id="username" placeholder="Enter your username" />
                        </div>
                    }
                    code={`<div className="flex flex-col gap-2">
    <Label htmlFor="username" required>Username</Label>
    <Input id="username" placeholder="Enter your username" />
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
                                <td className="p-4 font-mono text-sm">htmlFor</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">The id of the form element</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">required</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">false</td>
                                <td className="p-4 text-sm">Shows required indicator</td>
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
