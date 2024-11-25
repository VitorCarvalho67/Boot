import { socket } from '../../socket';
import api from '../api';

export function enterSockets(token){
    socket.emit(
        'enter',
        {
            type: "EMPRESA",
            authorization: `${token}`
        }
    );
}

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
        const response = await api.post('empresa/register/validate/', infoEmpresa);
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

export const refreshTokenEmpresa = async (token) => {
    try {
        const response = await api.get('empresa/token/refresh', {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const updateImage = async (file, token) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('empresa/upload/image/profile', formData, {
            headers: {
                authorization: `${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });


        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const updateBanner = async (file, token) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('empresa/upload/image/banner', formData, {
            headers: {
                authorization: `${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });


        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const updateSite = async (site, token) => {
    try {
        const response = await api.post('empresa/update/site', site, {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const getLastMessages = async(token) => {
    try {
        const response = await api.get('empresa/messages', {
            headers: {
                Authorization: `${token}`
            }
        });

        enterSockets(token);

        return response;
    } catch (error) {
        console.log(error)
        return error.response.data;
    }
}

export const sendMessage = async (infoMesssage, token) => {
    try {
        const response = await api.post('empresa/message/send', infoMesssage, {
            headers: {
                authorization: `${token}`
            }
        });

        socket.emit('send-message', {
            message: response.data.message,
            authorization: `${token}`
        });

        return response;
    } catch (error) {
        return error.data;
    }
}

export const getMessages = async(info, token) => {
    try {
        const response = await api.get('empresa/messages/between', {
            params: info,
            headers:{
                Authorization: `${token}`
            }
        });

        enterSockets(token);

        return response;
    } catch (error) {
        console.log(error)
        return error.response.data;
    }
}