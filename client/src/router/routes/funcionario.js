import Funcionario from '../../views/funcionario/Dashboard.vue';
import ValidateFuncionario from '../../views/funcionario/Validate.vue';
import InitFuncionario from '../../views/funcionario/Init.vue';
import LoginFuncionario from '../../views/funcionario/Login.vue';
import RecoveryFuncionario from '../../views/funcionario/Recovery.vue';
import ValidateRecoveryFuncionario from '../../views/funcionario/ValidateRecovery.vue';

import {
    isAuthFuncionario,
    isInitingFuncionario,
    isRecoveringFuncionario
} from '../guards/guards.js';

export const funcionarioRoutes = [
    {
        path: '/funcionario/init',
        name: 'InitFuncionario',
        component: InitFuncionario
    },
    {
        path: '/funcionario/validate',
        name: 'ValidateFuncionario',
        component: ValidateFuncionario,
        beforeEnter: async (to, from, next) => {
            (await isInitingFuncionario()) ? next() : next("/funcionario/init");
        }
    },
    {
        path: '/funcionario/login',
        name: 'LoginFuncionario',
        component: LoginFuncionario,
        beforeEnter: async (to, from, next) => {
            (await isInitingFuncionario()) ? next() : next("/funcionario/init");
        }
    },
    {
        path: '/funcionario/recovery',
        name: 'RecoveryFuncionario',
        component: RecoveryFuncionario
    },
    {
        path: '/funcionario/recovery/validate',
        name: 'ValidateRecoveryFuncionario',
        component: ValidateRecoveryFuncionario,
        beforeEnter: async (to, from, next) => {
            (await isRecoveringFuncionario()) ? next() : next("/funcionario/recovery");
        }
    },
    {
        path: "/funcionario",
        name: "Funcionario",
        component: Funcionario,
        beforeEnter: async (to, from, next) => {
            (await isAuthFuncionario()) ? next() : next("/funcionario/init");
        }
    }
]