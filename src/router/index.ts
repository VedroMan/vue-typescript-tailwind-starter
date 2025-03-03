import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Days from "../views/Days.vue";
import Teachers from "../views/Teachers.vue";

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/days", name: "Days", component: Days },
    { path: "/teachers", name: "Teachers", component: Teachers }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        // Всегда прокручивать к верху страницы
        return { top: 0 };
    },
});

export default router;
