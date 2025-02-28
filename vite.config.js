import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // 配置 @ 指向 src 目录
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        logger: {
          warn: (message, options) => {
            if (!message.includes('darken()')) {
              console.warn(message)
            }
          }
        }
      }
    }
  }
});
