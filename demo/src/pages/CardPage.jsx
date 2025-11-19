import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Tabs, TabsList, TabsTrigger, TabsContent } from '../../../src/index.js';

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

export default function CardPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Card</h1>
                <p className="text-lg text-muted-foreground">
                    Displays a card with header, content, and footer.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Card">
                <p className="text-muted-foreground mb-4">
                    A simple card with all sub-components.
                </p>
                <Example
                    className="items-stretch justify-start"
                    preview={
                        <Card className="w-[350px]">
                            <CardHeader>
                                <CardTitle>Create project</CardTitle>
                                <CardDescription>Deploy your new project in one-click.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm">Your project will be deployed to the cloud.</p>
                            </CardContent>
                            <CardFooter className="gap-2">
                                <Button variant="outline" className="flex-1">Cancel</Button>
                                <Button className="flex-1">Deploy</Button>
                            </CardFooter>
                        </Card>
                    }
                    code={`<Card className="w-[350px]">
    <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
    </CardHeader>
    <CardContent>
        <p>Your project will be deployed to the cloud.</p>
    </CardContent>
    <CardFooter className="gap-2">
        <Button variant="outline" className="flex-1">Cancel</Button>
        <Button className="flex-1">Deploy</Button>
    </CardFooter>
</Card>`}
                />
            </Section>

            <Section title="Components">
                <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-muted">
                            <tr>
                                <th className="text-left p-4 font-semibold">Component</th>
                                <th className="text-left p-4 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">Card</td>
                                <td className="p-4 text-sm">The main container</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">CardHeader</td>
                                <td className="p-4 text-sm">Container for title and description</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">CardTitle</td>
                                <td className="p-4 text-sm">The card title</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">CardDescription</td>
                                <td className="p-4 text-sm">The card description</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">CardContent</td>
                                <td className="p-4 text-sm">The main card content</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">CardFooter</td>
                                <td className="p-4 text-sm">The card footer</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
