import React from 'react';
import { Button } from '../../../src/index.js';
import { ArrowRight, Plus, Download } from 'lucide-react';
import { Section, Demo, Example, CodeBlock } from '../components';

export default function ButtonPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Button</h1>
                <p className="text-lg text-muted-foreground">
                    A versatile button component with multiple variants, sizes, and states.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Button } from 'scaling-ui';`} />
            </Section>

            <Section title="Variants">
                <p className="text-muted-foreground mb-4">
                    The button comes in 6 different variants for different use cases.
                </p>
                <Example
                    preview={
                        <>
                            <Button variant="primary">Primary</Button>
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="destructive">Destructive</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="ghost">Ghost</Button>
                            <Button variant="link">Link</Button>
                        </>
                    }
                    code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}
                />
            </Section>

            <Section title="Sizes">
                <p className="text-muted-foreground mb-4">
                    Three different sizes are available: small, medium (default), and large.
                </p>
                <Example
                    className="items-end"
                    preview={
                        <>
                            <Button size="sm">Small</Button>
                            <Button size="md">Medium</Button>
                            <Button size="lg">Large</Button>
                            <Button size="icon">
                                <ArrowRight size={20} />
                            </Button>
                        </>
                    }
                    code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="icon">
    <ArrowRight size={20} />
</Button>`}
                />
            </Section>

            <Section title="States">
                <p className="text-muted-foreground mb-4">
                    Buttons can be disabled or show a loading state.
                </p>
                <Example
                    preview={
                        <>
                            <Button disabled>Disabled</Button>
                            <Button loading>Loading</Button>
                            <Button loading variant="outline">
                                Loading
                            </Button>
                        </>
                    }
                    code={`<Button disabled>Disabled</Button>
<Button loading>Loading</Button>
<Button loading variant="outline">
    Loading
</Button>`}
                />
            </Section>

            <Section title="With Icons">
                <p className="text-muted-foreground mb-4">
                    Buttons can include icons alongside text for better visual communication.
                </p>
                <Example
                    preview={
                        <>
                            <Button>
                                <Plus size={16} />
                                Add Item
                            </Button>
                            <Button variant="outline">
                                Download
                                <Download size={16} />
                            </Button>
                        </>
                    }
                    code={`<Button>
    <Plus size={16} />
    Add Item
</Button>
<Button variant="outline">
    Download
    <Download size={16} />
</Button>`}
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
                                <td className="p-4 text-sm text-muted-foreground">
                                    'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
                                </td>
                                <td className="p-4 text-sm">'primary'</td>
                                <td className="p-4 text-sm">Visual style variant</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">size</td>
                                <td className="p-4 text-sm text-muted-foreground">
                                    'sm' | 'md' | 'lg' | 'icon'
                                </td>
                                <td className="p-4 text-sm">'md'</td>
                                <td className="p-4 text-sm">Size variant</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">disabled</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">false</td>
                                <td className="p-4 text-sm">Whether the button is disabled</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">loading</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">false</td>
                                <td className="p-4 text-sm">Show loading spinner</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">className</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Additional CSS classes</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">onClick</td>
                                <td className="p-4 text-sm text-muted-foreground">function</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Click handler</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="Examples">
                <p className="text-muted-foreground mb-4">Real-world usage examples</p>
                <Example
                    className="flex-col items-start"
                    preview={
                        <>
                            <div className="flex gap-2 w-full">
                                <Button variant="outline" className="flex-1">
                                    Cancel
                                </Button>
                                <Button className="flex-1" onClick={() => alert('Saved!')}>Save Changes</Button>
                            </div>
                            <div className="flex gap-2 w-full">
                                <Button variant="destructive">Delete Account</Button>
                            </div>
                            <div className="flex gap-2 w-full">
                                <Button variant="ghost" size="sm">
                                    Skip
                                </Button>
                                <Button variant="primary" size="sm">
                                    Continue
                                </Button>
                            </div>
                        </>
                    }
                    code={`<div className="flex gap-2">
    <Button variant="outline" className="flex-1">
        Cancel
    </Button>
    <Button className="flex-1">
        Save Changes
    </Button>
</div>

<Button variant="destructive">
    Delete Account
</Button>

<div className="flex gap-2">
    <Button variant="ghost" size="sm">Skip</Button>
    <Button variant="primary" size="sm">Continue</Button>
</div>`}
                />
            </Section>
        </div>
    );
}
