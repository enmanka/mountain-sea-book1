import { createWebHistory, createRouter } from "vue-router";
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
const routes = [
    { path: '/', component: DefaultComponent },
    { path: '/main', component: Main },
    { path: '/vue1', component: shan },
    { path: '/vue2', component: page2 },
    { path: '/vue3', component: page3 },
    { path: '/vue4', component: page4 },
    { path: '/vue5', component: Vue5 },
    { path: '/vue6', component: Vue6 },
    { path: '/vue8', component: Vue8 },
    { path: '/vue9', component: Vue9 },
    { path: '/vue10', component: Vue10 },
    { path: '/vue11', component: Vue11 },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;