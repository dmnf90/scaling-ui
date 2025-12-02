import React from 'react';
import { InputGroup, Input } from '../../../src/index.js';
import { Mail, DollarSign, AtSign } from 'lucide-react';
import { Section, Demo, Example, CodeBlock } from '../components';

export default function InputGroupPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Input Group</h1>
                <p className="text-lg text-muted-foreground">
                    Add prefix or suffix text/icons to inputs.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { InputGroup } from 'scaling-ui';`} />
            </Section>

            <Section title="With Prefix">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm">
                            <InputGroup prefix="https://">
                                <Input placeholder="www.example.com" className="rounded-l-none" />
                            </InputGroup>
                        </div>
                    }
                    code={`<InputGroup prefix="https://">
    <Input placeholder="www.example.com" className="rounded-l-none" />
</InputGroup>`}
                />
            </Section>

            <Section title="With Suffix">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm">
                            <InputGroup suffix=".00">
                                <Input placeholder="0" className="rounded-r-none" />
                            </InputGroup>
                        </div>
                    }
                    code={`<InputGroup suffix=".00">
    <Input placeholder="0" className="rounded-r-none" />
</InputGroup>`}
                />
            </Section>

            <Section title="With Both">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm">
                            <InputGroup prefix="$" suffix="USD">
                                <Input placeholder="100" className="rounded-none" />
                            </InputGroup>
                        </div>
                    }
                    code={`<InputGroup prefix="$" suffix="USD">
    <Input placeholder="100" className="rounded-none" />
</InputGroup>`}
                />
            </Section>

            <Section title="With Icons">
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-sm space-y-3">
                            <InputGroup prefix={<Mail className="h-4 w-4" />}>
                                <Input placeholder="Email" className="rounded-l-none" />
                            </InputGroup>
                            <InputGroup prefix="@">
                                <Input placeholder="username" className="rounded-l-none" />
                            </InputGroup>
                        </div>
                    }
                    code={`<InputGroup prefix={<Mail className="h-4 w-4" />}>
    <Input placeholder="Email" className="rounded-l-none" />
</InputGroup>

<InputGroup prefix="@">
    <Input placeholder="username" className="rounded-l-none" />
</InputGroup>`}
                />
            </Section>
        </div>
    );
}
