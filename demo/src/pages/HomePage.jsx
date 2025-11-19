import React from 'react';

export default function HomePage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Scaling Components</h1>
      <p className="text-xl text-muted-foreground mb-8">
        A minimal, clean React component library built with Tailwind CSS
      </p>

      <div className="prose prose-slate">
        <h2>Getting Started</h2>
        <p>
          This is a component library designed to be simple, minimal, and easy to use.
          Import components directly and they're ready to go.
        </p>

        <h3>Installation</h3>
        <pre className="bg-muted p-4 rounded-lg">
          <code>npm install scaling-components</code>
        </pre>

        <h3>Usage</h3>
        <pre className="bg-muted p-4 rounded-lg">
          <code>{`import { Button } from 'scaling-components';
import 'scaling-components/styles.css';

function App() {
  return <Button>Click me</Button>;
}`}</code>
        </pre>

        <h3>Features</h3>
        <ul>
          <li>Built with React and Tailwind CSS</li>
          <li>Simple, dumb components - no context required</li>
          <li>Minimal, clean design inspired by Shadcn and Vercel</li>
          <li>Easy to use - just import and go</li>
          <li>Fully customizable with Tailwind classes</li>
        </ul>

        <p className="mt-8 text-sm text-muted-foreground">
          Browse the components in the sidebar to see examples and usage.
        </p>
      </div>
    </div>
  );
}
