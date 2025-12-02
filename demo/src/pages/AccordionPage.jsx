import React from 'react';
import {
    Accordion, AccordionItem, AccordionTrigger, AccordionContent
} from '../../../src/index.js';
import { Section, Demo, Example, CodeBlock } from '../components';

export default function AccordionPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Accordion</h1>
                <p className="text-lg text-muted-foreground">
                    A vertically stacked set of interactive headings that each reveal a section of content.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <p className="text-muted-foreground mb-4">
                    A single accordion allows only one item to be open at a time.
                </p>
                <Example
                    preview={
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It adheres to the WAI-ARIA design pattern.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Is it styled?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It comes with default styles that match the other components' aesthetic.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Is it animated?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It's animated by default, but you can disable it if you prefer.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    }
                    code={`<Accordion type="single" collapsible className="w-full">
    <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
            Yes. It comes with default styles that match the other components' aesthetic.
        </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
            Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
    </AccordionItem>
</Accordion>`}
                />
            </Section>

            <Section title="Multiple Open">
                <p className="text-muted-foreground mb-4">
                    Use type="multiple" to allow multiple items to be open simultaneously.
                </p>
                <Example
                    preview={
                        <Accordion type="multiple" className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Can I open multiple?</AccordionTrigger>
                                <AccordionContent>
                                    Yes! With type="multiple", you can have several items expanded at once.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Do they close automatically?</AccordionTrigger>
                                <AccordionContent>
                                    No. Each item stays open until you manually close it.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Is this useful?</AccordionTrigger>
                                <AccordionContent>
                                    Yes, for FAQs or when users need to compare information across sections.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    }
                    code={`<Accordion type="multiple" className="w-full">
    <AccordionItem value="item-1">
        <AccordionTrigger>Can I open multiple?</AccordionTrigger>
        <AccordionContent>
            Yes! With type="multiple", you can have several items expanded at once.
        </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
        <AccordionTrigger>Do they close automatically?</AccordionTrigger>
        <AccordionContent>
            No. Each item stays open until you manually close it.
        </AccordionContent>
    </AccordionItem>
</Accordion>`}
                />
            </Section>

            <Section title="Default Value">
                <p className="text-muted-foreground mb-4">
                    Use defaultValue to have an item open by default.
                </p>
                <Example
                    preview={
                        <Accordion type="single" defaultValue="item-2" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>First item</AccordionTrigger>
                                <AccordionContent>
                                    This item is closed by default.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger>Second item (default open)</AccordionTrigger>
                                <AccordionContent>
                                    This item is open by default because defaultValue="item-2".
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger>Third item</AccordionTrigger>
                                <AccordionContent>
                                    This item is closed by default.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    }
                    code={`<Accordion type="single" defaultValue="item-2" collapsible>
    <AccordionItem value="item-1">
        <AccordionTrigger>First item</AccordionTrigger>
        <AccordionContent>
            This item is closed by default.
        </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
        <AccordionTrigger>Second item (default open)</AccordionTrigger>
        <AccordionContent>
            This item is open by default because defaultValue="item-2".
        </AccordionContent>
    </AccordionItem>
</Accordion>`}
                />
            </Section>

            <Section title="FAQ Example">
                <p className="text-muted-foreground mb-4">
                    A real-world FAQ section example.
                </p>
                <Example
                    preview={
                        <div className="w-full">
                            <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="faq-1">
                                    <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                                    <AccordionContent>
                                        We accept all major credit cards (Visa, MasterCard, American Express),
                                        PayPal, and bank transfers. All payments are processed securely.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="faq-2">
                                    <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                                    <AccordionContent>
                                        Standard shipping takes 5-7 business days. Express shipping (2-3 business days)
                                        is available for an additional fee. International orders may take 10-14 business days.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="faq-3">
                                    <AccordionTrigger>What is your return policy?</AccordionTrigger>
                                    <AccordionContent>
                                        We offer a 30-day return policy for all unused items in original packaging.
                                        Simply contact our support team to initiate a return. Refunds are processed
                                        within 5-7 business days after we receive the item.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="faq-4">
                                    <AccordionTrigger>Do you offer customer support?</AccordionTrigger>
                                    <AccordionContent>
                                        Yes! Our support team is available Monday through Friday, 9am-6pm EST.
                                        You can reach us via email at support@example.com or through our live chat.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    }
                    code={`<Accordion type="single" collapsible className="w-full">
    <AccordionItem value="faq-1">
        <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
        <AccordionContent>
            We accept all major credit cards, PayPal, and bank transfers.
        </AccordionContent>
    </AccordionItem>
    <AccordionItem value="faq-2">
        <AccordionTrigger>How long does shipping take?</AccordionTrigger>
        <AccordionContent>
            Standard shipping takes 5-7 business days.
        </AccordionContent>
    </AccordionItem>
    {/* More items... */}
</Accordion>`}
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
                                <td className="p-4 font-mono text-sm">type</td>
                                <td className="p-4 text-sm text-muted-foreground">'single' | 'multiple'</td>
                                <td className="p-4 text-sm">'single'</td>
                                <td className="p-4 text-sm">Allow one or multiple items open</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">defaultValue</td>
                                <td className="p-4 text-sm text-muted-foreground">string | string[]</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Initially open item(s)</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">collapsible</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">false</td>
                                <td className="p-4 text-sm">Allow closing all items (single type only)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
