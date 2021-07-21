import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import vuex from './vuex';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '/@/assets/css/index.scss'



import { useTable } from './plugins/vxe-table'
import { useMakedown } from './plugins/markdown'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'


const app = createApp(App);
app.use(router);
app.use(vuex);
app.use(Antd);
app.use(useMakedown);
app.use(VXETable);
// app.use(useTable);
router.isReady().then(() => {
    app.mount('#app');
})
