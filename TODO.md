# Scaling Components - Implementation Roadmap

## Project Status
This is a component library built with React and Tailwind CSS v4, designed to be minimal, clean, and easy to use - similar to Shadcn UI but with a Reactstrap-like usage pattern.

## Bootstrap Phase
- [x] Initialize project structure
- [x] Setup Vite configuration
- [x] Setup Tailwind CSS v4
- [x] Create demo application with React Router
- [x] Implement Button component (example)

## Components to Implement

### Priority 1: Core Components (Most Used)
- [x] Button
- [x] Input
- [x] Label
- [x] Textarea
- [x] Select
- [x] Checkbox
- [x] Radio Group
- [x] Switch
- [x] Card
- [x] Badge
- [x] Separator
- [x] Spinner

### Priority 2: Form & Input Components
- [x] Form
- [x] Field
- [x] Input Group
- [x] Input OTP
- [x] Combobox
- [x] Date Picker
- [x] Calendar
- [x] Slider

### Priority 3: Navigation Components
- [x] Navigation Menu
- [x] Breadcrumb
- [x] Tabs
- [x] Menubar
- [x] Pagination
- [x] Sidebar

### Priority 4: Overlay Components
- [x] Dialog (includes AlertDialog via `dismissible={false}` prop)
- [x] Drawer
- [x] Popover
- [x] Tooltip (includes HoverCard via `variant="rich"` prop)
- [x] Context Menu
- [x] Dropdown Menu (includes Menubar via `MenubarRoot` wrapper)
- [x] Command

### Priority 5: Feedback Components
- [x] Alert
- [x] Sonner (Toast)
- [x] Progress
- [x] Skeleton
- [x] Empty

### Priority 6: Data Display Components
- [x] Table
- [x] Data Table
- [x] Avatar
- [x] Accordion
- [x] Collapsible
- [x] Carousel
- [x] Chart (using Recharts v3)
- [x] Typography
- [x] Kbd
- [x] Item

### Priority 7: Layout & Utility Components
- [ ] Aspect Ratio
- [ ] Scroll Area
- [ ] Resizable
- [ ] Button Group
- [ ] Toggle
- [ ] Toggle Group

## Implementation Checklist per Component

For each component, complete the following:
- [ ] Create component file in `/src/components/[ComponentName]/`
- [ ] Implement component with props-based API (no context)
- [ ] Style with Tailwind CSS (minimal, clean design)
- [ ] Add variants using class-variance-authority
- [ ] Add dark/light versions
- [ ] Export from `/src/index.js`
- [ ] Create demo page in `/demo/src/pages/`
- [ ] Add to navigation in `/demo/src/App.jsx`
- [ ] Document props and usage examples
- [ ] Test in demo app

## Design Principles

1. **Dumb Components**: No context dependencies, pure props-based API
2. **Minimal Design**: Clean, simple aesthetic like Shadcn/Vercel
3. **Tailwind First**: Use Tailwind CSS for all styling
4. **Easy to Use**: Import and use immediately, like Reactstrap
5. **Accessible**: Follow WAI-ARIA guidelines where applicable
6. **Composable**: Components should work well together

## Notes

- All components should be JavaScript (not TypeScript)
- Use `class-variance-authority` for variant management
- Use `clsx` for conditional class names
- Keep bundle size small - only include what's needed
- Provide clear documentation and examples in demo app

## TODO Bug fixes to complete:

- [ ] Menubar demo page with submenu, is not displaying the submenus. Create a richer with submenu demo.
- [ ] Dialog demo page, add an alert demo for delete account for example.
- [ ] Drawer demo, from right, the component should have a property to be responsive, and to decide where the responside drawer should be. By default, the right side should become Bottom on mobile.
- [ ] Collapsible demos aren't working. WHen I click on them, they won't work.
- [ ] DatePicker on mobile looks horrible as it displays partially out of the screen, causing the viewport to be scrollable. It should be better
- [ ] Carousel on mobile, if I am sliding horizontally, should prevent of scrolling vertically for better UX. Check the best practices on that, inspired on SHADCN behavior.
- [ ] KDB special keys, the charactes should be larger, without making hte box bigger. Improve the readibility
- [ ] Overall demo page: when I navigate from one page to another, it should scroll to top.
- [ ] Demo page sidebar on mobile. If I click on a sidebar menu item to navigate to that page, should automatically close the sidebar.
