import axios from 'axios';
import alter from '../router/index.js';

const api = axios.create({
    // baseURL: 'https://2f991a18953ed4513949005dfa6d53f8.serveo.net'
    baseURL: 'http://localhost:3333/'
});

export const registerPreAluno = async(userPreAluno) => {
    try {
        const response = await api.post('prealunos/create/', userPreAluno);
        return response;
    } catch {
        return error.response.data;
    }
}

export const registerAluno = async(userAluno) => {
    try {
        const response = await api.post('alunos/create/', userAluno);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const loginAluno = async(userAluno) => {
    try {
        const response = await api.post('alunos/login/', userAluno);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const recoveryAluno = async(infoAluno) => {
    try {
        const response = await api.post('alunos/recovery', infoAluno);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const validateRecovery = async(infoAluno) => {
    try {
        const response = await api.post('alunos/recovery/validate', infoAluno);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const loginAdmin = async(userAdmin) => {
    try {
        const response = await api.post('admin/login', userAdmin);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const authAdmin = async(token) => {
    try {
        const response = await api.post('admin/auth', {}, {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const registerProfessor = async(infoProfessor, token) => {
    try {
        const response = await api.post('admin/register/professor', infoProfessor, {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const registerCoordenador = async(name, token) => {
    try {
        const response = await api.post('admin/register/coordenador', {
            name: name
        }, {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const getProfessores = async(token) => {
    try {
        const response = await api.get('admin/professores', {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const getCoordenadores = async(token) => {
    try {
        const response = await api.get('admin/coordenadores', {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const getCursos = async(token) => {
    try {
        const response = await api.get('admin/cursos', {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const registerCurso = async(infoCurso, token) => {
    try {
        const response = await api.post('admin/register/course',
            infoCurso, {
                headers: {
                    authorization: `${token}`
                }
            }
        );
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const registerFuncionario = async(infoFuncionario, token) => {
    try {
        const response = await api.post('admin/register/funcionario', infoFuncionario, {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const initProfessor = async(emailProfessor) => {
    try {
        const response = await api.get('professor/init', {
            params: {
                email: `${emailProfessor}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}


export const validateProfessor = async(infoProfessor) => {
    try {
        const response = await api.post('professor/validate', infoProfessor);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const loginProfessor = async(infoProfessor) => {
    try {
        const response = await api.post('professor/login/', infoProfessor);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const registerTurma = async(infoTurma, token) => {
    try {
        const response = await api.post('admin/register/turma', infoTurma, {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const initFuncionario = async(email, cargo) => {
    try {
        const response = await api.get('funcionario/init', {
            params: {
                email: `${email}`,
                cargo: `${cargo}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const validateFuncionario = async(infoFuncionario) => {
    try {
        const response = await api.post('funcionario/validate', infoFuncionario);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const loginFuncionario = async(infoFuncionario) => {
    try {
        const response = await api.post('funcionario/login/', infoFuncionario);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export default api;