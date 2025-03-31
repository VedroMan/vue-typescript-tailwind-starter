import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Days from "../views/Days.vue";
import Teachers from "../views/Teachers.vue";
import GroupForm from "../views/GroupForm.vue";
import Admin from "../views/Admin.vue";
import DayForm from "../views/DayForm.vue";
import TeacherForm from "../views/TeacherForm.vue";
import LessonForm from "../views/LessonForm.vue";

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/days", name: "Days", component: Days },
    { path: "/teachers", name: "Teachers", component: Teachers },
    { path: "/admin", name:"AdminPanel", component: Admin },
    { path: "/admin/group-form", name: "GroupForm", component: GroupForm },
    { path: "/admin/day-form", name: "DayForm", component: DayForm },
    { path: "/admin/teacher-form", name: "TeacherForm", component: TeacherForm },
    { path: "/admin/lesson-form", name: "LessonForm", component: LessonForm }
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
