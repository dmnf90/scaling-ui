import React from 'react';
import {
    Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots,
    Card, CardContent, Tabs, TabsList, TabsTrigger, TabsContent
} from '../../../src/index.js';

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

export default function CarouselPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Carousel</h1>
                <p className="text-lg text-muted-foreground">
                    A carousel with motion and swipe gestures for cycling through content.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <p className="text-muted-foreground mb-4">
                    A simple carousel with navigation arrows.
                </p>
                <Example
                    preview={
                        <div className="w-full max-w-xs mx-auto">
                            <Carousel>
                                <CarouselContent>
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <CarouselItem key={num}>
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                                        <span className="text-4xl font-semibold">{num}</span>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                    }
                    code={`<Carousel>
    <CarouselContent>
        {[1, 2, 3, 4, 5].map((num) => (
            <CarouselItem key={num}>
                <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">{num}</span>
                    </CardContent>
                </Card>
            </CarouselItem>
        ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
</Carousel>`}
                />
            </Section>

            <Section title="With Dots">
                <p className="text-muted-foreground mb-4">
                    Add dot indicators for slide navigation.
                </p>
                <Example
                    preview={
                        <div className="w-full max-w-xs mx-auto">
                            <Carousel>
                                <CarouselContent>
                                    {['First', 'Second', 'Third'].map((text, index) => (
                                        <CarouselItem key={index}>
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent className="flex aspect-video items-center justify-center p-6 bg-gradient-to-br from-primary/20 to-primary/5">
                                                        <span className="text-xl font-semibold">{text} Slide</span>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                                <CarouselDots />
                            </Carousel>
                        </div>
                    }
                    code={`<Carousel>
    <CarouselContent>
        {['First', 'Second', 'Third'].map((text, index) => (
            <CarouselItem key={index}>
                <Card>
                    <CardContent className="flex aspect-video items-center justify-center p-6">
                        <span className="text-xl font-semibold">{text} Slide</span>
                    </CardContent>
                </Card>
            </CarouselItem>
        ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
    <CarouselDots />
</Carousel>`}
                />
            </Section>

            <Section title="Auto Play">
                <p className="text-muted-foreground mb-4">
                    Enable auto-play to automatically cycle through slides.
                </p>
                <Example
                    preview={
                        <div className="w-full max-w-xs mx-auto">
                            <Carousel autoPlay interval={3000} loop>
                                <CarouselContent>
                                    {['red', 'blue', 'green', 'purple'].map((color) => (
                                        <CarouselItem key={color}>
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent
                                                        className="flex aspect-video items-center justify-center p-6"
                                                        style={{ backgroundColor: `var(--${color === 'red' ? 'destructive' : color === 'blue' ? 'primary' : color === 'green' ? 'success' : 'accent'})`, opacity: 0.2 }}
                                                    >
                                                        <span className="text-lg font-semibold capitalize">{color}</span>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselDots />
                            </Carousel>
                        </div>
                    }
                    code={`<Carousel autoPlay interval={3000} loop>
    <CarouselContent>
        {['red', 'blue', 'green', 'purple'].map((color) => (
            <CarouselItem key={color}>
                <Card>
                    <CardContent>
                        <span className="capitalize">{color}</span>
                    </CardContent>
                </Card>
            </CarouselItem>
        ))}
    </CarouselContent>
    <CarouselDots />
</Carousel>`}
                />
            </Section>

            <Section title="No Loop">
                <p className="text-muted-foreground mb-4">
                    Disable looping to prevent wrapping at the ends.
                </p>
                <Example
                    preview={
                        <div className="w-full max-w-xs mx-auto">
                            <Carousel loop={false}>
                                <CarouselContent>
                                    {[1, 2, 3].map((num) => (
                                        <CarouselItem key={num}>
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                                        <span className="text-4xl font-semibold">{num}</span>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                                <CarouselDots />
                            </Carousel>
                        </div>
                    }
                    code={`<Carousel loop={false}>
    <CarouselContent>
        {[1, 2, 3].map((num) => (
            <CarouselItem key={num}>
                <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">{num}</span>
                    </CardContent>
                </Card>
            </CarouselItem>
        ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
    <CarouselDots />
</Carousel>`}
                />
            </Section>

            <Section title="Image Carousel">
                <p className="text-muted-foreground mb-4">
                    A practical example with images.
                </p>
                <Example
                    preview={
                        <div className="w-full max-w-md mx-auto">
                            <Carousel loop>
                                <CarouselContent>
                                    {[
                                        { title: 'Mountain View', desc: 'Beautiful mountain landscape' },
                                        { title: 'Ocean Sunset', desc: 'Peaceful ocean at dusk' },
                                        { title: 'Forest Path', desc: 'Serene forest trail' },
                                    ].map((item, index) => (
                                        <CarouselItem key={index}>
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent className="p-0">
                                                        <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                                                            <div className="text-center">
                                                                <p className="font-semibold">{item.title}</p>
                                                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                                <CarouselDots />
                            </Carousel>
                        </div>
                    }
                    code={`<Carousel loop>
    <CarouselContent>
        {images.map((image, index) => (
            <CarouselItem key={index}>
                <Card>
                    <CardContent className="p-0">
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="aspect-video object-cover"
                        />
                    </CardContent>
                </Card>
            </CarouselItem>
        ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
    <CarouselDots />
</Carousel>`}
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
                                <td className="p-4 font-mono text-sm">autoPlay</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">false</td>
                                <td className="p-4 text-sm">Auto-advance slides</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">interval</td>
                                <td className="p-4 text-sm text-muted-foreground">number</td>
                                <td className="p-4 text-sm">5000</td>
                                <td className="p-4 text-sm">Auto-play interval in ms</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">loop</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">true</td>
                                <td className="p-4 text-sm">Loop back to start/end</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
