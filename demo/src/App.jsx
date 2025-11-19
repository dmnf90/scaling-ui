import React from 'react';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ButtonPage from './pages/ButtonPage';
import TabsPage from './pages/TabsPage';
import SpinnerPage from './pages/SpinnerPage';
import SeparatorPage from './pages/SeparatorPage';
import BadgePage from './pages/BadgePage';
import LabelPage from './pages/LabelPage';
import CardPage from './pages/CardPage';
import InputPage from './pages/InputPage';
import TextareaPage from './pages/TextareaPage';
import CheckboxPage from './pages/CheckboxPage';
import SwitchPage from './pages/SwitchPage';
import RadioGroupPage from './pages/RadioGroupPage';
import SelectPage from './pages/SelectPage';
import FieldPage from './pages/FieldPage';
import FormPage from './pages/FormPage';
import InputGroupPage from './pages/InputGroupPage';
import InputOTPPage from './pages/InputOTPPage';
import SliderPage from './pages/SliderPage';
import ComboboxPage from './pages/ComboboxPage';
import PopoverPage from './pages/PopoverPage';
import CalendarPage from './pages/CalendarPage';
import DatePickerPage from './pages/DatePickerPage';
import NavigationMenuPage from './pages/NavigationMenuPage';
import BreadcrumbPage from './pages/BreadcrumbPage';
import MenubarPage from './pages/MenubarPage';
import PaginationPage from './pages/PaginationPage';
import SidebarPage from './pages/SidebarPage';
import DialogPage from './pages/DialogPage';
import AlertDialogPage from './pages/AlertDialogPage';
import TooltipPage from './pages/TooltipPage';
import DropdownMenuPage from './pages/DropdownMenuPage';
import DrawerPage from './pages/DrawerPage';
import HoverCardPage from './pages/HoverCardPage';
import ContextMenuPage from './pages/ContextMenuPage';
import AvatarPage from './pages/AvatarPage';

// Import Sidebar components
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
} from '../../src/index.js';

// Import Lucide icons
import {
    Home,
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
} from 'lucide-react';

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
        {name: 'Alert Dialog', path: '/alert-dialog', icon: AlertCircle},
        {name: 'Context Menu', path: '/context-menu', icon: MoreVertical},
        {name: 'Dialog', path: '/dialog', icon: MessageSquare},
        {name: 'Drawer', path: '/drawer', icon: SidebarClose},
        {name: 'Dropdown Menu', path: '/dropdown-menu', icon: ChevronDown},
        {name: 'Hover Card', path: '/hover-card', icon: Eye},
        {name: 'Popover', path: '/popover', icon: MessageCircle},
        {name: 'Tooltip', path: '/tooltip', icon: Info},
    ],
};

function NavigationSidebar() {
    const location = useLocation();

    return (
        <Sidebar variant="responsive" className="lg:!fixed lg:inset-y-0 lg:left-0 lg:h-screen lg:z-50">
            <SidebarHeader>
                <div className="flex flex-col items-center">
                    <img src="/logo-scaling.svg" alt="Scaling" className="w-[120px]" />
                    <p className="text-xs text-muted-foreground">UI Component Library</p>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarNav>
                    <SidebarNavItem
                        href="/"
                        icon={Home}
                        active={location.pathname === '/'}
                    >
                        Home
                    </SidebarNavItem>

                    <div className="mt-4">
                        <SidebarGroup collapsible defaultOpen={false}>
                            <SidebarGroupLabel>Core</SidebarGroupLabel>
                            <SidebarNav>
                                {componentsByCategory.core.map((component) => (
                                    <SidebarNavItem
                                        key={component.path}
                                        href={component.path}
                                        icon={component.icon}
                                        active={location.pathname === component.path}
                                    >
                                        {component.name}
                                    </SidebarNavItem>
                                ))}
                            </SidebarNav>
                        </SidebarGroup>

                        <SidebarGroup collapsible defaultOpen={false}>
                            <SidebarGroupLabel>Forms</SidebarGroupLabel>
                            <SidebarNav>
                                {componentsByCategory.forms.map((component) => (
                                    <SidebarNavItem
                                        key={component.path}
                                        href={component.path}
                                        icon={component.icon}
                                        active={location.pathname === component.path}
                                    >
                                        {component.name}
                                    </SidebarNavItem>
                                ))}
                            </SidebarNav>
                        </SidebarGroup>

                        <SidebarGroup collapsible defaultOpen={false}>
                            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                            <SidebarNav>
                                {componentsByCategory.navigation.map((component) => (
                                    <SidebarNavItem
                                        key={component.path}
                                        href={component.path}
                                        icon={component.icon}
                                        active={location.pathname === component.path}
                                    >
                                        {component.name}
                                    </SidebarNavItem>
                                ))}
                            </SidebarNav>
                        </SidebarGroup>

                        <SidebarGroup collapsible defaultOpen={false}>
                            <SidebarGroupLabel>Overlays</SidebarGroupLabel>
                            <SidebarNav>
                                {componentsByCategory.overlays.map((component) => (
                                    <SidebarNavItem
                                        key={component.path}
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
                <div className="text-xs text-muted-foreground space-y-1">
                    <p>Scaling UI v0.1.0</p>
                    <p className="text-[10px]">Built with React + Tailwind</p>
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
                            <img src="/logo-scaling.svg" alt="Scaling" className="h-6" />
                        </div>
                    </header>

                    {/* Main content */}
                    <main className="p-8">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarLayout>
        </SidebarProvider>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/alert-dialog" element={<AlertDialogPage/>}/>
                    <Route path="/avatar" element={<AvatarPage/>}/>
                    <Route path="/badge" element={<BadgePage/>}/>
                    <Route path="/breadcrumb" element={<BreadcrumbPage/>}/>
                    <Route path="/button" element={<ButtonPage/>}/>
                    <Route path="/calendar" element={<CalendarPage/>}/>
                    <Route path="/card" element={<CardPage/>}/>
                    <Route path="/checkbox" element={<CheckboxPage/>}/>
                    <Route path="/combobox" element={<ComboboxPage/>}/>
                    <Route path="/context-menu" element={<ContextMenuPage/>}/>
                    <Route path="/date-picker" element={<DatePickerPage/>}/>
                    <Route path="/dialog" element={<DialogPage/>}/>
                    <Route path="/drawer" element={<DrawerPage/>}/>
                    <Route path="/dropdown-menu" element={<DropdownMenuPage/>}/>
                    <Route path="/field" element={<FieldPage/>}/>
                    <Route path="/form" element={<FormPage/>}/>
                    <Route path="/hover-card" element={<HoverCardPage/>}/>
                    <Route path="/input" element={<InputPage/>}/>
                    <Route path="/input-group" element={<InputGroupPage/>}/>
                    <Route path="/input-otp" element={<InputOTPPage/>}/>
                    <Route path="/label" element={<LabelPage/>}/>
                    <Route path="/menubar" element={<MenubarPage/>}/>
                    <Route path="/navigation-menu" element={<NavigationMenuPage/>}/>
                    <Route path="/pagination" element={<PaginationPage/>}/>
                    <Route path="/popover" element={<PopoverPage/>}/>
                    <Route path="/radio-group" element={<RadioGroupPage/>}/>
                    <Route path="/select" element={<SelectPage/>}/>
                    <Route path="/separator" element={<SeparatorPage/>}/>
                    <Route path="/sidebar" element={<SidebarPage/>}/>
                    <Route path="/slider" element={<SliderPage/>}/>
                    <Route path="/spinner" element={<SpinnerPage/>}/>
                    <Route path="/switch" element={<SwitchPage/>}/>
                    <Route path="/tabs" element={<TabsPage/>}/>
                    <Route path="/textarea" element={<TextareaPage/>}/>
                    <Route path="/tooltip" element={<TooltipPage/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
