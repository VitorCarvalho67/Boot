import Login from '../../views/aluno/Login.vue';
import Register from '../../views/aluno/Register.vue';
import ValidateRegister from '../../views/aluno/ValidateRegister.vue';
import RecoveryAluno from '../../views/aluno/Recovery.vue';
import ValidateRecovery from '../../views/aluno/ValidateRecovery.vue';
import HomeAluno from '../../views/aluno/Home.vue';

import {
    isRecoveringAluno,
    isRegistering,
    isAuthAluno
} from '../guards/guards.js';

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
    }
];