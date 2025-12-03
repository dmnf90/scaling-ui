/**
 * Parse demo page files to extract usage examples
 */

/**
 * Parse demo page to extract code examples
 * @param {string} content - Demo page file content
 * @param {string} componentName - Name of the component
 * @returns {Array<{title: string, code: string}>}
 */
export function parseDemoExamples(content, componentName) {
    const examples = [];

    // Extract the import statement
    const importMatch = content.match(/import\s*\{([^}]+)\}\s*from\s*['"`].*(?:scaling-ui|\.\.\/\.\.\/\.\.\/src\/index)['"`]/);
    if (importMatch) {
        examples.push({
            title: 'Import',
            code: `import { ${importMatch[1].trim()} } from 'scaling-ui';`,
            type: 'import'
        });
    }

    // Extract code examples from <Example code={`...`}> components
    const codeExamples = extractExampleCodes(content);
    examples.push(...codeExamples);

    // Extract code from <CodeBlock code={`...`}> components
    const codeBlocks = extractCodeBlocks(content);
    examples.push(...codeBlocks);

    return examples;
}

/**
 * Extract code from Example components
 * @param {string} content - File content
 * @returns {Array<{title: string, code: string}>}
 */
function extractExampleCodes(content) {
    const examples = [];

    // Pattern to match code={`...`} in Example components
    // Handle both single-line and multi-line template literals
    const codePattern = /code=\{\`([\s\S]*?)\`\}/g;

    let match;
    let index = 0;
    while ((match = codePattern.exec(content)) !== null) {
        const code = match[1].trim();
        if (code) {
            // Try to determine a title from the surrounding Section
            const title = findSectionTitle(content, match.index) || `Example ${++index}`;
            examples.push({
                title,
                code,
                type: 'example'
            });
        }
    }

    return examples;
}

/**
 * Extract code from CodeBlock components
 * @param {string} content - File content
 * @returns {Array<{title: string, code: string}>}
 */
function extractCodeBlocks(content) {
    const blocks = [];

    // Pattern for CodeBlock code={`...`}
    const pattern = /<CodeBlock[^>]*code=\{\`([\s\S]*?)\`\}/g;

    let match;
    while ((match = pattern.exec(content)) !== null) {
        const code = match[1].trim();
        if (code && !code.startsWith('import')) {
            // Skip import statements as they're already captured
            const title = findSectionTitle(content, match.index) || 'Code Block';
            blocks.push({
                title,
                code,
                type: 'codeblock'
            });
        }
    }

    return blocks;
}

/**
 * Find the Section title that contains a given position in the content
 * @param {string} content - File content
 * @param {number} position - Character position
 * @returns {string | null}
 */
function findSectionTitle(content, position) {
    // Find all Section components before this position
    const beforeContent = content.substring(0, position);

    // Match <Section title="..." or <Section title={'...'}
    const sectionPattern = /<Section[^>]*title=["'`{]+"?([^"'>}]+)/g;

    let lastTitle = null;
    let match;
    while ((match = sectionPattern.exec(beforeContent)) !== null) {
        lastTitle = match[1].replace(/['"`]/g, '').trim();
    }

    return lastTitle;
}

/**
 * Extract props table from demo page if present
 * @param {string} content - Demo page content
 * @returns {Array<{name: string, type: string, default: string, description: string}>}
 */
export function extractPropsTable(content) {
    const props = [];

    // Find table rows in Props section
    const propsSection = content.match(/<Section[^>]*title=["']Props["'][^>]*>[\s\S]*?<\/Section>/);
    if (!propsSection) {
        return props;
    }

    const tableContent = propsSection[0];

    // Extract table rows
    // Pattern for: <td ...>propName</td><td ...>type</td><td ...>default</td><td ...>description</td>
    const rowPattern = /<tr[^>]*class[^>]*border[^>]*>[\s\S]*?<td[^>]*>([^<]+)<\/td>[\s\S]*?<td[^>]*>([^<]+)<\/td>[\s\S]*?<td[^>]*>([^<]+)<\/td>[\s\S]*?<td[^>]*>([^<]+)<\/td>/g;

    let match;
    while ((match = rowPattern.exec(tableContent)) !== null) {
        const [, name, type, defaultVal, description] = match;
        props.push({
            name: name.trim(),
            type: type.trim(),
            default: defaultVal.trim(),
            description: description.trim()
        });
    }

    return props;
}

/**
 * Extract component description from demo page header
 * @param {string} content - Demo page content
 * @returns {string | null}
 */
export function extractDemoDescription(content) {
    // Look for description in the header section
    // Pattern: <p className="text-lg text-muted-foreground">...</p>
    const descPattern = /<p[^>]*text-(?:lg|muted)[^>]*>([^<]+)<\/p>/;
    const match = content.match(descPattern);

    return match ? match[1].trim() : null;
}
