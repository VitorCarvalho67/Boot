import Cookies from 'js-cookie';
import router from '../router/index.js';
import { RefreshTokenAluno } from '../services/api/aluno';

function logout(path) {
    var allCookies = Cookies.get();

    for (var cookie in allCookies) {
        if (allCookies.hasOwnProperty(cookie)) {
            Cookies.remove(cookie);
            Cookies.remove(cookie, { path: '/' });
        }
    }

    router.push({ path: path });
}

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
                router.push({ path: '/login' });
            }
        },
        async RefreshToken() {
            try {
                const response = await RefreshTokenAluno(this.token);
                if (response.status >= 200 && response.status < 300) {
                    Cookies.set('token', `${ response.data.token }`);
                }
            } catch (error) {
                router.push({ path: '/login' });
            }
        },
        logout() {
            logout('/login');
        }
    },
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
            logout('/admin/login');
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
            logout('/professor/init');
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
            logout('/funcionario/init');
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
            logout('/empresa/login');
        }
    }
};