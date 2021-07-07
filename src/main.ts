import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import vuex from './vuex';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import '/@/assets/css/common.scss'


import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';

import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import hljs from 'highlight.js';


VueMarkdownEditor.use(githubTheme, {
    Hljs: hljs,
});


const app = createApp(App);
app.use(router);
app.use(vuex);
app.use(Antd);
app.use(VueMarkdownEditor);
router.isReady().then(() => {
    app.mount('#app');
})
