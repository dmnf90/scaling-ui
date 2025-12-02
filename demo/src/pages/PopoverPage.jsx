import React from 'react';
import { Popover, PopoverTrigger, PopoverContent, Button } from '../../../src/index.js';
import { Section, Demo, Example, CodeBlock } from '../components';

export default function PopoverPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Popover</h1>
                <p className="text-lg text-muted-foreground">
                    Displays rich content in a portal, triggered by a button.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Popover, PopoverTrigger, PopoverContent } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <Example
                    className="flex-col items-center"
                    preview={
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline">Open popover</Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Dimensions</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Set the dimensions for the layer.
                                    </p>
                                </div>
                            </PopoverContent>
                        </Popover>
                    }
                    code={`<Popover>
    <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
    </PopoverTrigger>
    <PopoverContent>
        <div className="space-y-2">
            <h4 className="font-medium">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
                Set the dimensions for the layer.
            </p>
        </div>
    </PopoverContent>
</Popover>`}
                />
            </Section>

            <Section title="Alignment">
                <Example
                    className="flex-col items-center gap-4"
                    preview={
                        <>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline">Align Start</Button>
                                </PopoverTrigger>
                                <PopoverContent align="start">
                                    <p className="text-sm">Aligned to start</p>
                                </PopoverContent>
                            </Popover>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline">Align Center</Button>
                                </PopoverTrigger>
                                <PopoverContent align="center">
                                    <p className="text-sm">Aligned to center</p>
                                </PopoverContent>
                            </Popover>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline">Align End</Button>
                                </PopoverTrigger>
                                <PopoverContent align="end">
                                    <p className="text-sm">Aligned to end</p>
                                </PopoverContent>
                            </Popover>
                        </>
                    }
                    code={`<PopoverContent align="start">...</PopoverContent>
<PopoverContent align="center">...</PopoverContent>
<PopoverContent align="end">...</PopoverContent>`}
                />
            </Section>
        </div>
    );
}
