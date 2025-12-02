import React from 'react';
import {
    Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption
} from '../../../src/index.js';
import { Section, Demo, Example, CodeBlock } from '../components';

const invoices = [
    { invoice: 'INV001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
    { invoice: 'INV002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
    { invoice: 'INV003', status: 'Unpaid', method: 'Bank Transfer', amount: '$350.00' },
    { invoice: 'INV004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
    { invoice: 'INV005', status: 'Paid', method: 'PayPal', amount: '$550.00' },
];

export default function TablePage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Table</h1>
                <p className="text-lg text-muted-foreground">
                    A responsive table component for displaying data in rows and columns.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <p className="text-muted-foreground mb-4">
                    A basic table with header and body rows.
                </p>
                <Example
                    preview={
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>John Doe</TableCell>
                                    <TableCell>john@example.com</TableCell>
                                    <TableCell>Admin</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Jane Smith</TableCell>
                                    <TableCell>jane@example.com</TableCell>
                                    <TableCell>User</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Bob Johnson</TableCell>
                                    <TableCell>bob@example.com</TableCell>
                                    <TableCell>User</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    }
                    code={`<Table>
    <TableHeader>
        <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane@example.com</TableCell>
            <TableCell>User</TableCell>
        </TableRow>
    </TableBody>
</Table>`}
                />
            </Section>

            <Section title="With Caption">
                <p className="text-muted-foreground mb-4">
                    Add a caption to describe the table contents.
                </p>
                <Example
                    preview={
                        <Table>
                            <TableCaption>A list of recent invoices.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Invoice</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoices.map((invoice) => (
                                    <TableRow key={invoice.invoice}>
                                        <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                        <TableCell>{invoice.status}</TableCell>
                                        <TableCell>{invoice.method}</TableCell>
                                        <TableCell className="text-right">{invoice.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    }
                    code={`<Table>
    <TableCaption>A list of recent invoices.</TableCaption>
    <TableHeader>
        <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>{invoice.method}</TableCell>
                <TableCell className="text-right">{invoice.amount}</TableCell>
            </TableRow>
        ))}
    </TableBody>
</Table>`}
                />
            </Section>

            <Section title="With Footer">
                <p className="text-muted-foreground mb-4">
                    Add a footer row for totals or summaries.
                </p>
                <Example
                    preview={
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Invoice</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoices.map((invoice) => (
                                    <TableRow key={invoice.invoice}>
                                        <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                        <TableCell>{invoice.status}</TableCell>
                                        <TableCell>{invoice.method}</TableCell>
                                        <TableCell className="text-right">{invoice.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={3}>Total</TableCell>
                                    <TableCell className="text-right">$1,750.00</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    }
                    code={`<Table>
    <TableHeader>
        <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
                <TableCell>{invoice.invoice}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>{invoice.method}</TableCell>
                <TableCell className="text-right">{invoice.amount}</TableCell>
            </TableRow>
        ))}
    </TableBody>
    <TableFooter>
        <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$1,750.00</TableCell>
        </TableRow>
    </TableFooter>
</Table>`}
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
                                <td className="p-4 font-mono text-sm">Table</td>
                                <td className="p-4 text-sm">Root table container with overflow handling</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">TableHeader</td>
                                <td className="p-4 text-sm">Table header section (thead)</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">TableBody</td>
                                <td className="p-4 text-sm">Table body section (tbody)</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">TableFooter</td>
                                <td className="p-4 text-sm">Table footer section (tfoot)</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">TableRow</td>
                                <td className="p-4 text-sm">Table row with hover state</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">TableHead</td>
                                <td className="p-4 text-sm">Table header cell (th)</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">TableCell</td>
                                <td className="p-4 text-sm">Table data cell (td)</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">TableCaption</td>
                                <td className="p-4 text-sm">Table caption for description</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
