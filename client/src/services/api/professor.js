import api from '../api';

export const authProfessor = async(token) => {
    try {
        const response = await api.get('professor/auth', {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

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

export const sendVinculoSolicitation =  async(infoVinculo) => {
    try {
        const response = await api.post('professor/link/send', infoVinculo);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const acceptVinculo =  async(infoVinculo) => {
    try {
        const response = await api.post('professor/link/accept', infoVinculo);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const rejectVinculo =  async(infoVinculo) => {
    try {
        const response = await api.post('professor/link/reject', infoVinculo);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const getVinculosProfessor = async (info, token) => {
    try {
        const response = await api.get('professor/links', {
            params: info,
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const refreshTokenProfessor = async (token) => {
    try {
        const response = await api.get('professor/token/refresh', {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}