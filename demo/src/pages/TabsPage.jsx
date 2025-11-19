import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../src/index.js';

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
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-6">
            <code className="text-sm">{code}</code>
        </pre>
    );
}

function Demo({ children, className = '' }) {
    return (
        <div className={`flex flex-wrap gap-4 items-center p-6 border border-border rounded-lg mb-4 ${className}`}>
            {children}
        </div>
    );
}

export default function TabsPage() {
    const [controlledValue, setControlledValue] = useState('tab1');

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Tabs</h1>
                <p className="text-lg text-muted-foreground">
                    A set of layered sections of content, known as tab panels, that are displayed one at a time.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage (Uncontrolled)">
                <p className="text-muted-foreground mb-4">
                    Use defaultValue to create an uncontrolled tabs component.
                </p>
                <Demo className="flex-col items-stretch">
                    <Tabs defaultValue="account">
                        <TabsList>
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                            <div className="p-4 bg-muted rounded-md">
                                Make changes to your account here. Click on the tabs to see the content change.
                            </div>
                        </TabsContent>
                        <TabsContent value="password">
                            <div className="p-4 bg-muted rounded-md">
                                Change your password here. This is the password tab content.
                            </div>
                        </TabsContent>
                        <TabsContent value="settings">
                            <div className="p-4 bg-muted rounded-md">
                                Manage your settings here. This is the settings tab content.
                            </div>
                        </TabsContent>
                    </Tabs>
                </Demo>
                <CodeBlock
                    code={`<Tabs defaultValue="account">
    <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
    </TabsList>
    <TabsContent value="account">
        Account content here
    </TabsContent>
    <TabsContent value="password">
        Password content here
    </TabsContent>
    <TabsContent value="settings">
        Settings content here
    </TabsContent>
</Tabs>`}
                />
            </Section>

            <Section title="Controlled">
                <p className="text-muted-foreground mb-4">
                    Use value and onValueChange for controlled tabs. Current tab: <strong>{controlledValue}</strong>
                </p>
                <Demo className="flex-col items-stretch">
                    <Tabs value={controlledValue} onValueChange={setControlledValue}>
                        <TabsList>
                            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tab1">
                            <div className="p-4 bg-muted rounded-md">This is controlled tab 1</div>
                        </TabsContent>
                        <TabsContent value="tab2">
                            <div className="p-4 bg-muted rounded-md">This is controlled tab 2</div>
                        </TabsContent>
                        <TabsContent value="tab3">
                            <div className="p-4 bg-muted rounded-md">This is controlled tab 3</div>
                        </TabsContent>
                    </Tabs>
                </Demo>
                <CodeBlock
                    code={`const [value, setValue] = useState('tab1');

<Tabs value={value} onValueChange={setValue}>
    <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
    </TabsList>
    <TabsContent value="tab1">Content 1</TabsContent>
    <TabsContent value="tab2">Content 2</TabsContent>
    <TabsContent value="tab3">Content 3</TabsContent>
</Tabs>`}
                />
            </Section>

            <Section title="Variants">
                <p className="text-muted-foreground mb-4">
                    Three different visual styles are available.
                </p>

                <h3 className="text-lg font-semibold mb-2">Default</h3>
                <Demo className="flex-col items-stretch mb-6">
                    <Tabs defaultValue="one">
                        <TabsList variant="default">
                            <TabsTrigger value="one" variant="default">One</TabsTrigger>
                            <TabsTrigger value="two" variant="default">Two</TabsTrigger>
                            <TabsTrigger value="three" variant="default">Three</TabsTrigger>
                        </TabsList>
                        <TabsContent value="one">
                            <div className="p-4 bg-muted rounded-md">Default variant - Tab One</div>
                        </TabsContent>
                        <TabsContent value="two">
                            <div className="p-4 bg-muted rounded-md">Default variant - Tab Two</div>
                        </TabsContent>
                        <TabsContent value="three">
                            <div className="p-4 bg-muted rounded-md">Default variant - Tab Three</div>
                        </TabsContent>
                    </Tabs>
                </Demo>

                <h3 className="text-lg font-semibold mb-2">Pills</h3>
                <Demo className="flex-col items-stretch mb-6">
                    <Tabs defaultValue="one">
                        <TabsList variant="pills">
                            <TabsTrigger value="one" variant="pills">One</TabsTrigger>
                            <TabsTrigger value="two" variant="pills">Two</TabsTrigger>
                            <TabsTrigger value="three" variant="pills">Three</TabsTrigger>
                        </TabsList>
                        <TabsContent value="one">
                            <div className="p-4 bg-muted rounded-md">Pills variant - Tab One</div>
                        </TabsContent>
                        <TabsContent value="two">
                            <div className="p-4 bg-muted rounded-md">Pills variant - Tab Two</div>
                        </TabsContent>
                        <TabsContent value="three">
                            <div className="p-4 bg-muted rounded-md">Pills variant - Tab Three</div>
                        </TabsContent>
                    </Tabs>
                </Demo>

                <h3 className="text-lg font-semibold mb-2">Underline</h3>
                <Demo className="flex-col items-stretch">
                    <Tabs defaultValue="one">
                        <TabsList variant="underline">
                            <TabsTrigger value="one" variant="underline">One</TabsTrigger>
                            <TabsTrigger value="two" variant="underline">Two</TabsTrigger>
                            <TabsTrigger value="three" variant="underline">Three</TabsTrigger>
                        </TabsList>
                        <TabsContent value="one">
                            <div className="p-4 bg-muted rounded-md">Underline variant - Tab One</div>
                        </TabsContent>
                        <TabsContent value="two">
                            <div className="p-4 bg-muted rounded-md">Underline variant - Tab Two</div>
                        </TabsContent>
                        <TabsContent value="three">
                            <div className="p-4 bg-muted rounded-md">Underline variant - Tab Three</div>
                        </TabsContent>
                    </Tabs>
                </Demo>

                <CodeBlock
                    code={`<TabsList variant="default">
    <TabsTrigger value="one" variant="default">One</TabsTrigger>
</TabsList>

<TabsList variant="pills">
    <TabsTrigger value="one" variant="pills">One</TabsTrigger>
</TabsList>

<TabsList variant="underline">
    <TabsTrigger value="one" variant="underline">One</TabsTrigger>
</TabsList>`}
                />
            </Section>

            <Section title="Props">
                <div className="border border-border rounded-lg overflow-hidden mb-6">
                    <table className="w-full">
                        <thead className="bg-muted">
                            <tr>
                                <th className="text-left p-4 font-semibold">Component</th>
                                <th className="text-left p-4 font-semibold">Prop</th>
                                <th className="text-left p-4 font-semibold">Type</th>
                                <th className="text-left p-4 font-semibold">Default</th>
                                <th className="text-left p-4 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">Tabs</td>
                                <td className="p-4 font-mono text-sm">defaultValue</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Default active tab (uncontrolled)</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">Tabs</td>
                                <td className="p-4 font-mono text-sm">value</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Active tab value (controlled)</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">Tabs</td>
                                <td className="p-4 font-mono text-sm">onValueChange</td>
                                <td className="p-4 text-sm text-muted-foreground">function</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Callback when tab changes</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">TabsList</td>
                                <td className="p-4 font-mono text-sm">variant</td>
                                <td className="p-4 text-sm text-muted-foreground">'default' | 'pills' | 'underline'</td>
                                <td className="p-4 text-sm">'default'</td>
                                <td className="p-4 text-sm">Visual style variant</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">TabsTrigger</td>
                                <td className="p-4 font-mono text-sm">value</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Unique value for this tab</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">TabsTrigger</td>
                                <td className="p-4 font-mono text-sm">variant</td>
                                <td className="p-4 text-sm text-muted-foreground">'default' | 'pills' | 'underline'</td>
                                <td className="p-4 text-sm">'default'</td>
                                <td className="p-4 text-sm">Must match TabsList variant</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">TabsContent</td>
                                <td className="p-4 font-mono text-sm">value</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Value matching TabsTrigger</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
