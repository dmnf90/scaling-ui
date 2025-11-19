import React, { useState } from 'react';
import {
    Sidebar,
    SidebarProvider,
    SidebarLayout,
    SidebarInset,
    SidebarTrigger,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarNav,
    SidebarNavItem,
    SidebarToggle,
    SidebarGroup,
    SidebarGroupLabel,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from '../../../src/index.js';
import { Home, Settings, Users, FileText, BarChart, PanelLeftClose, PanelLeftOpen, Layers } from 'lucide-react';

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

function ResponsiveSimulator() {
    const [viewport, setViewport] = useState('mobile');

    const viewports = {
        mobile: { width: 375, label: 'Mobile' },
        tablet: { width: 768, label: 'Tablet' },
        desktop: { width: 1024, label: 'Desktop' }
    };

    return (
        <div>
            {/* Viewport toggle buttons */}
            <div className="flex gap-2 mb-6 justify-center">
                {Object.entries(viewports).map(([key, { label }]) => (
                    <button
                        key={key}
                        onClick={() => setViewport(key)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            viewport === key
                                ? 'bg-primary text-primary-foreground shadow-md'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                    >
                        {label}
                        <span className="ml-2 text-xs opacity-70">{viewports[key].width}px</span>
                    </button>
                ))}
            </div>

            {/* Simulated viewport container */}
            <div className="flex justify-center">
                <div
                    className={`viewport-${viewport} border-4 border-gray-600 rounded-xl overflow-hidden transition-all duration-300`}
                    style={{ width: `${viewports[viewport].width}px`, maxWidth: '100%' }}
                >
                    <SidebarProvider defaultOpen={false}>
                        <SidebarLayout className="h-[600px]">
                            <Sidebar variant="responsive" className="bg-gray-50">
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
                            <SidebarInset>
                                <div className="p-4">
                                    <div className="mb-4">
                                        <SidebarTrigger className="lg:hidden" />
                                    </div>
                                    <h2 className="text-lg font-semibold mb-2">{viewports[viewport].label} View</h2>
                                    <p className="text-sm text-muted-foreground">
                                        {viewport === 'mobile' && 'Sidebar appears as a drawer. Click the menu button to open.'}
                                        {viewport === 'tablet' && 'Sidebar appears as a drawer on tablet size.'}
                                        {viewport === 'desktop' && 'Sidebar is always visible and cannot be hidden.'}
                                    </p>
                                </div>
                            </SidebarInset>
                        </SidebarLayout>
                    </SidebarProvider>
                </div>
            </div>

            {/* CSS overrides to force responsive behavior based on container, not viewport */}
            <style>{`
                /* Mobile viewport - force drawer behavior */
                .viewport-mobile aside {
                    position: absolute !important;
                }
                /* Override transforms based on actual open/closed state */
                .viewport-mobile aside.-translate-x-full {
                    transform: translateX(-100%) !important;
                }
                .viewport-mobile aside.translate-x-0 {
                    transform: translateX(0) !important;
                }
                .viewport-mobile .lg\\:hidden {
                    display: inline-flex !important;
                }

                /* Tablet viewport - same as mobile */
                .viewport-tablet aside {
                    position: absolute !important;
                }
                .viewport-tablet aside.-translate-x-full {
                    transform: translateX(-100%) !important;
                }
                .viewport-tablet aside.translate-x-0 {
                    transform: translateX(0) !important;
                }
                .viewport-tablet .lg\\:hidden {
                    display: inline-flex !important;
                }

                /* Desktop viewport - force sidebar always visible */
                .viewport-desktop aside {
                    position: relative !important;
                    transform: translateX(0) !important;
                }
                .viewport-desktop .lg\\:hidden {
                    display: none !important;
                }
            `}</style>
        </div>
    );
}

export default function SidebarPage() {
    const [collapsed1, setCollapsed1] = useState(false);
    const [collapsed2, setCollapsed2] = useState(false);

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Sidebar</h1>
                <p className="text-lg text-muted-foreground">
                    A composable sidebar component with multiple variants: fixed, collapsible, and responsive.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import {
    Sidebar,
    SidebarProvider,
    SidebarLayout,
    SidebarInset,
    SidebarTrigger,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarNav,
    SidebarNavItem
} from 'scaling-ui';`} />
            </Section>

            <Section title="Fixed Sidebar (Default)">
                <Example
                    className="block"
                    preview={
                        <SidebarProvider>
                            <SidebarLayout className="h-[400px] border border-border rounded-lg overflow-hidden">
                                <Sidebar variant="fixed" className="bg-gray-50">
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
                                <SidebarInset>
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold mb-2">Main Content</h2>
                                        <p className="text-sm text-muted-foreground">
                                            This is the main content area. The sidebar is fixed and cannot be collapsed.
                                        </p>
                                    </div>
                                </SidebarInset>
                            </SidebarLayout>
                        </SidebarProvider>
                    }
                    code={`<SidebarProvider>
    <SidebarLayout className="h-[400px]">
        <Sidebar variant="fixed" className="bg-gray-50">
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
        <SidebarInset>
            <div className="p-4">
                <h2>Main Content</h2>
                <p>This is the main content area.</p>
            </div>
        </SidebarInset>
    </SidebarLayout>
</SidebarProvider>`}
                />
            </Section>

            <Section title="Collapsible Sidebar">
                <Example
                    className="block"
                    preview={
                        <div className="flex h-[400px] w-full border border-border rounded-lg overflow-hidden">
                            <Sidebar
                                variant="collapsible"
                                collapsed={collapsed1}
                                onCollapsedChange={setCollapsed1}
                                className="bg-gray-50"
                            >
                                <SidebarHeader>
                                    {!collapsed1 && <h3 className="font-semibold">My App</h3>}
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
                                    Current state: {collapsed1 ? 'Collapsed' : 'Expanded'}
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

            <Section title="Collapsible Sidebar with External Toggle">
                <Example
                    className="block"
                    preview={
                        <div className="flex h-[400px] w-full border border-border rounded-lg overflow-hidden">
                            <Sidebar
                                variant="collapsible"
                                collapsed={collapsed2}
                                onCollapsedChange={setCollapsed2}
                                className="bg-gray-50"
                            >
                                <SidebarHeader>
                                    <div className="flex items-center gap-2 h-8">
                                        <Layers className="h-6 w-6 shrink-0 text-primary" />
                                        {!collapsed2 && <h3 className="font-semibold">My App</h3>}
                                    </div>
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
                            <div className="flex-1 bg-background">
                                <div className="border-b border-border p-4">
                                    <div className="flex items-center gap-4 h-8">
                                        <button
                                            onClick={() => setCollapsed2(!collapsed2)}
                                            className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                            aria-label={collapsed2 ? 'Expand sidebar' : 'Collapse sidebar'}
                                        >
                                            {collapsed2 ? (
                                                <PanelLeftOpen className="h-5 w-5" />
                                            ) : (
                                                <PanelLeftClose className="h-5 w-5" />
                                            )}
                                        </button>
                                        <Breadcrumb>
                                            <BreadcrumbItem>
                                                <BreadcrumbLink href="#">Home</BreadcrumbLink>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                <BreadcrumbPage>Analytics</BreadcrumbPage>
                                            </BreadcrumbItem>
                                        </Breadcrumb>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold mb-2">Main Content</h2>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Toggle button is in the content area (header), showing {collapsed2 ? 'PanelLeftOpen' : 'PanelLeftClose'} icon.
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        This pattern is common in applications where the toggle lives in the app header alongside breadcrumbs. The app logo remains visible when collapsed.
                                    </p>
                                </div>
                            </div>
                        </div>
                    }
                    code={`const [collapsed, setCollapsed] = useState(false);

<div className="flex">
    <Sidebar
        variant="collapsible"
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
    >
        <SidebarHeader>
            <div className="flex items-center gap-2">
                <Layers className="h-6 w-6 shrink-0 text-primary" />
                {!collapsed && <h3 className="font-semibold">My App</h3>}
            </div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarNav>
                <SidebarNavItem icon={Home} active>Dashboard</SidebarNavItem>
                <SidebarNavItem icon={Users}>Users</SidebarNavItem>
            </SidebarNav>
        </SidebarContent>
    </Sidebar>

    <div className="flex-1">
        {/* Header with toggle and breadcrumbs */}
        <div className="border-b p-4">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-2 hover:bg-accent rounded-md"
                >
                    {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
                </button>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="#">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
        </div>

        {/* Main content */}
        <div className="p-4">
            <h1>Content</h1>
        </div>
    </div>
</div>`}
                />
            </Section>

            <Section title="With Groups">
                <Example
                    className="block"
                    preview={
                        <div className="flex h-[400px] w-full border border-border rounded-lg overflow-hidden">
                            <Sidebar variant="fixed" className="bg-gray-50">
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
                                <SidebarFooter>
                                    <p className="text-xs text-muted-foreground">v1.0.0</p>
                                </SidebarFooter>
                            </Sidebar>
                            <div className="flex-1 p-4 bg-background">
                                <h2 className="text-lg font-semibold mb-2">Main Content</h2>
                                <p className="text-sm text-muted-foreground">
                                    Navigation items organized into groups with labels.
                                </p>
                            </div>
                        </div>
                    }
                    code={`<Sidebar variant="fixed" className="bg-gray-50">
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

            <Section title="Collapsible Groups">
                <Example
                    className="block"
                    preview={
                        <div className="flex h-[500px] w-full border border-border rounded-lg overflow-hidden">
                            <Sidebar variant="fixed" className="bg-gray-50">
                                <SidebarHeader>
                                    <h3 className="font-semibold">Dashboard</h3>
                                </SidebarHeader>
                                <SidebarContent>
                                    <SidebarGroup collapsible defaultOpen={true}>
                                        <SidebarGroupLabel>General</SidebarGroupLabel>
                                        <SidebarNav>
                                            <SidebarNavItem icon={Home} active>Home</SidebarNavItem>
                                            <SidebarNavItem icon={BarChart}>Analytics</SidebarNavItem>
                                        </SidebarNav>
                                    </SidebarGroup>
                                    <SidebarGroup collapsible defaultOpen={false}>
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
                                <h2 className="text-lg font-semibold mb-2">Collapsible Groups Demo</h2>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Click on group labels to expand/collapse them.
                                </p>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                    <li>• "General" group starts open</li>
                                    <li>• "Management" group starts closed</li>
                                    <li>• "Settings" group is not collapsible</li>
                                </ul>
                            </div>
                        </div>
                    }
                    code={`<Sidebar variant="fixed" className="bg-gray-50">
    <SidebarHeader>
        <h3 className="font-semibold">Dashboard</h3>
    </SidebarHeader>
    <SidebarContent>
        {/* Collapsible group - starts open */}
        <SidebarGroup collapsible defaultOpen={true}>
            <SidebarGroupLabel>General</SidebarGroupLabel>
            <SidebarNav>
                <SidebarNavItem icon={Home} active>Home</SidebarNavItem>
                <SidebarNavItem icon={BarChart}>Analytics</SidebarNavItem>
            </SidebarNav>
        </SidebarGroup>

        {/* Collapsible group - starts closed */}
        <SidebarGroup collapsible defaultOpen={false}>
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            <SidebarNav>
                <SidebarNavItem icon={Users}>Users</SidebarNavItem>
                <SidebarNavItem icon={FileText}>Documents</SidebarNavItem>
            </SidebarNav>
        </SidebarGroup>

        {/* Non-collapsible group */}
        <SidebarGroup>
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarNav>
                <SidebarNavItem icon={Settings}>Preferences</SidebarNavItem>
            </SidebarNav>
        </SidebarGroup>
    </SidebarContent>
</Sidebar>`}
                />
            </Section>

            <Section title="Responsive Behavior Simulator">
                <p className="text-sm text-muted-foreground mb-4">
                    Toggle between Mobile, Tablet, and Desktop viewports to see how the sidebar behaves at different screen sizes.
                    No browser resizing needed!
                </p>
                <Tabs defaultValue="preview" className="mb-4">
                    <TabsList>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                        <TabsTrigger value="code">Code</TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview">
                        <div className="p-6 border border-border rounded-lg">
                            <ResponsiveSimulator />
                        </div>
                    </TabsContent>
                    <TabsContent value="code">
                        <CodeBlock code={`// Basic responsive sidebar setup
<SidebarProvider defaultOpen={false}>
    <SidebarLayout>
        <Sidebar variant="responsive" className="bg-gray-50">
            <SidebarHeader>
                <h3>My App</h3>
            </SidebarHeader>
            <SidebarContent>
                <SidebarNav>
                    <SidebarNavItem icon={Home}>Dashboard</SidebarNavItem>
                    <SidebarNavItem icon={Users}>Users</SidebarNavItem>
                </SidebarNav>
            </SidebarContent>
        </Sidebar>
        <SidebarInset>
            <div className="p-4">
                <SidebarTrigger />  {/* Shows on mobile/tablet, hidden on desktop */}
                <h1>Main Content</h1>
            </div>
        </SidebarInset>
    </SidebarLayout>
</SidebarProvider>

/*
 * Responsive Breakpoints:
 * - Mobile (< 1024px): Sidebar appears as drawer with hamburger menu
 * - Desktop (≥ 1024px): Sidebar always visible, cannot be hidden
 *
 * Key Features:
 * - defaultOpen={false} makes sidebar start closed on mobile
 * - SidebarTrigger automatically shows/hides based on viewport
 * - Press ESC or click outside to close sidebar
 * - Sidebar stays within SidebarLayout container
 */`} />
                    </TabsContent>
                </Tabs>
            </Section>

            <Section title="Responsive Sidebar">
                <p className="text-sm text-muted-foreground mb-4">
                    The responsive variant shows a drawer on mobile devices (with hamburger menu) and a fixed sidebar on desktop.
                    Try resizing your browser window to see it in action!
                </p>
                <CodeBlock code={`<Sidebar variant="responsive" className="bg-gray-50">
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
