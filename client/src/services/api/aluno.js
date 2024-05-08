import api from '../api';

export const registerPreAluno = async(userPreAluno) => {
try {
    const response = await api.post('aluno/create/prealuno', userPreAluno);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const registerAluno = async(userAluno) => {
    try {
        const response = await api.post('aluno/create/', userAluno);
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

