import React from 'react';
import { Avatar } from '../../../src/index.js';
import { Section, Demo, Example, CodeBlock } from '../components';

export default function AvatarPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Avatar</h1>
                <p className="text-lg text-muted-foreground">
                    Display user profile pictures with fallback support for initials or icons.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Avatar } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <Example
                    preview={
                        <>
                            <Avatar src="https://i.pravatar.cc/150?img=1" alt="User avatar" />
                            <Avatar src="https://i.pravatar.cc/150?img=2" alt="User avatar" />
                            <Avatar src="https://i.pravatar.cc/150?img=3" alt="User avatar" />
                        </>
                    }
                    code={`<Avatar src="https://i.pravatar.cc/150?img=1" alt="User avatar" />`}
                />
            </Section>

            <Section title="Fallback with Initials">
                <Example
                    preview={
                        <>
                            <Avatar fallback="JD" />
                            <Avatar fallback="AB" />
                            <Avatar fallback="SC" />
                            <Avatar fallback="MK" />
                        </>
                    }
                    code={`<Avatar fallback="JD" />
<Avatar fallback="AB" />
<Avatar fallback="SC" />`}
                />
            </Section>

            <Section title="Fallback with Icon">
                <Example
                    preview={
                        <>
                            <Avatar />
                            <Avatar />
                            <Avatar />
                        </>
                    }
                    code={`<Avatar />  {/* Shows default user icon */}`}
                />
            </Section>

            <Section title="Different Sizes">
                <Example
                    preview={
                        <>
                            <Avatar src="https://i.pravatar.cc/150?img=4" alt="Small" size="sm" />
                            <Avatar src="https://i.pravatar.cc/150?img=4" alt="Medium" size="md" />
                            <Avatar src="https://i.pravatar.cc/150?img=4" alt="Large" size="lg" />
                            <Avatar src="https://i.pravatar.cc/150?img=4" alt="Extra Large" size="xl" />
                        </>
                    }
                    code={`<Avatar src="..." size="sm" />
<Avatar src="..." size="md" />
<Avatar src="..." size="lg" />
<Avatar src="..." size="xl" />`}
                />
            </Section>

            <Section title="Square Variant">
                <Example
                    preview={
                        <>
                            <Avatar src="https://i.pravatar.cc/150?img=5" variant="square" size="sm" />
                            <Avatar src="https://i.pravatar.cc/150?img=5" variant="square" size="md" />
                            <Avatar src="https://i.pravatar.cc/150?img=5" variant="square" size="lg" />
                            <Avatar src="https://i.pravatar.cc/150?img=5" variant="square" size="xl" />
                        </>
                    }
                    code={`<Avatar src="..." variant="square" size="md" />`}
                />
            </Section>

            <Section title="With Status Indicator">
                <Example
                    preview={
                        <>
                            <Avatar
                                src="https://i.pravatar.cc/150?img=6"
                                showStatus
                                status="online"
                                size="lg"
                            />
                            <Avatar
                                src="https://i.pravatar.cc/150?img=7"
                                showStatus
                                status="away"
                                size="lg"
                            />
                            <Avatar
                                src="https://i.pravatar.cc/150?img=8"
                                showStatus
                                status="busy"
                                size="lg"
                            />
                            <Avatar
                                src="https://i.pravatar.cc/150?img=9"
                                showStatus
                                status="offline"
                                size="lg"
                            />
                        </>
                    }
                    code={`<Avatar src="..." showStatus status="online" />
<Avatar src="..." showStatus status="away" />
<Avatar src="..." showStatus status="busy" />
<Avatar src="..." showStatus status="offline" />`}
                />
            </Section>

            <Section title="Loading State">
                <Example
                    preview={
                        <>
                            <Avatar loading size="sm" />
                            <Avatar loading size="md" />
                            <Avatar loading size="lg" />
                            <Avatar loading size="xl" />
                        </>
                    }
                    code={`<Avatar loading size="md" />`}
                />
            </Section>

            <Section title="Avatar Group">
                <Example
                    preview={
                        <div className="flex -space-x-2">
                            <Avatar src="https://i.pravatar.cc/150?img=10" className="border-2 border-background" />
                            <Avatar src="https://i.pravatar.cc/150?img=11" className="border-2 border-background" />
                            <Avatar src="https://i.pravatar.cc/150?img=12" className="border-2 border-background" />
                            <Avatar src="https://i.pravatar.cc/150?img=13" className="border-2 border-background" />
                            <Avatar fallback="+5" className="border-2 border-background" />
                        </div>
                    }
                    code={`<div className="flex -space-x-2">
    <Avatar src="..." className="border-2 border-background" />
    <Avatar src="..." className="border-2 border-background" />
    <Avatar src="..." className="border-2 border-background" />
    <Avatar src="..." className="border-2 border-background" />
    <Avatar fallback="+5" className="border-2 border-background" />
</div>`}
                />
            </Section>

            <Section title="Fallback on Error">
                <Example
                    preview={
                        <>
                            <Avatar src="https://invalid-url.com/image.jpg" fallback="ER" />
                            <Avatar src="https://invalid-url.com/image.jpg" fallback="FL" />
                            <Avatar src="https://invalid-url.com/image.jpg" />
                        </>
                    }
                    code={`{/* Image fails to load, shows fallback */}
<Avatar src="https://invalid-url.com/image.jpg" fallback="ER" />`}
                />
            </Section>
        </div>
    );
}
