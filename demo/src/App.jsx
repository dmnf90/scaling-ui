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

// Component navigation data
const components = [
    {name: 'Badge', path: '/badge'},
    {name: 'Button', path: '/button'},
    {name: 'Card', path: '/card'},
    {name: 'Checkbox', path: '/checkbox'},
    {name: 'Input', path: '/input'},
    {name: 'Label', path: '/label'},
    {name: 'Radio Group', path: '/radio-group'},
    {name: 'Select', path: '/select'},
    {name: 'Separator', path: '/separator'},
    {name: 'Spinner', path: '/spinner'},
    {name: 'Switch', path: '/switch'},
    {name: 'Tabs', path: '/tabs'},
    {name: 'Textarea', path: '/textarea'},
];

function Sidebar() {
    const location = useLocation();

    return (
        <div className="w-64 bg-gray-50/75 border-r border-border h-screen fixed left-0 top-0 overflow-y-auto">
            <div className="p-6 border-b border-border">
                <div className="flex flex-col items-center">
                    <img src="/logo-scaling.svg" alt="Scaling" className="w-[150px]" />
                    <p className="text-sm text-muted-foreground">UI Component Library</p>
                </div>
            </div>

            <div className="p-6">
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

                    <div className="mt-6">
                        <h2 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Components
                        </h2>
                        {components.map((component) => (
                            <Link
                                key={component.path}
                                to={component.path}
                                className={`block px-3 py-2 rounded-md text-sm mb-1 ${
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
                    <Route path="/button" element={<ButtonPage/>}/>
                    <Route path="/card" element={<CardPage/>}/>
                    <Route path="/checkbox" element={<CheckboxPage/>}/>
                    <Route path="/input" element={<InputPage/>}/>
                    <Route path="/label" element={<LabelPage/>}/>
                    <Route path="/radio-group" element={<RadioGroupPage/>}/>
                    <Route path="/select" element={<SelectPage/>}/>
                    <Route path="/separator" element={<SeparatorPage/>}/>
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
