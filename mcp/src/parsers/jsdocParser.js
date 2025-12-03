/**
 * Parse JSDoc comments from component source code
 * Extracts @param tags and component descriptions
 */

/**
 * Extract all JSDoc blocks from source code
 * @param {string} content - Source file content
 * @returns {Array<{description: string, params: Array}>}
 */
export function parseJsDoc(content) {
    const jsdocBlocks = [];
    const jsdocPattern = /\/\*\*\s*([\s\S]*?)\s*\*\//g;

    let match;
    while ((match = jsdocPattern.exec(content)) !== null) {
        const block = match[1];
        const parsed = parseJsDocBlock(block);
        if (parsed.description || parsed.params.length > 0) {
            jsdocBlocks.push(parsed);
        }
    }

    return jsdocBlocks;
}

/**
 * Parse a single JSDoc block
 * @param {string} block - JSDoc block content (without comment markers)
 * @returns {{description: string, params: Array}}
 */
function parseJsDocBlock(block) {
    const lines = block.split('\n').map(line =>
        line.replace(/^\s*\*\s?/, '').trim()
    );

    let description = '';
    const params = [];

    for (const line of lines) {
        if (line.startsWith('@param')) {
            const param = parseParamTag(line);
            if (param) {
                params.push(param);
            }
        } else if (!line.startsWith('@') && line.length > 0) {
            if (description) {
                description += ' ' + line;
            } else {
                description = line;
            }
        }
    }

    return { description: description.trim(), params };
}

/**
 * Parse a @param tag
 * Supports formats:
 * - @param {type} name - description
 * - @param {type} props.name - description
 * - @param {type} [name] - description (optional)
 * - @param {type} [name=default] - description (with default)
 *
 * @param {string} line - The @param line
 * @returns {{name: string, type: string, description: string, optional: boolean} | null}
 */
function parseParamTag(line) {
    // Pattern: @param {type} props.name - description
    // or: @param {type} name - description
    const paramPattern = /^@param\s+\{([^}]+)\}\s+(?:props\.)?(\[?\w+\]?)\s*-?\s*(.*)/;
    const match = line.match(paramPattern);

    if (!match) {
        return null;
    }

    let [, type, name, description] = match;

    // Check if optional (wrapped in [])
    const optional = name.startsWith('[') && name.endsWith(']');
    if (optional) {
        name = name.slice(1, -1);
    }

    // Check for default value [name=default]
    let defaultValue = null;
    if (name.includes('=')) {
        const [paramName, defVal] = name.split('=');
        name = paramName;
        defaultValue = defVal;
    }

    return {
        name,
        type: type.trim(),
        description: description.trim(),
        optional,
        default: defaultValue
    };
}

/**
 * Find JSDoc for a specific function/component by name
 * @param {string} content - Source file content
 * @param {string} functionName - Name of function to find JSDoc for
 * @returns {{description: string, params: Array} | null}
 */
export function findJsDocForFunction(content, functionName) {
    // Pattern to find JSDoc immediately before function/const declaration
    const patterns = [
        // export function Name
        new RegExp(`\\/\\*\\*\\s*([\\s\\S]*?)\\s*\\*\\/\\s*\\n\\s*export\\s+function\\s+${functionName}\\s*\\(`),
        // export const Name = React.forwardRef
        new RegExp(`\\/\\*\\*\\s*([\\s\\S]*?)\\s*\\*\\/\\s*\\n\\s*export\\s+const\\s+${functionName}\\s*=`),
        // export const Name = function
        new RegExp(`\\/\\*\\*\\s*([\\s\\S]*?)\\s*\\*\\/\\s*\\n\\s*export\\s+const\\s+${functionName}\\s*=\\s*function`),
    ];

    for (const pattern of patterns) {
        const match = content.match(pattern);
        if (match) {
            return parseJsDocBlock(match[1]);
        }
    }

    return null;
}
