import Cookies from 'js-cookie';
import router from '../router/index.js';
import { refreshTokenAluno } from '../services/api/aluno';
import { refreshTokenAdmin } from '../services/api/admin';
import { refreshTokenEmpresa } from '../services/api/empresa';
import { refreshTokenFuncionario } from '../services/api/funcionario';
import { refreshTokenProfessor } from '../services/api/professor';

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
            aluno: {
                token: '',
            }
        }
    },
    methods: {
        async getToken() {
            this.aluno.token = Cookies.get('token');
            if (!this.aluno.token) {
                router.push({ path: '/login' });
            }
            await this.RefreshToken();
        },
        async RefreshToken() {
            try {
                const response = await refreshTokenAluno(this.aluno.token);
                if (response.status >= 200 && response.status < 300) {
                    Cookies.set('token', `${response.data.token}`);
                }
            } catch (error) {
                router.push({ path: '/login' });
            }
        },
        logout() {
            logout('/login');
        },
        calcularIdade(nascimento) {
            const hoje = new Date();
            const dataNascimento = new Date(nascimento);

            let idade = hoje.getFullYear() - dataNascimento.getFullYear();
            const mesAtual = hoje.getMonth() + 1;
            const mesNascimento = dataNascimento.getMonth() + 1;

            if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < dataNascimento.getDate())) {
                idade--;
            }

            this.aluno.idade = "" + idade + " anos";
        }
    },
};

export const mixinAdmin = {
    data() {
        return {
            admin: {
                token: '',
            }
        }
    },
    methods: {
        async getToken() {
            this.admin.token = Cookies.get('token-admin');
            if (!this.admin.token) {
                router.push({ path: '/admin/login' });
            }
            await this.RefreshToken();
        },
        async RefreshToken() {
            try {
                const response = await refreshTokenAdmin(this.admin.token);
                if (response.status >= 200 && response.status < 300) {
                    Cookies.set('token-admin', `${response.data.token}`);
                }
            } catch (error) {
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
            professor: {
                token: '',
            }
        }
    },
    methods: {
        async getToken() {
            this.professor.token = Cookies.get('token-professor');
            if (!this.professor.token) {
                router.push({ path: '/professor/init' });
            }
            await this.RefreshToken();
        },
        async RefreshToken() {
            try {
                const response = await refreshTokenProfessor(this.professor.token);
                if (response.status >= 200 && response.status < 300) {
                    Cookies.set('token-professor', `${response.data.token}`);
                }
            } catch (error) {
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
            funcionario: {
                token: '',
            }
        }
    },
    methods: {
        async getToken() {
            this.funcionario.token = Cookies.get('token-funcionario');
            if (!this.funcionario.token) {
                router.push({ path: '/funcionario/init' });
            }
            await this.RefreshToken();
        },
        async RefreshToken() {
            try {
                const response = await refreshTokenFuncionario(this.funcionario.token);
                if (response.status >= 200 && response.status < 300) {
                    Cookies.set('token', `${response.data.token}`);
                }
            } catch (error) {
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
            empresa: {
                token: '',
            }
        }
    },
    methods: {
        async getToken() {
            this.empresa.token = Cookies.get('token-empresa');
            if (!this.empresa.token) {
                router.push({ path: '/empresa/login' });
            }
            await this.RefreshToken();
        },
        async RefreshToken() {
            try {
                const response = await refreshTokenEmpresa(this.empresa.token);
                if (response.status >= 200 && response.status < 300) {
                    Cookies.set('token', `${response.data.token}`);
                }
            } catch (error) {
                router.push({ path: '/empresa/login' });
            }
        },
        logout() {
            logout('/empresa/login');
        }
    }
};