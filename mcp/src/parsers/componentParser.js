/**
 * Main component parser - combines JSDoc, CVA, and other parsers
 * to build complete component documentation
 */

import { parseJsDoc, findJsDocForFunction } from './jsdocParser.js';
import { parseCvaVariants, parseAllCvaVariants } from './cvaParser.js';

/**
 * Parse a component file and extract all documentation
 * @param {string} content - Component source file content
 * @param {string} componentName - Name of the component
 * @returns {Object} - Parsed component documentation
 */
export function parseComponent(content, componentName) {
    const result = {
        name: componentName,
        description: '',
        imports: `import { ${componentName} } from 'scaling-ui';`,
        props: [],
        variants: {},
        defaultVariants: {},
        subComponents: [],
        hasForwardRef: false
    };

    // Check for forwardRef usage
    result.hasForwardRef = content.includes('React.forwardRef') || content.includes('forwardRef(');

    // Extract JSDoc for the main component
    const mainJsDoc = findJsDocForFunction(content, componentName);
    if (mainJsDoc) {
        result.description = mainJsDoc.description;
        result.props = mainJsDoc.params.map(param => ({
            name: param.name,
            type: param.type,
            description: param.description,
            default: param.default || findDefaultInDestructuring(content, param.name),
            required: !param.optional && !param.default
        }));
    }

    // Extract CVA variants
    const cvaResult = parseCvaVariants(content);
    if (cvaResult) {
        result.variants = cvaResult.variants;
        result.defaultVariants = cvaResult.defaultVariants;

        // Update props with variant information
        for (const [variantName, options] of Object.entries(cvaResult.variants)) {
            const existingProp = result.props.find(p => p.name === variantName);
            if (existingProp) {
                existingProp.type = options.map(o => `'${o}'`).join(' | ');
                existingProp.default = cvaResult.defaultVariants[variantName]
                    ? `'${cvaResult.defaultVariants[variantName]}'`
                    : existingProp.default;
            } else {
                result.props.push({
                    name: variantName,
                    type: options.map(o => `'${o}'`).join(' | '),
                    description: `${variantName.charAt(0).toUpperCase() + variantName.slice(1)} option`,
                    default: cvaResult.defaultVariants[variantName]
                        ? `'${cvaResult.defaultVariants[variantName]}'`
                        : undefined,
                    required: false
                });
            }
        }
    }

    // Extract sub-components (exported functions/components)
    result.subComponents = extractSubComponents(content, componentName);

    // Add common props that are typically spread
    addCommonProps(result);

    return result;
}

/**
 * Extract sub-components from a compound component file
 * @param {string} content - File content
 * @param {string} mainComponentName - Main component name to exclude
 * @returns {Array<{name: string, description: string}>}
 */
function extractSubComponents(content, mainComponentName) {
    const subComponents = [];

    // Pattern to find exported functions/components
    const patterns = [
        /export\s+function\s+(\w+)\s*\(/g,
        /export\s+const\s+(\w+)\s*=\s*(?:React\.)?forwardRef/g,
        /export\s+const\s+(\w+)\s*=\s*function/g,
    ];

    const found = new Set();

    for (const pattern of patterns) {
        let match;
        while ((match = pattern.exec(content)) !== null) {
            const name = match[1];
            if (name !== mainComponentName && !found.has(name)) {
                found.add(name);

                // Try to find JSDoc for this sub-component
                const jsdoc = findJsDocForFunction(content, name);

                subComponents.push({
                    name,
                    description: jsdoc?.description || ''
                });
            }
        }
    }

    return subComponents;
}

/**
 * Escape special regex characters in a string
 * @param {string} str - String to escape
 * @returns {string}
 */
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Find default value in function destructuring
 * @param {string} content - File content
 * @param {string} paramName - Parameter name to find
 * @returns {string | undefined}
 */
function findDefaultInDestructuring(content, paramName) {
    // Skip invalid param names
    if (!paramName || !/^\w+$/.test(paramName)) {
        return undefined;
    }

    // Pattern: paramName = 'value' or paramName = value
    const pattern = new RegExp(`${escapeRegex(paramName)}\\s*=\\s*(['"\`]?)([^,}\\n]+)\\1`);
    const match = content.match(pattern);

    if (match) {
        const value = match[2].trim();
        // Return quoted string for string values, raw for others
        if (match[1]) {
            return `'${value}'`;
        }
        return value;
    }

    return undefined;
}

/**
 * Infer type from prop name and default value
 * @param {string} name - Prop name
 * @param {string | undefined} defaultValue - Default value if present
 * @returns {string}
 */
function inferType(name, defaultValue) {
    // Common prop name patterns
    const typeMap = {
        className: 'string',
        children: 'React.ReactNode',
        onClick: 'function',
        onChange: 'function',
        onSubmit: 'function',
        onClose: 'function',
        onOpen: 'function',
        onSelect: 'function',
        disabled: 'boolean',
        open: 'boolean',
        checked: 'boolean',
        required: 'boolean',
        loading: 'boolean',
        asChild: 'boolean',
        value: 'string',
        defaultValue: 'string',
        placeholder: 'string',
        label: 'string',
        title: 'string',
        description: 'string',
        id: 'string',
        name: 'string',
        type: 'string',
        variant: 'string',
        size: 'string',
        side: "'top' | 'right' | 'bottom' | 'left'",
        align: "'start' | 'center' | 'end'",
        orientation: "'horizontal' | 'vertical'",
    };

    if (typeMap[name]) {
        return typeMap[name];
    }

    // Infer from default value
    if (defaultValue !== undefined) {
        if (defaultValue === 'true' || defaultValue === 'false') {
            return 'boolean';
        }
        if (defaultValue.startsWith("'") || defaultValue.startsWith('"')) {
            return 'string';
        }
        if (!isNaN(Number(defaultValue))) {
            return 'number';
        }
    }

    return 'any';
}

/**
 * Extract props from function parameter destructuring
 * @param {string} content - File content
 * @param {string} componentName - Component/function name
 * @returns {Array<{name: string, type: string, default?: string, required: boolean}>}
 */
function extractPropsFromDestructuring(content, componentName) {
    const props = [];

    // Pattern variations for finding function parameters
    const patterns = [
        // export function ComponentName({ prop1, prop2 = 'default' })
        new RegExp(`export\\s+function\\s+${componentName}\\s*\\(\\s*\\{([^}]+)\\}`, 's'),
        // export const ComponentName = function({ prop1, prop2 })
        new RegExp(`export\\s+const\\s+${componentName}\\s*=\\s*function\\s*\\(\\s*\\{([^}]+)\\}`, 's'),
        // export const ComponentName = React.forwardRef(({ prop1, prop2 }, ref)
        new RegExp(`export\\s+const\\s+${componentName}\\s*=\\s*(?:React\\.)?forwardRef\\s*\\(\\s*\\(\\s*\\{([^}]+)\\}`, 's'),
        // function ComponentName({ prop1, prop2 })
        new RegExp(`function\\s+${componentName}\\s*\\(\\s*\\{([^}]+)\\}`, 's'),
        // const ComponentName = ({ prop1, prop2 }) =>
        new RegExp(`const\\s+${componentName}\\s*=\\s*\\(\\s*\\{([^}]+)\\}\\s*\\)\\s*=>`, 's'),
    ];

    let paramsStr = null;

    for (const pattern of patterns) {
        const match = content.match(pattern);
        if (match) {
            paramsStr = match[1];
            break;
        }
    }

    if (!paramsStr) return props;

    // Parse individual parameters
    // Handle: prop, prop = 'default', prop = true, ...rest
    const paramPattern = /(\w+)(?:\s*=\s*(['"`]?)([^,}\n]+?)\2)?(?:,|$)/g;
    let paramMatch;

    while ((paramMatch = paramPattern.exec(paramsStr)) !== null) {
        const name = paramMatch[1].trim();

        // Skip spread operator and common non-prop names
        if (name === 'props' || name === 'ref' || name === 'rest' || name.startsWith('...')) {
            continue;
        }

        let defaultValue = paramMatch[3]?.trim();
        if (paramMatch[2] && defaultValue) {
            defaultValue = `'${defaultValue}'`;
        }

        props.push({
            name,
            type: inferType(name, defaultValue),
            default: defaultValue,
            required: !defaultValue,
            description: `${name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1').trim()}`
        });
    }

    return props;
}

/**
 * Add common React props that are typically spread
 * @param {Object} result - Component result object
 */
function addCommonProps(result) {
    const commonProps = [
        {
            name: 'className',
            type: 'string',
            description: 'Additional CSS classes',
            required: false
        },
        {
            name: 'children',
            type: 'React.ReactNode',
            description: 'Component content',
            required: false
        }
    ];

    for (const prop of commonProps) {
        if (!result.props.find(p => p.name === prop.name)) {
            result.props.push(prop);
        }
    }

    // Add ref prop if component uses forwardRef
    if (result.hasForwardRef && !result.props.find(p => p.name === 'ref')) {
        result.props.push({
            name: 'ref',
            type: 'React.Ref',
            description: 'Forward ref to the underlying element',
            required: false
        });
    }
}

/**
 * Parse a compound component file with multiple exports
 * @param {string} content - File content
 * @param {string} mainComponentName - Main component name
 * @returns {Object} - Full component documentation including sub-components
 */
export function parseCompoundComponent(content, mainComponentName) {
    const mainComponent = parseComponent(content, mainComponentName);

    // Parse each sub-component
    const subComponentDocs = [];
    for (const sub of mainComponent.subComponents) {
        const subDoc = {
            name: sub.name,
            description: sub.description,
            props: []
        };

        // Try to find JSDoc params for sub-component
        const jsdoc = findJsDocForFunction(content, sub.name);
        if (jsdoc && jsdoc.params.length > 0) {
            subDoc.description = jsdoc.description || sub.description;
            subDoc.props = jsdoc.params.map(param => ({
                name: param.name,
                type: param.type,
                description: param.description,
                default: param.default || findDefaultInDestructuring(content, param.name),
                required: !param.optional
            }));
        } else {
            // Fallback: extract props from function parameter destructuring
            const extractedProps = extractPropsFromDestructuring(content, sub.name);
            if (extractedProps.length > 0) {
                subDoc.props = extractedProps;
            }
        }

        // Add common props if not present
        const hasClassName = subDoc.props.some(p => p.name === 'className');
        const hasChildren = subDoc.props.some(p => p.name === 'children');

        if (!hasClassName) {
            subDoc.props.push({
                name: 'className',
                type: 'string',
                description: 'Additional CSS classes',
                required: false
            });
        }
        if (!hasChildren) {
            subDoc.props.push({
                name: 'children',
                type: 'React.ReactNode',
                description: 'Content',
                required: false
            });
        }

        subComponentDocs.push(subDoc);
    }

    return {
        ...mainComponent,
        subComponentDocs
    };
}
