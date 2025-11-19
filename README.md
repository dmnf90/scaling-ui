# Scaling Components

A minimal, clean React component library built with Tailwind CSS v4. Designed to be simple and easy to use - just import and go.

## Features

- Built with React 18 and Tailwind CSS v4
- Simple, dumb components with no context dependencies
- Minimal, clean design inspired by Shadcn UI and Vercel
- Easy to use - import components and they're ready to go
- Fully customizable with Tailwind classes
- ESM module format for modern bundlers
- Tree-shakeable for optimal bundle size

## Installation

```bash
npm install scaling-components
```

## Usage

Import the components and styles:

```jsx
import { Button } from 'scaling-components';
import 'scaling-components/styles.css';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
    </div>
  );
}
```

## Available Components

### Core Components
- Button
- Input
- Label
- Textarea
- Select
- Checkbox
- Radio Group
- Switch

### Layout Components
- Card
- Separator
- Tabs
- Accordion

### Feedback Components
- Alert
- Toast
- Badge
- Spinner
- Progress
- Skeleton

### Navigation Components
- Breadcrumb
- Navigation Menu
- Pagination
- Sidebar

### Overlay Components
- Dialog
- Drawer
- Popover
- Tooltip
- Dropdown Menu

And many more! See the [component list](./TODO.md) for all available components.

## Development

### Setup

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd scaling-components
npm install
```

### Running the demo app

```bash
npm run dev
```

This will start the demo application at `http://localhost:5173` where you can see all components in action.

### Building the library

```bash
npm run build
```

This will build the library to the `dist` folder, ready for publishing.

### Project Structure

```
/src
  /components       # All UI components
    /Button
    /Input
    ...
  /lib             # Utilities and helpers
  index.js         # Main library export
  styles.css       # Tailwind CSS styles

/demo
  /src
    /pages         # Component demo pages
    App.jsx        # Demo app with routing
    main.jsx       # Demo entry point
  index.html       # Demo HTML
```

## Design Principles

1. **Dumb Components**: All components are pure and stateless where possible, using only props (no context)
2. **Minimal Design**: Clean, simple aesthetic inspired by the best modern UI libraries
3. **Tailwind First**: All styling done with Tailwind CSS utilities
4. **Easy to Use**: Import and use immediately - no complex setup required
5. **Composable**: Components work well together and can be easily combined

## Contributing

Contributions are welcome! Please see the [TODO.md](./TODO.md) file for components that need implementation.

## License

MIT
