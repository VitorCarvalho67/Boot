import Cookies from 'js-cookie';
import router from '../router/index.js';

export const mixinAluno = {
    data() {
        return {
            token: '',
        }
    },
    methods: {
        async getToken() {
            this.token = Cookies.get('token');
            if (!this.token) {
                router.push({ path: '/aluno/login' });
            }
        },
        logout() {
            Cookies.remove('token');
            router.push({ path: '/aluno/login' });
        }
    }
};

export const mixinAdmin = {
    data() {
        return {
            token: '',
        }
    },
    methods: {
        async getToken() {
            this.token = Cookies.get('token-admin');
            if (!this.token) {
                router.push({ path: '/admin/login' });
            }
        },
        logout() {
            Cookies.remove('token-admin');
            router.push({ path: '/admin/login' });
        }
    }
};

export const mixinProfessor = {
    data() {
        return {
            token: '',
        }
    },
    methods: {
        async getToken() {
            this.token = Cookies.get('token-professor');
            if (!this.token) {
                router.push({ path: '/professor/init' });
            }
        },
        logout() {
            Cookies.remove('token-professor');
            router.push({ path: '/professor/init' });
        }
    }
};

export const mixinFuncionario = {
    data() {
        return {
            token: '',
        }
    },
    methods: {
        async getToken() {
            this.token = Cookies.get('token-funcionario');
            if (!this.token) {
                router.push({ path: '/funcionario/init' });
            }
        },
        logout() {
            Cookies.remove('token-funcionario');
            router.push({ path: '/funcionario/init' });
        }
    }
};

export const mixinEmpresa = {
    data() {
        return {
            token: '',
        }
    },
    methods: {
        async getToken() {
            this.token = Cookies.get('token-empresa');
            if (!this.token) {
                router.push({ path: '/empresa/login' });
            }
        },
        logout() {
            Cookies.remove('token-empresa');
            router.push({ path: '/empresa/login' });
        }
    }
};