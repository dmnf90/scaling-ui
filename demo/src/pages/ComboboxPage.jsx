import React, { useState } from 'react';
import { Combobox } from '../../../src/index.js';
import { Section, Demo, Example, CodeBlock } from '../components';

const frameworks = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'nuxt', label: 'Nuxt.js' },
];

export default function ComboboxPage() {
    const [value, setValue] = useState('');

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Combobox</h1>
                <p className="text-lg text-muted-foreground">
                    Autocomplete input and command palette with a list of suggestions.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Combobox } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm">
                            <Combobox
                                options={frameworks}
                                value={value}
                                onValueChange={setValue}
                                placeholder="Select framework..."
                            />
                            {value && (
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Selected: {frameworks.find(f => f.value === value)?.label}
                                </p>
                            )}
                        </div>
                    }
                    code={`const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
];

const [value, setValue] = useState('');

<Combobox
    options={options}
    value={value}
    onValueChange={setValue}
    placeholder="Select framework..."
/>`}
                />
            </Section>

            <Section title="Props">
                <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-muted">
                            <tr>
                                <th className="text-left p-4 font-semibold">Prop</th>
                                <th className="text-left p-4 font-semibold">Type</th>
                                <th className="text-left p-4 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">options</td>
                                <td className="p-4 text-sm text-muted-foreground">Array</td>
                                <td className="p-4 text-sm">Array of {'{value, label}'} objects</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">value</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">Selected value</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">onValueChange</td>
                                <td className="p-4 text-sm text-muted-foreground">function</td>
                                <td className="p-4 text-sm">Called when value changes</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">placeholder</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">Placeholder text</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
