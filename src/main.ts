import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { setRouterGuards } from '/@/router/router-guard'
import { setupStore } from "./store";
import "/@/assets/css/index.scss";
import 'default-passive-events'


import { useTable } from "./plugins/vxe-table";
import { useAntd } from "./plugins/antd";
import { useMakedown } from "./plugins/markdown";
const app = createApp(App);
app.use(router);
setupStore(app);
setRouterGuards(router);
app.use(useMakedown);
app.use(useAntd);
app.use(useTable);
router.isReady().then(() => {
  app.mount("#app");
});
