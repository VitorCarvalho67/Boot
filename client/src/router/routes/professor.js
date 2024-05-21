import Professor from '../../views/professor/Dashboard.vue';
import ValidateProfessor from '../../views/professor/Validate.vue';
import InitProfessor from '../../views/professor/Init.vue';
import LoginProfessor from '../../views/professor/Login.vue';
import RecoveryProfessor from '../../views/professor/Recovery.vue';
import ValidateRecoveryProfessor from '../../views/professor/ValidateRecovery.vue';
import PerfilProfessor from '../../views/professor/Profile.vue';

import {
    isAuthProfessor,
    isInitingProfessor,
    isRecoveringProfessor,
} from '../guards/guards.js';

export const professorRoutes = [
    {
        path: '/professor/init',
        name: 'InitProfessor',
        component: InitProfessor
    },
    {
        path: '/professor/validate',
        name: 'ValidateProfessor',
        component: ValidateProfessor,
        beforeEnter: async (to, from, next) => {
            (await isInitingProfessor()) ? next() : next("/professor/init");
        }
    },
    {
        path: '/professor/login',
        name: 'LoginProfessor',
        component: LoginProfessor,
        beforeEnter: async (to, from, next) => {
            (await isInitingProfessor()) ? next() : next("/professor/init");
        }
    },
    {
        path: '/professor/recovery',
        name: 'RecoveryProfessor',
        component: RecoveryProfessor
    },
    {
        path: '/professor/recovery/validate',
        name: 'ValidateRecoveryProfessor',
        component: ValidateRecoveryProfessor,
        beforeEnter: async (to, from, next) => {
            (await isRecoveringProfessor()) ? next() : next("/professor/recovery");
        }
    },
    {
        path: "/professor",
        name: "Professor",
        component: Professor,
        beforeEnter: async (to, from, next) => {
            (await isAuthProfessor()) ? next() : next("/professor/init");
        }
    },
    {
        path: "/professor/me",
        name: "PerfilProfessor",
        component: PerfilProfessor,
        beforeEnter: async (to, from, next) => {
            (await isAuthProfessor()) ? next() : next("/professor/init");
        }
    }
]