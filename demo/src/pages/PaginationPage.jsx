import React, { useState } from 'react';
import { Pagination } from '../../../src/index.js';
import { Section, Demo, Example, CodeBlock } from '../components';

export default function PaginationPage() {
    const [currentPageSimple, setCurrentPageSimple] = useState(1);
    const [currentPageFull, setCurrentPageFull] = useState(1);

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Pagination</h1>
                <p className="text-lg text-muted-foreground">
                    Pagination with page navigation in simple and full variants.
                </p>
            </div>

            <Section title="Installation">
                <CodeBlock code={`import { Pagination } from 'scaling-ui';`} />
            </Section>

            <Section title="Simple Variant">
                <Example
                    className="justify-center"
                    preview={
                        <Pagination
                            variant="simple"
                            currentPage={currentPageSimple}
                            totalPages={10}
                            onPageChange={setCurrentPageSimple}
                        />
                    }
                    code={`const [currentPage, setCurrentPage] = useState(1);

<Pagination
    variant="simple"
    currentPage={currentPage}
    totalPages={10}
    onPageChange={setCurrentPage}
/>`}
                />
            </Section>

            <Section title="Full Variant">
                <Example
                    className="justify-center"
                    preview={
                        <Pagination
                            variant="full"
                            currentPage={currentPageFull}
                            totalPages={10}
                            onPageChange={setCurrentPageFull}
                        />
                    }
                    code={`const [currentPage, setCurrentPage] = useState(1);

<Pagination
    variant="full"
    currentPage={currentPage}
    totalPages={10}
    onPageChange={setCurrentPage}
/>`}
                />
            </Section>

            <Section title="Without First/Last Buttons">
                <Example
                    className="justify-center"
                    preview={
                        <Pagination
                            variant="full"
                            currentPage={5}
                            totalPages={10}
                            onPageChange={() => {}}
                            showFirstLast={false}
                        />
                    }
                    code={`<Pagination
    variant="full"
    currentPage={5}
    totalPages={10}
    onPageChange={handlePageChange}
    showFirstLast={false}
/>`}
                />
            </Section>

            <Section title="Custom Siblings Count">
                <Example
                    className="justify-center"
                    preview={
                        <Pagination
                            variant="full"
                            currentPage={5}
                            totalPages={20}
                            onPageChange={() => {}}
                            siblingCount={2}
                        />
                    }
                    code={`<Pagination
    variant="full"
    currentPage={5}
    totalPages={20}
    onPageChange={handlePageChange}
    siblingCount={2}
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
                                <td className="p-4 font-mono text-sm">variant</td>
                                <td className="p-4 text-sm text-muted-foreground">'simple' | 'full'</td>
                                <td className="p-4 text-sm">'full'</td>
                                <td className="p-4 text-sm">Pagination variant</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">currentPage</td>
                                <td className="p-4 text-sm text-muted-foreground">number</td>
                                <td className="p-4 text-sm">1</td>
                                <td className="p-4 text-sm">Current active page</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">totalPages</td>
                                <td className="p-4 text-sm text-muted-foreground">number</td>
                                <td className="p-4 text-sm">1</td>
                                <td className="p-4 text-sm">Total number of pages</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">onPageChange</td>
                                <td className="p-4 text-sm text-muted-foreground">function</td>
                                <td className="p-4 text-sm">-</td>
                                <td className="p-4 text-sm">Called when page changes</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">showFirstLast</td>
                                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                                <td className="p-4 text-sm">true</td>
                                <td className="p-4 text-sm">Show first/last page buttons (full variant only)</td>
                            </tr>
                            <tr className="border-t border-border">
                                <td className="p-4 font-mono text-sm">siblingCount</td>
                                <td className="p-4 text-sm text-muted-foreground">number</td>
                                <td className="p-4 text-sm">1</td>
                                <td className="p-4 text-sm">Number of siblings to show on each side (full variant only)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Section>
        </div>
    );
}
