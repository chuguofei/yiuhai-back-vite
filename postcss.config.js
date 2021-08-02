//
module.exports = {
    plugins: {
        // https://www.tailwindcss.cn/docs/plugins
        // Tailwind CSS是一款实用为主效用优先的CSS框架
        // TailwindCSS作为PostCSS插件存在，将基础的CSS拆分为原子级别。
        // PostCSS提供Autoprefixer插件用于补全各种浏览器前缀，兼容性更好。
        // tailwindcss: {},
        // 
        autoprefixer: {
            overrideBrowserslist: [
                "Android 4.1",
                "iOS 7.1",
                "Chrome > 31",
                "ff > 31",
                "ie >= 8",
                "last 10 versions", // 所有主流浏览器最近10版本用
            ],
            grid: true,
        },
    },
};
