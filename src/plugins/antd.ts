import { App } from 'vue'
import {
    Button,
    Icon,
    Menu,
    Pagination,
    Form,
    Input,
    InputNumber,
    Select,
    Upload,
    Carousel,
    Empty,
    Image,
    Popover,
    Table,
    Tabs,
    Tooltip,
    Modal,
    Popconfirm,
    Skeleton,
    Spin,
    Anchor,
    BackTop,
    ConfigProvider,
} from 'ant-design-vue';

import 'ant-design-vue/dist/antd.css';




export function useAntd(app: App) {
    app.use(Button),
        app.use(Icon),
        app.use(Menu),
        app.use(Pagination),
        app.use(Form),
        app.use(Input),
        app.use(InputNumber),
        app.use(Select),
        app.use(Upload),
        app.use(Carousel),
        app.use(Empty),
        app.use(Image),
        app.use(Popover),
        app.use(Table),
        app.use(Tabs),
        app.use(Tooltip),
        app.use(Modal),
        app.use(Popconfirm),
        app.use(Skeleton),
        app.use(Spin),
        app.use(Anchor),
        app.use(BackTop),
        app.use(ConfigProvider)
}

