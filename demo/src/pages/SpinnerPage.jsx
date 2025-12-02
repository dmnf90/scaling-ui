import React from 'react';
import { Spinner } from '../../../src/index.js';
import { Section, Demo, Example, CodeBlock } from '../components';

export default function SpinnerPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Spinner</h1>
                <p className="text-lg text-muted-foreground">
                    A loading indicator that displays an animated spinning circle.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Spinner } from 'scaling-ui';`} />
            </Section>

            <Section title="Sizes">
                <p className="text-muted-foreground mb-4">
                    Four different sizes are available: small, medium (default), large, and extra large.
                </p>
                <Example
                    className="items-end"
                    preview={
                        <>
                            <Spinner size="sm" />
                            <Spinner size="md" />
                            <Spinner size="lg" />
                            <Spinner size="xl" />
                        </>
                    }
                    code={`<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />`}
                />
            </Section>

            <Section title="Variants">
                <p className="text-muted-foreground mb-4">
                    Three color variants are available.
                </p>
                <Example
                    preview={
                        <>
                            <Spinner variant="default" />
                            <Spinner variant="secondary" />
                            <Spinner variant="muted" />
                        </>
                    }
                    code={`<Spinner variant="default" />
<Spinner variant="secondary" />
<Spinner variant="muted" />`}
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
                                <td className="p-4 font-mono text-sm">size</td>
                                <td className="p-4 text-sm text-muted-foreground">
                                    'sm' | 'md' | 'lg' | 'xl'
                                </td>
                                <td className="p-4 text-sm">'md'</td>
                                <td className="p-4 text-sm">Size of the spinner</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">variant</td>
                                <td className="p-4 text-sm text-muted-foreground">
                                    'default' | 'secondary' | 'muted'
                                </td>
                                <td className="p-4 text-sm">'default'</td>
                                <td className="p-4 text-sm">Color variant</td>
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

            <Section title="Example">
                <p className="text-muted-foreground mb-4">
                    Common usage in a loading state
                </p>
                <Example
                    className="flex-col items-center"
                    preview={
                        <div className="flex flex-col items-center gap-3">
                            <Spinner size="lg" />
                            <p className="text-sm text-muted-foreground">Loading...</p>
                        </div>
                    }
                    code={`<div className="flex flex-col items-center gap-3">
    <Spinner size="lg" />
    <p className="text-sm text-muted-foreground">Loading...</p>
</div>`}
                />
            </Section>
        </div>
    );
}
