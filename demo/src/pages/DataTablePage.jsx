import React from 'react';
import {
    DataTable, Badge
} from '../../../src/index.js';
import { Section, Demo, Example, CodeBlock } from '../components';

const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Editor', status: 'Active' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Pending' },
    { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'Active' },
    { id: 7, name: 'Edward Norton', email: 'edward@example.com', role: 'User', status: 'Inactive' },
    { id: 8, name: 'Fiona Apple', email: 'fiona@example.com', role: 'Editor', status: 'Active' },
    { id: 9, name: 'George Lucas', email: 'george@example.com', role: 'User', status: 'Active' },
    { id: 10, name: 'Hannah Montana', email: 'hannah@example.com', role: 'User', status: 'Pending' },
    { id: 11, name: 'Ivan Drago', email: 'ivan@example.com', role: 'User', status: 'Inactive' },
    { id: 12, name: 'Julia Roberts', email: 'julia@example.com', role: 'Admin', status: 'Active' },
];

const userColumns = [
    { id: 'name', header: 'Name', accessor: 'name' },
    { id: 'email', header: 'Email', accessor: 'email' },
    { id: 'role', header: 'Role', accessor: 'role' },
    {
        id: 'status',
        header: 'Status',
        accessor: 'status',
        cell: ({ value }) => {
            const variant = value === 'Active' ? 'success' : value === 'Pending' ? 'warning' : 'secondary';
            return <Badge variant={variant}>{value}</Badge>;
        },
    },
];

const payments = [
    { id: 'PAY-001', customer: 'John Doe', amount: 250.00, date: '2024-01-15', status: 'Completed' },
    { id: 'PAY-002', customer: 'Jane Smith', amount: 150.00, date: '2024-01-14', status: 'Completed' },
    { id: 'PAY-003', customer: 'Bob Johnson', amount: 350.00, date: '2024-01-13', status: 'Pending' },
    { id: 'PAY-004', customer: 'Alice Williams', amount: 450.00, date: '2024-01-12', status: 'Completed' },
    { id: 'PAY-005', customer: 'Charlie Brown', amount: 550.00, date: '2024-01-11', status: 'Failed' },
];

const paymentColumns = [
    { id: 'id', header: 'ID', accessor: 'id' },
    { id: 'customer', header: 'Customer', accessor: 'customer' },
    {
        id: 'amount',
        header: 'Amount',
        accessor: (row) => `$${row.amount.toFixed(2)}`,
    },
    { id: 'date', header: 'Date', accessor: 'date' },
    {
        id: 'status',
        header: 'Status',
        accessor: 'status',
        cell: ({ value }) => {
            const variant = value === 'Completed' ? 'success' : value === 'Pending' ? 'warning' : 'destructive';
            return <Badge variant={variant}>{value}</Badge>;
        },
    },
];

export default function DataTablePage() {
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Data Table</h1>
                <p className="text-lg text-muted-foreground">
                    A powerful data table with sorting, filtering, pagination, and column visibility.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { DataTable } from 'scaling-ui';`} />
            </Section>

            <Section title="Basic Usage">
                <p className="text-muted-foreground mb-4">
                    A data table with all features enabled by default.
                </p>
                <Example
                    preview={
                        <DataTable
                            data={users}
                            columns={userColumns}
                            pageSize={5}
                        />
                    }
                    code={`const columns = [
    { id: 'name', header: 'Name', accessor: 'name' },
    { id: 'email', header: 'Email', accessor: 'email' },
    { id: 'role', header: 'Role', accessor: 'role' },
    {
        id: 'status',
        header: 'Status',
        accessor: 'status',
        cell: ({ value }) => <Badge variant={...}>{value}</Badge>,
    },
];

<DataTable
    data={users}
    columns={columns}
    pageSize={5}
/>`}
                />
            </Section>

            <Section title="Sorting">
                <p className="text-muted-foreground mb-4">
                    Click column headers to sort. Click again to toggle between ascending, descending, and no sort.
                </p>
                <Example
                    preview={
                        <DataTable
                            data={payments}
                            columns={paymentColumns}
                            pagination={false}
                            filterable={false}
                            columnVisibility={false}
                        />
                    }
                    code={`<DataTable
    data={payments}
    columns={paymentColumns}
    pagination={false}
    filterable={false}
    columnVisibility={false}
/>`}
                />
            </Section>

            <Section title="Filtering">
                <p className="text-muted-foreground mb-4">
                    Use the search input to filter rows across all columns.
                </p>
                <Example
                    preview={
                        <DataTable
                            data={users.slice(0, 6)}
                            columns={userColumns}
                            pagination={false}
                            columnVisibility={false}
                        />
                    }
                    code={`<DataTable
    data={users}
    columns={columns}
    pagination={false}
    columnVisibility={false}
/>`}
                />
            </Section>

            <Section title="Column Visibility">
                <p className="text-muted-foreground mb-4">
                    Use the columns dropdown to show/hide specific columns.
                </p>
                <Example
                    preview={
                        <DataTable
                            data={users.slice(0, 5)}
                            columns={userColumns}
                            pagination={false}
                            filterable={false}
                        />
                    }
                    code={`<DataTable
    data={users}
    columns={columns}
    pagination={false}
    filterable={false}
/>`}
                />
            </Section>

            <Section title="Custom Cell Rendering">
                <p className="text-muted-foreground mb-4">
                    Use the cell property in column definitions to customize how data is rendered.
                </p>
                <Example
                    preview={
                        <DataTable
                            data={payments}
                            columns={paymentColumns}
                            pageSize={5}
                        />
                    }
                    code={`const columns = [
    { id: 'id', header: 'ID', accessor: 'id' },
    { id: 'customer', header: 'Customer', accessor: 'customer' },
    {
        id: 'amount',
        header: 'Amount',
        accessor: (row) => \`$\${row.amount.toFixed(2)}\`,  // Custom accessor
    },
    {
        id: 'status',
        header: 'Status',
        accessor: 'status',
        cell: ({ value }) => {  // Custom cell render
            const variant = value === 'Completed' ? 'success' : 'warning';
            return <Badge variant={variant}>{value}</Badge>;
        },
    },
];`}
                />
            </Section>

            <Section title="Disable Features">
                <p className="text-muted-foreground mb-4">
                    Disable specific features as needed.
                </p>
                <Example
                    preview={
                        <DataTable
                            data={users.slice(0, 5)}
                            columns={userColumns.map(col => ({ ...col, sortable: false }))}
                            pagination={false}
                            filterable={false}
                            columnVisibility={false}
                        />
                    }
                    code={`<DataTable
    data={users}
    columns={columns}
    pagination={false}
    filterable={false}
    columnVisibility={false}
/>`}
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
                                <td className="p-4 font-mono text-sm">data</td>
                                <td className="p-4 text-sm text-muted-foreground">array</td>
                                <td className="p-4 text-sm">[]</td>
                                <td className="p-4 text-sm">Array of row data objects</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">columns</td>
                                <td className="p-4 text-sm text-muted-foreground">array</td>
                                <td className="p-4 text-sm">[]</td>
                                <td className="p-4 text-sm">Column definitions</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">pagination</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">true</td>
                                <td className="p-4 text-sm">Enable pagination</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">pageSize</td>
                                <td className="p-4 text-sm text-muted-foreground">number</td>
                                <td className="p-4 text-sm">10</td>
                                <td className="p-4 text-sm">Rows per page</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">filterable</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">true</td>
                                <td className="p-4 text-sm">Enable search filter</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">columnVisibility</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">true</td>
                                <td className="p-4 text-sm">Enable column visibility toggle</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>

            <Section title="Column Definition">
                <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-muted">
                            <tr>
                                <th className="text-left p-4 font-semibold">Property</th>
                                <th className="text-left p-4 font-semibold">Type</th>
                                <th className="text-left p-4 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">id</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">Unique column identifier</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">header</td>
                                <td className="p-4 text-sm text-muted-foreground">string</td>
                                <td className="p-4 text-sm">Column header text</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">accessor</td>
                                <td className="p-4 text-sm text-muted-foreground">string | function</td>
                                <td className="p-4 text-sm">Data key or accessor function</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">cell</td>
                                <td className="p-4 text-sm text-muted-foreground">function</td>
                                <td className="p-4 text-sm">Custom cell render function</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">sortable</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">Enable sorting (default: true)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
