import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Days from "../views/Days.vue";
import Teachers from "../views/Teachers.vue";
import GroupForm from "../views/GroupForm.vue";

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/days", name: "Days", component: Days },
    { path: "/teachers", name: "Teachers", component: Teachers },
    { path: "/group-form", name: "GroupForm", component: GroupForm }
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
