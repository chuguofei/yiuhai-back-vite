import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import '/@/assets/css/index.scss';
import { useStore } from './store/index';
import { createPinia } from 'pinia'

import { useTable } from './plugins/vxe-table';
import { useAntd } from './plugins/antd';
import { useMakedown } from './plugins/markdown';
const app = createApp(App);
app.use(router);
app.use(useMakedown);
app.use(useAntd);
app.use(useTable);
router.isReady().then(() => {
    app.use(createPinia());
    app.mount('#app');
})
