import { socket } from '../../socket';
import api from '../api';

export function enterSockets(token){
    socket.emit(
        'enter',
        {
            type: "PROFESSOR",
            authorization: `${token}`
        }
    );
}

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

export const sendMessage = async (infoMesssage, token) => {
    try {
        const response = await api.post('professor/message/send', infoMesssage, {
            headers: {
                authorization: `${token}`
            }
        });

        socket.emit('send-message', {
            message: infoMesssage,
            authorization: `${token}`
        });

        return response;
    } catch (error) {
        return error.data;
    }
}

export const getCurriculo = async (token) => {
    try {
        const response = await api.get('professor/curriculo', {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.data;
    }
}

export const updateCurriculo = async (curriculo, token) => {
    try {
        const response = await api.post('professor/curriculo/update', curriculo, {
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

        const response = await api.post('professor/upload/image/profile', formData, {
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

        const response = await api.post('professor/upload/image/banner', formData, {
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

export const getLastMessages = async(token) => {
    try {
        const response = await api.get('professor/messages', {
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

export const getMessages = async(info, token) => {
    try {
        const response = await api.get('professor/messages/between', {
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