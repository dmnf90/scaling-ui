import React, { useState } from 'react';
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarNav,
    SidebarNavItem,
    SidebarToggle,
    SidebarGroup,
    SidebarGroupLabel,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from '../../../src/index.js';
import { Home, Settings, Users, FileText, BarChart } from 'lucide-react';

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
        <div className={`flex flex-wrap gap-4 items-start p-6 border border-border rounded-lg ${className}`}>
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

export default function SidebarPage() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Sidebar</h1>
                <p className="text-lg text-muted-foreground">
                    A composable sidebar component with multiple variants: fixed, collapsible, and responsive.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarNav, SidebarNavItem } from 'scaling-ui';`} />
            </Section>

            <Section title="Fixed Sidebar (Default)">
                <Example
                    className="block"
                    preview={
                        <div className="flex h-[400px] w-full border border-border rounded-lg overflow-hidden">
                            <Sidebar variant="fixed">
                                <SidebarHeader>
                                    <h3 className="font-semibold">My App</h3>
                                </SidebarHeader>
                                <SidebarContent>
                                    <SidebarNav>
                                        <SidebarNavItem icon={Home} active>Dashboard</SidebarNavItem>
                                        <SidebarNavItem icon={Users}>Users</SidebarNavItem>
                                        <SidebarNavItem icon={FileText}>Documents</SidebarNavItem>
                                        <SidebarNavItem icon={Settings}>Settings</SidebarNavItem>
                                    </SidebarNav>
                                </SidebarContent>
                                <SidebarFooter>
                                    <p className="text-xs text-muted-foreground">v1.0.0</p>
                                </SidebarFooter>
                            </Sidebar>
                            <div className="flex-1 p-4 bg-background">
                                <h2 className="text-lg font-semibold mb-2">Main Content</h2>
                                <p className="text-sm text-muted-foreground">
                                    This is the main content area. The sidebar is fixed and cannot be collapsed.
                                </p>
                            </div>
                        </div>
                    }
                    code={`<Sidebar variant="fixed">
    <SidebarHeader>
        <h3 className="font-semibold">My App</h3>
    </SidebarHeader>
    <SidebarContent>
        <SidebarNav>
            <SidebarNavItem icon={Home} active>Dashboard</SidebarNavItem>
            <SidebarNavItem icon={Users}>Users</SidebarNavItem>
            <SidebarNavItem icon={FileText}>Documents</SidebarNavItem>
            <SidebarNavItem icon={Settings}>Settings</SidebarNavItem>
        </SidebarNav>
    </SidebarContent>
    <SidebarFooter>
        <p className="text-xs text-muted-foreground">v1.0.0</p>
    </SidebarFooter>
</Sidebar>`}
                />
            </Section>

            <Section title="Collapsible Sidebar">
                <Example
                    className="block"
                    preview={
                        <div className="flex h-[400px] w-full border border-border rounded-lg overflow-hidden">
                            <Sidebar
                                variant="collapsible"
                                collapsed={collapsed}
                                onCollapsedChange={setCollapsed}
                            >
                                <SidebarHeader>
                                    {!collapsed && <h3 className="font-semibold">My App</h3>}
                                    <SidebarToggle />
                                </SidebarHeader>
                                <SidebarContent>
                                    <SidebarNav>
                                        <SidebarNavItem icon={Home} active>Dashboard</SidebarNavItem>
                                        <SidebarNavItem icon={Users}>Users</SidebarNavItem>
                                        <SidebarNavItem icon={FileText}>Documents</SidebarNavItem>
                                        <SidebarNavItem icon={BarChart}>Analytics</SidebarNavItem>
                                        <SidebarNavItem icon={Settings}>Settings</SidebarNavItem>
                                    </SidebarNav>
                                </SidebarContent>
                            </Sidebar>
                            <div className="flex-1 p-4 bg-background">
                                <h2 className="text-lg font-semibold mb-2">Main Content</h2>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Click the toggle button in the sidebar header to collapse/expand.
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Current state: {collapsed ? 'Collapsed' : 'Expanded'}
                                </p>
                            </div>
                        </div>
                    }
                    code={`const [collapsed, setCollapsed] = useState(false);

<Sidebar
    variant="collapsible"
    collapsed={collapsed}
    onCollapsedChange={setCollapsed}
>
    <SidebarHeader>
        {!collapsed && <h3 className="font-semibold">My App</h3>}
        <SidebarToggle />
    </SidebarHeader>
    <SidebarContent>
        <SidebarNav>
            <SidebarNavItem icon={Home} active>Dashboard</SidebarNavItem>
            <SidebarNavItem icon={Users}>Users</SidebarNavItem>
            <SidebarNavItem icon={Settings}>Settings</SidebarNavItem>
        </SidebarNav>
    </SidebarContent>
</Sidebar>`}
                />
            </Section>

            <Section title="With Groups">
                <Example
                    className="block"
                    preview={
                        <div className="flex h-[400px] w-full border border-border rounded-lg overflow-hidden">
                            <Sidebar variant="fixed">
                                <SidebarHeader>
                                    <h3 className="font-semibold">Dashboard</h3>
                                </SidebarHeader>
                                <SidebarContent>
                                    <SidebarGroup>
                                        <SidebarGroupLabel>General</SidebarGroupLabel>
                                        <SidebarNav>
                                            <SidebarNavItem icon={Home} active>Home</SidebarNavItem>
                                            <SidebarNavItem icon={BarChart}>Analytics</SidebarNavItem>
                                        </SidebarNav>
                                    </SidebarGroup>
                                    <SidebarGroup>
                                        <SidebarGroupLabel>Management</SidebarGroupLabel>
                                        <SidebarNav>
                                            <SidebarNavItem icon={Users}>Users</SidebarNavItem>
                                            <SidebarNavItem icon={FileText}>Documents</SidebarNavItem>
                                        </SidebarNav>
                                    </SidebarGroup>
                                    <SidebarGroup>
                                        <SidebarGroupLabel>Settings</SidebarGroupLabel>
                                        <SidebarNav>
                                            <SidebarNavItem icon={Settings}>Preferences</SidebarNavItem>
                                        </SidebarNav>
                                    </SidebarGroup>
                                </SidebarContent>
                            </Sidebar>
                            <div className="flex-1 p-4 bg-background">
                                <h2 className="text-lg font-semibold mb-2">Main Content</h2>
                                <p className="text-sm text-muted-foreground">
                                    Navigation items organized into groups with labels.
                                </p>
                            </div>
                        </div>
                    }
                    code={`<Sidebar variant="fixed">
    <SidebarHeader>
        <h3 className="font-semibold">Dashboard</h3>
    </SidebarHeader>
    <SidebarContent>
        <SidebarGroup>
            <SidebarGroupLabel>General</SidebarGroupLabel>
            <SidebarNav>
                <SidebarNavItem icon={Home} active>Home</SidebarNavItem>
                <SidebarNavItem icon={BarChart}>Analytics</SidebarNavItem>
            </SidebarNav>
        </SidebarGroup>
        <SidebarGroup>
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            <SidebarNav>
                <SidebarNavItem icon={Users}>Users</SidebarNavItem>
            </SidebarNav>
        </SidebarGroup>
    </SidebarContent>
</Sidebar>`}
                />
            </Section>

            <Section title="Responsive Sidebar">
                <p className="text-sm text-muted-foreground mb-4">
                    The responsive variant shows a drawer on mobile devices (with hamburger menu) and a fixed sidebar on desktop.
                    Try resizing your browser window to see it in action!
                </p>
                <CodeBlock code={`<Sidebar variant="responsive">
    <SidebarHeader>
        <h3 className="font-semibold">My App</h3>
    </SidebarHeader>
    <SidebarContent>
        <SidebarNav>
            <SidebarNavItem icon={Home} active>Dashboard</SidebarNavItem>
            <SidebarNavItem icon={Users}>Users</SidebarNavItem>
            <SidebarNavItem icon={Settings}>Settings</SidebarNavItem>
        </SidebarNav>
    </SidebarContent>
</Sidebar>

// The hamburger menu button is automatically rendered on mobile
// Click outside the sidebar to close it on mobile`} />
            </Section>
        </div>
    );
}
