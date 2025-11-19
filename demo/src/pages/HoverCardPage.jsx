import React from 'react';
import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
    Button,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Avatar
} from '../../../src/index.js';
import { Calendar, User } from 'lucide-react';

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

export default function HoverCardPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Hover Card</h1>
                <p className="text-lg text-muted-foreground">
                    A rich content popup that appears on hover, perfect for displaying user profiles, previews, and additional information.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { HoverCard, HoverCardTrigger, HoverCardContent } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <Example
                    preview={
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <Button variant="link">@username</Button>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <div className="flex flex-col gap-2">
                                    <h4 className="text-sm font-semibold">@username</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Software developer and open source contributor.
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>Joined December 2021</span>
                                    </div>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    }
                    code={`<HoverCard>
    <HoverCardTrigger asChild>
        <Button variant="link">@username</Button>
    </HoverCardTrigger>
    <HoverCardContent>
        <div className="flex flex-col gap-2">
            <h4 className="text-sm font-semibold">@username</h4>
            <p className="text-sm text-muted-foreground">
                Software developer and open source contributor.
            </p>
        </div>
    </HoverCardContent>
</HoverCard>`}
                />
            </Section>

            <Section title="With User Profile">
                <Example
                    preview={
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <Button variant="link" className="font-semibold">
                                    <User className="h-4 w-4 mr-2" />
                                    Hover for profile
                                </Button>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                <div className="flex gap-4">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <User className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <h4 className="text-sm font-semibold">Sarah Chen</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Product Designer at Tech Corp
                                        </p>
                                        <div className="flex gap-4 text-xs text-muted-foreground pt-2">
                                            <div>
                                                <span className="font-semibold text-foreground">156</span> Following
                                            </div>
                                            <div>
                                                <span className="font-semibold text-foreground">2.4k</span> Followers
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    }
                    code={`<HoverCard>
    <HoverCardTrigger asChild>
        <Button variant="link">Hover for profile</Button>
    </HoverCardTrigger>
    <HoverCardContent>
        <div className="flex gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10">
                {/* Avatar */}
            </div>
            <div className="flex-1 space-y-1">
                <h4>Sarah Chen</h4>
                <p>Product Designer at Tech Corp</p>
                <div className="flex gap-4">
                    <div><span>156</span> Following</div>
                    <div><span>2.4k</span> Followers</div>
                </div>
            </div>
        </div>
    </HoverCardContent>
</HoverCard>`}
                />
            </Section>

            <Section title="Different Sides">
                <Example
                    className="gap-6 justify-center"
                    preview={
                        <>
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <Button variant="outline" size="sm">Top</Button>
                                </HoverCardTrigger>
                                <HoverCardContent side="top">
                                    <p className="text-sm">This appears on top</p>
                                </HoverCardContent>
                            </HoverCard>
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <Button variant="outline" size="sm">Right</Button>
                                </HoverCardTrigger>
                                <HoverCardContent side="right">
                                    <p className="text-sm">This appears on the right</p>
                                </HoverCardContent>
                            </HoverCard>
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <Button variant="outline" size="sm">Bottom</Button>
                                </HoverCardTrigger>
                                <HoverCardContent side="bottom">
                                    <p className="text-sm">This appears on bottom</p>
                                </HoverCardContent>
                            </HoverCard>
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <Button variant="outline" size="sm">Left</Button>
                                </HoverCardTrigger>
                                <HoverCardContent side="left">
                                    <p className="text-sm">This appears on the left</p>
                                </HoverCardContent>
                            </HoverCard>
                        </>
                    }
                    code={`// Use side prop: "top", "right", "bottom", "left"
<HoverCardContent side="top">
    {/* Content */}
</HoverCardContent>`}
                />
            </Section>

            <Section title="Custom Delay">
                <Example
                    preview={
                        <div className="flex gap-4">
                            <HoverCard openDelay={200}>
                                <HoverCardTrigger asChild>
                                    <Button variant="outline" size="sm">Fast (200ms)</Button>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <p className="text-sm">Opens quickly after 200ms</p>
                                </HoverCardContent>
                            </HoverCard>
                            <HoverCard openDelay={1000}>
                                <HoverCardTrigger asChild>
                                    <Button variant="outline" size="sm">Slow (1000ms)</Button>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <p className="text-sm">Takes 1 second to open</p>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    }
                    code={`<HoverCard openDelay={200}>
    <HoverCardTrigger asChild>
        <Button>Fast</Button>
    </HoverCardTrigger>
    <HoverCardContent>
        <p>Opens quickly</p>
    </HoverCardContent>
</HoverCard>`}
                />
            </Section>
        </div>
    );
}
