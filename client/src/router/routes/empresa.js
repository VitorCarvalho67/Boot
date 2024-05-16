import { validateRecoveryEmpresa } from '../../services/api/empresa.js';
import Empresa from '../../views/empresa/Dashboard.vue';
import LoginEmpresa from '../../views/empresa/Login.vue';
import RecoveryEmpresa from '../../views/empresa/Recovery.vue';
import RegisterEmpresa from '../../views/empresa/Register.vue';
import ValidateEmpresa from '../../views/empresa/Validate.vue';
import ValidateRecoveryEmpresa from '../../views/empresa/ValidateRecovery.vue';

import {
    isRegisteringEmpresa,
    isRecoveringEmpresa,
    isAuthEmpresa
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
    }
]