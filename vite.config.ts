import type { UserConfig } from "vite";
import { resolve } from "path";
import { MyPlugins } from "./build/index";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

const isDev = process.env.NODE_ENV === "development";

const viteConfig: UserConfig = {
  base: "/",
  root: process.cwd(),
  build: {
    // 设置最终构建的浏览器兼容目标。
    target: 'es2015',
    // 打包输出目录
    outDir: "dist",
    // 指定生成静态资源的存放路径
    assetsDir: "assets",
    // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求,设置为 0 可以完全禁用此项。
    assetsInlineLimit: 4096,
    // 源码映射
    sourcemap: isDev ? true : false,
    terserOptions: {
      compress: {
        // 打包自动删除console
        drop_console: true,
        drop_debugger: true,
        // 对代码压缩的次数，默认是1，压缩次数越多，时间越长
        passes: 100,
      },
    },
    // 设置为false禁用缩小，或指定要使用的缩小器。默认为Terser，它速度较慢，但​​在大多数情况下会生成较小的包。
    // Esbuild 缩小速度明显更快，但会产生稍大的包。
    minify: isDev ? "esbuild" : "terser",
    // 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用它可能会提高大型项目的构建性能。
    brotliSize: false,
    // 块大小警告的限制（以 kbs 为单位）,默认： 500
    chunkSizeWarningLimit: 2000,
  },
  css: {
    preprocessorOptions: {
      less: {
        // 解决andt less loader版本高的问题
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: [
      {
        find: /\/@\//,
        replacement: pathResolve("src") + "/",
      },
    ],
    // extensions: [".js", ".ts", ".vue"], //这加上.vue
  },
  plugins: MyPlugins(),
  server: {
    proxy: {
      "/blogapi/": {
        target: "http://127.0.0.1:7779/",
        changeOrigin: true,
        secure: false, // 如果是https接口，需要配置这个参数
        rewrite: (path) => path.replace(/^\/blogapi/, ""),
      },
    },
  },
};

// https://vitejs.dev/config/
// https://gitee.com/wkl--007/vue-vben-admin/blob/main/vite.config.ts
export default {
  ...viteConfig,
} as UserConfig;
