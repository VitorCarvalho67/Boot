import Home from '../../views/shared/Home.vue';
import NotFound from '../../views/shared/NotFound.vue';
import PublicPerfilAluno from '../../views/shared/PerfilAluno.vue';
import PublicPerfilProfessor from '../../views/shared/PerfilProfessor.vue';
import Pesquisa from '../../views/shared/Pesquisa.vue';
import Vagas from '../../views/shared/Vagas.vue';
import Vaga from '../../views/shared/Vaga.vue';
import { isAuthAluno, isAuthSomebody } from '../guards/guards';

export const sharedRoutes = [
    {
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/',
        name: 'Home2',
        component: Home,
        beforeEnter: async (to, from, next) => {
            next(await isAuthSomebody());
        }
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
        path: '/buscar',
        name: 'Pesquisa',
        component: Pesquisa,
        beforeEnter: async (to, from, next) => {
            (await isAuthAluno()) ? next("/aluno/search") : next();
        }
    },
    {
        path: '/vagas',
        name: 'Vagas',
        component: Vagas
    },
    {
        path: '/vaga/:id',
        name: 'Vaga',
        component: Vaga
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]