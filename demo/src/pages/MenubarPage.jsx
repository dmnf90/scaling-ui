import React, { useState } from 'react';
import { File, FolderOpen, Save, Printer, Copy, Scissors, Clipboard, Undo, Redo } from 'lucide-react';
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSeparator,
    MenubarCheckboxItem,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSub,
    MenubarSubTrigger,
    MenubarSubContent,
    MenubarShortcut,
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

export default function MenubarPage() {
    const [showBookmarks, setShowBookmarks] = useState(true);
    const [view, setView] = useState('grid');

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Menubar</h1>
                <p className="text-lg text-muted-foreground">
                    A visually persistent menu common in desktop applications with dropdown menus.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <Example
                    className="justify-start"
                    preview={
                        <Menubar>
                            <MenubarMenu value="file">
                                <MenubarTrigger>File</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>
                                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem>
                                        New Window <MenubarShortcut>⌘N</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Share</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Print</MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu value="edit">
                                <MenubarTrigger>Edit</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>
                                        Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem>
                                        Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Cut</MenubarItem>
                                    <MenubarItem>Copy</MenubarItem>
                                    <MenubarItem>Paste</MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu value="view">
                                <MenubarTrigger>View</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarCheckboxItem
                                        checked={showBookmarks}
                                        onCheckedChange={setShowBookmarks}
                                    >
                                        Show Bookmarks
                                    </MenubarCheckboxItem>
                                    <MenubarSeparator />
                                    <MenubarRadioGroup value={view} onValueChange={setView}>
                                        <MenubarRadioItem value="grid">Grid View</MenubarRadioItem>
                                        <MenubarRadioItem value="list">List View</MenubarRadioItem>
                                    </MenubarRadioGroup>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    }
                    code={`<Menubar>
    <MenubarMenu value="file">
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
            <MenubarItem>New Tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
            <MenubarItem>New Window <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
        </MenubarContent>
    </MenubarMenu>
    <MenubarMenu value="edit">
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
            <MenubarItem>Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
            <MenubarItem>Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
        </MenubarContent>
    </MenubarMenu>
</Menubar>`}
                />
            </Section>

            <Section title="With Submenu">
                <Example
                    className="justify-start"
                    preview={
                        <Menubar>
                            <MenubarMenu value="file">
                                <MenubarTrigger>File</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>
                                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarSub>
                                        <MenubarSubTrigger>New Window</MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem>Default Window</MenubarItem>
                                            <MenubarItem>Incognito Window</MenubarItem>
                                            <MenubarItem>Guest Window</MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarSub>
                                        <MenubarSubTrigger>Share</MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem>Email Link</MenubarItem>
                                            <MenubarItem>Messages</MenubarItem>
                                            <MenubarItem>AirDrop</MenubarItem>
                                            <MenubarSeparator />
                                            <MenubarItem>Notes</MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarSeparator />
                                    <MenubarItem>
                                        Print <MenubarShortcut>⌘P</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu value="edit">
                                <MenubarTrigger>Edit</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>
                                        Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem>
                                        Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarSub>
                                        <MenubarSubTrigger>Find</MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem>
                                                Search the web <MenubarShortcut>⌘⇧F</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarSeparator />
                                            <MenubarItem>Find...</MenubarItem>
                                            <MenubarItem>Find Next</MenubarItem>
                                            <MenubarItem>Find Previous</MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarSeparator />
                                    <MenubarItem>Cut</MenubarItem>
                                    <MenubarItem>Copy</MenubarItem>
                                    <MenubarItem>Paste</MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    }
                    code={`<Menubar>
    <MenubarMenu value="file">
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
            <MenubarItem>New Tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
            <MenubarSub>
                <MenubarSubTrigger>New Window</MenubarSubTrigger>
                <MenubarSubContent>
                    <MenubarItem>Default Window</MenubarItem>
                    <MenubarItem>Incognito Window</MenubarItem>
                    <MenubarItem>Guest Window</MenubarItem>
                </MenubarSubContent>
            </MenubarSub>
            <MenubarSub>
                <MenubarSubTrigger>Share</MenubarSubTrigger>
                <MenubarSubContent>
                    <MenubarItem>Email Link</MenubarItem>
                    <MenubarItem>Messages</MenubarItem>
                    <MenubarItem>AirDrop</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Notes</MenubarItem>
                </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>Print <MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
        </MenubarContent>
    </MenubarMenu>
    <MenubarMenu value="edit">
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
            <MenubarItem>Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
            <MenubarItem>Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
                <MenubarSubTrigger>Find</MenubarSubTrigger>
                <MenubarSubContent>
                    <MenubarItem>Search the web <MenubarShortcut>⌘⇧F</MenubarShortcut></MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Find...</MenubarItem>
                    <MenubarItem>Find Next</MenubarItem>
                    <MenubarItem>Find Previous</MenubarItem>
                </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
    </MenubarMenu>
</Menubar>`}
                />
            </Section>

            <Section title="With Icons">
                <p className="text-muted-foreground mb-4">
                    Menu items can include icons. Use the <code className="text-sm bg-muted px-1 py-0.5 rounded">inset</code> prop on items without icons to align text with items that have icons.
                </p>
                <Example
                    className="justify-start"
                    preview={
                        <Menubar>
                            <MenubarMenu value="file">
                                <MenubarTrigger>File</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>
                                        <File className="mr-2 h-4 w-4" />
                                        New File <MenubarShortcut>⌘N</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem>
                                        <FolderOpen className="mr-2 h-4 w-4" />
                                        Open <MenubarShortcut>⌘O</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save <MenubarShortcut>⌘S</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem inset>
                                        Save As... <MenubarShortcut>⇧⌘S</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>
                                        <Printer className="mr-2 h-4 w-4" />
                                        Print <MenubarShortcut>⌘P</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu value="edit">
                                <MenubarTrigger>Edit</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>
                                        <Undo className="mr-2 h-4 w-4" />
                                        Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem>
                                        <Redo className="mr-2 h-4 w-4" />
                                        Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>
                                        <Scissors className="mr-2 h-4 w-4" />
                                        Cut <MenubarShortcut>⌘X</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem>
                                        <Copy className="mr-2 h-4 w-4" />
                                        Copy <MenubarShortcut>⌘C</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem>
                                        <Clipboard className="mr-2 h-4 w-4" />
                                        Paste <MenubarShortcut>⌘V</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem inset>Select All <MenubarShortcut>⌘A</MenubarShortcut></MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    }
                    code={`<Menubar>
    <MenubarMenu value="file">
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
            <MenubarItem>
                <File className="mr-2 h-4 w-4" />
                New File <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
                <FolderOpen className="mr-2 h-4 w-4" />
                Open <MenubarShortcut>⌘O</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
                <Save className="mr-2 h-4 w-4" />
                Save <MenubarShortcut>⌘S</MenubarShortcut>
            </MenubarItem>
            {/* Use inset to align with icon-bearing items */}
            <MenubarItem inset>
                Save As... <MenubarShortcut>⇧⌘S</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
                <Printer className="mr-2 h-4 w-4" />
                Print <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
        </MenubarContent>
    </MenubarMenu>
    <MenubarMenu value="edit">
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
            <MenubarItem>
                <Undo className="mr-2 h-4 w-4" />
                Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
                <Redo className="mr-2 h-4 w-4" />
                Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
                <Scissors className="mr-2 h-4 w-4" />
                Cut <MenubarShortcut>⌘X</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
                <Copy className="mr-2 h-4 w-4" />
                Copy <MenubarShortcut>⌘C</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
                <Clipboard className="mr-2 h-4 w-4" />
                Paste <MenubarShortcut>⌘V</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Select All <MenubarShortcut>⌘A</MenubarShortcut></MenubarItem>
        </MenubarContent>
    </MenubarMenu>
</Menubar>`}
                />
            </Section>

            <Section title="With Checkbox and Radio Items">
                <Example
                    className="justify-start"
                    preview={
                        <Menubar>
                            <MenubarMenu value="view">
                                <MenubarTrigger>View</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarCheckboxItem
                                        checked={showBookmarks}
                                        onCheckedChange={setShowBookmarks}
                                    >
                                        Show Bookmarks Bar
                                    </MenubarCheckboxItem>
                                    <MenubarSeparator />
                                    <MenubarRadioGroup value={view} onValueChange={setView}>
                                        <MenubarRadioItem value="grid">Grid View</MenubarRadioItem>
                                        <MenubarRadioItem value="list">List View</MenubarRadioItem>
                                        <MenubarRadioItem value="columns">Columns View</MenubarRadioItem>
                                    </MenubarRadioGroup>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    }
                    code={`const [showBookmarks, setShowBookmarks] = useState(true);
const [view, setView] = useState('grid');

<Menubar>
    <MenubarMenu value="view">
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
            <MenubarCheckboxItem
                checked={showBookmarks}
                onCheckedChange={setShowBookmarks}
            >
                Show Bookmarks Bar
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarRadioGroup value={view} onValueChange={setView}>
                <MenubarRadioItem value="grid">Grid View</MenubarRadioItem>
                <MenubarRadioItem value="list">List View</MenubarRadioItem>
            </MenubarRadioGroup>
        </MenubarContent>
    </MenubarMenu>
</Menubar>`}
                />
            </Section>
        </div>
    );
}
