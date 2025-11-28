import React from 'react';
import { Empty, Button, Tabs, TabsList, TabsTrigger, TabsContent } from '../../../src/index.js';
import { Inbox, FileSearch, Users, FolderOpen, ShoppingCart } from 'lucide-react';

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
        <div className={`flex flex-wrap gap-4 items-center justify-center p-6 border border-border rounded-lg ${className}`}>
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

export default function EmptyPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Empty</h1>
                <p className="text-lg text-muted-foreground">
                    Use the Empty component to display an empty state when there is no data to show.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Empty } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <p className="text-muted-foreground mb-4">
                    The Empty component displays a centered message with an icon, title, and description.
                </p>
                <Example
                    preview={
                        <Empty
                            title="No results found"
                            description="Try adjusting your search to find what you're looking for."
                        />
                    }
                    code={`<Empty
    title="No results found"
    description="Try adjusting your search to find what you're looking for."
/>`}
                />
            </Section>

            <Section title="Custom Icon">
                <p className="text-muted-foreground mb-4">
                    Pass a custom icon using the icon prop. The default icon is a Search icon from Lucide.
                </p>
                <Example
                    className="flex-col gap-8"
                    preview={
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                            <Empty
                                icon={<Inbox className="w-12 h-12" />}
                                title="Inbox is empty"
                                description="You have no new messages."
                            />
                            <Empty
                                icon={<FolderOpen className="w-12 h-12" />}
                                title="No files"
                                description="Upload files to get started."
                            />
                        </div>
                    }
                    code={`<Empty
    icon={<Inbox className="w-12 h-12" />}
    title="Inbox is empty"
    description="You have no new messages."
/>

<Empty
    icon={<FolderOpen className="w-12 h-12" />}
    title="No files"
    description="Upload files to get started."
/>`}
                />
            </Section>

            <Section title="With Action">
                <p className="text-muted-foreground mb-4">
                    Add a call-to-action button using the action prop.
                </p>
                <Example
                    preview={
                        <Empty
                            icon={<Users className="w-12 h-12" />}
                            title="No team members"
                            description="Get started by inviting your first team member."
                            action={<Button>Invite Member</Button>}
                        />
                    }
                    code={`<Empty
    icon={<Users className="w-12 h-12" />}
    title="No team members"
    description="Get started by inviting your first team member."
    action={<Button>Invite Member</Button>}
/>`}
                />
            </Section>

            <Section title="Shopping Cart Example">
                <p className="text-muted-foreground mb-4">
                    A practical example for an empty shopping cart.
                </p>
                <Example
                    preview={
                        <Empty
                            icon={<ShoppingCart className="w-12 h-12" />}
                            title="Your cart is empty"
                            description="Looks like you haven't added anything to your cart yet."
                            action={
                                <Button variant="primary">
                                    Continue Shopping
                                </Button>
                            }
                        />
                    }
                    code={`<Empty
    icon={<ShoppingCart className="w-12 h-12" />}
    title="Your cart is empty"
    description="Looks like you haven't added anything to your cart yet."
    action={
        <Button variant="primary">
            Continue Shopping
        </Button>
    }
/>`}
                />
            </Section>

            <Section title="Search Results Example">
                <p className="text-muted-foreground mb-4">
                    An example for displaying no search results with multiple action options.
                </p>
                <Example
                    preview={
                        <Empty
                            icon={<FileSearch className="w-12 h-12" />}
                            title="No results for 'quantum computing'"
                            description="We couldn't find any matches. Try different keywords or check for typos."
                            action={
                                <div className="flex gap-2">
                                    <Button variant="outline">Clear Search</Button>
                                    <Button>Browse All</Button>
                                </div>
                            }
                        />
                    }
                    code={`<Empty
    icon={<FileSearch className="w-12 h-12" />}
    title="No results for 'quantum computing'"
    description="We couldn't find any matches. Try different keywords or check for typos."
    action={
        <div className="flex gap-2">
            <Button variant="outline">Clear Search</Button>
            <Button>Browse All</Button>
        </div>
    }
/>`}
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
                                <td className="p-4 font-mono text-sm">icon</td>
                                <td className="p-4 text-sm text-muted-foreground">ReactNode</td>
                                <td className="p-4 text-sm">&lt;Search /&gt;</td>
                                <td className="p-4 text-sm">Icon to display above the title</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">title</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Main heading text</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">description</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Supporting description text</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">action</td>
                                <td className="p-4 text-sm text-muted-foreground">ReactNode</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Action button or CTA element</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">className</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Additional CSS classes</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
