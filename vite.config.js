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
  server: {
    proxy: {
      "/api": {
        target: "http://10.17.129.240:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  css: {
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
