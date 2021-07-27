import type { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// 按需导入组件库样式的插件
import styleImport from 'vite-plugin-style-import'


function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}


const viteConfig: UserConfig = {
  build: {
    // 打包输出目录
    outDir: 'dist',
    // 指定生成静态资源的存放路径
    assetsDir:"assets",
    // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求,设置为 0 可以完全禁用此项。
    assetsInlineLimit:4096,
    // 源码映射
    sourcemap: true,
  },
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
        {
          libraryName: 'vxe-table',
          esModule: true,
          resolveComponent: (name) => `vxe-table/es/${name}`,
          resolveStyle: (name) => `vxe-table/es/${name}/style.css`
        }
      ]
    })
  ],
  server: {
    proxy: {
      '/blogapi/': {
        // target: 'http://127.0.0.1:7779/',
        target: 'http://127.0.0.1:7779/',
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        rewrite: (path) => path.replace(/^\/blogapi/, '')
      }
    }
  }
}

// https://vitejs.dev/config/
// https://gitee.com/wkl--007/vue-vben-admin/blob/main/vite.config.ts
export default {
  ...viteConfig,
} as UserConfig
