import React, { useState } from 'react';
import { Checkbox, Label } from '../../../src/index.js';
import { Section, Demo, Example, CodeBlock } from '../components';

export default function CheckboxPage() {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(true);

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Checkbox</h1>
                <p className="text-lg text-muted-foreground">
                    A control that allows the user to toggle between checked and not checked.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Checkbox } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <Example
                    preview={
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                checked={checked1}
                                onClick={() => setChecked1(!checked1)}
                            />
                            <Label>Accept terms and conditions</Label>
                        </div>
                    }
                    code={`const [checked, setChecked] = useState(false);

<div className="flex items-center space-x-2">
    <Checkbox
        checked={checked}
        onClick={() => setChecked(!checked)}
    />
    <Label>Accept terms and conditions</Label>
</div>`}
                />
            </Section>

            <Section title="With Label">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="terms"
                                    checked={checked2}
                                    onClick={() => setChecked2(!checked2)}
                                />
                                <Label htmlFor="terms">
                                    I agree to the terms and conditions
                                </Label>
                            </div>
                            <p className="text-sm text-muted-foreground ml-6">
                                You agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    }
                    code={`<div className="flex items-center space-x-2">
    <Checkbox
        id="terms"
        checked={checked}
        onClick={() => setChecked(!checked)}
    />
    <Label htmlFor="terms">
        I agree to the terms and conditions
    </Label>
</div>`}
                />
            </Section>

            <Section title="Disabled">
                <Example
                    preview={
                        <>
                            <div className="flex items-center space-x-2">
                                <Checkbox disabled checked={false} />
                                <Label>Disabled unchecked</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox disabled checked={true} />
                                <Label>Disabled checked</Label>
                            </div>
                        </>
                    }
                    code={`<Checkbox disabled checked={false} />
<Checkbox disabled checked={true} />`}
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
                                <td className="p-4 text-sm">Whether checkbox is checked</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">disabled</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">false</td>
                                <td className="p-4 text-sm">Whether checkbox is disabled</td>
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
