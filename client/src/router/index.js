import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import TokenRegister from '../views/TokenRegister.vue';

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/register/token',
        name: 'TokenRegister',
        component: TokenRegister
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;