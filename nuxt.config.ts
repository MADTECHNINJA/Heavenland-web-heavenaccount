import { defineNuxtConfig } from 'nuxt/config';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: ['@formkit/nuxt', '@nuxtjs/tailwindcss', '@pinia/nuxt'],

    css: ['@/styles/style.css', '@/styles/form.css'],

    app: {
        head: {
            title: 'Heavenaccount',
            link: [
                { rel: 'icon', href: '/favicon.ico' },
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Courier+Prime&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap',
                },
            ],
            charset: 'UTF-8',
        },
    },

    vite: {
        optimizeDeps: {
            esbuildOptions: {
                define: {
                    global: 'globalThis',
                },
                plugins: [
                    NodeGlobalsPolyfillPlugin({
                        process: true,
                        buffer: true,
                    }),
                ],
            },
        },
    },

    ssr: false,
});
