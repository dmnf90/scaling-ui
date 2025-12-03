/**
 * Parse CVA (class-variance-authority) variants from component source code
 * Extracts variant options and default values
 */

/**
 * Parse CVA variants from source code
 * @param {string} content - Source file content
 * @returns {{variants: Object, defaultVariants: Object, baseClasses: string} | null}
 */
export function parseCvaVariants(content) {
    // Find cva() call - matches pattern: const xxxVariants = cva('...', {...})
    const cvaPattern = /const\s+(\w+Variants)\s*=\s*cva\s*\(\s*(['"`])([\s\S]*?)\2\s*,\s*(\{[\s\S]*?\})\s*\)/;
    const match = content.match(cvaPattern);

    if (!match) {
        return null;
    }

    const [, variantName, , baseClasses, configStr] = match;

    // Parse the config object to extract variants and defaultVariants
    const variants = extractVariants(configStr);
    const defaultVariants = extractDefaultVariants(configStr);

    return {
        variantName,
        baseClasses: baseClasses.trim(),
        variants,
        defaultVariants
    };
}

/**
 * Parse all CVA variant declarations in a file (for compound components)
 * @param {string} content - Source file content
 * @returns {Array<{variantName: string, variants: Object, defaultVariants: Object}>}
 */
export function parseAllCvaVariants(content) {
    const results = [];
    const cvaPattern = /const\s+(\w+Variants)\s*=\s*cva\s*\(\s*(['"`])([\s\S]*?)\2\s*,\s*(\{[\s\S]*?\})\s*\)/g;

    let match;
    while ((match = cvaPattern.exec(content)) !== null) {
        const [, variantName, , baseClasses, configStr] = match;
        results.push({
            variantName,
            baseClasses: baseClasses.trim(),
            variants: extractVariants(configStr),
            defaultVariants: extractDefaultVariants(configStr)
        });
    }

    return results;
}

/**
 * Extract variants object from CVA config string
 * @param {string} configStr - The CVA config object as string
 * @returns {Object} - Parsed variants
 */
function extractVariants(configStr) {
    const variants = {};

    // Find the variants block
    const variantsMatch = configStr.match(/variants:\s*\{([\s\S]*?)\}\s*,?\s*(?:defaultVariants|compoundVariants|\})/);
    if (!variantsMatch) {
        return variants;
    }

    const variantsContent = variantsMatch[1];

    // Parse each variant category (e.g., variant, size)
    // Match pattern: variantName: { option1: '...', option2: '...' }
    const categoryPattern = /(\w+):\s*\{([^}]+)\}/g;
    let categoryMatch;

    while ((categoryMatch = categoryPattern.exec(variantsContent)) !== null) {
        const [, categoryName, optionsContent] = categoryMatch;

        // Extract option names from the category
        const options = [];
        const optionPattern = /(\w+):/g;
        let optionMatch;

        while ((optionMatch = optionPattern.exec(optionsContent)) !== null) {
            options.push(optionMatch[1]);
        }

        if (options.length > 0) {
            variants[categoryName] = options;
        }
    }

    return variants;
}

/**
 * Extract defaultVariants from CVA config string
 * @param {string} configStr - The CVA config object as string
 * @returns {Object} - Parsed default variants
 */
function extractDefaultVariants(configStr) {
    const defaultVariants = {};

    // Find the defaultVariants block
    const defaultMatch = configStr.match(/defaultVariants:\s*\{([^}]+)\}/);
    if (!defaultMatch) {
        return defaultVariants;
    }

    const defaultsContent = defaultMatch[1];

    // Parse each default value
    // Match pattern: variantName: 'value' or variantName: "value"
    const defaultPattern = /(\w+):\s*['"`](\w+)['"`]/g;
    let match;

    while ((match = defaultPattern.exec(defaultsContent)) !== null) {
        const [, key, value] = match;
        defaultVariants[key] = value;
    }

    return defaultVariants;
}
