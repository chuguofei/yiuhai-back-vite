import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import styleImport from 'vite-plugin-style-import'


function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        // 解决andt less loader版本高的问题
        javascriptEnabled: true,
      }
    }
  },
  resolve: {
    alias: [
       {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
      }
      // '@': resolve(__dirname, './src')
    ],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],//这加上.vue
  },
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/index`
          },
        },
      ]
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:6666/',
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
