import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Main from "@views/main/Main.vue";
import Login from "@views/login/Login.vue";
import Sudoku from "@views/sudoku/Sudoku.vue";
import Minesweeper from "@views/minesweeper/Minesweeper.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Main",
        component: Main,
        children: [
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
        ],
        beforeEnter: (to, from, next) => {
            if (window.sessionStorage.getItem("userName")) {
                next();
            } else {
                next("/login");
            }
        },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        // beforeEnter: (to, from, next) => {
        //     if (window.sessionStorage.getItem("userName")) {
        //         next("/");
        //     } else {
        //         next();
        //     }
        // },
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
