import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage as BreadcrumbCurrentPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from '../../../src/index.js';
import { Home, ArrowRight } from 'lucide-react';

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

export default function BreadcrumbPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Breadcrumb</h1>
                <p className="text-lg text-muted-foreground">
                    Displays the path to the current resource using a hierarchy of links.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <Example
                    preview={
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Components</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                <BreadcrumbCurrentPage>Breadcrumb</BreadcrumbCurrentPage>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    }
                    code={`<Breadcrumb>
    <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem>
        <BreadcrumbLink href="#">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem active>
        <BreadcrumbCurrentPage>Breadcrumb</BreadcrumbCurrentPage>
    </BreadcrumbItem>
</Breadcrumb>`}
                />
            </Section>

            <Section title="With Icons">
                <Example
                    preview={
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#" className="flex items-center gap-1.5">
                                    <Home className="h-4 w-4" />
                                    Home
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Library</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                <BreadcrumbCurrentPage>Data</BreadcrumbCurrentPage>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    }
                    code={`<Breadcrumb>
    <BreadcrumbItem>
        <BreadcrumbLink href="#" className="flex items-center gap-1.5">
            <Home className="h-4 w-4" />
            Home
        </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem>
        <BreadcrumbLink href="#">Library</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem active>
        <BreadcrumbCurrentPage>Data</BreadcrumbCurrentPage>
    </BreadcrumbItem>
</Breadcrumb>`}
                />
            </Section>

            <Section title="Separator Variants">
                <Example
                    className="flex-col items-start gap-4"
                    preview={
                        <>
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">Chevron (default)</p>
                                <Breadcrumb>
                                    <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                                    <BreadcrumbItem><BreadcrumbLink href="#">Docs</BreadcrumbLink></BreadcrumbItem>
                                    <BreadcrumbItem active><BreadcrumbCurrentPage>Breadcrumb</BreadcrumbCurrentPage></BreadcrumbItem>
                                </Breadcrumb>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">Slash</p>
                                <Breadcrumb separator="slash">
                                    <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                                    <BreadcrumbItem><BreadcrumbLink href="#">Docs</BreadcrumbLink></BreadcrumbItem>
                                    <BreadcrumbItem active><BreadcrumbCurrentPage>Breadcrumb</BreadcrumbCurrentPage></BreadcrumbItem>
                                </Breadcrumb>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">Dot</p>
                                <Breadcrumb separator="dot">
                                    <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                                    <BreadcrumbItem><BreadcrumbLink href="#">Docs</BreadcrumbLink></BreadcrumbItem>
                                    <BreadcrumbItem active><BreadcrumbCurrentPage>Breadcrumb</BreadcrumbCurrentPage></BreadcrumbItem>
                                </Breadcrumb>
                            </div>
                        </>
                    }
                    code={`// Chevron (default)
<Breadcrumb>...</Breadcrumb>

// Slash
<Breadcrumb separator="slash">...</Breadcrumb>

// Dot
<Breadcrumb separator="dot">...</Breadcrumb>`}
                />
            </Section>

            <Section title="Custom Separators">
                <Example
                    className="flex-col items-start gap-4"
                    preview={
                        <>
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">Custom Icon</p>
                                <Breadcrumb>
                                    <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                                    <BreadcrumbSeparator><ArrowRight className="h-4 w-4" /></BreadcrumbSeparator>
                                    <BreadcrumbItem><BreadcrumbLink href="#">Docs</BreadcrumbLink></BreadcrumbItem>
                                    <BreadcrumbSeparator><ArrowRight className="h-4 w-4" /></BreadcrumbSeparator>
                                    <BreadcrumbItem active><BreadcrumbCurrentPage>Breadcrumb</BreadcrumbCurrentPage></BreadcrumbItem>
                                </Breadcrumb>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">Emoji Separator</p>
                                <Breadcrumb>
                                    <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                                    <BreadcrumbSeparator>👉</BreadcrumbSeparator>
                                    <BreadcrumbItem><BreadcrumbLink href="#">Docs</BreadcrumbLink></BreadcrumbItem>
                                    <BreadcrumbSeparator>👉</BreadcrumbSeparator>
                                    <BreadcrumbItem active><BreadcrumbCurrentPage>Breadcrumb</BreadcrumbCurrentPage></BreadcrumbItem>
                                </Breadcrumb>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">Custom Text</p>
                                <Breadcrumb>
                                    <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                                    <BreadcrumbSeparator className="font-bold">|</BreadcrumbSeparator>
                                    <BreadcrumbItem><BreadcrumbLink href="#">Docs</BreadcrumbLink></BreadcrumbItem>
                                    <BreadcrumbSeparator className="font-bold">|</BreadcrumbSeparator>
                                    <BreadcrumbItem active><BreadcrumbCurrentPage>Breadcrumb</BreadcrumbCurrentPage></BreadcrumbItem>
                                </Breadcrumb>
                            </div>
                        </>
                    }
                    code={`import { ArrowRight } from 'lucide-react';

// Custom Icon
<Breadcrumb>
    <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator><ArrowRight className="h-4 w-4" /></BreadcrumbSeparator>
    <BreadcrumbItem><BreadcrumbLink href="#">Docs</BreadcrumbLink></BreadcrumbItem>
</Breadcrumb>

// Emoji Separator
<Breadcrumb>
    <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator>→</BreadcrumbSeparator>
    <BreadcrumbItem><BreadcrumbLink href="#">Docs</BreadcrumbLink></BreadcrumbItem>
</Breadcrumb>

// Custom Text
<Breadcrumb>
    <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator className="font-bold">|</BreadcrumbSeparator>
    <BreadcrumbItem><BreadcrumbLink href="#">Docs</BreadcrumbLink></BreadcrumbItem>
</Breadcrumb>`}
                />
            </Section>

            <Section title="With Ellipsis">
                <Example
                    preview={
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbEllipsis />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Components</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                <BreadcrumbCurrentPage>Breadcrumb</BreadcrumbCurrentPage>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    }
                    code={`<Breadcrumb>
    <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbEllipsis />
    <BreadcrumbItem>
        <BreadcrumbLink href="#">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbItem active>
        <BreadcrumbCurrentPage>Breadcrumb</BreadcrumbCurrentPage>
    </BreadcrumbItem>
</Breadcrumb>`}
                />
            </Section>
        </div>
    );
}
