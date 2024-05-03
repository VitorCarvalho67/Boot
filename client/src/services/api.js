import axios from 'axios';
import alter from '../router/index.js';

const api = axios.create({
    // baseURL: 'https://623fd1dd16b40db9bdd15d37f0505891.serveo.net'
    baseURL: 'http://localhost:3333/'
});

export const registerPreAluno = async (userPreAluno) => {
    try {
        const response = await api.post('prealunos/create/', userPreAluno);
        return response.data;
    } catch {
        console.log(err.responde.data.detail);
    }
}

export const registerAluno = async (userAluno) => {
    try {
        const response = await api.post('alunos/create/', userAluno);
        return response.data;
    } catch (err) {
        console.log(err.responde.data.detail);
    }
}

export const loginAluno = async (userAluno) => {
    try {
        const response = await api.post('alunos/login/', userAluno);
        return response.data;
    } catch (err) {
        console.log(err.responde.data.detail);
    }
}

export const recoveryAluno = async (infoAluno) => {
    try {
        const response = await api.post('alunos/recovery', infoAluno);
        return response.data
    } catch (err) {
        console.log(err.response.data.detail)
    }
}

export const validateRecovery = async (infoAluno) => {
    try {
        const response = await api.post('alunos/recovery/validate', infoAluno);
        return response.data
    } catch (err) {
        console.log(err.response.data.detail)
    }
}

export const loginAdmin = async (userAdmin) => {
    try {
        const response = await api.post('admin/login', userAdmin);
        return response.data;
    } catch (err) {
        console.log(err.responde.data.detail);
    }
}

export const authAdmin = async (token) => {
    try {
        const response = await api.post('admin/auth', {}, {
            headers: {
                authorization: `${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error.response.data.detail);
    }
}

export const registerProfessor = async (infoProfessor, token) => {
    try {
        const response = await api.post('admin/register/professor', infoProfessor, {
            headers: {
                authorization: `${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error.response.data.detail);
    }
}

export const registerCoordenador = async (name, token) => {
    try {
        const response = await api.post('admin/register/coordenador',
            {
                name: name
            },
            {
                headers: {
                    authorization: `${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error.response.data.detail);
    }
}

export const getProfessores = async (token) => {
    try {
        const response = await api.get('admin/professores', 
        {
            headers: {
                authorization: `${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getCoordenadores = async (token) => {
    try {
        const response = await api.get('admin/coordenadores',
            {
                headers: {
                    authorization: `${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getCursos = async (token) => {
    try {
        const response = await api.get('admin/cursos',
            {
                headers: {
                    authorization: `${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error.response.data.detail);
    }
}

export const registerCurso = async (infoCurso, token) => {
    try {
        const response = await api.post('admin/register/course',
            infoCurso,
            {
                headers: {
                    authorization: `${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error.response.data.detail);
    }
}

export const registerFuncionario = async (infoFuncionario, token) => {
    try {
        const response = await api.post('admin/register/funcionario', infoFuncionario, {
            headers: {
                authorization: `${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error.response.data.detail);
    }
}

export const initProfessor = async (emailProfessor) => {
    try {
        const response = await api.get('professor/init', {
            params: {
                email: `${emailProfessor}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error.response.data.detail);
    }
}


export const validateProfessor = async (infoProfessor) => {
    try {
        const response = await api.post('professor/validate', infoProfessor);
        return response.data;
    } catch (error) {
        console.log(error.response.data.detail);
    }
}

export const loginProfessor = async (infoProfessor) => {
    try {
        const response = await api.post('professor/login/', infoProfessor);
        return response.data;
    } catch (err) {
        console.log(err.responde.data.detail);
    }
}

export const registerTurma = async (infoTurma, token) => {
    try {
        const response = await api.post('admin/register/turma', infoTurma, {
            headers: {
                authorization: `${token}`
            }
        });
        return response.data;
    } catch (err) {
        console.log(err.responde.data.detail);
    }
}

export default api;