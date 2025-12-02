import React from 'react';
import { Kbd } from '../../../src/index.js';
import { Section, Demo, Example, CodeBlock } from '../components';

export default function KbdPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Kbd</h1>
                <p className="text-lg text-muted-foreground">
                    Display keyboard keys and shortcuts in a styled inline element.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Kbd } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <p className="text-muted-foreground mb-4">
                    Use Kbd to display individual keyboard keys.
                </p>
                <Example
                    preview={
                        <div className="flex items-center gap-2">
                            <Kbd>⌘</Kbd>
                            <Kbd>Shift</Kbd>
                            <Kbd>K</Kbd>
                        </div>
                    }
                    code={`<Kbd>⌘</Kbd>
<Kbd>Shift</Kbd>
<Kbd>K</Kbd>`}
                />
            </Section>

            <Section title="Keyboard Shortcuts">
                <p className="text-muted-foreground mb-4">
                    Combine multiple Kbd components to show keyboard shortcuts.
                </p>
                <Example
                    className="flex-col items-start gap-4"
                    preview={
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="text-sm w-24">Copy:</span>
                                <Kbd>⌘</Kbd>
                                <span className="text-muted-foreground">+</span>
                                <Kbd>C</Kbd>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm w-24">Paste:</span>
                                <Kbd>⌘</Kbd>
                                <span className="text-muted-foreground">+</span>
                                <Kbd>V</Kbd>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm w-24">Save:</span>
                                <Kbd>⌘</Kbd>
                                <span className="text-muted-foreground">+</span>
                                <Kbd>S</Kbd>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm w-24">Undo:</span>
                                <Kbd>⌘</Kbd>
                                <span className="text-muted-foreground">+</span>
                                <Kbd>Z</Kbd>
                            </div>
                        </div>
                    }
                    code={`<div className="flex items-center gap-2">
    <span>Copy:</span>
    <Kbd>⌘</Kbd>
    <span>+</span>
    <Kbd>C</Kbd>
</div>`}
                />
            </Section>

            <Section title="Special Keys">
                <p className="text-muted-foreground mb-4">
                    Display various special keys and symbols.
                </p>
                <Example
                    preview={
                        <div className="flex flex-wrap items-center gap-2">
                            <Kbd>↵</Kbd>
                            <Kbd>⇧</Kbd>
                            <Kbd>⌥</Kbd>
                            <Kbd>⌃</Kbd>
                            <Kbd>⎋</Kbd>
                            <Kbd>⌫</Kbd>
                            <Kbd>Tab</Kbd>
                            <Kbd>Space</Kbd>
                            <Kbd>←</Kbd>
                            <Kbd>→</Kbd>
                            <Kbd>↑</Kbd>
                            <Kbd>↓</Kbd>
                        </div>
                    }
                    code={`<Kbd>↵</Kbd>   {/* Enter */}
<Kbd>⇧</Kbd>   {/* Shift */}
<Kbd>⌥</Kbd>   {/* Option/Alt */}
<Kbd>⌃</Kbd>   {/* Control */}
<Kbd>⎋</Kbd>   {/* Escape */}
<Kbd>⌫</Kbd>   {/* Backspace */}
<Kbd>Tab</Kbd>
<Kbd>Space</Kbd>`}
                />
            </Section>

            <Section title="In Context">
                <p className="text-muted-foreground mb-4">
                    Kbd works well inline with text.
                </p>
                <Example
                    className="flex-col items-start"
                    preview={
                        <p className="text-sm">
                            Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command palette,
                            or <Kbd>Esc</Kbd> to close it.
                        </p>
                    }
                    code={`<p>
    Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command palette,
    or <Kbd>Esc</Kbd> to close it.
</p>`}
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
                                <td className="p-4 font-mono text-sm">children</td>
                                <td className="p-4 text-sm text-muted-foreground">ReactNode</td>
                                <td className="p-4 text-sm">Key text or symbol to display</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">className</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">Additional CSS classes</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
