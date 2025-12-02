import React from 'react';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
    NavigationMenuList
} from '../../../src/index.js';
import { Section, Demo, Example, CodeBlock } from '../components';

export default function NavigationMenuPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Navigation Menu</h1>
                <p className="text-lg text-muted-foreground">
                    A collection of navigation menu components with dropdown support and multi-level nesting.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { NavigationMenu, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from 'scaling-ui';`} />
            </Section>

            <Section title="Horizontal Navigation">
                <Example
                    className="justify-center"
                    preview={
                        <NavigationMenu orientation="horizontal">
                            <NavigationMenuItem value="getting-started">
                                {({ isOpen }) => (
                                    <>
                                        <NavigationMenuTrigger data-state={isOpen ? 'open' : 'closed'}>
                                            Getting Started
                                        </NavigationMenuTrigger>
                                        {isOpen && (
                                            <NavigationMenuContent>
                                                <NavigationMenuList className="w-[400px]">
                                                    <li>
                                                        <NavigationMenuLink href="#">
                                                            <div className="text-sm font-medium">Introduction</div>
                                                            <p className="text-sm text-muted-foreground">
                                                                Learn how to get started with our components.
                                                            </p>
                                                        </NavigationMenuLink>
                                                    </li>
                                                    <li>
                                                        <NavigationMenuLink href="#">
                                                            <div className="text-sm font-medium">Installation</div>
                                                            <p className="text-sm text-muted-foreground">
                                                                How to install dependencies and structure your app.
                                                            </p>
                                                        </NavigationMenuLink>
                                                    </li>
                                                </NavigationMenuList>
                                            </NavigationMenuContent>
                                        )}
                                    </>
                                )}
                            </NavigationMenuItem>
                            <NavigationMenuItem value="components">
                                {({ isOpen }) => (
                                    <>
                                        <NavigationMenuTrigger data-state={isOpen ? 'open' : 'closed'}>
                                            Components
                                        </NavigationMenuTrigger>
                                        {isOpen && (
                                            <NavigationMenuContent>
                                                <NavigationMenuList className="w-[400px]">
                                                    <li>
                                                        <NavigationMenuLink href="#">
                                                            <div className="text-sm font-medium">Button</div>
                                                            <p className="text-sm text-muted-foreground">
                                                                Displays a button or a component that looks like a button.
                                                            </p>
                                                        </NavigationMenuLink>
                                                    </li>
                                                    <li>
                                                        <NavigationMenuLink href="#">
                                                            <div className="text-sm font-medium">Input</div>
                                                            <p className="text-sm text-muted-foreground">
                                                                Displays a form input field or a component that looks like an input.
                                                            </p>
                                                        </NavigationMenuLink>
                                                    </li>
                                                </NavigationMenuList>
                                            </NavigationMenuContent>
                                        )}
                                    </>
                                )}
                            </NavigationMenuItem>
                        </NavigationMenu>
                    }
                    code={`<NavigationMenu orientation="horizontal">
    <NavigationMenuItem value="getting-started">
        {({ isOpen }) => (
            <>
                <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                {isOpen && (
                    <NavigationMenuContent>
                        <NavigationMenuList>
                            <li>
                                <NavigationMenuLink href="#">
                                    <div className="text-sm font-medium">Introduction</div>
                                    <p className="text-sm text-muted-foreground">
                                        Learn how to get started.
                                    </p>
                                </NavigationMenuLink>
                            </li>
                        </NavigationMenuList>
                    </NavigationMenuContent>
                )}
            </>
        )}
    </NavigationMenuItem>
</NavigationMenu>`}
                />
            </Section>

            <Section title="Vertical Navigation">
                <Example
                    className="items-start"
                    preview={
                        <NavigationMenu orientation="vertical">
                            <NavigationMenuItem value="dashboard">
                                {({ isOpen }) => (
                                    <>
                                        <NavigationMenuTrigger data-state={isOpen ? 'open' : 'closed'}>
                                            Dashboard
                                        </NavigationMenuTrigger>
                                        {isOpen && (
                                            <NavigationMenuContent>
                                                <NavigationMenuList>
                                                    <li><NavigationMenuLink href="#">Overview</NavigationMenuLink></li>
                                                    <li><NavigationMenuLink href="#">Analytics</NavigationMenuLink></li>
                                                    <li><NavigationMenuLink href="#">Reports</NavigationMenuLink></li>
                                                </NavigationMenuList>
                                            </NavigationMenuContent>
                                        )}
                                    </>
                                )}
                            </NavigationMenuItem>
                            <NavigationMenuItem value="settings">
                                {({ isOpen }) => (
                                    <>
                                        <NavigationMenuTrigger data-state={isOpen ? 'open' : 'closed'}>
                                            Settings
                                        </NavigationMenuTrigger>
                                        {isOpen && (
                                            <NavigationMenuContent>
                                                <NavigationMenuList>
                                                    <li><NavigationMenuLink href="#">Profile</NavigationMenuLink></li>
                                                    <li><NavigationMenuLink href="#">Account</NavigationMenuLink></li>
                                                    <li><NavigationMenuLink href="#">Notifications</NavigationMenuLink></li>
                                                </NavigationMenuList>
                                            </NavigationMenuContent>
                                        )}
                                    </>
                                )}
                            </NavigationMenuItem>
                        </NavigationMenu>
                    }
                    code={`<NavigationMenu orientation="vertical">
    <NavigationMenuItem value="dashboard">
        {({ isOpen }) => (
            <>
                <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
                {isOpen && (
                    <NavigationMenuContent>
                        <NavigationMenuList>
                            <li><NavigationMenuLink href="#">Overview</NavigationMenuLink></li>
                            <li><NavigationMenuLink href="#">Analytics</NavigationMenuLink></li>
                        </NavigationMenuList>
                    </NavigationMenuContent>
                )}
            </>
        )}
    </NavigationMenuItem>
</NavigationMenu>`}
                />
            </Section>
        </div>
    );
}
