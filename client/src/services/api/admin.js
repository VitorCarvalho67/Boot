import api from '../api';

export const authAdmin = async(token) => {
    try {
        const response = await api.get('admin/auth', {
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
        const response = await api.post('admin/register/professor',
        infoProfessor, {
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
        const response = await api.post('admin/register/funcionario',
            infoFuncionario, {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const registerTurma = async(infoTurma, token) => {
    try {
        const response = await api.post('admin/register/turma',
        infoTurma, {
            headers: {
                authorization: `${token}`
            }
        });
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