import api from '../api';

export const authEmpresa = async (token) => {
    try {
        const response = await api.get('empresa/auth', {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const loginEmpresa = async (infoEmpresa) => {
    try {
        const response = await api.post('empresa/login/', infoEmpresa);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const registerEmpresa = async (infoEmpresa) => {
    try {
        const response = await api.post('empresa/register', infoEmpresa);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const validateEmpresa = async (infoEmpresa) => {
    try {
        const response = await api.post('empresa/validate/', infoEmpresa);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const recoveryEmpresa = async (infoEmpresa) => {
    try {
        const response = await api.post('empresa/recovery', infoEmpresa);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const validateRecoveryEmpresa = async (infoEmpresa) => {
    try {
        const response = await api.post('empresa/recovery/validate', infoEmpresa);
        return response;
    } catch (error) {
        return error.response.data;
    }
}