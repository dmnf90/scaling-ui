import React from 'react';
import {
    Item, ItemIcon, ItemContent, ItemTitle, ItemDescription, ItemActions,
    Button, Badge, Tabs, TabsList, TabsTrigger, TabsContent
} from '../../../src/index.js';
import { File, Folder, Image, MoreVertical, Star, Trash2, Edit, Download } from 'lucide-react';

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
        <div className={`p-6 border border-border rounded-lg ${className}`}>
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

export default function ItemPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Item</h1>
                <p className="text-lg text-muted-foreground">
                    A versatile list item component with icon, content, and actions.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Item, ItemIcon, ItemContent, ItemTitle, ItemDescription, ItemActions } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <p className="text-muted-foreground mb-4">
                    A simple item with icon, title, and description.
                </p>
                <Example
                    preview={
                        <div className="w-full max-w-md space-y-1">
                            <Item>
                                <ItemIcon>
                                    <File className="h-4 w-4" />
                                </ItemIcon>
                                <ItemContent>
                                    <ItemTitle>Document.pdf</ItemTitle>
                                    <ItemDescription>2.4 MB • Modified yesterday</ItemDescription>
                                </ItemContent>
                            </Item>
                            <Item>
                                <ItemIcon>
                                    <Image className="h-4 w-4" />
                                </ItemIcon>
                                <ItemContent>
                                    <ItemTitle>Photo.jpg</ItemTitle>
                                    <ItemDescription>1.2 MB • Modified 2 days ago</ItemDescription>
                                </ItemContent>
                            </Item>
                            <Item>
                                <ItemIcon>
                                    <Folder className="h-4 w-4" />
                                </ItemIcon>
                                <ItemContent>
                                    <ItemTitle>Projects</ItemTitle>
                                    <ItemDescription>12 items</ItemDescription>
                                </ItemContent>
                            </Item>
                        </div>
                    }
                    code={`<Item>
    <ItemIcon>
        <File className="h-4 w-4" />
    </ItemIcon>
    <ItemContent>
        <ItemTitle>Document.pdf</ItemTitle>
        <ItemDescription>2.4 MB • Modified yesterday</ItemDescription>
    </ItemContent>
</Item>`}
                />
            </Section>

            <Section title="Interactive">
                <p className="text-muted-foreground mb-4">
                    Add interactive prop for hover and focus states.
                </p>
                <Example
                    preview={
                        <div className="w-full max-w-md space-y-1">
                            <Item interactive>
                                <ItemIcon>
                                    <File className="h-4 w-4" />
                                </ItemIcon>
                                <ItemContent>
                                    <ItemTitle>Clickable item</ItemTitle>
                                    <ItemDescription>Hover to see the effect</ItemDescription>
                                </ItemContent>
                            </Item>
                            <Item interactive selected>
                                <ItemIcon>
                                    <File className="h-4 w-4" />
                                </ItemIcon>
                                <ItemContent>
                                    <ItemTitle>Selected item</ItemTitle>
                                    <ItemDescription>This item is selected</ItemDescription>
                                </ItemContent>
                            </Item>
                            <Item interactive>
                                <ItemIcon>
                                    <File className="h-4 w-4" />
                                </ItemIcon>
                                <ItemContent>
                                    <ItemTitle>Another clickable item</ItemTitle>
                                    <ItemDescription>Click to interact</ItemDescription>
                                </ItemContent>
                            </Item>
                        </div>
                    }
                    code={`<Item interactive>
    <ItemIcon>
        <File className="h-4 w-4" />
    </ItemIcon>
    <ItemContent>
        <ItemTitle>Clickable item</ItemTitle>
        <ItemDescription>Hover to see the effect</ItemDescription>
    </ItemContent>
</Item>

<Item interactive selected>
    <ItemIcon>
        <File className="h-4 w-4" />
    </ItemIcon>
    <ItemContent>
        <ItemTitle>Selected item</ItemTitle>
        <ItemDescription>This item is selected</ItemDescription>
    </ItemContent>
</Item>`}
                />
            </Section>

            <Section title="With Actions">
                <p className="text-muted-foreground mb-4">
                    Add action buttons to the item.
                </p>
                <Example
                    preview={
                        <div className="w-full max-w-md space-y-1">
                            <Item>
                                <ItemIcon>
                                    <File className="h-4 w-4" />
                                </ItemIcon>
                                <ItemContent>
                                    <ItemTitle>Report.xlsx</ItemTitle>
                                    <ItemDescription>3.1 MB • Modified today</ItemDescription>
                                </ItemContent>
                                <ItemActions>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </ItemActions>
                            </Item>
                            <Item>
                                <ItemIcon>
                                    <Image className="h-4 w-4" />
                                </ItemIcon>
                                <ItemContent>
                                    <ItemTitle>Banner.png</ItemTitle>
                                    <ItemDescription>856 KB • Modified last week</ItemDescription>
                                </ItemContent>
                                <ItemActions>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Star className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </ItemActions>
                            </Item>
                        </div>
                    }
                    code={`<Item>
    <ItemIcon>
        <File className="h-4 w-4" />
    </ItemIcon>
    <ItemContent>
        <ItemTitle>Report.xlsx</ItemTitle>
        <ItemDescription>3.1 MB • Modified today</ItemDescription>
    </ItemContent>
    <ItemActions>
        <Button variant="ghost" size="icon">
            <Download className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
        </Button>
    </ItemActions>
</Item>`}
                />
            </Section>

            <Section title="With Badge">
                <p className="text-muted-foreground mb-4">
                    Combine with Badge component to show status.
                </p>
                <Example
                    preview={
                        <div className="w-full max-w-md space-y-1">
                            <Item interactive>
                                <ItemIcon>
                                    <File className="h-4 w-4" />
                                </ItemIcon>
                                <ItemContent>
                                    <div className="flex items-center gap-2">
                                        <ItemTitle>Draft proposal</ItemTitle>
                                        <Badge variant="secondary">Draft</Badge>
                                    </div>
                                    <ItemDescription>Last edited 2 hours ago</ItemDescription>
                                </ItemContent>
                                <ItemActions>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </ItemActions>
                            </Item>
                            <Item interactive>
                                <ItemIcon>
                                    <File className="h-4 w-4" />
                                </ItemIcon>
                                <ItemContent>
                                    <div className="flex items-center gap-2">
                                        <ItemTitle>Final report</ItemTitle>
                                        <Badge variant="success">Complete</Badge>
                                    </div>
                                    <ItemDescription>Submitted yesterday</ItemDescription>
                                </ItemContent>
                                <ItemActions>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </ItemActions>
                            </Item>
                            <Item interactive>
                                <ItemIcon>
                                    <File className="h-4 w-4" />
                                </ItemIcon>
                                <ItemContent>
                                    <div className="flex items-center gap-2">
                                        <ItemTitle>Review notes</ItemTitle>
                                        <Badge variant="warning">Pending</Badge>
                                    </div>
                                    <ItemDescription>Waiting for approval</ItemDescription>
                                </ItemContent>
                            </Item>
                        </div>
                    }
                    code={`<Item interactive>
    <ItemIcon>
        <File className="h-4 w-4" />
    </ItemIcon>
    <ItemContent>
        <div className="flex items-center gap-2">
            <ItemTitle>Draft proposal</ItemTitle>
            <Badge variant="secondary">Draft</Badge>
        </div>
        <ItemDescription>Last edited 2 hours ago</ItemDescription>
    </ItemContent>
    <ItemActions>
        <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
        </Button>
    </ItemActions>
</Item>`}
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
                                <td className="p-4 font-mono text-sm">as</td>
                                <td className="p-4 text-sm text-muted-foreground">ElementType</td>
                                <td className="p-4 text-sm">'div'</td>
                                <td className="p-4 text-sm">Element type to render</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">interactive</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">false</td>
                                <td className="p-4 text-sm">Add hover/focus styles</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">selected</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">false</td>
                                <td className="p-4 text-sm">Selected state styling</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
