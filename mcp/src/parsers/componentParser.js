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
 * Find default value in function destructuring
 * @param {string} content - File content
 * @param {string} paramName - Parameter name to find
 * @returns {string | undefined}
 */
function findDefaultInDestructuring(content, paramName) {
    // Pattern: paramName = 'value' or paramName = value
    const pattern = new RegExp(`${paramName}\\s*=\\s*(['"\`]?)([^,}\\n]+)\\1`);
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
        if (jsdoc) {
            subDoc.props = jsdoc.params.map(param => ({
                name: param.name,
                type: param.type,
                description: param.description,
                default: param.default || findDefaultInDestructuring(content, param.name),
                required: !param.optional
            }));
        }

        subComponentDocs.push(subDoc);
    }

    return {
        ...mainComponent,
        subComponentDocs
    };
}
