import { configImageminPlugin } from "./imagemin";
import { configCompressPlugin } from "./compressPlugin";
import { viteStyleImport } from "./styleImport";
import type { Plugin } from "vite";

import vue from "@vitejs/plugin-vue";

export function MyPlugins() {
  const vitePlugins: (Plugin | Plugin[])[] = [vue()];
  // 按需导入
  vitePlugins.push(viteStyleImport());
  // 图片压缩
  vitePlugins.push(configImageminPlugin());
  // 用于打包输出.gz|.brotil 文件
  vitePlugins.push(configCompressPlugin());
  return vitePlugins;
}
