import Home from '../../views/shared/Home.vue';
import NotFound from '../../views/shared/NotFound.vue';
import PublicPerfilAluno from '../../views/shared/PerfilAluno.vue';
import PublicPerfilEmpresa from '../../views/shared/PerfilEmpresa.vue';
import PublicPerfilProfessor from '../../views/shared/PerfilProfessor.vue';
import Pesquisa from '../../views/shared/Pesquisa.vue';
import Vagas from '../../views/shared/Vagas.vue';
import Vaga from '../../views/shared/Vaga.vue';
import Ranking from '../../views/shared/Ranking.vue';
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
        component: PublicPerfilAluno,
        beforeEnter: async (to, from, next) => {
            (await isAuthAluno()) ? next(`/aluno/colega/${to.params.rm}`) : next();
        }
    },
    {
        path: "/empresa/:email",
        name: "PublicPerfilEmpresa",
        component: PublicPerfilEmpresa
    },
    {
        path: "/professor/profile/:email",
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
        component: Vagas,
        beforeEnter: async (to, from, next) => {
            (await isAuthAluno()) ? next("/aluno/vagas") : next();
        }
    },
    {
        path: '/vaga/:id',
        name: 'Vaga',
        component: Vaga,
        beforeEnter: async (to, from, next) => {
            (await isAuthAluno()) ? next(`/aluno/vaga/${to.params.id}`) : next();
        }
    },
    {
        path: '/ranking',
        name: 'RankingPublico',
        component: Ranking,
        beforeEnter: async (to, from, next) => {
            (await isAuthAluno()) ? next(`/aluno/ranking`) : next();
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }
]