import { createRouter, createWebHistory } from 'vue-router';
import { alunoRoutes } from './routes/aluno'
import { adminRoutes } from './routes/admin'
import { professorRoutes } from './routes/professor'
import { funcionarioRoutes } from './routes/funcionario'
import { empresaRoutes } from './routes/empresa'

import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';
import PublicPerfilAluno from '../views/PerfilAluno.vue';
import PublicPerfilProfessor from '../views/PerfilProfessor.vue';

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
    },
    {
        path: "/aluno/profile/:name",
        name: "PublicPerfilAluno",
        component: PublicPerfilAluno
    },
    {
        path: "/professor/profile/:name",
        name: "PublicPerfilProfessor",
        component: PublicPerfilProfessor
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;