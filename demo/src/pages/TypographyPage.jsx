import React from 'react';
import {
    H1, H2, H3, H4, P, Lead, Large, Small, Muted, InlineCode, Blockquote,
    Tabs, TabsList, TabsTrigger, TabsContent
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

export default function TypographyPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Typography</h1>
                <p className="text-lg text-muted-foreground">
                    Styled text components for consistent typography across your application.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { H1, H2, H3, H4, P, Lead, Large, Small, Muted, InlineCode, Blockquote } from 'scaling-ui';`} />
            </Section>

            <Section title="Headings">
                <p className="text-muted-foreground mb-4">
                    Heading components from H1 to H4 with proper sizing and tracking.
                </p>
                <Example
                    preview={
                        <div className="space-y-4">
                            <H1>Heading 1</H1>
                            <H2>Heading 2</H2>
                            <H3>Heading 3</H3>
                            <H4>Heading 4</H4>
                        </div>
                    }
                    code={`<H1>Heading 1</H1>
<H2>Heading 2</H2>
<H3>Heading 3</H3>
<H4>Heading 4</H4>`}
                />
            </Section>

            <Section title="Paragraph">
                <p className="text-muted-foreground mb-4">
                    Standard paragraph with proper line height and spacing.
                </p>
                <Example
                    preview={
                        <div>
                            <P>
                                The king, seeing how much happier his subjects were,
                                realized the error of his ways and repealed the joke tax.
                            </P>
                            <P>
                                Jokester began sneaking into the castle in the middle of the night
                                and leaving jokes all over the place.
                            </P>
                        </div>
                    }
                    code={`<P>
    The king, seeing how much happier his subjects were,
    realized the error of his ways and repealed the joke tax.
</P>
<P>
    Jokester began sneaking into the castle in the middle of the night
    and leaving jokes all over the place.
</P>`}
                />
            </Section>

            <Section title="Lead">
                <p className="text-muted-foreground mb-4">
                    Larger text for introductory paragraphs.
                </p>
                <Example
                    preview={
                        <Lead>
                            A modal dialog that interrupts the user with important content and expects a response.
                        </Lead>
                    }
                    code={`<Lead>
    A modal dialog that interrupts the user with important content and expects a response.
</Lead>`}
                />
            </Section>

            <Section title="Text Sizes">
                <p className="text-muted-foreground mb-4">
                    Different text sizes for various use cases.
                </p>
                <Example
                    preview={
                        <div className="space-y-4">
                            <Large>Large text for emphasis</Large>
                            <P>Normal paragraph text</P>
                            <Small>Small text for captions</Small>
                            <Muted>Muted text for secondary information</Muted>
                        </div>
                    }
                    code={`<Large>Large text for emphasis</Large>
<P>Normal paragraph text</P>
<Small>Small text for captions</Small>
<Muted>Muted text for secondary information</Muted>`}
                />
            </Section>

            <Section title="Inline Code">
                <p className="text-muted-foreground mb-4">
                    Inline code snippets within text.
                </p>
                <Example
                    preview={
                        <P>
                            Use the <InlineCode>useState</InlineCode> hook to manage component state,
                            and <InlineCode>useEffect</InlineCode> for side effects.
                        </P>
                    }
                    code={`<P>
    Use the <InlineCode>useState</InlineCode> hook to manage component state,
    and <InlineCode>useEffect</InlineCode> for side effects.
</P>`}
                />
            </Section>

            <Section title="Blockquote">
                <p className="text-muted-foreground mb-4">
                    Styled blockquote for quotations.
                </p>
                <Example
                    preview={
                        <Blockquote>
                            "After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."
                        </Blockquote>
                    }
                    code={`<Blockquote>
    "After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."
</Blockquote>`}
                />
            </Section>

            <Section title="Complete Example">
                <p className="text-muted-foreground mb-4">
                    Combining typography components for a complete article layout.
                </p>
                <Example
                    preview={
                        <article className="space-y-4">
                            <H1>The Joke Tax Chronicles</H1>
                            <Lead>
                                Once upon a time, in a kingdom far, far away, there lived a king who loved jokes.
                            </Lead>
                            <H2>The People's Response</H2>
                            <P>
                                The people of the kingdom were not amused. They started to tell jokes in secret,
                                using <InlineCode>whisperJoke()</InlineCode> to avoid detection.
                            </P>
                            <Blockquote>
                                "We will not be silenced," declared Jokester. "Laughter is a right, not a privilege."
                            </Blockquote>
                            <Muted>— From the Archives of the Kingdom, Year 1042</Muted>
                        </article>
                    }
                    code={`<article className="space-y-4">
    <H1>The Joke Tax Chronicles</H1>
    <Lead>
        Once upon a time, in a kingdom far, far away, there lived a king who loved jokes.
    </Lead>
    <H2>The People's Response</H2>
    <P>
        The people of the kingdom were not amused. They started to tell jokes in secret,
        using <InlineCode>whisperJoke()</InlineCode> to avoid detection.
    </P>
    <Blockquote>
        "We will not be silenced," declared Jokester. "Laughter is a right, not a privilege."
    </Blockquote>
    <Muted>— From the Archives of the Kingdom, Year 1042</Muted>
</article>`}
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
                                <td className="p-4 font-mono text-sm">H1, H2, H3, H4</td>
                                <td className="p-4 text-sm">Heading elements with proper sizing</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">P</td>
                                <td className="p-4 text-sm">Paragraph with proper line height</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">Lead</td>
                                <td className="p-4 text-sm">Large intro text in muted color</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">Large</td>
                                <td className="p-4 text-sm">Large semibold text</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">Small</td>
                                <td className="p-4 text-sm">Small text for captions</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">Muted</td>
                                <td className="p-4 text-sm">Muted secondary text</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">InlineCode</td>
                                <td className="p-4 text-sm">Inline code snippet</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">Blockquote</td>
                                <td className="p-4 text-sm">Styled quote block</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
