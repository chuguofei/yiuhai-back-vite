// 按需导入组件库样式的插件
import styleImport from "vite-plugin-style-import";

export function viteStyleImport() {
  return styleImport({
    libs: [
      {
        libraryName: "ant-design-vue",
        esModule: true,
        resolveStyle: (name) => {
          return `ant-design-vue/es/${name}/style/index`;
        },
      },
      {
        libraryName: "vxe-table",
        esModule: true,
        resolveComponent: (name) => `vxe-table/es/${name}`,
        resolveStyle: (name) => `vxe-table/es/${name}/style.css`,
      },
    ],
  });
}
