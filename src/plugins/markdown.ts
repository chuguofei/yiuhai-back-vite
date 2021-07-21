import { App } from 'vue'

import VueMarkdownEditor from '@kangc/v-md-editor';
import hljs from 'highlight.js';

import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';

VueMarkdownEditor.use(githubTheme, {
    Hljs: hljs,
});


export function useMakedown(app: App) {
    app.use(VueMarkdownEditor);
}
