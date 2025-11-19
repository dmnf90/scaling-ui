import React, { useState } from 'react';
import {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuCheckboxItem,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSub,
    ContextMenuSubTrigger,
    ContextMenuSubContent,
    ContextMenuShortcut,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
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
        <div className={`flex flex-wrap gap-4 items-center p-6 border border-border rounded-lg ${className}`}>
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

export default function ContextMenuPage() {
    const [showBookmarks, setShowBookmarks] = useState(true);
    const [showToolbar, setShowToolbar] = useState(false);
    const [view, setView] = useState('grid');

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Context Menu</h1>
                <p className="text-lg text-muted-foreground">
                    A menu that appears when you right-click on an element, providing contextual actions and options.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <Example
                    preview={
                        <ContextMenu>
                            <ContextMenuTrigger>
                                <div className="flex h-[200px] w-full items-center justify-center rounded-md border border-dashed border-border text-sm">
                                    Right click here
                                </div>
                            </ContextMenuTrigger>
                            <ContextMenuContent>
                                <ContextMenuItem>Open</ContextMenuItem>
                                <ContextMenuItem>Download</ContextMenuItem>
                                <ContextMenuSeparator />
                                <ContextMenuItem>Delete</ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>
                    }
                    code={`<ContextMenu>
    <ContextMenuTrigger>
        <div>Right click here</div>
    </ContextMenuTrigger>
    <ContextMenuContent>
        <ContextMenuItem>Open</ContextMenuItem>
        <ContextMenuItem>Download</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>Delete</ContextMenuItem>
    </ContextMenuContent>
</ContextMenu>`}
                />
            </Section>

            <Section title="With Keyboard Shortcuts">
                <Example
                    preview={
                        <ContextMenu>
                            <ContextMenuTrigger>
                                <div className="flex h-[200px] w-full items-center justify-center rounded-md border border-dashed border-border text-sm">
                                    Right click for menu with shortcuts
                                </div>
                            </ContextMenuTrigger>
                            <ContextMenuContent>
                                <ContextMenuItem>
                                    New File
                                    <ContextMenuShortcut>⌘N</ContextMenuShortcut>
                                </ContextMenuItem>
                                <ContextMenuItem>
                                    Open
                                    <ContextMenuShortcut>⌘O</ContextMenuShortcut>
                                </ContextMenuItem>
                                <ContextMenuItem>
                                    Save
                                    <ContextMenuShortcut>⌘S</ContextMenuShortcut>
                                </ContextMenuItem>
                                <ContextMenuSeparator />
                                <ContextMenuItem>
                                    Print
                                    <ContextMenuShortcut>⌘P</ContextMenuShortcut>
                                </ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>
                    }
                    code={`<ContextMenu>
    <ContextMenuTrigger>
        <div>Right click here</div>
    </ContextMenuTrigger>
    <ContextMenuContent>
        <ContextMenuItem>
            New File
            <ContextMenuShortcut>⌘N</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
            Save
            <ContextMenuShortcut>⌘S</ContextMenuShortcut>
        </ContextMenuItem>
    </ContextMenuContent>
</ContextMenu>`}
                />
            </Section>

            <Section title="With Checkboxes and Radio">
                <Example
                    preview={
                        <ContextMenu>
                            <ContextMenuTrigger>
                                <div className="flex h-[200px] w-full items-center justify-center rounded-md border border-dashed border-border text-sm">
                                    Right click for view options
                                </div>
                            </ContextMenuTrigger>
                            <ContextMenuContent>
                                <ContextMenuLabel>View Options</ContextMenuLabel>
                                <ContextMenuSeparator />
                                <ContextMenuCheckboxItem
                                    checked={showBookmarks}
                                    onCheckedChange={setShowBookmarks}
                                >
                                    Show Bookmarks
                                </ContextMenuCheckboxItem>
                                <ContextMenuCheckboxItem
                                    checked={showToolbar}
                                    onCheckedChange={setShowToolbar}
                                >
                                    Show Toolbar
                                </ContextMenuCheckboxItem>
                                <ContextMenuSeparator />
                                <ContextMenuLabel>View Mode</ContextMenuLabel>
                                <ContextMenuRadioGroup value={view} onValueChange={setView}>
                                    <ContextMenuRadioItem value="grid">Grid</ContextMenuRadioItem>
                                    <ContextMenuRadioItem value="list">List</ContextMenuRadioItem>
                                    <ContextMenuRadioItem value="columns">Columns</ContextMenuRadioItem>
                                </ContextMenuRadioGroup>
                            </ContextMenuContent>
                        </ContextMenu>
                    }
                    code={`const [showBookmarks, setShowBookmarks] = useState(true);
const [view, setView] = useState('grid');

<ContextMenu>
    <ContextMenuTrigger>
        <div>Right click here</div>
    </ContextMenuTrigger>
    <ContextMenuContent>
        <ContextMenuCheckboxItem
            checked={showBookmarks}
            onCheckedChange={setShowBookmarks}
        >
            Show Bookmarks
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value={view} onValueChange={setView}>
            <ContextMenuRadioItem value="grid">Grid</ContextMenuRadioItem>
            <ContextMenuRadioItem value="list">List</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
    </ContextMenuContent>
</ContextMenu>`}
                />
            </Section>

            <Section title="With Submenus">
                <Example
                    preview={
                        <ContextMenu>
                            <ContextMenuTrigger>
                                <div className="flex h-[200px] w-full items-center justify-center rounded-md border border-dashed border-border text-sm">
                                    Right click for nested menu
                                </div>
                            </ContextMenuTrigger>
                            <ContextMenuContent>
                                <ContextMenuItem>New File</ContextMenuItem>
                                <ContextMenuItem>New Folder</ContextMenuItem>
                                <ContextMenuSeparator />
                                <ContextMenuSub>
                                    <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
                                    <ContextMenuSubContent>
                                        <ContextMenuItem>Email</ContextMenuItem>
                                        <ContextMenuItem>Messages</ContextMenuItem>
                                        <ContextMenuItem>Copy Link</ContextMenuItem>
                                    </ContextMenuSubContent>
                                </ContextMenuSub>
                                <ContextMenuSub>
                                    <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
                                    <ContextMenuSubContent>
                                        <ContextMenuItem>Compress</ContextMenuItem>
                                        <ContextMenuItem>Encrypt</ContextMenuItem>
                                        <ContextMenuSeparator />
                                        <ContextMenuItem>Developer Tools</ContextMenuItem>
                                    </ContextMenuSubContent>
                                </ContextMenuSub>
                                <ContextMenuSeparator />
                                <ContextMenuItem>Delete</ContextMenuItem>
                            </ContextMenuContent>
                        </ContextMenu>
                    }
                    code={`<ContextMenu>
    <ContextMenuTrigger>
        <div>Right click here</div>
    </ContextMenuTrigger>
    <ContextMenuContent>
        <ContextMenuItem>New File</ContextMenuItem>
        <ContextMenuSub>
            <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
            <ContextMenuSubContent>
                <ContextMenuItem>Email</ContextMenuItem>
                <ContextMenuItem>Messages</ContextMenuItem>
                <ContextMenuItem>Copy Link</ContextMenuItem>
            </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem>Delete</ContextMenuItem>
    </ContextMenuContent>
</ContextMenu>`}
                />
            </Section>
        </div>
    );
}
