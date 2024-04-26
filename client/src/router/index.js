import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import TokenRegister from '../views/TokenRegister.vue';
import RecoveryAluno from '../views/RecoveryAluno.vue';
import ValidateRecovery from '../views/ValidateRecovery.vue';
import LoginAdmin from '../views/LoginAdmin.vue';
import NotFound from '../views/NotFound.vue';
import RegisterProfessor from '../views/RegisterProfessor.vue';

const routes = [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/',
        name: 'Home2',
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
    {
        path: '/admin/login',
        name: 'LoginAdmin',
        component: LoginAdmin
    },
    {
        path: '/admin/register/professor', 
        name : "RegisterProfessor",
        component: RegisterProfessor
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;