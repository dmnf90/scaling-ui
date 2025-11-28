import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';
import { Search } from 'lucide-react';

// Context for managing command state
const CommandContext = createContext();

// Helper: Parse and match keyboard shortcuts
function matchesShortcut(event, shortcut) {
    const parts = shortcut.toLowerCase().split('+');
    const key = parts.pop();
    const ctrl = parts.includes('ctrl') || parts.includes('control');
    const meta = parts.includes('meta') || parts.includes('cmd') || parts.includes('command');
    const shift = parts.includes('shift');
    const alt = parts.includes('alt') || parts.includes('option');

    // Support both Ctrl (Windows/Linux) and Cmd (Mac) for the same shortcut
    const ctrlOrMeta = ctrl || meta;

    return (
        event.key.toLowerCase() === key &&
        (ctrlOrMeta ? (event.ctrlKey || event.metaKey) : (!event.ctrlKey && !event.metaKey)) &&
        event.shiftKey === shift &&
        event.altKey === alt
    );
}

// Helper: Format shortcut for display (platform-aware)
function formatShortcut(shortcut) {
    const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform);
    return shortcut
        .split('+')
        .map(part => {
            const p = part.toLowerCase();
            if (p === 'ctrl' || p === 'control' || p === 'meta' || p === 'cmd' || p === 'command') {
                return isMac ? '⌘' : 'Ctrl';
            }
            if (p === 'shift') return isMac ? '⇧' : 'Shift';
            if (p === 'alt' || p === 'option') return isMac ? '⌥' : 'Alt';
            return p.charAt(0).toUpperCase() + p.slice(1);
        })
        .join(isMac ? '' : '+');
}

export function Command({
    children,
    value,
    onValueChange,
    filter,
    className,
    ...props
}) {
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const listRef = useRef(null);
    const inputRef = useRef(null);

    // Get all visible items for keyboard navigation
    const getVisibleItems = useCallback(() => {
        if (!listRef.current) return [];
        return Array.from(
            listRef.current.querySelectorAll('[data-command-item][data-visible="true"]:not([data-disabled="true"])')
        );
    }, []);

    // Default filter function
    const defaultFilter = useCallback((itemValue, searchValue) => {
        if (!searchValue) return true;
        return itemValue.toLowerCase().includes(searchValue.toLowerCase());
    }, []);

    const filterFn = filter || defaultFilter;

    const handleKeyDown = useCallback((e) => {
        const items = getVisibleItems();
        if (!items.length) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => {
                    const next = prev + 1;
                    return next >= items.length ? 0 : next;
                });
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => {
                    const next = prev - 1;
                    return next < 0 ? items.length - 1 : next;
                });
                break;
            case 'Enter':
                e.preventDefault();
                const selectedItem = items[selectedIndex];
                if (selectedItem) {
                    selectedItem.click();
                }
                break;
            case 'Home':
                e.preventDefault();
                setSelectedIndex(0);
                break;
            case 'End':
                e.preventDefault();
                setSelectedIndex(items.length - 1);
                break;
        }
    }, [getVisibleItems, selectedIndex]);

    // Reset selection when search changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    // Scroll selected item into view
    useEffect(() => {
        const items = getVisibleItems();
        const selectedItem = items[selectedIndex];
        if (selectedItem) {
            selectedItem.scrollIntoView({ block: 'nearest' });
        }
    }, [selectedIndex, getVisibleItems, search]);

    return (
        <CommandContext.Provider
            value={{
                search,
                setSearch,
                selectedIndex,
                setSelectedIndex,
                filterFn,
                value,
                onValueChange,
                listRef,
                inputRef,
                getVisibleItems,
            }}
        >
            <div
                className={cn(
                    'flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground',
                    className
                )}
                onKeyDown={handleKeyDown}
                {...props}
            >
                {children}
            </div>
        </CommandContext.Provider>
    );
}

export function CommandDialog({
    children,
    open,
    onOpenChange,
    className,
    ...props
}) {
    const contentRef = useRef(null);

    useEffect(() => {
        if (!open) return;

        // Lock body scroll
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        // Handle ESC key
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onOpenChange?.(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // Focus the input when opened
        const timer = setTimeout(() => {
            const input = contentRef.current?.querySelector('input');
            input?.focus();
        }, 0);

        return () => {
            document.body.style.overflow = originalStyle;
            document.removeEventListener('keydown', handleKeyDown);
            clearTimeout(timer);
        };
    }, [open, onOpenChange]);

    // Handle Cmd+K / Ctrl+K shortcut
    useEffect(() => {
        const handleGlobalKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                onOpenChange?.(!open);
            }
        };

        document.addEventListener('keydown', handleGlobalKeyDown);
        return () => document.removeEventListener('keydown', handleGlobalKeyDown);
    }, [open, onOpenChange]);

    if (!open) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onOpenChange?.(false);
        }
    };

    return createPortal(
        <div>
            <div
                className="fixed inset-0 z-50 bg-black/50 animate-in fade-in-0"
                onClick={handleOverlayClick}
            />
            <div
                ref={contentRef}
                className={cn(
                    'fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] duration-200',
                    className
                )}
                {...props}
            >
                <Command className="border border-border shadow-lg">
                    {children}
                </Command>
            </div>
        </div>,
        document.body
    );
}

export function CommandInput({
    className,
    placeholder = 'Search...',
    ...props
}) {
    const context = useContext(CommandContext);

    return (
        <div className="flex items-center border-b border-border px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <input
                ref={context?.inputRef}
                type="text"
                value={context?.search ?? ''}
                onChange={(e) => context?.setSearch(e.target.value)}
                placeholder={placeholder}
                className={cn(
                    'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
                    className
                )}
                {...props}
            />
        </div>
    );
}

export function CommandList({ children, className, ...props }) {
    const context = useContext(CommandContext);

    return (
        <div
            ref={context?.listRef}
            className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
            role="listbox"
            {...props}
        >
            {children}
        </div>
    );
}

export function CommandEmpty({ children, className, ...props }) {
    const context = useContext(CommandContext);
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        const checkEmpty = () => {
            const items = context?.listRef?.current?.querySelectorAll('[data-command-item]');
            const visibleItems = items ? Array.from(items).filter(item =>
                item.dataset.visible === 'true'
            ) : [];
            setIsEmpty(visibleItems.length === 0);
        };

        // Check after a brief delay to allow items to render/filter
        const timer = setTimeout(checkEmpty, 10);
        return () => clearTimeout(timer);
    }, [context?.search, context?.listRef]);

    if (!isEmpty) return null;

    return (
        <div
            className={cn('py-6 text-center text-sm text-muted-foreground', className)}
            {...props}
        >
            {children || 'No results found.'}
        </div>
    );
}

export function CommandGroup({ children, heading, className, ...props }) {
    const context = useContext(CommandContext);
    const groupRef = useRef(null);
    const [hasVisibleItems, setHasVisibleItems] = useState(true);

    useEffect(() => {
        const checkVisibleItems = () => {
            const items = groupRef.current?.querySelectorAll('[data-command-item]');
            const visibleItems = items ? Array.from(items).filter(item =>
                item.dataset.visible === 'true'
            ) : [];
            setHasVisibleItems(visibleItems.length > 0);
        };

        const timer = setTimeout(checkVisibleItems, 10);
        return () => clearTimeout(timer);
    }, [context?.search]);

    return (
        <div
            ref={groupRef}
            className={cn(
                'overflow-hidden p-1 text-foreground',
                !hasVisibleItems && 'hidden',
                className
            )}
            role="group"
            {...props}
        >
            {heading && hasVisibleItems && (
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                    {heading}
                </div>
            )}
            {children}
        </div>
    );
}

export function CommandItem({
    children,
    value,
    keywords,
    onSelect,
    shortcut,
    disabled = false,
    className,
    ...props
}) {
    const context = useContext(CommandContext);
    const itemRef = useRef(null);
    const [searchableText, setSearchableText] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const [isSelected, setIsSelected] = useState(false);

    // Extract text content from DOM after mount (works with any JSX structure)
    useEffect(() => {
        if (itemRef.current) {
            const text = itemRef.current.textContent || '';
            setSearchableText(text);
        }
    }, [children]);

    // Determine filter text: explicit value/keywords take precedence
    const filterText = value || keywords || searchableText;

    // Update visibility based on search
    useEffect(() => {
        const visible = context?.filterFn(filterText, context?.search) ?? true;
        setIsVisible(visible);
    }, [context?.search, context?.filterFn, filterText]);

    // Check if this item is selected (by index among visible items)
    useEffect(() => {
        if (!isVisible) {
            setIsSelected(false);
            return;
        }
        const items = context?.getVisibleItems() || [];
        const index = items.indexOf(itemRef.current);
        setIsSelected(index !== -1 && index === context?.selectedIndex);
    }, [context?.selectedIndex, context?.getVisibleItems, isVisible, context?.search]);

    // Register keyboard shortcut
    useEffect(() => {
        if (!shortcut || disabled) return;

        const handleKeyDown = (e) => {
            if (matchesShortcut(e, shortcut)) {
                e.preventDefault();
                onSelect?.(value || searchableText);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [shortcut, disabled, onSelect, value, searchableText]);

    const handleClick = () => {
        if (disabled) return;
        onSelect?.(value || searchableText);
        context?.onValueChange?.(value || searchableText);
    };

    const handleMouseEnter = () => {
        if (disabled || !isVisible) return;
        const items = context?.getVisibleItems() || [];
        const index = items.indexOf(itemRef.current);
        if (index !== -1) {
            context?.setSelectedIndex(index);
        }
    };

    return (
        <div
            ref={itemRef}
            data-command-item
            data-disabled={disabled}
            data-visible={isVisible}
            role="option"
            aria-selected={isSelected}
            aria-disabled={disabled}
            aria-hidden={!isVisible}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            className={cn(
                'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
                isVisible ? 'hover:bg-accent hover:text-accent-foreground' : 'hidden',
                isSelected && isVisible && 'bg-accent text-accent-foreground',
                disabled && 'pointer-events-none opacity-50',
                className
            )}
            {...props}
        >
            {children}
            {shortcut && (
                <CommandShortcut>{formatShortcut(shortcut)}</CommandShortcut>
            )}
        </div>
    );
}

export function CommandSeparator({ className, ...props }) {
    const context = useContext(CommandContext);

    // Hide separator when searching (items may be filtered)
    const hasSearch = context?.search?.length > 0;

    return (
        <div
            className={cn('-mx-1 h-px bg-border', hasSearch && 'hidden', className)}
            role="separator"
            {...props}
        />
    );
}

export function CommandShortcut({ children, className, ...props }) {
    return (
        <span
            className={cn(
                'ml-auto text-xs tracking-widest text-muted-foreground',
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}
