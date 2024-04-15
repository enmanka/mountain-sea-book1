import { createWebHistory, createRouter } from "vue-router";
import DefaultComponent from '../components/main.vue';
import Vue1 from '../components/1.vue';
import Vue2 from '../components/2.vue';
import Vue3 from '../components/3.vue';
import Vue4 from '../components/4.vue';

const routes = [
    { path: '/', component: DefaultComponent },
    { path: '/vue1', component: Vue1 },
    { path: '/vue2', component: Vue2 },
    { path: '/vue3', component: Vue3 },
    { path: '/vue4', component: Vue4 },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;