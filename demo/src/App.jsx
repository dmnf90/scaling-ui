import React from 'react';
import {BrowserRouter, Routes, Route, Link, useLocation} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ButtonPage from './pages/ButtonPage';

// Component navigation data
const components = [
    {name: 'Button', path: '/button'},
    // More components will be added here as they're implemented
];

function Sidebar() {
    const location = useLocation();

    return (
        <div className="w-64 bg-blue-300 bg-card border-r border-border h-screen fixed left-0 top-0 overflow-y-auto">
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-2">Scaling Components</h1>
                <p className="text-sm text-muted-foreground mb-6">Component Library</p>

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
                    <Route path="/button" element={<ButtonPage/>}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
