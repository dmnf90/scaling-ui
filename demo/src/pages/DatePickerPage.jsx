import React, { useState } from 'react';
import { DatePicker, Tabs, TabsList, TabsTrigger, TabsContent } from '../../../src/index.js';
import { format } from 'date-fns';

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

export default function DatePickerPage() {
    const [date, setDate] = useState();

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Date Picker</h1>
                <p className="text-lg text-muted-foreground">
                    A date picker component with calendar popover.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { DatePicker } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm space-y-3">
                            <DatePicker
                                selected={date}
                                onSelect={setDate}
                            />
                            {date && (
                                <p className="text-sm text-muted-foreground">
                                    Selected: {format(date, 'PPP')}
                                </p>
                            )}
                        </div>
                    }
                    code={`import { DatePicker } from 'scaling-ui';
import { useState } from 'react';

const [date, setDate] = useState();

<DatePicker
    selected={date}
    onSelect={setDate}
/>`}
                />
            </Section>

            <Section title="With Custom Placeholder">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm">
                            <DatePicker
                                placeholder="When is your birthday?"
                            />
                        </div>
                    }
                    code={`<DatePicker
    placeholder="When is your birthday?"
/>`}
                />
            </Section>

            <Section title="With Custom Format">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm">
                            <DatePicker
                                selected={date}
                                onSelect={setDate}
                                dateFormat="MM/dd/yyyy"
                            />
                        </div>
                    }
                    code={`<DatePicker
    selected={date}
    onSelect={setDate}
    dateFormat="MM/dd/yyyy"
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
                                <th className="text-left p-4 font-semibold">Default</th>
                                <th className="text-left p-4 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">selected</td>
                                <td className="p-4 text-sm text-muted-foreground">Date</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Currently selected date</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">onSelect</td>
                                <td className="p-4 text-sm text-muted-foreground">function</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Called when a date is selected</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">placeholder</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">'Pick a date'</td>
                                <td className="p-4 text-sm">Placeholder text</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">dateFormat</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">'PPP'</td>
                                <td className="p-4 text-sm">Date format (date-fns format)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
