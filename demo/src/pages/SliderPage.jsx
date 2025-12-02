import React, { useState } from 'react';
import { Slider } from '../../../src/index.js';
import { Section, Demo, Example, CodeBlock } from '../components';

export default function SliderPage() {
    const [value, setValue] = useState([50]);
    const [rangeValue, setRangeValue] = useState([25, 75]);

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Slider</h1>
                <p className="text-lg text-muted-foreground">
                    An input where the user selects a value from within a given range.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Slider } from 'scaling-ui';`} />
            </Section>

            <Section title="Single Handle">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm space-y-3">
                            <Slider
                                value={value}
                                onValueChange={setValue}
                                min={0}
                                max={100}
                            />
                            <div className="text-sm text-muted-foreground">Value: {value[0]}</div>
                        </div>
                    }
                    code={`const [value, setValue] = useState([50]);

<Slider
    value={value}
    onValueChange={setValue}
    min={0}
    max={100}
/>`}
                />
            </Section>

            <Section title="Range (Dual Handle)">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm space-y-3">
                            <Slider
                                value={rangeValue}
                                onValueChange={setRangeValue}
                                min={0}
                                max={100}
                            />
                            <div className="text-sm text-muted-foreground">
                                Range: {rangeValue[0]} - {rangeValue[1]}
                            </div>
                        </div>
                    }
                    code={`const [value, setValue] = useState([25, 75]);

<Slider
    value={value}
    onValueChange={setValue}
    min={0}
    max={100}
/>`}
                />
            </Section>

            <Section title="With Step">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm">
                            <Slider min={0} max={100} step={10} />
                        </div>
                    }
                    code={`<Slider min={0} max={100} step={10} />`}
                />
            </Section>

            <Section title="Disabled">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm">
                            <Slider value={[50]} disabled />
                        </div>
                    }
                    code={`<Slider value={[50]} disabled />`}
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
                                <td className="p-4 font-mono text-sm">min</td>
                                <td className="p-4 text-sm text-muted-foreground">number</td>
                                <td className="p-4 text-sm">0</td>
                                <td className="p-4 text-sm">Minimum value</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">max</td>
                                <td className="p-4 text-sm text-muted-foreground">number</td>
                                <td className="p-4 text-sm">100</td>
                                <td className="p-4 text-sm">Maximum value</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">step</td>
                                <td className="p-4 text-sm text-muted-foreground">number</td>
                                <td className="p-4 text-sm">1</td>
                                <td className="p-4 text-sm">Step increment</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">value</td>
                                <td className="p-4 text-sm text-muted-foreground">number[]</td>
                                <td className="p-4 text-sm">[50]</td>
                                <td className="p-4 text-sm">Value array (1 or 2 items)</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">onValueChange</td>
                                <td className="p-4 text-sm text-muted-foreground">function</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Called when value changes</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">disabled</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">false</td>
                                <td className="p-4 text-sm">Whether slider is disabled</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
