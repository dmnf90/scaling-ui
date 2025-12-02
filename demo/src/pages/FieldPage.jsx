import React, { useState } from 'react';
import { Field, Input, Textarea, Select } from '../../../src/index.js';
import { Section, Demo, Example, CodeBlock } from '../components';

export default function FieldPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Field</h1>
                <p className="text-lg text-muted-foreground">
                    A form field wrapper that combines label, input, hint text, and error message.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Field } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <p className="text-muted-foreground mb-4">
                    Wrap any form control with Field to add a label and spacing.
                </p>
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm">
                            <Field label="Email" htmlFor="email">
                                <Input id="email" type="email" placeholder="Enter your email" />
                            </Field>
                        </div>
                    }
                    code={`<Field label="Email" htmlFor="email">
    <Input id="email" type="email" placeholder="Enter your email" />
</Field>`}
                />
            </Section>

            <Section title="Required Field">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm">
                            <Field label="Username" htmlFor="username" required>
                                <Input id="username" placeholder="Enter username" />
                            </Field>
                        </div>
                    }
                    code={`<Field label="Username" htmlFor="username" required>
    <Input id="username" placeholder="Enter username" />
</Field>`}
                />
            </Section>

            <Section title="With Hint Text">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm">
                            <Field
                                label="Password"
                                htmlFor="password"
                                hint="Must be at least 8 characters"
                            >
                                <Input id="password" type="password" />
                            </Field>
                        </div>
                    }
                    code={`<Field
    label="Password"
    htmlFor="password"
    hint="Must be at least 8 characters"
>
    <Input id="password" type="password" />
</Field>`}
                />
            </Section>

            <Section title="With Error">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm">
                            <Field
                                label="Email"
                                htmlFor="email-error"
                                error="Please enter a valid email address"
                            >
                                <Input id="email-error" type="email" variant="error" />
                            </Field>
                        </div>
                    }
                    code={`<Field
    label="Email"
    htmlFor="email-error"
    error="Please enter a valid email address"
>
    <Input id="email-error" type="email" variant="error" />
</Field>`}
                />
            </Section>

            <Section title="With Textarea">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm">
                            <Field label="Bio" htmlFor="bio" hint="Tell us about yourself">
                                <Textarea id="bio" placeholder="Enter your bio" />
                            </Field>
                        </div>
                    }
                    code={`<Field label="Bio" htmlFor="bio" hint="Tell us about yourself">
    <Textarea id="bio" placeholder="Enter your bio" />
</Field>`}
                />
            </Section>

            <Section title="With Select">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm">
                            <Field label="Country" htmlFor="country">
                                <Select id="country">
                                    <option value="">Select a country...</option>
                                    <option value="us">United States</option>
                                    <option value="uk">United Kingdom</option>
                                    <option value="ca">Canada</option>
                                </Select>
                            </Field>
                        </div>
                    }
                    code={`<Field label="Country" htmlFor="country">
    <Select id="country">
        <option value="">Select a country...</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
    </Select>
</Field>`}
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
                                <td className="p-4 font-mono text-sm">label</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Label text</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">htmlFor</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">ID of the form control</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">required</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">false</td>
                                <td className="p-4 text-sm">Shows required indicator</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">error</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Error message</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">hint</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Hint text (hidden when error is shown)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
