import React from 'react';
import { Tooltip, TooltipTrigger, TooltipContent, Button } from '../../../src/index.js';
import { Section, Demo, Example, CodeBlock } from '../components';

export default function TooltipPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Tooltip</h1>
                <p className="text-lg text-muted-foreground">
                    A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Tooltip, TooltipTrigger, TooltipContent } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <Example
                    preview={
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline">Hover me</Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>This is a tooltip</p>
                            </TooltipContent>
                        </Tooltip>
                    }
                    code={`<Tooltip>
    <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent>
        <p>This is a tooltip</p>
    </TooltipContent>
</Tooltip>`}
                />
            </Section>

            <Section title="Different Sides">
                <Example
                    className="justify-center gap-6"
                    preview={
                        <>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline">Top</Button>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                    <p>Top tooltip</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline">Right</Button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Right tooltip</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline">Bottom</Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>Bottom tooltip</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline">Left</Button>
                                </TooltipTrigger>
                                <TooltipContent side="left">
                                    <p>Left tooltip</p>
                                </TooltipContent>
                            </Tooltip>
                        </>
                    }
                    code={`<Tooltip>
    <TooltipTrigger asChild>
        <Button>Top</Button>
    </TooltipTrigger>
    <TooltipContent side="top">
        <p>Top tooltip</p>
    </TooltipContent>
</Tooltip>

// Other sides: "right", "bottom", "left"`}
                />
            </Section>
        </div>
    );
}
