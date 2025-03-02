// src/main.js
import { createApp } from "vue";
import "./styles/index.css";
import App from "./App.vue";
import router from "./router";
import pinia from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "virtual:svg-icons-register";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
app.use(router);
app.use(pinia);

app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
