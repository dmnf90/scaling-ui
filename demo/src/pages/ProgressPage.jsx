import React, { useState, useEffect } from 'react';
import { Progress, Button } from '../../../src/index.js';
import { Section, Demo, Example, CodeBlock } from '../components';

export default function ProgressPage() {
    const [progress, setProgress] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (!isRunning) return;

        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    setIsRunning(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 500);

        return () => clearInterval(timer);
    }, [isRunning]);

    const startProgress = () => {
        setProgress(0);
        setIsRunning(true);
    };

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Progress</h1>
                <p className="text-lg text-muted-foreground">
                    Displays an indicator showing the completion progress of a task.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Progress } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <p className="text-muted-foreground mb-4">
                    Set the value prop to control the progress (0-100).
                </p>
                <Example
                    className="flex-col items-start gap-4"
                    preview={
                        <div className="w-full max-w-md space-y-4">
                            <Progress value={25} />
                            <Progress value={50} />
                            <Progress value={75} />
                            <Progress value={100} />
                        </div>
                    }
                    code={`<Progress value={25} />
<Progress value={50} />
<Progress value={75} />
<Progress value={100} />`}
                />
            </Section>

            <Section title="Indeterminate">
                <p className="text-muted-foreground mb-4">
                    Omit the value prop for an indeterminate loading state.
                </p>
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-md">
                            <Progress />
                        </div>
                    }
                    code={`<Progress />`}
                />
            </Section>

            <Section title="Interactive Example">
                <p className="text-muted-foreground mb-4">
                    Click the button to see animated progress.
                </p>
                <Example
                    className="flex-col items-start gap-4"
                    preview={
                        <div className="w-full max-w-md space-y-4">
                            <Progress value={progress} />
                            <div className="flex items-center gap-4">
                                <Button onClick={startProgress} disabled={isRunning}>
                                    {isRunning ? 'Loading...' : 'Start Progress'}
                                </Button>
                                <span className="text-sm text-muted-foreground">
                                    {progress}%
                                </span>
                            </div>
                        </div>
                    }
                    code={`const [progress, setProgress] = useState(0);

useEffect(() => {
    const timer = setInterval(() => {
        setProgress(prev => prev >= 100 ? 100 : prev + 10);
    }, 500);
    return () => clearInterval(timer);
}, []);

<Progress value={progress} />`}
                />
            </Section>

            <Section title="Custom Max">
                <p className="text-muted-foreground mb-4">
                    Use the max prop for custom maximum values.
                </p>
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-md space-y-4">
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">3 of 5 steps</p>
                                <Progress value={3} max={5} />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">750 of 1000 points</p>
                                <Progress value={750} max={1000} />
                            </div>
                        </div>
                    }
                    code={`<Progress value={3} max={5} />
<Progress value={750} max={1000} />`}
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
                                <td className="p-4 font-mono text-sm">value</td>
                                <td className="p-4 text-sm text-muted-foreground">number</td>
                                <td className="p-4 text-sm text-muted-foreground">-</td>
                                <td className="p-4 text-sm">Progress value (undefined = indeterminate)</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">max</td>
                                <td className="p-4 text-sm text-muted-foreground">number</td>
                                <td className="p-4 text-sm text-muted-foreground">100</td>
                                <td className="p-4 text-sm">Maximum value</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">className</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm text-muted-foreground">-</td>
                                <td className="p-4 text-sm">Additional classes for the container</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">indicatorClassName</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm text-muted-foreground">-</td>
                                <td className="p-4 text-sm">Additional classes for the indicator</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
