import React from 'react';
import { Skeleton } from '../../../src/index.js';
import { Section, Demo, Example, CodeBlock } from '../components';

export default function SkeletonPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Skeleton</h1>
                <p className="text-lg text-muted-foreground">
                    Use to show a placeholder while content is loading.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Skeleton } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <p className="text-muted-foreground mb-4">
                    The Skeleton component accepts any className to control its size and shape.
                </p>
                <Example
                    className="flex-col items-start gap-4"
                    preview={
                        <div className="space-y-4 w-full max-w-sm">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    }
                    code={`<Skeleton className="h-4 w-full" />
<Skeleton className="h-4 w-3/4" />
<Skeleton className="h-4 w-1/2" />`}
                />
            </Section>

            <Section title="Circle">
                <p className="text-muted-foreground mb-4">
                    Use rounded-full to create circular skeletons for avatars.
                </p>
                <Example
                    preview={
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <Skeleton className="h-16 w-16 rounded-full" />
                        </div>
                    }
                    code={`<Skeleton className="h-10 w-10 rounded-full" />
<Skeleton className="h-12 w-12 rounded-full" />
<Skeleton className="h-16 w-16 rounded-full" />`}
                />
            </Section>

            <Section title="Card Placeholder">
                <p className="text-muted-foreground mb-4">
                    Combine multiple skeletons to create loading placeholders for complex content.
                </p>
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="flex items-center space-x-4 w-full max-w-sm">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    }
                    code={`<div className="flex items-center space-x-4">
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
    </div>
</div>`}
                />
            </Section>

            <Section title="Card Example">
                <p className="text-muted-foreground mb-4">
                    A complete card loading state.
                </p>
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm border border-border rounded-lg p-4 space-y-4">
                            <Skeleton className="h-32 w-full rounded-md" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-4/5" />
                            </div>
                            <div className="flex gap-2">
                                <Skeleton className="h-9 w-20 rounded-md" />
                                <Skeleton className="h-9 w-20 rounded-md" />
                            </div>
                        </div>
                    }
                    code={`<div className="border border-border rounded-lg p-4 space-y-4">
    <Skeleton className="h-32 w-full rounded-md" />
    <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
    </div>
    <div className="flex gap-2">
        <Skeleton className="h-9 w-20 rounded-md" />
        <Skeleton className="h-9 w-20 rounded-md" />
    </div>
</div>`}
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
                                <td className="p-4 font-mono text-sm">className</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">Classes to control size and shape (h-*, w-*, rounded-*)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
