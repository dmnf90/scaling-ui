import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge, Separator } from '../../../src/index.js';
import { Layers, Zap, Code2, Github } from 'lucide-react';
import tailwindLogo from '../../public/tailwindcss-logotype.svg';
import tailwindLogoWhite from '../../public/tailwindcss-logotype-white.svg';

export default function HomePage() {
    return (
        <div className="max-w-6xl">
            {/* Hero Section */}
            <div className="text-center mb-16 pt-8">
                <h1 className="text-5xl font-bold mb-4">
                    Scaling UI
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    A clean, minimal React component library built with Tailwind CSS.
                    Components that just work, without the complexity.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                    <Button asChild size="lg">
                        <Link to="/getting-started">Get Started</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <a
                            href="https://github.com/dmnf90/scaling-ui"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2"
                        >
                            <Github className="w-5 h-5" />
                            View on GitHub
                        </a>
                    </Button>
                </div>
            </div>

            {/* Stats Badges */}
            <div className="flex gap-3 justify-center flex-wrap mb-16">
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                    35+ Components
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                    Open Source
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                    Tailwind CSS v4
                </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                    Tree-shakeable
                </Badge>
            </div>

            <Separator className="mb-16" />

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-16">
                <Card>
                    <CardHeader>
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                            <Layers className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle>Simple & Composable</CardTitle>
                        <CardDescription>
                            No complex context providers or configuration. Import what you need and start building.
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                            <Zap className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle>Production Ready</CardTitle>
                        <CardDescription>
                            Fully accessible components with ARIA support, keyboard navigation, and proper focus management.
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="mb-4 h-12 flex items-center">
                            <img src={tailwindLogo} alt="Tailwind CSS" className="h-6 dark:hidden" />
                            <img src={tailwindLogoWhite} alt="Tailwind CSS" className="h-6 hidden dark:block" />
                        </div>
                        <CardTitle>Built with Tailwind</CardTitle>
                        <CardDescription>
                            Leverages Tailwind CSS v4 for styling. Customize with your own design system or use as-is.
                        </CardDescription>
                    </CardHeader>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                            <Code2 className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle>Developer Experience</CardTitle>
                        <CardDescription>
                            Clean APIs, TypeScript support, and comprehensive examples for every component.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            {/* CTA Section */}
            <Card className="bg-muted/50 border-2">
                <CardContent className="pt-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-2">Ready to build?</h2>
                        <p className="text-muted-foreground mb-6">
                            Get started with Scaling UI and ship your next project faster.
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <Button asChild>
                                <Link to="/getting-started">View Documentation</Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link to="/button">Browse Components</Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
