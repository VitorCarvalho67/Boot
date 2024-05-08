import api from '../api';

export const initProfessor = async(email) => {
    try {
        const response = await api.get('professor/init', {
            params: {
                email: `${email}`
            }
        });
        return response;
    } catch (error) {
        return error.data;
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

export const recoveryProfessor = async(infoProfessor) => {
    try {
        const response = await api.post('professor/recovery', infoProfessor);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const validateRecovery = async(infoProfessor) => {
    try {
        const response = await api.post('professor/recovery/validate', infoProfessor);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const authProfessor = async(token) => {
    try {
        const response = await api.post('professor/auth', {}, {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}
