import { createPinia, defineStore } from 'pinia';

export const useStore = defineStore({
    id: "useStore",
    state() {
        return {
            msg: "Hello Pinia"
        }
    },
})