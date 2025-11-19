import React, { useState } from 'react';
import { Calendar, Tabs, TabsList, TabsTrigger, TabsContent } from '../../../src/index.js';
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

export default function CalendarPage() {
    const [date, setDate] = useState(new Date());

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Calendar</h1>
                <p className="text-lg text-muted-foreground">
                    A date calendar component with month/year navigation.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Calendar } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <Example
                    className="flex-col items-center"
                    preview={
                        <div>
                            <Calendar
                                selected={date}
                                onSelect={setDate}
                            />
                            {date && (
                                <p className="mt-4 text-sm text-center text-muted-foreground">
                                    Selected: {format(date, 'PPP')}
                                </p>
                            )}
                        </div>
                    }
                    code={`import { Calendar } from 'scaling-ui';
import { useState } from 'react';
import { format } from 'date-fns';

const [date, setDate] = useState(new Date());

<Calendar
    selected={date}
    onSelect={setDate}
/>

{date && <p>Selected: {format(date, 'PPP')}</p>}`}
                />
            </Section>

            <Section title="Features">
                <div className="space-y-2 text-sm">
                    <p>• Month/year navigation with arrow buttons</p>
                    <p>• Dropdown selects for month and year selection</p>
                    <p>• Highlights today's date</p>
                    <p>• Shows days from adjacent months</p>
                    <p>• Full keyboard navigation support</p>
                </div>
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
                                <td className="p-4 font-mono text-sm">selected</td>
                                <td className="p-4 text-sm text-muted-foreground">Date</td>
                                <td className="p-4 text-sm">Currently selected date</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">onSelect</td>
                                <td className="p-4 text-sm text-muted-foreground">function</td>
                                <td className="p-4 text-sm">Called when a date is selected</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
