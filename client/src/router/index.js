import { createRouter, createWebHistory } from 'vue-router';
import { alunoRoutes } from './routes/aluno'
import { adminRoutes } from './routes/admin'
import { professorRoutes } from './routes/professor'
import { funcionarioRoutes } from './routes/funcionario'
import { empresaRoutes } from './routes/empresa'

import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
    ...alunoRoutes,
    ...adminRoutes,
    ...professorRoutes,
    ...funcionarioRoutes,
    ...empresaRoutes,
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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;