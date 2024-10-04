import { defineConfig } from 'vite'
import { copyFile, mkdir } from 'fs/promises'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['pyodide']
  },
  plugins: [
    vue(),
    basicSsl(),
    {
      name: 'vite-plugin-pyodide',
      generateBundle: async () => {
        const assetsDir = 'dist/assets'
        await mkdir(assetsDir, { recursive: true })
        const files = [
          'pyodide-lock.json',
          'pyodide.asm.js',
          'pyodide.asm.wasm',
          'python_stdlib.zip'
        ]
        for (const file of files) {
          await copyFile(
            join('node_modules/pyodide', file),
            join(assetsDir, file)
          )
        }
      }
    }
  ]
})
