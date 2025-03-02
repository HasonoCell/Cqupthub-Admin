import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [resolve(__dirname, "src/assets/icons")],
      symbolId: "icon-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // 配置 @ 指向 src 目录
    },
  },
  css: {
    // 此处使 login 界面中 el-button 的 darken 函数生效
    preprocessorOptions: {
      scss: {
        logger: {
          warn: (message, options) => {
            if (!message.includes("darken()")) {
              console.warn(message);
            }
          },
        },
      },
    },
  },
});
