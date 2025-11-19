import React from 'react';
import {BrowserRouter, Routes, Route, Link, useLocation} from 'react-router-dom';
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

// Component navigation data
const components = [
    {name: 'Badge', path: '/badge'},
    {name: 'Breadcrumb', path: '/breadcrumb'},
    {name: 'Button', path: '/button'},
    {name: 'Calendar', path: '/calendar'},
    {name: 'Card', path: '/card'},
    {name: 'Checkbox', path: '/checkbox'},
    {name: 'Combobox', path: '/combobox'},
    {name: 'Date Picker', path: '/date-picker'},
    {name: 'Field', path: '/field'},
    {name: 'Form', path: '/form'},
    {name: 'Input', path: '/input'},
    {name: 'Input Group', path: '/input-group'},
    {name: 'Input OTP', path: '/input-otp'},
    {name: 'Label', path: '/label'},
    {name: 'Menubar', path: '/menubar'},
    {name: 'Navigation Menu', path: '/navigation-menu'},
    {name: 'Pagination', path: '/pagination'},
    {name: 'Popover', path: '/popover'},
    {name: 'Radio Group', path: '/radio-group'},
    {name: 'Select', path: '/select'},
    {name: 'Separator', path: '/separator'},
    {name: 'Sidebar', path: '/sidebar'},
    {name: 'Slider', path: '/slider'},
    {name: 'Spinner', path: '/spinner'},
    {name: 'Switch', path: '/switch'},
    {name: 'Tabs', path: '/tabs'},
    {name: 'Textarea', path: '/textarea'},
];

function Sidebar() {
    const location = useLocation();

    return (
        <div className="w-64 bg-gray-50/75 border-r border-border h-screen fixed left-0 top-0 overflow-y-auto">
            <div className="p-4 border-b border-border">
                <div className="flex flex-col items-center">
                    <img src="/logo-scaling.svg" alt="Scaling" className="w-[120px]" />
                    <p className="text-xs text-muted-foreground">UI Component Library</p>
                </div>
            </div>

            <div className="p-6 pt-3">
                <nav>
                    <Link
                        to="/"
                        className={`block px-3 py-2 rounded-md text-sm mb-1 ${
                            location.pathname === '/'
                                ? 'bg-accent text-accent-foreground'
                                : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                        }`}
                    >
                        Home
                    </Link>

                    <div className="mt-4">
                        <h2 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Components
                        </h2>
                        {components.map((component) => (
                            <Link
                                key={component.path}
                                to={component.path}
                                className={`block px-3 py-1 rounded-md text-sm mb-1 ${
                                    location.pathname === component.path
                                        ? 'bg-accent text-accent-foreground'
                                        : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                                }`}
                            >
                                {component.name}
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
        </div>
    );
}

function Layout({children}) {
    return (
        <div className="min-h-screen bg-background">
            <Sidebar/>
            <main className="ml-64 p-8">
                {children}
            </main>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/badge" element={<BadgePage/>}/>
                    <Route path="/breadcrumb" element={<BreadcrumbPage/>}/>
                    <Route path="/button" element={<ButtonPage/>}/>
                    <Route path="/calendar" element={<CalendarPage/>}/>
                    <Route path="/card" element={<CardPage/>}/>
                    <Route path="/checkbox" element={<CheckboxPage/>}/>
                    <Route path="/combobox" element={<ComboboxPage/>}/>
                    <Route path="/date-picker" element={<DatePickerPage/>}/>
                    <Route path="/field" element={<FieldPage/>}/>
                    <Route path="/form" element={<FormPage/>}/>
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
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
