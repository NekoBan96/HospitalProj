import { createApp } from "vue";
import App from "./App.vue";
import "./styles/app.css";
import components from "@/components/UI";
import router from "@/router/index.js";
import store from "@/store";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app
.use(Toast, {
  transition: "Vue-Toastification__fade",
  maxToasts: 5,
})
.use(autoAnimatePlugin)
.use(router)
.use(store)
.mount("#app");
