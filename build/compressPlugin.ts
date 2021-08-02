// 用于打包输出.gz|.brotil 文件
// https://github.com/anncwb/vite-plugin-compression/blob/main/README.zh_CN.md
import compressPlugin from "vite-plugin-compression";
import type { Plugin } from "vite";

export function configCompressPlugin(): Plugin | Plugin[] {
  const plugins: Plugin[] = [];

  plugins.push(
    compressPlugin(
      {
        ext: ".gz", // 生成的压缩包后缀
        verbose: true, // 是否在控制台输出压缩结果
        deleteOriginFile: true, // 	压缩后是否删除源文件
      }
    )
  );

  // plugins.push(
  //   compressPlugin({
  //     ext: ".br",
  //     algorithm: "brotliCompress",
  //     deleteOriginFile: true,
  //   })
  // );

  return plugins;
}
