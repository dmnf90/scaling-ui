import React, { useState } from 'react';
import {
    Command,
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandSeparator,
    CommandShortcut,
    Button,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from '../../../src/index.js';
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
    Mail,
    MessageSquare,
    PlusCircle,
    UserPlus,
    Users
} from 'lucide-react';

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

export default function CommandPage() {
    const [open, setOpen] = useState(false);
    const [selectedAction, setSelectedAction] = useState('');

    const handleAction = (action) => {
        console.log('Command action:', action);
        setSelectedAction(action);
    };

    const handleDialogAction = (action) => {
        console.log('Dialog command action:', action);
        setSelectedAction(action);
        setOpen(false);
    };

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Command</h1>
                <p className="text-lg text-muted-foreground">
                    Fast, composable command menu with search and keyboard navigation. Use inline or as a dialog.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import {
    Command,
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandSeparator,
    CommandShortcut
} from 'scaling-ui';`} />
            </Section>

            <Section title="Inline Usage">
                <p className="text-muted-foreground mb-4">
                    The Command component can be embedded directly in your page. Try searching for "calendar" or "profile".
                </p>
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-md">
                            <Command className="border border-border rounded-lg shadow-md">
                                <CommandInput placeholder="Type a command or search..." />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    <CommandGroup heading="Suggestions">
                                        <CommandItem onSelect={() => handleAction('calendar')}>
                                            <Calendar className="mr-2 h-4 w-4" />
                                            <span>Calendar</span>
                                        </CommandItem>
                                        <CommandItem onSelect={() => handleAction('search-emoji')}>
                                            <Smile className="mr-2 h-4 w-4" />
                                            <span>Search Emoji</span>
                                        </CommandItem>
                                        <CommandItem onSelect={() => handleAction('calculator')}>
                                            <Calculator className="mr-2 h-4 w-4" />
                                            <span>Calculator</span>
                                        </CommandItem>
                                    </CommandGroup>
                                    <CommandSeparator />
                                    <CommandGroup heading="Settings">
                                        <CommandItem
                                            onSelect={() => handleAction('profile')}
                                            shortcut="ctrl+p"
                                        >
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </CommandItem>
                                        <CommandItem
                                            onSelect={() => handleAction('billing')}
                                            shortcut="ctrl+b"
                                        >
                                            <CreditCard className="mr-2 h-4 w-4" />
                                            <span>Billing</span>
                                        </CommandItem>
                                        <CommandItem
                                            onSelect={() => handleAction('settings')}
                                            shortcut="ctrl+,"
                                        >
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Settings</span>
                                        </CommandItem>
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                            {selectedAction && (
                                <p className="mt-4 text-sm text-muted-foreground">
                                    Selected: <span className="font-medium text-foreground">{selectedAction}</span>
                                    <span className="text-xs ml-2">(check console)</span>
                                </p>
                            )}
                        </div>
                    }
                    code={`const handleAction = (action) => {
    console.log('Command action:', action);
};

<Command className="border border-border rounded-lg shadow-md">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => handleAction('calendar')}>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Calendar</span>
            </CommandItem>
            <CommandItem onSelect={() => handleAction('search-emoji')}>
                <Smile className="mr-2 h-4 w-4" />
                <span>Search Emoji</span>
            </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
            <CommandItem
                onSelect={() => handleAction('profile')}
                shortcut="ctrl+p"
            >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
            </CommandItem>
            <CommandItem
                onSelect={() => handleAction('settings')}
                shortcut="ctrl+,"
            >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
            </CommandItem>
        </CommandGroup>
    </CommandList>
</Command>`}
                />
            </Section>

            <Section title="Dialog Mode">
                <p className="text-muted-foreground mb-4">
                    Use CommandDialog for a modal command palette. Press <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">Ctrl+K</kbd> or <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">Cmd+K</kbd> to toggle.
                </p>
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full">
                            <p className="text-sm text-muted-foreground mb-4">
                                Press <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">Ctrl+K</kbd> or click the button below:
                            </p>
                            <Button onClick={() => setOpen(true)}>
                                Open Command Palette
                            </Button>
                            <CommandDialog open={open} onOpenChange={setOpen}>
                                <CommandInput placeholder="Type a command or search..." />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    <CommandGroup heading="Actions">
                                        <CommandItem
                                            onSelect={() => handleDialogAction('new-email')}
                                            shortcut="ctrl+n"
                                        >
                                            <Mail className="mr-2 h-4 w-4" />
                                            <span>New Email</span>
                                        </CommandItem>
                                        <CommandItem onSelect={() => handleDialogAction('new-message')}>
                                            <MessageSquare className="mr-2 h-4 w-4" />
                                            <span>New Message</span>
                                        </CommandItem>
                                        <CommandItem onSelect={() => handleDialogAction('new-task')}>
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            <span>New Task</span>
                                        </CommandItem>
                                    </CommandGroup>
                                    <CommandSeparator />
                                    <CommandGroup heading="Team">
                                        <CommandItem onSelect={() => handleDialogAction('invite-user')}>
                                            <UserPlus className="mr-2 h-4 w-4" />
                                            <span>Invite User</span>
                                        </CommandItem>
                                        <CommandItem onSelect={() => handleDialogAction('manage-team')}>
                                            <Users className="mr-2 h-4 w-4" />
                                            <span>Manage Team</span>
                                        </CommandItem>
                                    </CommandGroup>
                                </CommandList>
                            </CommandDialog>
                            {selectedAction && (
                                <p className="mt-4 text-sm text-muted-foreground">
                                    Last action: <span className="font-medium text-foreground">{selectedAction}</span>
                                    <span className="text-xs ml-2">(check console)</span>
                                </p>
                            )}
                        </div>
                    }
                    code={`const [open, setOpen] = useState(false);

const handleAction = (action) => {
    console.log('Command action:', action);
    setOpen(false);
};

<Button onClick={() => setOpen(true)}>
    Open Command Palette
</Button>

<CommandDialog open={open} onOpenChange={setOpen}>
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
            <CommandItem
                onSelect={() => handleAction('new-email')}
                shortcut="ctrl+n"
            >
                <Mail className="mr-2 h-4 w-4" />
                <span>New Email</span>
            </CommandItem>
            <CommandItem onSelect={() => handleAction('new-message')}>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>New Message</span>
            </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Team">
            <CommandItem onSelect={() => handleAction('invite-user')}>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Invite User</span>
            </CommandItem>
        </CommandGroup>
    </CommandList>
</CommandDialog>`}
                />
            </Section>

            <Section title="Disabled Items">
                <p className="text-muted-foreground mb-4">
                    Items can be disabled to prevent selection.
                </p>
                <Example
                    className="flex-col items-start"
                    preview={
                        <div className="w-full max-w-md">
                            <Command className="border border-border rounded-lg shadow-md">
                                <CommandInput placeholder="Search actions..." />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    <CommandGroup heading="Actions">
                                        <CommandItem onSelect={() => handleAction('send-email')}>
                                            <Mail className="mr-2 h-4 w-4" />
                                            <span>Send Email</span>
                                        </CommandItem>
                                        <CommandItem disabled>
                                            <MessageSquare className="mr-2 h-4 w-4" />
                                            <span>Send Message (Unavailable)</span>
                                        </CommandItem>
                                        <CommandItem onSelect={() => handleAction('schedule-meeting')}>
                                            <Calendar className="mr-2 h-4 w-4" />
                                            <span>Schedule Meeting</span>
                                        </CommandItem>
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </div>
                    }
                    code={`<Command>
    <CommandInput placeholder="Search actions..." />
    <CommandList>
        <CommandGroup heading="Actions">
            <CommandItem onSelect={() => handleAction('send-email')}>
                <Mail className="mr-2 h-4 w-4" />
                <span>Send Email</span>
            </CommandItem>
            <CommandItem disabled>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Send Message (Unavailable)</span>
            </CommandItem>
        </CommandGroup>
    </CommandList>
</Command>`}
                />
            </Section>

            <Section title="Props">
                <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-muted">
                            <tr>
                                <th className="text-left p-4 font-semibold">Component</th>
                                <th className="text-left p-4 font-semibold">Prop</th>
                                <th className="text-left p-4 font-semibold">Type</th>
                                <th className="text-left p-4 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">Command</td>
                                <td className="p-4 font-mono text-sm">filter</td>
                                <td className="p-4 text-sm text-muted-foreground">function</td>
                                <td className="p-4 text-sm">Custom filter function (value, search) =&gt; boolean</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">CommandDialog</td>
                                <td className="p-4 font-mono text-sm">open</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">Whether the dialog is open</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">CommandDialog</td>
                                <td className="p-4 font-mono text-sm">onOpenChange</td>
                                <td className="p-4 text-sm text-muted-foreground">function</td>
                                <td className="p-4 text-sm">Called when open state changes</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">CommandInput</td>
                                <td className="p-4 font-mono text-sm">placeholder</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">Placeholder text for the search input</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">CommandGroup</td>
                                <td className="p-4 font-mono text-sm">heading</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">Group heading text</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">CommandItem</td>
                                <td className="p-4 font-mono text-sm">onSelect</td>
                                <td className="p-4 text-sm text-muted-foreground">function</td>
                                <td className="p-4 text-sm">Called when the item is selected</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">CommandItem</td>
                                <td className="p-4 font-mono text-sm">shortcut</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">Keyboard shortcut (e.g., "ctrl+p", "ctrl+shift+n")</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">CommandItem</td>
                                <td className="p-4 font-mono text-sm">disabled</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">Disable the item</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">CommandItem</td>
                                <td className="p-4 font-mono text-sm">value</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">Value used for filtering (defaults to text content)</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">CommandItem</td>
                                <td className="p-4 font-mono text-sm">keywords</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">Additional keywords for search matching</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="Keyboard Navigation">
                <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-muted">
                            <tr>
                                <th className="text-left p-4 font-semibold">Key</th>
                                <th className="text-left p-4 font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-border">
                                <td className="p-4"><kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">Ctrl+K</kbd> / <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">Cmd+K</kbd></td>
                                <td className="p-4 text-sm">Toggle the command dialog</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4"><kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">Arrow Up/Down</kbd></td>
                                <td className="p-4 text-sm">Navigate between items</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4"><kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">Enter</kbd></td>
                                <td className="p-4 text-sm">Select the highlighted item</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4"><kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">Escape</kbd></td>
                                <td className="p-4 text-sm">Close the dialog</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4"><kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">Home/End</kbd></td>
                                <td className="p-4 text-sm">Jump to first/last item</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4"><kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">Custom shortcut</kbd></td>
                                <td className="p-4 text-sm">Items with <code className="text-xs bg-muted px-1 rounded">shortcut</code> prop respond to that key combination</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
