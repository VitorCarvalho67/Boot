import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import TokenRegister from '../views/TokenRegister.vue';
import RecoveryAluno from '../views/RecoveryAluno.vue';
import ValidateRecovery from '../views/ValidateRecovery.vue';

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
    },
    {
        path: '/recovery',
        name: 'RecoveryAluno',
        component: RecoveryAluno
    },
    {
        path: '/recovery/validate',
        name: 'ValidateRecovery',
        component: ValidateRecovery
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;