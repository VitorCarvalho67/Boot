import { createRouter, createWebHistory } from 'vue-router';
import { alunoRoutes } from './routes/aluno'
import { adminRoutes } from './routes/admin'
import { professorRoutes } from './routes/professor'
import { funcionarioRoutes } from './routes/funcionario'
import { empresaRoutes } from './routes/empresa'
import { sharedRoutes } from './routes/shared'

const routes = [
    ...alunoRoutes,
    ...adminRoutes,
    ...professorRoutes,
    ...funcionarioRoutes,
    ...empresaRoutes,
    ...sharedRoutes
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;