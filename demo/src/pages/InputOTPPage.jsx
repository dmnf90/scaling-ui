import React, { useState } from 'react';
import { InputOTP, Tabs, TabsList, TabsTrigger, TabsContent } from '../../../src/index.js';

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

export default function InputOTPPage() {
    const [otp, setOtp] = useState('');
    const [complete, setComplete] = useState(false);

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Input OTP</h1>
                <p className="text-lg text-muted-foreground">
                    One-time password input with auto-focus and paste support.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { InputOTP } from 'scaling-ui';`} />
            </Section>

            <Section title="6-Digit Code">
                <Example
                    className="flex-col items-center"
                    preview={
                        <div className="space-y-3">
                            <InputOTP
                                length={6}
                                value={otp}
                                onChange={setOtp}
                                onComplete={(code) => {
                                    setComplete(true);
                                    setTimeout(() => setComplete(false), 2000);
                                }}
                            />
                            {complete && (
                                <p className="text-sm text-green-600">Code complete: {otp}</p>
                            )}
                        </div>
                    }
                    code={`const [otp, setOtp] = useState('');

<InputOTP
    length={6}
    value={otp}
    onChange={setOtp}
    onComplete={(code) => console.log('Complete:', code)}
/>`}
                />
            </Section>

            <Section title="4-Digit PIN">
                <Example
                    className="flex-col items-center"
                    preview={
                        <InputOTP length={4} />
                    }
                    code={`<InputOTP length={4} />`}
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
                                <td className="p-4 font-mono text-sm">length</td>
                                <td className="p-4 text-sm text-muted-foreground">number</td>
                                <td className="p-4 text-sm">6</td>
                                <td className="p-4 text-sm">Number of input slots</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">value</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">''</td>
                                <td className="p-4 text-sm">Current OTP value</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">onChange</td>
                                <td className="p-4 text-sm text-muted-foreground">function</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Called when value changes</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">onComplete</td>
                                <td className="p-4 text-sm text-muted-foreground">function</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Called when all digits filled</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
