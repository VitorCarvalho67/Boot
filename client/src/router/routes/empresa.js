import { validateRecoveryEmpresa } from '../../services/api/empresa.js';
import Empresa from '../../views/empresa/Dashboard.vue';
import LoginEmpresa from '../../views/empresa/Login.vue';
import RecoveryEmpresa from '../../views/empresa/Recovery.vue';
import RegisterEmpresa from '../../views/empresa/Register.vue';
import ValidateEmpresa from '../../views/empresa/Validate.vue';
import ValidateRecoveryEmpresa from '../../views/empresa/ValidateRecovery.vue';
import Ranking from '../../views/empresa/Ranking.vue';
import Messages from '../../views/empresa/Mensagens.vue';
import PublicPerfilAluno from '../../views/empresa/Aluno.vue';
import ChatEmpresa from '../../views/empresa/Mensagem.vue'
import Pesquisa from '../../views/empresa/Pesquisa.vue';

import {
    isRegisteringEmpresa,
    isRecoveringEmpresa,
    isAuthEmpresa,
} from '../guards/guards.js';


export const empresaRoutes = [
    {
        path: "/empresa",
        name: "Empresa",
        component: Empresa,
        beforeEnter: async (to, from, next) => {
            (await isAuthEmpresa()) ? next() : next("/empresa/login");
        }
    },
    {
        path: "/empresa/login",
        name: "LoginEmpresa",
        component: LoginEmpresa
    },
    {
        path: "/empresa/register",
        name: "RegistroEmpresa",
        component: RegisterEmpresa
    },
    {
        path: "/empresa/register/validate",
        name: "ValidateEmpresa",
        component: ValidateEmpresa,
        beforeEnter: async (to, from, next) => {
            (await isRegisteringEmpresa()) ? next() : next("/empresa/register");
        }
    },
    {
        path: "/empresa/recovery",
        name: "RecoveryEmpresa",
        component: RecoveryEmpresa,
    },
    {
        path: "/empresa/recovery/validate",
        name: "ValidateRecoveryEmpresa",
        component: ValidateRecoveryEmpresa,
        beforeEnter: async (to, from, next) => {
            (await isRecoveringEmpresa()) ? next() : next("/empresa/recovery");
        }
    },
    {
        path: '/empresa/ranking',
        name: 'RankingEmpresa',
        component: Ranking,
        beforeEnter: async (to, from, next) => {
            (await isAuthEmpresa()) ? next() : next("/empresa/login");
        }
    },
    {
        path: "/empresa/mensagens",
        name: "MensagensEmpresa",
        component: Messages,
        beforeEnter: async (to, from, next) => {
            (await isAuthEmpresa()) ? next() : next("/empresa/login");
        }
    },
    {
        path: "/empresa/aluno/profile/:rm",
        name: "EmpresaPerfilAluno",
        component: PublicPerfilAluno,
        beforeEnter: async (to, from, next) => {
            (await isAuthEmpresa()) ? next() : next(`/aluno/profile/${to.params.rm}`);
        }
    },
    {
        path: "/empresa/mensagens/:identifier/:email",
        name: "MensagemEmpresa",
        component: ChatEmpresa,
        beforeEnter: async (to, from, next) => {
            (await isAuthEmpresa()) ? next() : next("/empresa/login");
        }
    },
    {
        path: "/empresa/search",
        name: "PesquisaEmpresa",
        component: Pesquisa,
        beforeEnter: async (to, from, next) => {
            (await isAuthEmpresa()) ? next() : next("/buscar");
        }
    },
]