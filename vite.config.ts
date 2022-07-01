import transformerDirective from '@unocss/transformer-directives'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import unocss from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    unocss({
      transformers: [transformerDirective()]
    })
  ]
})
