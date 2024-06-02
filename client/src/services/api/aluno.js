import api from '../api';

export const authAluno = async (token) => {
    try {
        const response = await api.get('aluno/auth', {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const loginAluno = async (userAluno) => {
    try {
        const response = await api.post('aluno/login/', userAluno);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const registerPreAluno = async (userPreAluno) => {
    try {
        const response = await api.post('aluno/register/prealuno', userPreAluno);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const registerAluno = async (userAluno) => {
    try {
        const response = await api.post('aluno/register/', userAluno);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const completeRegister = async (infoAluno, token) => {
    try {
        const response = await api.post('aluno/register/complete/',
            infoAluno, {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const recoveryAluno = async (infoAluno) => {
    try {
        const response = await api.post('aluno/recovery', infoAluno);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const validateRecovery = async (infoAluno) => {
    try {
        const response = await api.post('aluno/recovery/validate', infoAluno);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const updateCurriculo = async (curriculo, token) => {
    try {
        const response = await api.post('aluno/curriculo/update', curriculo, {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const sendVinculoSolicitationAluno = async (infoVinculo, token) => {
    try {
        const response = await api.post('aluno/link/send', infoVinculo, {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const getCursos = async (token) => {
    try {
        const response = await api.get('aluno/cursos', {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const getInicios = async (infoTurma, token) => {
    try {
        const response = await api.get('aluno/cursos/anos', {
            params: infoTurma,
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const acceptVinculo = async (infoVinculo, token) => {
    try {
        const response = await api.post('aluno/link/accept', infoVinculo);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const rejectVinculo = async (infoVinculo, token) => {
    try {
        const response = await api.post('aluno/link/reject', infoVinculo);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const getVinculosAluno = async (info, token) => {
    try {
        const response = await api.get('aluno/links', {
            params: info,
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.data;
    }
}

export const getCurriculo = async (token) => {
    try {
        const response = await api.get('aluno/curriculo', {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.data;
    }
}

export const getEmailAluno = async (token) => {
    try {
        const response = await api.get('aluno/email', {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}