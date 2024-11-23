import Login from '../../views/aluno/Login.vue';
import Register from '../../views/aluno/Register.vue';
import ValidateRegister from '../../views/aluno/ValidateRegister.vue';
import RecoveryAluno from '../../views/aluno/Recovery.vue';
import ValidateRecovery from '../../views/aluno/ValidateRecovery.vue';
import HomeAluno from '../../views/aluno/Home.vue';
import PerfilAluno from '../../views/aluno/Profile.vue';
import PublicPerfilAluno from '../../views/aluno/PerfilAluno.vue';
import Complete from '../../views/aluno/Complete.vue';
import Rede from '../../views/aluno/Rede.vue';
import ConfigAluno from '../../views/aluno/Config.vue';
import Messages from '../../views/aluno/Messages.vue';  
import ChatAluno from '../../views/aluno/Message.vue';  
import Pesquisa from '../../views/aluno/Pesquisa.vue';
import Vagas from '../../views/aluno/Vagas.vue';
import Ranking from '../../views/aluno/Ranking.vue';

import {
    isRecoveringAluno,
    isRegistering,
    isAuthAluno,
    isCompletedAluno
} from '../guards/guards.js';
import Vaga from '../../views/aluno/Vaga.vue';

export const alunoRoutes = [
    {
        path: "/aluno",
        name: "Aluno",
        component: HomeAluno,
        beforeEnter: async (to, from, next) => {
            (await isAuthAluno()) ? next() : next("/login");
        }
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
        path: '/register/validate',
        name: 'ValidateRegister',
        component: ValidateRegister,
        beforeEnter: async (to, from, next) => {
            (await isRegistering()) ? next() : next("/register");
        }
    },
    {
        path: '/recovery',
        name: 'RecoveryAluno',
        component: RecoveryAluno
    },
    {
        path: '/recovery/validate',
        name: 'ValidateRecovery',
        component: ValidateRecovery,
        beforeEnter: async (to, from, next) => {
            (await isRecoveringAluno()) ? next() : next("/recovery");
        }
    },
    {
        path: "/aluno/me",
        name: "PerfilAluno",
        component: PerfilAluno,
        beforeEnter: async (to, from, next) => {
            (await isCompletedAluno()) ? next() : next("/register/complete");
        }
    },
    {
        path: "/register/complete",
        name: "Complete",
        component: Complete,
        component: Complete,
        beforeEnter: async (to, from, next) => {
            !(await isCompletedAluno()) ? next() : next("/aluno/me");
        }
    },
    {
        path: "/rede",
        name: "Rede",
        component: Rede,
        beforeEnter: async (to, from, next) => {
            (await isCompletedAluno()) ? ((await isAuthAluno()) ? next() : next("/login")): next("/register/complete");
        }
    },
    {
        path: "/mensagens",
        name: "Mensagens",
        component: Messages,
        beforeEnter: async (to, from, next) => {
            (await isCompletedAluno()) ? ((await isAuthAluno()) ? next() : next("/login")) : next("/register/complete");
        }
    },
    {
        path: "/mensagens/:identifier/:email",
        name: "Mensagem",
        component: ChatAluno,
        beforeEnter: async (to, from, next) => {
            (await isCompletedAluno()) ? ((await isAuthAluno()) ? next() : next("/login")) : next("/register/complete");
        }
    },
    {
        path: "/aluno/search",
        name: "PesquisaALuno",
        component: Pesquisa,
        beforeEnter: async (to, from, next) => {
            (await isAuthAluno()) ? next() : next("/login");
        }
    },
    {
        path: "/aluno/vagas",
        name: "VagasALuno",
        component: Vagas,
        beforeEnter: async (to, from, next) => {
            (await isAuthAluno()) ? next() : next("/login");
        }
    },
    {
        path: "/aluno/vaga/:id",
        name: "VagaALuno",
        component: Vaga,
        beforeEnter: async (to, from, next) => {
            (await isAuthAluno()) ? next() : next("/login");
        }
    },
    {
        path: "/aluno/colega/:rm",
        name: "PerfilColega",
        component: PublicPerfilAluno,
        beforeEnter: async (to, from, next) => {
            (await isAuthAluno()) ? next() : next(`/aluno/profile/${to.params.rm}`);
        }
    },
    {
        path: "/config",
        name: "Config",
        component: ConfigAluno,
        beforeEnter: async (to, from, next) => {
            (await isCompletedAluno()) ? ((await isAuthAluno()) ? next() : next("/login")) : next("/register/complete");
        }
    },
    {
        path: "/aluno/ranking",
        name: "Ranking",
        component: Ranking,
        beforeEnter: async (to, from, next) => {
            (await isAuthAluno()) ? next() : next("/ranking");
        }
    }
];