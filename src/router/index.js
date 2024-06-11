import { createWebHashHistory, createRouter } from "vue-router";
import DefaultComponent from '../components/first.vue';
import Vue1 from '../components/1.vue';
import Vue2 from '../components/2.vue';
import Vue3 from '../components/3.vue';
import Vue4 from '../components/4.vue';
import Vue5 from '../components/5.vue';
import Vue6 from '../components/6.vue';
import Vue8 from '../components/8.vue';
import Vue9 from '../components/9.vue';
import Vue10 from '../components/10.vue';
import Vue11 from '../components/11.vue';
import Main from '../components/main.vue';
import shan from '../components/page1.vue';
import page2 from '../components/page2.vue';
import page3 from '../components/page3.vue';
import page4 from '../components/page4.vue';
import page12 from "../components/page12.vue";
import page21 from "../components/page21.vue";
import page31 from "../components/page31.vue";
import page41 from "../components/page41.vue";
import p1 from "../components/f4.vue"
import p2 from "../components/f42.vue"
import p3 from "../components/f43.vue"
import p4 from "../components/f44.vue"
import p5 from "../components/f45.vue"
import p6 from "../components/f46.vue"
import p7 from "../components/f47.vue"

const routes = [
    { path: '/', component: DefaultComponent },
    { path: '/main', component: Main },
    {
        path: '/vue1', component: page12,
        redirect: '/vue1/p1', // 设置默认打开的页面，并修正路径
        children: [
            { path: 'p1', component: p1 }, // 相对于父路由的路径
            { path: 'p2', component: p2 },
            { path: 'p3', component: p3 },
            { path: 'p4', component: p4 },
            { path: 'p5', component: p5 },
            { path: 'p6', component: p6 },
            { path: 'p7', component: p7 },
        ],
    },
    {
        path: '/vue2', component: page21,
        redirect: '/vue2/p1', // 设置默认打开的页面，并修正路径
        children: [
            { path: 'p1', component: p1 }, // 相对于父路由的路径
            { path: 'p2', component: p2 },
            { path: 'p3', component: p3 },
            { path: 'p4', component: p4 },
            { path: 'p5', component: p5 },
            { path: 'p6', component: p6 },
            { path: 'p7', component: p7 },
        ],
    },
    {
        path: '/vue3', component: page31,
        redirect: '/vue3/p1', // 设置默认打开的页面，并修正路径
        children: [
            { path: 'p1', component: p1 }, // 相对于父路由的路径
            { path: 'p2', component: p2 },
            { path: 'p3', component: p3 },
            { path: 'p4', component: p4 },
            { path: 'p5', component: p5 },
            { path: 'p6', component: p6 },
            { path: 'p7', component: p7 },
        ],
    },
    {
        path: '/vue4', component: page41,
        redirect: '/vue4/p1', // 设置默认打开的页面，并修正路径
        children: [
            { path: 'p1', component: p1 }, // 相对于父路由的路径
            { path: 'p2', component: p2 },
            { path: 'p3', component: p3 },
            { path: 'p4', component: p4 },
            { path: 'p5', component: p5 },
            { path: 'p6', component: p6 },
            { path: 'p7', component: p7 },
        ],
    },
    { path: '/vue5', component: Vue5 },
    { path: '/vue6', component: Vue6 },
    { path: '/vue8', component: Vue8 },
    { path: '/vue9', component: Vue9 },
    { path: '/vue10', component: Vue10 },
    { path: '/:catchAll(.*)', redirect: '/' } // 捕获所有未定义的路径，并重定向到默认路径

];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;