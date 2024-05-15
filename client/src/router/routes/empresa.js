import Empresa from '../../views/empresa/Dashboard.vue';
import LoginEmpresa from '../../views/empresa/Login.vue';
import RecoveryEmpresa from '../../views/empresa/Recovery.vue';

import {
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
        path: "/empresa/recovery",
        name: "RecoveryEmpresa",
        component: RecoveryEmpresa
    }
]