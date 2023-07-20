import { defineConfig } from 'astro/config';
import yaml from 'vite-plugin-yaml2';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [
            yaml()
        ]
    }
});
