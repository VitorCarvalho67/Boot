import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Login from '../views/aluno/Login.vue';
import Register from '../views/aluno/Register.vue';
import ValidateRegister from '../views/aluno/ValidateRegister.vue';
import RecoveryAluno from '../views/aluno/Recovery.vue';
import ValidateRecovery from '../views/aluno/ValidateRecovery.vue';
import LoginAdmin from '../views/admin/Login.vue';
import NotFound from '../views/NotFound.vue';
import RegisterProfessor from '../views/admin/RegisterProfessor.vue';
import RegisterCoordenador from '../views/admin/RegisterCoordenador.vue';
import RegisterCurso from '../views/admin/RegisterCurso.vue';
import RegisterFuncionario from '../views/admin/RegisterFuncionario.vue';
import ValidateProfessor from '../views/professor/Validate.vue';
import InitProfessor from '../views/professor/Init.vue';
import LoginProfessor from '../views/professor/Login.vue';
import RegisterTurma from '../views/admin/RegisterTurma.vue';
import ValidateFuncionario from '../views/funcionario/Validate.vue';
import InitFuncionario from '../views/funcionario/Init.vue';
import LoginFuncionario from '../views/funcionario/Login.vue';
import Admin from '../views/admin/Dashboard.vue';
import RecoveryProfessor from '../views/professor/Recovery.vue';
import ValidateRecoveryProfessor from '../views/professor/ValidateRecovery.vue';
import RecoveryFuncionario from '../views/funcionario/Recovery.vue';
import ValidateRecoveryFuncionario from '../views/funcionario/ValidateRecovery.vue';

import { 
    isAuthAdmin,
    isRegistering,
    isRecoverigAluno,
    isInitingProfessor,
    isRecoverigProfessor,
    isInitingFuncionario,
    isRecoverigFuncionario
 } from '../util/guarders.js';


const routes = [{
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
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
        path: '/admin',
        name: 'Admin',
        component: Admin,
        beforeEnter: async(to, from, next) => {
            (await isAuthAdmin()) ? next(): next("/admin/login");
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
        beforeEnter: async(to, from, next) => {
            (await isRegistering()) ? next(): next("/register");
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
        beforeEnter: async(to, from, next) => {
            (await isRecoverigAluno()) ? next(): next("/recovery");
        }
    },
    {
        path: '/admin/login',
        name: 'LoginAdmin',
        component: LoginAdmin
    },
    {
        path: '/admin/register/professor',
        name: 'RegisterProfessor',
        component: RegisterProfessor,
        beforeEnter: async(to, from, next) => {
            (await isAuthAdmin()) ? next(): next("/admin/login");
        }
    },
    {
        path: '/admin/register/coordenador',
        name: 'RegisterCoordenador',
        component: RegisterCoordenador,
        beforeEnter: async(to, from, next) => {
            (await isAuthAdmin()) ? next(): next("/admin/login");
        }
    },
    {
        path: '/admin/register/curso',
        name: 'RegisterCurso',
        component: RegisterCurso,
        beforeEnter: async(to, from, next) => {
            (await isAuthAdmin()) ? next(): next("/admin/login");
        }
    },
    {
        path: '/admin/register/turma',
        name: 'RegisterTurma',
        component: RegisterTurma,
        beforeEnter: async(to, from, next) => {
            (await isAuthAdmin()) ? next(): next("/admin/login");
        }
    },
    {
        path: '/admin/register/funcionario',
        name: 'RegisterFuncionario',
        component: RegisterFuncionario,

    },
    {
        path: '/professor/init',
        name: 'InitProfessor',
        component: InitProfessor
    },
    {
        path: '/professor/validate',
        name: 'ValidateProfessor',
        component: ValidateProfessor,
        beforeEnter: async(to, from, next) => {
            (await isInitingProfessor()) ? next(): next("/professor/init");
        }
    },
    {
        path: '/professor/login',
        name: 'LoginProfessor',
        component: LoginProfessor,
        beforeEnter: async(to, from, next) => {
            (await isInitingProfessor()) ? next(): next("/professor/init");
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
        beforeEnter: async(to, from, next) => {
            (await isRecoverigProfessor()) ? next(): next("/professor/recovery");
        }
    },
    {
        path: '/funcionario/init',
        name: 'InitFuncionario',
        component: InitFuncionario
    },
    {
        path: '/funcionario/validate',
        name: 'ValidateFuncionario',
        component: ValidateFuncionario
    },
    {
        path: '/funcionario/login',
        name: 'LoginFuncionario',
        component: LoginFuncionario
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
        beforeEnter: async(to, from, next) => {
            (await isRecoverigFuncionario()) ? next(): next("/funcionario/recovery");
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;