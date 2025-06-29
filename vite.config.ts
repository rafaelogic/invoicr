import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { copyFileSync, existsSync, mkdirSync } from 'fs'

export default defineConfig({
  plugins: [
    react(),
    // Custom plugin to copy manifest and icons
    {
      name: 'copy-manifest',
      writeBundle() {
        // Copy manifest.json from root to dist
        copyFileSync('manifest.json', 'dist/manifest.json')
        
        // Copy icons folder to dist
        if (!existsSync('dist/icons')) {
          mkdirSync('dist/icons', { recursive: true })
        }
        
        // Copy icon files if they exist
        const iconSizes = ['16', '48', '128']
        iconSizes.forEach(size => {
          const iconPath = `icons/icon${size}.png`
          if (existsSync(iconPath)) {
            copyFileSync(iconPath, `dist/icons/icon${size}.png`)
          }
        })
      }
    }
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        options: resolve(__dirname, 'src/options.html'),
        background: resolve(__dirname, 'src/background.ts')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    },
    sourcemap: process.env.NODE_ENV === 'development'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  base: './'
})
