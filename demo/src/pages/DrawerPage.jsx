import React from 'react';
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
    Button,
    Label,
    Input
} from '../../../src/index.js';
import { Section, Demo, Example, CodeBlock } from '../components';

export default function DrawerPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Drawer</h1>
                <p className="text-lg text-muted-foreground">
                    A panel that slides in from the edge of the screen.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from 'scaling-ui';`} />
            </Section>

            <Section title="From Right (Default)">
                <Example
                    preview={
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button variant="outline">Open Drawer</Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerClose />
                                <DrawerHeader>
                                    <DrawerTitle>Drawer Title</DrawerTitle>
                                    <DrawerDescription>
                                        This drawer slides in from the right side.
                                    </DrawerDescription>
                                </DrawerHeader>
                                <div className="p-6">
                                    <p className="text-sm text-muted-foreground">
                                        Drawer content goes here.
                                    </p>
                                </div>
                                <DrawerFooter>
                                    <Button>Submit</Button>
                                    <DrawerClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    }
                    code={`<Drawer>
    <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
    </DrawerTrigger>
    <DrawerContent>
        <DrawerClose />
        <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
            <DrawerDescription>
                This drawer slides in from the right side.
            </DrawerDescription>
        </DrawerHeader>
        <div className="p-6">
            <p>Drawer content goes here.</p>
        </div>
        <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
            </DrawerClose>
        </DrawerFooter>
    </DrawerContent>
</Drawer>`}
                />
            </Section>

            <Section title="Different Sides">
                <Example
                    className="gap-2"
                    preview={
                        <>
                            <Drawer>
                                <DrawerTrigger asChild>
                                    <Button variant="outline" size="sm">Top</Button>
                                </DrawerTrigger>
                                <DrawerContent side="top">
                                    <DrawerClose />
                                    <DrawerHeader>
                                        <DrawerTitle>Top Drawer</DrawerTitle>
                                    </DrawerHeader>
                                    <div className="p-6">Content from top</div>
                                </DrawerContent>
                            </Drawer>
                            <Drawer>
                                <DrawerTrigger asChild>
                                    <Button variant="outline" size="sm">Left</Button>
                                </DrawerTrigger>
                                <DrawerContent side="left">
                                    <DrawerClose />
                                    <DrawerHeader>
                                        <DrawerTitle>Left Drawer</DrawerTitle>
                                    </DrawerHeader>
                                    <div className="p-6">Content from left</div>
                                </DrawerContent>
                            </Drawer>
                            <Drawer>
                                <DrawerTrigger asChild>
                                    <Button variant="outline" size="sm">Bottom</Button>
                                </DrawerTrigger>
                                <DrawerContent side="bottom">
                                    <DrawerClose />
                                    <DrawerHeader>
                                        <DrawerTitle>Bottom Drawer</DrawerTitle>
                                    </DrawerHeader>
                                    <div className="p-6">Content from bottom</div>
                                </DrawerContent>
                            </Drawer>
                        </>
                    }
                    code={`// Top, Bottom, Left, or Right
<DrawerContent side="left">
    {/* ... */}
</DrawerContent>`}
                />
            </Section>

            <Section title="Responsive Drawer">
                <p className="text-muted-foreground mb-4">
                    Use <code className="text-sm bg-muted px-1 py-0.5 rounded">responsive</code> to automatically switch the drawer position on mobile. By default, right/left drawers become bottom drawers on mobile (under 640px).
                </p>
                <Example
                    className="gap-2"
                    preview={
                        <>
                            <Drawer>
                                <DrawerTrigger asChild>
                                    <Button variant="outline">Responsive (Right → Bottom)</Button>
                                </DrawerTrigger>
                                <DrawerContent side="right" responsive>
                                    <DrawerClose />
                                    <DrawerHeader>
                                        <DrawerTitle>Responsive Drawer</DrawerTitle>
                                        <DrawerDescription>
                                            On desktop, this appears from the right. On mobile, it slides up from the bottom.
                                        </DrawerDescription>
                                    </DrawerHeader>
                                    <div className="p-6">
                                        <p className="text-sm text-muted-foreground">
                                            Resize your browser to see the responsive behavior.
                                        </p>
                                    </div>
                                    <DrawerFooter>
                                        <DrawerClose asChild>
                                            <Button>Got it</Button>
                                        </DrawerClose>
                                    </DrawerFooter>
                                </DrawerContent>
                            </Drawer>
                            <Drawer>
                                <DrawerTrigger asChild>
                                    <Button variant="outline">Custom (Right → Top)</Button>
                                </DrawerTrigger>
                                <DrawerContent side="right" responsive responsiveSide="top">
                                    <DrawerClose />
                                    <DrawerHeader>
                                        <DrawerTitle>Custom Responsive</DrawerTitle>
                                        <DrawerDescription>
                                            This drawer appears from right on desktop and top on mobile.
                                        </DrawerDescription>
                                    </DrawerHeader>
                                    <div className="p-6">
                                        <p className="text-sm text-muted-foreground">
                                            Use responsiveSide to customize mobile behavior.
                                        </p>
                                    </div>
                                </DrawerContent>
                            </Drawer>
                        </>
                    }
                    code={`// Default: right/left → bottom on mobile
<DrawerContent side="right" responsive>
    {/* ... */}
</DrawerContent>

// Custom: right → top on mobile
<DrawerContent side="right" responsive responsiveSide="top">
    {/* ... */}
</DrawerContent>`}
                />
            </Section>
        </div>
    );
}
