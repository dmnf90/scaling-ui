import React, { useState } from 'react';
import {
    File, FolderOpen, Save, Printer, Copy, Scissors, Clipboard, Undo, Redo,
    Settings, Wrench, Code, List, Bookmark, History, Download, Minimize2, Maximize2,
    HelpCircle, Info, RefreshCw, FileText, FileOutput, LogOut, Search, Replace,
    Puzzle, Terminal, Bug, Monitor, PanelLeft, PanelRight
} from 'lucide-react';
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
    MenubarShortcut
} from '../../../src/index.js';
import { Section, Demo, Example, CodeBlock } from '../components';

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

            <Section title="Full Application Menubar (Mobile Scrollable)">
                <p className="text-muted-foreground mb-4">
                    On mobile devices, swipe horizontally to access all menu items. Submenus use a drill-down pattern with a back button.
                </p>
                <Demo>
                    <Menubar>
                        {/* File Menu */}
                        <MenubarMenu value="file">
                            <MenubarTrigger>File</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    <FileText className="mr-2 h-4 w-4" />
                                    New <MenubarShortcut>⌘N</MenubarShortcut>
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
                                <MenubarItem inset>Save As...</MenubarItem>
                                <MenubarSub>
                                    <MenubarSubTrigger>
                                        <FileOutput className="mr-2 h-4 w-4" />
                                        Export
                                    </MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem>Export as PDF</MenubarItem>
                                        <MenubarItem>Export as HTML</MenubarItem>
                                        <MenubarItem>Export as Markdown</MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                                <MenubarSeparator />
                                <MenubarItem>
                                    <Printer className="mr-2 h-4 w-4" />
                                    Print <MenubarShortcut>⌘P</MenubarShortcut>
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Exit
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>

                        {/* Edit Menu */}
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
                                <MenubarSub>
                                    <MenubarSubTrigger>
                                        <Search className="mr-2 h-4 w-4" />
                                        Find
                                    </MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem>
                                            Find... <MenubarShortcut>⌘F</MenubarShortcut>
                                        </MenubarItem>
                                        <MenubarItem>Find Next</MenubarItem>
                                        <MenubarItem>Find Previous</MenubarItem>
                                        <MenubarSeparator />
                                        <MenubarItem>
                                            <Replace className="mr-2 h-4 w-4" />
                                            Replace <MenubarShortcut>⌘H</MenubarShortcut>
                                        </MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                            </MenubarContent>
                        </MenubarMenu>

                        {/* Tools Menu */}
                        <MenubarMenu value="tools">
                            <MenubarTrigger>Tools</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Options
                                </MenubarItem>
                                <MenubarSub>
                                    <MenubarSubTrigger>
                                        <Puzzle className="mr-2 h-4 w-4" />
                                        Extensions
                                    </MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem>Manage Extensions</MenubarItem>
                                        <MenubarItem>Browse Extensions</MenubarItem>
                                        <MenubarSeparator />
                                        <MenubarItem>Install from File...</MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                                <MenubarSeparator />
                                <MenubarItem>
                                    <Terminal className="mr-2 h-4 w-4" />
                                    Terminal <MenubarShortcut>⌘`</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
                                    <Bug className="mr-2 h-4 w-4" />
                                    Debug Console
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>

                        {/* Lists Menu */}
                        <MenubarMenu value="lists">
                            <MenubarTrigger>Lists</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    <Bookmark className="mr-2 h-4 w-4" />
                                    Bookmarks <MenubarShortcut>⌘B</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
                                    <History className="mr-2 h-4 w-4" />
                                    History <MenubarShortcut>⌘Y</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>
                                    <Download className="mr-2 h-4 w-4" />
                                    Downloads <MenubarShortcut>⌘J</MenubarShortcut>
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>

                        {/* Window Menu */}
                        <MenubarMenu value="window">
                            <MenubarTrigger>Window</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    <Minimize2 className="mr-2 h-4 w-4" />
                                    Minimize
                                </MenubarItem>
                                <MenubarItem>
                                    <Maximize2 className="mr-2 h-4 w-4" />
                                    Maximize
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarSub>
                                    <MenubarSubTrigger>
                                        <Monitor className="mr-2 h-4 w-4" />
                                        New Window
                                    </MenubarSubTrigger>
                                    <MenubarSubContent>
                                        <MenubarItem>Default Window</MenubarItem>
                                        <MenubarItem>Incognito Window</MenubarItem>
                                        <MenubarItem>Guest Window</MenubarItem>
                                    </MenubarSubContent>
                                </MenubarSub>
                                <MenubarSeparator />
                                <MenubarItem>
                                    <PanelLeft className="mr-2 h-4 w-4" />
                                    Show Sidebar
                                </MenubarItem>
                                <MenubarItem>
                                    <PanelRight className="mr-2 h-4 w-4" />
                                    Show Panel
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>

                        {/* Help Menu */}
                        <MenubarMenu value="help">
                            <MenubarTrigger>Help</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    <HelpCircle className="mr-2 h-4 w-4" />
                                    Documentation
                                </MenubarItem>
                                <MenubarItem>
                                    <Code className="mr-2 h-4 w-4" />
                                    API Reference
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Check for Updates
                                </MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>
                                    <Info className="mr-2 h-4 w-4" />
                                    About
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </Demo>
            </Section>
        </div>
    );
}
