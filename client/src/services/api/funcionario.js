import api from '../api';

export const authFuncionario = async(token) => {
    try {
        const response = await api.post('funcionario/auth', {}, {
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

export const recoveryFuncionario = async(infoFuncionario) => {
    try {
        const response = await api.post('funcionario/recovery', infoFuncionario);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const validateRecovery = async(infoFuncionario) => {
    try {
        const response = await api.post('funcionario/recovery/validate', infoFuncionario);
        return response;
    } catch (error) {
        return error.response.data;
    }
}