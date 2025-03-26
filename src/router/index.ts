import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Days from "../views/Days.vue";
import Teachers from "../views/Teachers.vue";
import GroupForm from "../views/GroupForm.vue";
import Admin from "../views/Admin.vue";
import DayForm from "../views/DayForm.vue";

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/days", name: "Days", component: Days },
    { path: "/teachers", name: "Teachers", component: Teachers },
    { path: "/admin", name:"AdminPanel", component: Admin },
    { path: "/group-form", name: "GroupForm", component: GroupForm },
    { path: "/day-form", name: "DayForm", component: DayForm}
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
