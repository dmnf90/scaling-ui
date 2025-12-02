import React, { useState } from 'react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
    DialogAction,
    DialogCancel,
    Button,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Input,
    Label
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

export default function DialogPage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Dialog</h1>
                <p className="text-lg text-muted-foreground">
                    A modal dialog that overlays content with composable parts.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <Example
                    preview={
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">Open Dialog</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Welcome</DialogTitle>
                                    <DialogDescription>
                                        This is a basic dialog with a title and description.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button>Confirm</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    }
                    code={`<Dialog>
    <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Welcome</DialogTitle>
            <DialogDescription>
                This is a basic dialog with a title and description.
            </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button>Confirm</Button>
        </DialogFooter>
    </DialogContent>
</Dialog>`}
                />
            </Section>

            <Section title="With Form">
                <Example
                    preview={
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Edit Profile</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogClose />
                                <DialogHeader>
                                    <DialogTitle>Edit Profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. Click save when done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" defaultValue="John Doe" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" defaultValue="john@example.com" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    }
                    code={`<Dialog>
    <DialogTrigger asChild>
        <Button>Edit Profile</Button>
    </DialogTrigger>
    <DialogContent>
        <DialogClose />
        <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
                Make changes to your profile here.
            </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="John Doe" />
            </div>
        </div>
        <DialogFooter>
            <Button type="submit">Save changes</Button>
        </DialogFooter>
    </DialogContent>
</Dialog>`}
                />
            </Section>

            <Section title="Alert Dialog (Delete Account)">
                <p className="text-muted-foreground mb-4">
                    Use <code className="text-sm bg-muted px-1 py-0.5 rounded">dismissible=&#123;false&#125;</code> on the Dialog component to create an alert dialog that requires explicit user action and cannot be dismissed by clicking outside or pressing Escape.
                </p>
                <Example
                    preview={
                        <Dialog dismissible={false}>
                            <DialogTrigger asChild>
                                <Button variant="destructive">Delete Account</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete your
                                        account and remove all of your data from our servers.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogCancel>Cancel</DialogCancel>
                                    <DialogAction variant="destructive">Yes, delete my account</DialogAction>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    }
                    code={`<Dialog dismissible={false}>
    <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove all of your data from our servers.
            </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <DialogCancel>Cancel</DialogCancel>
            <DialogAction variant="destructive">Yes, delete my account</DialogAction>
        </DialogFooter>
    </DialogContent>
</Dialog>`}
                />
            </Section>
        </div>
    );
}
