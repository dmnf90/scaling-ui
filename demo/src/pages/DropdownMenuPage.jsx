import React, { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuShortcut,
    Button
} from '../../../src/index.js';
import { Section, Demo, Example, CodeBlock } from '../components';

export default function DropdownMenuPage() {
    const [showBookmarks, setShowBookmarks] = useState(true);
    const [view, setView] = useState('grid');

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Dropdown Menu</h1>
                <p className="text-lg text-muted-foreground">
                    Displays a menu triggered by a button click with items, checkboxes, and radio groups.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <Example
                    preview={
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Open Menu</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                    code={`<DropdownMenu>
    <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>`}
                />
            </Section>

            <Section title="With Checkboxes and Radio">
                <Example
                    preview={
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">View Options</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuCheckboxItem
                                    checked={showBookmarks}
                                    onCheckedChange={setShowBookmarks}
                                >
                                    Show Bookmarks
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>View Mode</DropdownMenuLabel>
                                <DropdownMenuRadioGroup value={view} onValueChange={setView}>
                                    <DropdownMenuRadioItem value="grid">Grid</DropdownMenuRadioItem>
                                    <DropdownMenuRadioItem value="list">List</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    }
                    code={`const [showBookmarks, setShowBookmarks] = useState(true);
const [view, setView] = useState('grid');

<DropdownMenu>
    <DropdownMenuTrigger asChild>
        <Button variant="outline">View Options</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
        <DropdownMenuCheckboxItem
            checked={showBookmarks}
            onCheckedChange={setShowBookmarks}
        >
            Show Bookmarks
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={view} onValueChange={setView}>
            <DropdownMenuRadioItem value="grid">Grid</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="list">List</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
    </DropdownMenuContent>
</DropdownMenu>`}
                />
            </Section>
        </div>
    );
}
