import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Router from 'unplugin-vue-router/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    Router({
      dts: './src/typed-router.d.ts',
    }),
  ],
})
