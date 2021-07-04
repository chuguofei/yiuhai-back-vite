declare module "*.vue" {
    import { Component } from "vue";
    const component: Component;
    export default component;
}

declare module 'qs' {
    const qs: any;
    export default qs;
}

declare module 'lodash-es' {
    const lodashEs: any;
    export default lodashEs;
}

declare module '*'