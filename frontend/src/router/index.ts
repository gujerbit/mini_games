import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Main from "@views/main/Main.vue";
import Sudoku from "@views/sudoku/Sudoku.vue";
import Minesweeper from "@views/minesweeper/Minesweeper.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Main",
        component: Main
    },
    {
        path: "/sudoku",
        name: "Sudoku",
        component: Sudoku,
    },
    {
        path: "/minesweeper",
        name: "Minesweeper",
        component: Minesweeper,
    },
    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
