/**
 * Build script to generate component documentation data
 * Scans all components in src/components and demo pages
 * Outputs to src/data/components.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseComponent, parseCompoundComponent } from '../src/parsers/componentParser.js';
import { parseDemoExamples, extractPropsTable, extractDemoDescription } from '../src/parsers/demoParser.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');
const componentsDir = path.join(rootDir, 'src/components');
const demoDir = path.join(rootDir, 'demo/src/pages');
const outputDir = path.join(__dirname, '../src/data');
const outputPath = path.join(outputDir, 'components.json');

// Known compound components (have multiple sub-components)
const COMPOUND_COMPONENTS = [
    'Dialog',
    'Drawer',
    'DropdownMenu',
    'ContextMenu',
    'Accordion',
    'Tabs',
    'Card',
    'Table',
    'NavigationMenu',
    'Sidebar',
    'Command',
    'Form',
    'Carousel',
    'Breadcrumb',
    'Pagination',
    'DataTable',
    'Popover',
    'Tooltip',
    'RadioGroup',
    'Combobox',
    'Calendar',
    'DatePicker',
    'Menubar'
];

async function buildComponentData() {
    console.log('Building component documentation data...\n');

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Get all component directories
    const componentDirs = fs.readdirSync(componentsDir, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name)
        .sort();

    console.log(`Found ${componentDirs.length} component directories\n`);

    const components = [];

    for (const name of componentDirs) {
        const componentPath = path.join(componentsDir, name, `${name}.jsx`);

        // Check if component file exists
        if (!fs.existsSync(componentPath)) {
            console.log(`  Skipping ${name}: No ${name}.jsx found`);
            continue;
        }

        console.log(`  Processing ${name}...`);

        try {
            const componentContent = fs.readFileSync(componentPath, 'utf-8');

            // Parse component (compound or simple)
            let componentData;
            if (COMPOUND_COMPONENTS.includes(name)) {
                componentData = parseCompoundComponent(componentContent, name);
            } else {
                componentData = parseComponent(componentContent, name);
            }

            // Try to enhance with demo page data
            const demoPath = path.join(demoDir, `${name}Page.jsx`);
            if (fs.existsSync(demoPath)) {
                const demoContent = fs.readFileSync(demoPath, 'utf-8');

                // Get examples from demo
                const examples = parseDemoExamples(demoContent, name);
                componentData.examples = examples;

                // Get description from demo if not found in source
                if (!componentData.description) {
                    const demoDescription = extractDemoDescription(demoContent);
                    if (demoDescription) {
                        componentData.description = demoDescription;
                    }
                }

                // Get props from demo table if source parsing missed any
                const demoProps = extractPropsTable(demoContent);
                if (demoProps.length > 0) {
                    // Merge demo props with parsed props
                    for (const demoProp of demoProps) {
                        const existing = componentData.props.find(p => p.name === demoProp.name);
                        if (!existing) {
                            componentData.props.push({
                                name: demoProp.name,
                                type: demoProp.type,
                                default: demoProp.default !== '-' ? demoProp.default : undefined,
                                description: demoProp.description,
                                required: false
                            });
                        } else if (!existing.description && demoProp.description) {
                            // Enhance existing prop with demo description
                            existing.description = demoProp.description;
                        }
                    }
                }
            } else {
                componentData.examples = [];
            }

            // Add file path for reference
            componentData.filePath = `src/components/${name}/${name}.jsx`;

            components.push(componentData);
            console.log(`    ✓ ${name} - ${componentData.props.length} props, ${componentData.subComponents?.length || 0} sub-components`);

        } catch (error) {
            console.error(`    ✗ Error processing ${name}:`, error.message);
        }
    }

    // Write output
    const output = {
        generatedAt: new Date().toISOString(),
        totalComponents: components.length,
        components
    };

    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

    console.log(`\n✓ Built documentation for ${components.length} components`);
    console.log(`  Output: ${outputPath}`);
}

// Run the build
buildComponentData().catch(console.error);
