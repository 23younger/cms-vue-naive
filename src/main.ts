import { createApp } from "vue";
import "./styles/index.less";
import "uno.css";
import App from "./App.vue";
import { setupRouter } from "./router";
import { setupStore } from "./store";
import "virtual:svg-icons-register";

const app = createApp(App);
setupStore(app);
setupRouter(app);
app.mount("#app");
