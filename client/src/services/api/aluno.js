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

export const loginAluno = async(userAluno) => {
    try {
        const response = await api.post('aluno/login/', userAluno);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const registerPreAluno = async(userPreAluno) => {
try {
    const response = await api.post('aluno/register/prealuno', userPreAluno);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const registerAluno = async(userAluno) => {
    try {
        const response = await api.post('aluno/register/', userAluno);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const completeRegister = async(infoAluno) => {
    try {
        const response = await api.post('aluno/register/complete/', infoAluno);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const recoveryAluno = async(infoAluno) => {
    try {
        const response = await api.post('aluno/recovery', infoAluno);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const validateRecovery = async(infoAluno) => {
    try {
        const response = await api.post('aluno/recovery/validate', infoAluno);
        return response;
    } catch (error) {
        return error.response.data;
    }
}