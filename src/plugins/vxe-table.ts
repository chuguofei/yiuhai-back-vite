import { App } from 'vue'
import XEUtils from 'xe-utils'
import 'xe-utils';
import 'vxe-table/lib/style.css';
import {
    // 核心
    VXETable,
    // 功能模块
    Icon,
    // Filter,
    // Menu,
    Edit,
    // Export,
    // Keyboard,
    Validator,
    Header,
    // Footer,
    // 可选组件
    Column,
    // Colgroup,
    // Grid,
    // Toolbar,
    Pager,
    // Checkbox,
    // CheckboxGroup,
    // Radio,
    // RadioGroup,
    // RadioButton,
    Input,
    // Textarea,
    Button,
    Modal,
    // Tooltip,
    Form,
    FormItem,
    // FormGather,
    Select,
    // Optgroup,
    Option,
    // Switch,
    // List,
    // Pulldown,
    // 表格
    Table
} from 'vxe-table';
import zhCNLocat from 'vxe-table/es/locale/lang/zh-CN'

// 全局默认参数
VXETable.setup({
    version: 0,
    zIndex: 100,
    table: {
        autoResize: true
    }
})

// 导入默认的国际化（如果项目中使用多语言，则应该导入到 vue-i18n 中）
VXETable.setup({
    i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCNLocat, key), args)
})

// 按需引入
// https://xuliangzhan_admin.gitee.io/vxe-table/#/table/start/use
export function useTable(app: App) {
    app.use(Header)
        .use(Icon)
        .use(Column)
        .use(Table)
        .use(Form)
        .use(FormItem)
        .use(Validator)
        .use(Input)
        .use(Button)
        .use(Select)
        .use(Option)
        .use(Edit)
        .use(Pager)
        .use(Modal)
}

