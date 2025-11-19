import React from 'react';
import { Button } from '../../../src/components/Button/Button';

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
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-6">
      <code className="text-sm">{code}</code>
    </pre>
  );
}

function Demo({ children, className = '' }) {
  return (
    <div className={`flex flex-wrap gap-4 items-center p-6 border border-border rounded-lg mb-4 ${className}`}>
      {children}
    </div>
  );
}

export default function ButtonPage() {
  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Button</h1>
        <p className="text-lg text-muted-foreground">
          A versatile button component with multiple variants, sizes, and states.
        </p>
      </div>

      <Section title="Installation">
        <CodeBlock code={`import { Button } from 'scaling-components';`} />
      </Section>

      <Section title="Variants">
        <p className="text-muted-foreground mb-4">
          The button comes in 6 different variants for different use cases.
        </p>
        <Demo>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </Demo>
        <CodeBlock
          code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}
        />
      </Section>

      <Section title="Sizes">
        <p className="text-muted-foreground mb-4">
          Three different sizes are available: small, medium (default), and large.
        </p>
        <Demo className="items-end">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Button>
        </Demo>
        <CodeBlock
          code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="icon">⟩</Button>`}
        />
      </Section>

      <Section title="States">
        <p className="text-muted-foreground mb-4">
          Buttons can be disabled or show a loading state.
        </p>
        <Demo>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button loading variant="outline">
            Loading
          </Button>
        </Demo>
        <CodeBlock
          code={`<Button disabled>Disabled</Button>
<Button loading>Loading</Button>
<Button loading variant="outline">Loading</Button>`}
        />
      </Section>

      <Section title="With Icons">
        <p className="text-muted-foreground mb-4">
          Buttons can include icons alongside text for better visual communication.
        </p>
        <Demo>
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Add Item
          </Button>
          <Button variant="outline">
            Download
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
          </Button>
        </Demo>
        <CodeBlock
          code={`<Button>
  <PlusIcon />
  Add Item
</Button>
<Button variant="outline">
  Download
  <DownloadIcon />
</Button>`}
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
                <td className="p-4 text-sm text-muted-foreground">
                  'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
                </td>
                <td className="p-4 text-sm">'primary'</td>
                <td className="p-4 text-sm">Visual style variant</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-4 font-mono text-sm">size</td>
                <td className="p-4 text-sm text-muted-foreground">
                  'sm' | 'md' | 'lg' | 'icon'
                </td>
                <td className="p-4 text-sm">'md'</td>
                <td className="p-4 text-sm">Size variant</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-4 font-mono text-sm">disabled</td>
                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                <td className="p-4 text-sm">false</td>
                <td className="p-4 text-sm">Whether the button is disabled</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-4 font-mono text-sm">loading</td>
                <td className="p-4 text-sm text-muted-foreground">boolean</td>
                <td className="p-4 text-sm">false</td>
                <td className="p-4 text-sm">Show loading spinner</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-4 font-mono text-sm">className</td>
                <td className="p-4 text-sm text-muted-foreground">string</td>
                <td className="p-4 text-sm">-</td>
                <td className="p-4 text-sm">Additional CSS classes</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-4 font-mono text-sm">onClick</td>
                <td className="p-4 text-sm text-muted-foreground">function</td>
                <td className="p-4 text-sm">-</td>
                <td className="p-4 text-sm">Click handler</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Examples">
        <p className="text-muted-foreground mb-4">Real-world usage examples</p>
        <Demo className="flex-col items-start">
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button className="flex-1">Save Changes</Button>
          </div>
          <div className="flex gap-2 w-full">
            <Button variant="destructive">Delete Account</Button>
          </div>
          <div className="flex gap-2 w-full">
            <Button variant="ghost" size="sm">
              Skip
            </Button>
            <Button variant="primary" size="sm">
              Continue
            </Button>
          </div>
        </Demo>
      </Section>
    </div>
  );
}
