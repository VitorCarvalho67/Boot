import Home from '../../views/shared/Home.vue';
import NotFound from '../../views/shared/NotFound.vue';
import PublicPerfilAluno from '../../views/shared/PerfilAluno.vue';
import PublicPerfilProfessor from '../../views/shared/PerfilProfessor.vue';

export const sharedRoutes = [
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
        path: "/aluno/profile/:rm",
        name: "PublicPerfilAluno",
        component: PublicPerfilAluno
    },
    {
        path: "/professor/profile/:name",
        name: "PublicPerfilProfessor",
        component: PublicPerfilProfessor
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]