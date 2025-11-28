import React, { useState } from 'react';
import { Button, Tabs, TabsList, TabsTrigger, TabsContent, Toaster } from '../../../src/index.js';
import { toast } from '../../../src/index.js';

const positions = [
    'top-left', 'top-center', 'top-right',
    'bottom-left', 'bottom-center', 'bottom-right'
];

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

export default function SonnerPage() {
    const [selectedPosition, setSelectedPosition] = useState('bottom-right');

    const showDefaultToast = () => {
        toast('Event has been created');
    };

    const showDescriptionToast = () => {
        toast('Event has been created', {
            description: 'Monday, January 3rd at 6:00pm',
        });
    };

    const showSuccessToast = () => {
        toast.success('Profile updated successfully');
    };

    const showErrorToast = () => {
        toast.error('Something went wrong');
    };

    const showWarningToast = () => {
        toast.warning('Please review your changes');
    };

    const showInfoToast = () => {
        toast.info('New update available');
    };

    const showActionToast = () => {
        toast('File deleted', {
            action: {
                label: 'Undo',
                onClick: () => console.log('Undo clicked'),
            },
        });
    };

    const showPromiseToast = () => {
        const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

        toast.promise(promise(), {
            loading: 'Saving...',
            success: 'Saved successfully!',
            error: 'Error saving data',
        });
    };

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Sonner</h1>
                <p className="text-lg text-muted-foreground">
                    An opinionated toast component for React, powered by the Sonner library.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Toaster, toast } from 'scaling-ui';

// Add Toaster to your app root
<Toaster />

// Then use toast anywhere
toast('Hello world');`} />
            </Section>

            <Section title="Setup">
                <p className="text-muted-foreground mb-4">
                    Add the Toaster component to your app root (usually in App.jsx or layout).
                </p>
                <CodeBlock code={`import { Toaster } from 'scaling-ui';

function App() {
    return (
        <>
            <YourApp />
            <Toaster />
        </>
    );
}`} />
            </Section>

            <Section title="Position">
                <p className="text-muted-foreground mb-4">
                    Choose where toasts appear on the screen. Click a position to see it in action.
                </p>
                <Example
                    preview={
                        <div className="w-full">
                            <div className="grid grid-cols-3 gap-2 max-w-md">
                                {positions.map(pos => (
                                    <Button
                                        key={pos}
                                        size="sm"
                                        variant={selectedPosition === pos ? 'default' : 'outline'}
                                        onClick={() => {
                                            setSelectedPosition(pos);
                                            toast(`Position: ${pos}`, { position: pos });
                                        }}
                                    >
                                        {pos}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    }
                    code={`<Toaster position="top-right" />

// Available positions:
// 'top-left', 'top-center', 'top-right'
// 'bottom-left', 'bottom-center', 'bottom-right'`}
                />
            </Section>

            <Section title="Basic Usage">
                <p className="text-muted-foreground mb-4">
                    Show a simple toast message.
                </p>
                <Example
                    preview={
                        <Button onClick={showDefaultToast}>
                            Show Toast
                        </Button>
                    }
                    code={`toast('Event has been created');`}
                />
            </Section>

            <Section title="With Description">
                <p className="text-muted-foreground mb-4">
                    Add a description to provide more context.
                </p>
                <Example
                    preview={
                        <Button onClick={showDescriptionToast}>
                            With Description
                        </Button>
                    }
                    code={`toast('Event has been created', {
    description: 'Monday, January 3rd at 6:00pm',
});`}
                />
            </Section>

            <Section title="Types">
                <p className="text-muted-foreground mb-4">
                    Different toast types for different scenarios. Each type has a colored left border accent and matching icon color.
                </p>
                <Example
                    preview={
                        <div className="flex flex-wrap gap-2">
                            <Button onClick={showSuccessToast} variant="outline">
                                Success
                            </Button>
                            <Button onClick={showErrorToast} variant="outline">
                                Error
                            </Button>
                            <Button onClick={showWarningToast} variant="outline">
                                Warning
                            </Button>
                            <Button onClick={showInfoToast} variant="outline">
                                Info
                            </Button>
                        </div>
                    }
                    code={`toast.success('Profile updated successfully');
toast.error('Something went wrong');
toast.warning('Please review your changes');
toast.info('New update available');`}
                />
            </Section>

            <Section title="Custom Theme">
                <p className="text-muted-foreground mb-4">
                    Customize toast type colors using Tailwind classes. <strong>Important:</strong> Use the <code>!</code> prefix
                    for Tailwind classes to override Sonner's default styles.
                </p>
                <Example
                    preview={
                        <div className="flex flex-wrap gap-2">
                            <Button
                                variant="outline"
                                onClick={() => toast.success('Custom emerald success!')}
                            >
                                Emerald Success
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => toast.error('Custom rose error!')}
                            >
                                Rose Error
                            </Button>
                        </div>
                    }
                    code={`// Note: Use ! prefix for Tailwind classes
<Toaster
    theme={{
        success: '!border-l-4 !border-l-emerald-500',
        error: '!border-l-4 !border-l-rose-500',
        warning: '!border-l-4 !border-l-amber-500',
        info: '!border-l-4 !border-l-cyan-500',
    }}
    icons={{
        success: <CheckCircle className="h-4 w-4 text-emerald-500" />,
        error: <XCircle className="h-4 w-4 text-rose-500" />,
    }}
/>`}
                />
            </Section>

            <Section title="With Action">
                <p className="text-muted-foreground mb-4">
                    Add an action button to the toast.
                </p>
                <Example
                    preview={
                        <Button onClick={showActionToast}>
                            With Action
                        </Button>
                    }
                    code={`toast('File deleted', {
    action: {
        label: 'Undo',
        onClick: () => console.log('Undo clicked'),
    },
});`}
                />
            </Section>

            <Section title="Promise">
                <p className="text-muted-foreground mb-4">
                    Show loading, success, and error states for async operations.
                </p>
                <Example
                    preview={
                        <Button onClick={showPromiseToast}>
                            Save (Promise)
                        </Button>
                    }
                    code={`const promise = saveData();

toast.promise(promise, {
    loading: 'Saving...',
    success: 'Saved successfully!',
    error: 'Error saving data',
});`}
                />
            </Section>

            <Section title="Toaster Props">
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
                                <td className="p-4 font-mono text-sm">position</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm text-muted-foreground">"bottom-right"</td>
                                <td className="p-4 text-sm">Toast position on screen</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">expand</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm text-muted-foreground">false</td>
                                <td className="p-4 text-sm">Expand toasts by default</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">richColors</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm text-muted-foreground">false</td>
                                <td className="p-4 text-sm">Use rich colors for types</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">closeButton</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm text-muted-foreground">false</td>
                                <td className="p-4 text-sm">Show close button on toasts</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">theme</td>
                                <td className="p-4 text-sm text-muted-foreground">object</td>
                                <td className="p-4 text-sm text-muted-foreground">defaultTheme</td>
                                <td className="p-4 text-sm">Tailwind classes for types (use ! prefix)</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">icons</td>
                                <td className="p-4 text-sm text-muted-foreground">object</td>
                                <td className="p-4 text-sm text-muted-foreground">defaultIcons</td>
                                <td className="p-4 text-sm">Custom icons for success, error, warning, info</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="Toast Options">
                <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-muted">
                            <tr>
                                <th className="text-left p-4 font-semibold">Option</th>
                                <th className="text-left p-4 font-semibold">Type</th>
                                <th className="text-left p-4 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">description</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">Additional description text</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">duration</td>
                                <td className="p-4 text-sm text-muted-foreground">number</td>
                                <td className="p-4 text-sm">Duration in ms (default: 4000)</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">action</td>
                                <td className="p-4 text-sm text-muted-foreground">{'{label, onClick}'}</td>
                                <td className="p-4 text-sm">Action button config</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">onDismiss</td>
                                <td className="p-4 text-sm text-muted-foreground">function</td>
                                <td className="p-4 text-sm">Called when toast is dismissed</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
