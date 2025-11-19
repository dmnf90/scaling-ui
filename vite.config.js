import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import {resolve} from 'path';

export default defineConfig(({command, mode}) => {
    // Check if we're building the demo or the library
    const isDemo = process.env.npm_lifecycle_script?.includes('demo') ||
        process.argv.some(arg => arg.includes('demo'));

    if (isDemo) {
        // Demo app configuration
        return {
            plugins: [react(), tailwindcss()],
            root: 'demo',
            build: {
                outDir: '../demo-dist',
                emptyOutDir: true,
            },
        };
    }

    // Library build configuration
    return {
        plugins: [react(), tailwindcss()],
        build: {
            lib: {
                entry: resolve(__dirname, 'src/index.js'),
                name: 'ScalingComponents',
                fileName: 'scaling-components',
                formats: ['es'],
            },
            rollupOptions: {
                external: ['react', 'react-dom', 'react/jsx-runtime'],
                output: {
                    globals: {
                        react: 'React',
                        'react-dom': 'ReactDOM',
                    },
                },
            },
            cssCodeSplit: false,
        },
    };
});
