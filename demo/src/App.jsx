import React, { useState, useEffect, Suspense, lazy } from 'react';
import {BrowserRouter, Routes, Route, useLocation, Link} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import logoScaling from '../logo-scaling.svg';
import SEO from './components/SEO';
import ThemeToggle from './components/ThemeToggle';
import packageJson from '../../package.json';
// Eager load HomePage for faster initial load
import HomePage from './pages/HomePage';

// Lazy load all component documentation pages
const GettingStarted = lazy(() => import('./pages/GettingStarted'));
const ButtonPage = lazy(() => import('./pages/ButtonPage'));
const TabsPage = lazy(() => import('./pages/TabsPage'));
const SpinnerPage = lazy(() => import('./pages/SpinnerPage'));
const SeparatorPage = lazy(() => import('./pages/SeparatorPage'));
const BadgePage = lazy(() => import('./pages/BadgePage'));
const LabelPage = lazy(() => import('./pages/LabelPage'));
const CardPage = lazy(() => import('./pages/CardPage'));
const InputPage = lazy(() => import('./pages/InputPage'));
const TextareaPage = lazy(() => import('./pages/TextareaPage'));
const CheckboxPage = lazy(() => import('./pages/CheckboxPage'));
const SwitchPage = lazy(() => import('./pages/SwitchPage'));
const RadioGroupPage = lazy(() => import('./pages/RadioGroupPage'));
const SelectPage = lazy(() => import('./pages/SelectPage'));
const FieldPage = lazy(() => import('./pages/FieldPage'));
const FormPage = lazy(() => import('./pages/FormPage'));
const InputGroupPage = lazy(() => import('./pages/InputGroupPage'));
const InputOTPPage = lazy(() => import('./pages/InputOTPPage'));
const SliderPage = lazy(() => import('./pages/SliderPage'));
const ComboboxPage = lazy(() => import('./pages/ComboboxPage'));
const PopoverPage = lazy(() => import('./pages/PopoverPage'));
const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const DatePickerPage = lazy(() => import('./pages/DatePickerPage'));
const NavigationMenuPage = lazy(() => import('./pages/NavigationMenuPage'));
const BreadcrumbPage = lazy(() => import('./pages/BreadcrumbPage'));
const MenubarPage = lazy(() => import('./pages/MenubarPage'));
const PaginationPage = lazy(() => import('./pages/PaginationPage'));
const SidebarPage = lazy(() => import('./pages/SidebarPage'));
const DialogPage = lazy(() => import('./pages/DialogPage'));
// AlertDialog merged into Dialog with dismissible={false} prop
const TooltipPage = lazy(() => import('./pages/TooltipPage'));
const DropdownMenuPage = lazy(() => import('./pages/DropdownMenuPage'));
const DrawerPage = lazy(() => import('./pages/DrawerPage'));
// HoverCard merged into Tooltip with variant="rich" prop
const ContextMenuPage = lazy(() => import('./pages/ContextMenuPage'));
const CommandPage = lazy(() => import('./pages/CommandPage'));
const AvatarPage = lazy(() => import('./pages/AvatarPage'));
const AlertPage = lazy(() => import('./pages/AlertPage'));
const ProgressPage = lazy(() => import('./pages/ProgressPage'));
const SkeletonPage = lazy(() => import('./pages/SkeletonPage'));
const SonnerPage = lazy(() => import('./pages/SonnerPage'));
const EmptyPage = lazy(() => import('./pages/EmptyPage'));

// Priority 6: Data Display Components
const AccordionPage = lazy(() => import('./pages/AccordionPage'));
const CarouselPage = lazy(() => import('./pages/CarouselPage'));
const CollapsiblePage = lazy(() => import('./pages/CollapsiblePage'));
const DataTablePage = lazy(() => import('./pages/DataTablePage'));
const ItemPage = lazy(() => import('./pages/ItemPage'));
const KbdPage = lazy(() => import('./pages/KbdPage'));
const TablePage = lazy(() => import('./pages/TablePage'));
const TypographyPage = lazy(() => import('./pages/TypographyPage'));
const ChartPage = lazy(() => import('./pages/ChartPage'));

// Import Sidebar and Spinner components
import {
    Sidebar,
    SidebarProvider,
    SidebarLayout,
    SidebarInset,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarNav,
    SidebarNavItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarTrigger,
    Spinner,
} from '../../src/index.js';

// Import Lucide icons
import {
    Home,
    BookOpen,
    User,
    Tag,
    MousePointerClick,
    LayoutGrid,
    Type,
    Minus,
    Loader2,
    PanelTop,
    Calendar,
    CheckSquare,
    Search,
    CalendarDays,
    FileText,
    FileEdit,
    Box,
    KeyRound,
    SlidersHorizontal,
    ToggleLeft,
    Circle,
    List,
    AlignLeft,
    ArrowRight,
    Menu,
    ChevronsLeft,
    PanelLeft,
    MessageSquare,
    AlertCircle,
    Info,
    MessageCircle,
    ChevronDown,
    SidebarClose,
    Eye,
    MoreVertical,
    Terminal,
    Bell,
    BarChart2,
    BoxSelect,
    Inbox,
    Rows3,
    Table2,
    ChevronDownSquare,
    Layers,
    GalleryHorizontal,
    Keyboard,
    TypeOutline,
    ListTree,
} from 'lucide-react';

// Import Toaster for toast notifications
import { Toaster } from '../../src/index.js';

// Component navigation data organized by category
const componentsByCategory = {
    core: [
        {name: 'Avatar', path: '/avatar', icon: User},
        {name: 'Badge', path: '/badge', icon: Tag},
        {name: 'Button', path: '/button', icon: MousePointerClick},
        {name: 'Card', path: '/card', icon: LayoutGrid},
        {name: 'Label', path: '/label', icon: Type},
        {name: 'Separator', path: '/separator', icon: Minus},
        {name: 'Spinner', path: '/spinner', icon: Loader2},
        {name: 'Tabs', path: '/tabs', icon: PanelTop},
    ],
    forms: [
        {name: 'Calendar', path: '/calendar', icon: Calendar},
        {name: 'Checkbox', path: '/checkbox', icon: CheckSquare},
        {name: 'Combobox', path: '/combobox', icon: Search},
        {name: 'Date Picker', path: '/date-picker', icon: CalendarDays},
        {name: 'Field', path: '/field', icon: FileText},
        {name: 'Form', path: '/form', icon: FileEdit},
        {name: 'Input', path: '/input', icon: Type},
        {name: 'Input Group', path: '/input-group', icon: Box},
        {name: 'Input OTP', path: '/input-otp', icon: KeyRound},
        {name: 'Radio Group', path: '/radio-group', icon: Circle},
        {name: 'Select', path: '/select', icon: List},
        {name: 'Slider', path: '/slider', icon: SlidersHorizontal},
        {name: 'Switch', path: '/switch', icon: ToggleLeft},
        {name: 'Textarea', path: '/textarea', icon: AlignLeft},
    ],
    navigation: [
        {name: 'Breadcrumb', path: '/breadcrumb', icon: ArrowRight},
        {name: 'Menubar', path: '/menubar', icon: Menu},
        {name: 'Navigation Menu', path: '/navigation-menu', icon: Menu},
        {name: 'Pagination', path: '/pagination', icon: ChevronsLeft},
        {name: 'Sidebar', path: '/sidebar', icon: PanelLeft},
    ],
    overlays: [
        {name: 'Command', path: '/command', icon: Terminal},
        {name: 'Context Menu', path: '/context-menu', icon: MoreVertical},
        {name: 'Dialog', path: '/dialog', icon: MessageSquare},
        {name: 'Drawer', path: '/drawer', icon: SidebarClose},
        {name: 'Dropdown Menu', path: '/dropdown-menu', icon: ChevronDown},
        {name: 'Popover', path: '/popover', icon: MessageCircle},
        {name: 'Tooltip', path: '/tooltip', icon: Info},
    ],
    feedback: [
        {name: 'Alert', path: '/alert', icon: AlertCircle},
        {name: 'Empty', path: '/empty', icon: Inbox},
        {name: 'Progress', path: '/progress', icon: BarChart2},
        {name: 'Skeleton', path: '/skeleton', icon: BoxSelect},
        {name: 'Sonner', path: '/sonner', icon: Bell},
    ],
    dataDisplay: [
        {name: 'Accordion', path: '/accordion', icon: ChevronDownSquare},
        {name: 'Carousel', path: '/carousel', icon: GalleryHorizontal},
        {name: 'Chart', path: '/chart', icon: BarChart2},
        {name: 'Collapsible', path: '/collapsible', icon: Layers},
        {name: 'Data Table', path: '/data-table', icon: Table2},
        {name: 'Item', path: '/item', icon: ListTree},
        {name: 'Kbd', path: '/kbd', icon: Keyboard},
        {name: 'Table', path: '/table', icon: Rows3},
        {name: 'Typography', path: '/typography', icon: TypeOutline},
    ],
};

function NavigationSidebar() {
    const location = useLocation();
    const [openGroups, setOpenGroups] = useState({
        core: false,
        forms: false,
        navigation: false,
        overlays: false,
        feedback: false,
        dataDisplay: false
    });

    // On initial mount, find and open the group containing the active route
    useEffect(() => {
        const activeGroup = Object.entries(componentsByCategory).find(([_, components]) =>
            components.some(component => component.path === location.pathname)
        );

        if (activeGroup) {
            const [groupName] = activeGroup;
            setOpenGroups(prev => ({ ...prev, [groupName]: true }));
        }
    }, []); // Empty deps - only run on initial mount

    const handleGroupToggle = (groupName) => (isOpen) => {
        setOpenGroups(prev => ({ ...prev, [groupName]: isOpen }));
    };

    return (
        <Sidebar variant="responsive" className="lg:!fixed lg:inset-y-0 lg:left-0 lg:h-screen lg:z-50">
            <SidebarHeader>
                <div className="flex flex-col items-center">
                    <img src={logoScaling} alt="Scaling" className="w-[120px]" />
                    <p className="text-xs text-muted-foreground">UI Component Library</p>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarNav>
                    <SidebarNavItem
                        as={Link}
                        href="/"
                        icon={Home}
                        active={location.pathname === '/'}
                    >
                        Home
                    </SidebarNavItem>

                    <SidebarNavItem
                        as={Link}
                        href="/getting-started"
                        icon={BookOpen}
                        active={location.pathname === '/getting-started'}
                    >
                        Getting Started
                    </SidebarNavItem>

                    <div className="mt-4">
                        <SidebarGroup
                            collapsible
                            open={openGroups.core}
                            onOpenChange={handleGroupToggle('core')}
                        >
                            <SidebarGroupLabel>Core</SidebarGroupLabel>
                            <SidebarNav>
                                {componentsByCategory.core.map((component) => (
                                    <SidebarNavItem
                                        key={component.path}
                                        as={Link}
                                        href={component.path}
                                        icon={component.icon}
                                        active={location.pathname === component.path}
                                    >
                                        {component.name}
                                    </SidebarNavItem>
                                ))}
                            </SidebarNav>
                        </SidebarGroup>

                        <SidebarGroup
                            collapsible
                            open={openGroups.forms}
                            onOpenChange={handleGroupToggle('forms')}
                        >
                            <SidebarGroupLabel>Forms</SidebarGroupLabel>
                            <SidebarNav>
                                {componentsByCategory.forms.map((component) => (
                                    <SidebarNavItem
                                        key={component.path}
                                        as={Link}
                                        href={component.path}
                                        icon={component.icon}
                                        active={location.pathname === component.path}
                                    >
                                        {component.name}
                                    </SidebarNavItem>
                                ))}
                            </SidebarNav>
                        </SidebarGroup>

                        <SidebarGroup
                            collapsible
                            open={openGroups.navigation}
                            onOpenChange={handleGroupToggle('navigation')}
                        >
                            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                            <SidebarNav>
                                {componentsByCategory.navigation.map((component) => (
                                    <SidebarNavItem
                                        key={component.path}
                                        as={Link}
                                        href={component.path}
                                        icon={component.icon}
                                        active={location.pathname === component.path}
                                    >
                                        {component.name}
                                    </SidebarNavItem>
                                ))}
                            </SidebarNav>
                        </SidebarGroup>

                        <SidebarGroup
                            collapsible
                            open={openGroups.overlays}
                            onOpenChange={handleGroupToggle('overlays')}
                        >
                            <SidebarGroupLabel>Overlays</SidebarGroupLabel>
                            <SidebarNav>
                                {componentsByCategory.overlays.map((component) => (
                                    <SidebarNavItem
                                        key={component.path}
                                        as={Link}
                                        href={component.path}
                                        icon={component.icon}
                                        active={location.pathname === component.path}
                                    >
                                        {component.name}
                                    </SidebarNavItem>
                                ))}
                            </SidebarNav>
                        </SidebarGroup>

                        <SidebarGroup
                            collapsible
                            open={openGroups.feedback}
                            onOpenChange={handleGroupToggle('feedback')}
                        >
                            <SidebarGroupLabel>Feedback</SidebarGroupLabel>
                            <SidebarNav>
                                {componentsByCategory.feedback.map((component) => (
                                    <SidebarNavItem
                                        key={component.path}
                                        as={Link}
                                        href={component.path}
                                        icon={component.icon}
                                        active={location.pathname === component.path}
                                    >
                                        {component.name}
                                    </SidebarNavItem>
                                ))}
                            </SidebarNav>
                        </SidebarGroup>

                        <SidebarGroup
                            collapsible
                            open={openGroups.dataDisplay}
                            onOpenChange={handleGroupToggle('dataDisplay')}
                        >
                            <SidebarGroupLabel>Data Display</SidebarGroupLabel>
                            <SidebarNav>
                                {componentsByCategory.dataDisplay.map((component) => (
                                    <SidebarNavItem
                                        key={component.path}
                                        as={Link}
                                        href={component.path}
                                        icon={component.icon}
                                        active={location.pathname === component.path}
                                    >
                                        {component.name}
                                    </SidebarNavItem>
                                ))}
                            </SidebarNav>
                        </SidebarGroup>
                    </div>
                </SidebarNav>
            </SidebarContent>

            <SidebarFooter>
                <div className="space-y-3">
                    <ThemeToggle />
                    <div className="text-xs text-muted-foreground space-y-1">
                        <p>Scaling UI v{packageJson.version}</p>
                        <p className="text-[10px]">Built with React + Tailwind</p>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}

function Layout({children}) {
    return (
        <SidebarProvider defaultOpen={false}>
            <SidebarLayout className="min-h-screen">
                <NavigationSidebar />
                <SidebarInset className="lg:ml-64">
                    {/* Mobile header with trigger - hidden on desktop */}
                    <header className="lg:hidden sticky top-0 bg-background border-b border-border z-10">
                        <div className="flex items-center gap-3 p-4">
                            <SidebarTrigger />
                            <img src={logoScaling} alt="Scaling" className="h-6" />
                        </div>
                    </header>

                    {/* Main content */}
                    <main className="p-8">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarLayout>
            <Toaster />
        </SidebarProvider>
    );
}

// Loading fallback component
function LoadingFallback() {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Spinner size="lg" />
        </div>
    );
}

function App() {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <Layout>
                    <Suspense fallback={<LoadingFallback />}>
                        <Routes>
                        <Route path="/" element={<><SEO title="Home" description="A minimal, clean React component library built with Tailwind CSS. Browse 35+ production-ready components including buttons, forms, navigation, and overlays." path="/" /><HomePage/></>}/>
                        <Route path="/getting-started" element={<><SEO title="Getting Started" description="Learn how to install and use Scaling UI in your React project. Quick setup guide with examples." path="/getting-started" /><GettingStarted/></>}/>
                        <Route path="/avatar" element={<><SEO title="Avatar" description="Avatar component for React - Display user profile pictures and initials with customizable sizes and fallbacks. Built with Tailwind CSS." path="/avatar" /><AvatarPage/></>}/>
                        <Route path="/badge" element={<><SEO title="Badge" description="Badge component for React - Display small status indicators and labels with multiple variants. Built with Tailwind CSS." path="/badge" /><BadgePage/></>}/>
                        <Route path="/breadcrumb" element={<><SEO title="Breadcrumb" description="Breadcrumb component for React - Show navigation hierarchy and help users understand their location. Built with Tailwind CSS." path="/breadcrumb" /><BreadcrumbPage/></>}/>
                        <Route path="/button" element={<><SEO title="Button" description="Button component for React - Customizable buttons with multiple variants, sizes, and states. Built with Tailwind CSS." path="/button" /><ButtonPage/></>}/>
                        <Route path="/calendar" element={<><SEO title="Calendar" description="Calendar component for React - Date selection with customizable styling and date range support. Built with Tailwind CSS." path="/calendar" /><CalendarPage/></>}/>
                        <Route path="/card" element={<><SEO title="Card" description="Card component for React - Composable container with header, content, and footer sections. Built with Tailwind CSS." path="/card" /><CardPage/></>}/>
                        <Route path="/checkbox" element={<><SEO title="Checkbox" description="Checkbox component for React - Form input for boolean values with checked and disabled states. Built with Tailwind CSS." path="/checkbox" /><CheckboxPage/></>}/>
                        <Route path="/combobox" element={<><SEO title="Combobox" description="Combobox component for React - Searchable dropdown with autocomplete functionality. Built with Tailwind CSS." path="/combobox" /><ComboboxPage/></>}/>
                        <Route path="/command" element={<><SEO title="Command" description="Command component for React - Fast, composable command menu with search and keyboard navigation. Built with Tailwind CSS." path="/command" /><CommandPage/></>}/>
                        <Route path="/context-menu" element={<><SEO title="Context Menu" description="Context Menu component for React - Right-click menu with custom actions and submenus. Built with Tailwind CSS." path="/context-menu" /><ContextMenuPage/></>}/>
                        <Route path="/date-picker" element={<><SEO title="Date Picker" description="Date Picker component for React - Select dates with calendar popup and input field. Built with Tailwind CSS." path="/date-picker" /><DatePickerPage/></>}/>
                        <Route path="/dialog" element={<><SEO title="Dialog" description="Dialog component for React - Modal window for displaying content and collecting user input. Built with Tailwind CSS." path="/dialog" /><DialogPage/></>}/>
                        <Route path="/drawer" element={<><SEO title="Drawer" description="Drawer component for React - Slide-in panel for navigation or additional content from screen edges. Built with Tailwind CSS." path="/drawer" /><DrawerPage/></>}/>
                        <Route path="/dropdown-menu" element={<><SEO title="Dropdown Menu" description="Dropdown Menu component for React - Floating menu with actions triggered by button click. Built with Tailwind CSS." path="/dropdown-menu" /><DropdownMenuPage/></>}/>
                        <Route path="/empty" element={<><SEO title="Empty" description="Empty component for React - Display empty state with icon, title, description, and action button. Built with Tailwind CSS." path="/empty" /><EmptyPage/></>}/>
                        <Route path="/field" element={<><SEO title="Field" description="Field component for React - Form field wrapper with label, description, and error message support. Built with Tailwind CSS." path="/field" /><FieldPage/></>}/>
                        <Route path="/form" element={<><SEO title="Form" description="Form component for React - Complete form handling with validation and submission states. Built with Tailwind CSS." path="/form" /><FormPage/></>}/>
                        <Route path="/input" element={<><SEO title="Input" description="Input component for React - Text input field with multiple sizes and validation states. Built with Tailwind CSS." path="/input" /><InputPage/></>}/>
                        <Route path="/input-group" element={<><SEO title="Input Group" description="Input Group component for React - Combine inputs with addons, icons, and buttons. Built with Tailwind CSS." path="/input-group" /><InputGroupPage/></>}/>
                        <Route path="/input-otp" element={<><SEO title="Input OTP" description="Input OTP component for React - One-time password input with automatic focus management. Built with Tailwind CSS." path="/input-otp" /><InputOTPPage/></>}/>
                        <Route path="/label" element={<><SEO title="Label" description="Label component for React - Form label with required field indicator and accessibility support. Built with Tailwind CSS." path="/label" /><LabelPage/></>}/>
                        <Route path="/menubar" element={<><SEO title="Menubar" description="Menubar component for React - Horizontal menu bar with dropdown submenus and keyboard navigation. Built with Tailwind CSS." path="/menubar" /><MenubarPage/></>}/>
                        <Route path="/navigation-menu" element={<><SEO title="Navigation Menu" description="Navigation Menu component for React - Complex navigation with multi-level menus and hover states. Built with Tailwind CSS." path="/navigation-menu" /><NavigationMenuPage/></>}/>
                        <Route path="/pagination" element={<><SEO title="Pagination" description="Pagination component for React - Navigate through pages of content with customizable page sizes. Built with Tailwind CSS." path="/pagination" /><PaginationPage/></>}/>
                        <Route path="/popover" element={<><SEO title="Popover" description="Popover component for React - Floating content container triggered by click or hover. Built with Tailwind CSS." path="/popover" /><PopoverPage/></>}/>
                        <Route path="/radio-group" element={<><SEO title="Radio Group" description="Radio Group component for React - Single selection from multiple options with ARIA support. Built with Tailwind CSS." path="/radio-group" /><RadioGroupPage/></>}/>
                        <Route path="/select" element={<><SEO title="Select" description="Select component for React - Dropdown selection with custom styling and keyboard navigation. Built with Tailwind CSS." path="/select" /><SelectPage/></>}/>
                        <Route path="/separator" element={<><SEO title="Separator" description="Separator component for React - Horizontal or vertical divider for content sections. Built with Tailwind CSS." path="/separator" /><SeparatorPage/></>}/>
                        <Route path="/sidebar" element={<><SEO title="Sidebar" description="Sidebar component for React - Collapsible navigation sidebar with responsive behavior. Built with Tailwind CSS." path="/sidebar" /><SidebarPage/></>}/>
                        <Route path="/slider" element={<><SEO title="Slider" description="Slider component for React - Range input slider with customizable min, max, and step values. Built with Tailwind CSS." path="/slider" /><SliderPage/></>}/>
                        <Route path="/spinner" element={<><SEO title="Spinner" description="Spinner component for React - Loading indicator with multiple sizes and color variants. Built with Tailwind CSS." path="/spinner" /><SpinnerPage/></>}/>
                        <Route path="/switch" element={<><SEO title="Switch" description="Switch component for React - Toggle switch for boolean settings with smooth animations. Built with Tailwind CSS." path="/switch" /><SwitchPage/></>}/>
                        <Route path="/tabs" element={<><SEO title="Tabs" description="Tabs component for React - Organize content into tabbed interface with controlled and uncontrolled modes. Built with Tailwind CSS." path="/tabs" /><TabsPage/></>}/>
                        <Route path="/textarea" element={<><SEO title="Textarea" description="Textarea component for React - Multi-line text input with resize options and character counting. Built with Tailwind CSS." path="/textarea" /><TextareaPage/></>}/>
                        <Route path="/tooltip" element={<><SEO title="Tooltip" description="Tooltip component for React - Display helpful text on hover with customizable positioning. Built with Tailwind CSS." path="/tooltip" /><TooltipPage/></>}/>
                        <Route path="/alert" element={<><SEO title="Alert" description="Alert component for React - Display important messages with different severity variants. Built with Tailwind CSS." path="/alert" /><AlertPage/></>}/>
                        <Route path="/progress" element={<><SEO title="Progress" description="Progress component for React - Show completion status with determinate and indeterminate modes. Built with Tailwind CSS." path="/progress" /><ProgressPage/></>}/>
                        <Route path="/skeleton" element={<><SEO title="Skeleton" description="Skeleton component for React - Display loading placeholders while content is being fetched. Built with Tailwind CSS." path="/skeleton" /><SkeletonPage/></>}/>
                        <Route path="/sonner" element={<><SEO title="Sonner" description="Sonner toast component for React - Beautiful toast notifications with multiple types and customization. Built with Tailwind CSS." path="/sonner" /><SonnerPage/></>}/>
                        <Route path="/accordion" element={<><SEO title="Accordion" description="Accordion component for React - Vertically stacked interactive headings that reveal content sections. Built with Tailwind CSS." path="/accordion" /><AccordionPage/></>}/>
                        <Route path="/carousel" element={<><SEO title="Carousel" description="Carousel component for React - Image and content slider with navigation and auto-play. Built with Tailwind CSS." path="/carousel" /><CarouselPage/></>}/>
                        <Route path="/chart" element={<><SEO title="Chart" description="Chart components for React - Beautiful, responsive charts with automatic theme support. Built with Recharts and Tailwind CSS." path="/chart" /><ChartPage/></>}/>
                        <Route path="/collapsible" element={<><SEO title="Collapsible" description="Collapsible component for React - Interactive panel that expands and collapses content. Built with Tailwind CSS." path="/collapsible" /><CollapsiblePage/></>}/>
                        <Route path="/data-table" element={<><SEO title="Data Table" description="Data Table component for React - Powerful table with sorting, filtering, pagination, and column visibility. Built with Tailwind CSS." path="/data-table" /><DataTablePage/></>}/>
                        <Route path="/item" element={<><SEO title="Item" description="Item component for React - Versatile list item with icon, content, and actions. Built with Tailwind CSS." path="/item" /><ItemPage/></>}/>
                        <Route path="/kbd" element={<><SEO title="Kbd" description="Kbd component for React - Display keyboard keys and shortcuts in styled inline elements. Built with Tailwind CSS." path="/kbd" /><KbdPage/></>}/>
                        <Route path="/table" element={<><SEO title="Table" description="Table component for React - Responsive table with styled rows, headers, and cells. Built with Tailwind CSS." path="/table" /><TablePage/></>}/>
                        <Route path="/typography" element={<><SEO title="Typography" description="Typography components for React - Styled text components for headings, paragraphs, and more. Built with Tailwind CSS." path="/typography" /><TypographyPage/></>}/>
                        </Routes>
                    </Suspense>
                </Layout>
            </BrowserRouter>
        </HelmetProvider>
    );
}

export default App;
