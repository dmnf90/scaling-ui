/**
 * Component Registry - loads and provides access to component documentation
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, 'components.json');

let componentData = null;

/**
 * Load component data from JSON file
 * @returns {Promise<Object>}
 */
export async function loadComponentData() {
    if (componentData) {
        return componentData;
    }

    if (!fs.existsSync(dataPath)) {
        console.warn('Component data not found. Run "npm run build:data" first.');
        // Return empty structure
        componentData = {
            generatedAt: null,
            totalComponents: 0,
            components: []
        };
        return componentData;
    }

    const content = fs.readFileSync(dataPath, 'utf-8');
    componentData = JSON.parse(content);
    return componentData;
}

/**
 * Get all components
 * @returns {Array}
 */
export function getComponents() {
    return componentData?.components || [];
}

/**
 * Get component by name (case-insensitive)
 * @param {string} name
 * @returns {Object | null}
 */
export function getComponentByName(name) {
    const components = getComponents();
    return components.find(
        c => c.name.toLowerCase() === name.toLowerCase()
    ) || null;
}

/**
 * Search components by name, description, or prop names/descriptions
 * @param {string} query
 * @returns {Array}
 */
export function searchComponents(query) {
    const components = getComponents();
    const queryLower = query.toLowerCase();

    return components.filter(c =>
        c.name.toLowerCase().includes(queryLower) ||
        c.description?.toLowerCase().includes(queryLower) ||
        c.props?.some(p =>
            p.name?.toLowerCase().includes(queryLower) ||
            p.description?.toLowerCase().includes(queryLower)
        ) ||
        c.subComponents?.some(s =>
            s.name?.toLowerCase().includes(queryLower) ||
            s.description?.toLowerCase().includes(queryLower)
        )
    );
}

/**
 * Get component registry metadata
 * @returns {Object}
 */
export function getRegistryMetadata() {
    return {
        generatedAt: componentData?.generatedAt,
        totalComponents: componentData?.totalComponents || 0
    };
}
