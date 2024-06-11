import Admin from '../../views/admin/Dashboard.vue';
import LoginAdmin from '../../views/admin/Login.vue';
import RegisterProfessor from '../../views/admin/RegisterProfessor.vue';
import RegisterCoordenador from '../../views/admin/RegisterCoordenador.vue';
import RegisterCurso from '../../views/admin/RegisterCurso.vue';
import RegisterFuncionario from '../../views/admin/RegisterFuncionario.vue';
import RegisterTurma from '../../views/admin/RegisterTurma.vue';

import {
    isAuthAdmin
} from '../guards/guards.js';

export const adminRoutes = [
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        beforeEnter: async (to, from, next) => {
            (await isAuthAdmin()) ? next() : next({path: "/admin/login"});
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
        beforeEnter: async (to, from, next) => {
            (await isAuthAdmin()) ? next() : next({path: "/admin/login"});
        }
    },
    {
        path: '/admin/register/coordenador',
        name: 'RegisterCoordenador',
        component: RegisterCoordenador,
        beforeEnter: async (to, from, next) => {
            (await isAuthAdmin()) ? next() : next({path: "/admin/login"});
        }
    },
    {
        path: '/admin/register/curso',
        name: 'RegisterCurso',
        component: RegisterCurso,
        beforeEnter: async (to, from, next) => {
            (await isAuthAdmin()) ? next() : next({path: "/admin/login"});
        }
    },
    {
        path: '/admin/register/turma',
        name: 'RegisterTurma',
        component: RegisterTurma,
        beforeEnter: async (to, from, next) => {
            (await isAuthAdmin()) ? next() : next({path: "/admin/login"});
        }
    },
    {
        path: '/admin/register/funcionario',
        name: 'RegisterFuncionario',
        component: RegisterFuncionario,

    }
]