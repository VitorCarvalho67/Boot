import api from '../api';
import { socket } from '../../socket.js';

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

export const registerAluno = async (aluno) => {
    try {
        const response = await api.post('aluno/register/', aluno);
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const validateAluno = async (aluno) => {
    try {
        const response = await api.post('aluno/validate/', aluno);
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

export const sendVinculoSolicitationAluno = async (infoVinculo, email, token) => {
    try {
        const response = await api.post('aluno/link/send', infoVinculo, {
            headers: {
                authorization: `${token}`
            }
        });

        socket.emit('vinculo-update', {
            email: `${email}`,
            type: "send",
            authorization: `${token}`
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

export const acceptVinculoAluno = async (infoVinculo, email, token) => {
    try {
        const response = await api.post('aluno/link/accept', infoVinculo, {
            headers: {
                authorization: `${token}`
            }
        });

        socket.emit('vinculo-update', {
            email: `${email}`,
            type: "accept",
            authorization: `${token}`
        });

        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const rejectVinculoAluno = async (infoVinculo, email, token) => {
    try {
        const response = await api.post('aluno/link/reject', infoVinculo, {
            headers: {
                authorization: `${token}`
            }
        });

        socket.emit('vinculo-update', {
            email: `${email}`,
            type: "reject",
            authorization: `${token}`
        });

        return response;
    } catch (error) {
        return error.data;
    }
}

export const removeVinculoAluno = async (infoVinculo, email, token) => {
    try {
        const response = await api.post('aluno/link/delete', infoVinculo, {
            headers: {
                authorization: `${token}`
            }
        });

        socket.emit('vinculo-update', {
            email: `${email}`,
            type: "remove",
            authorization: `${token}`
        });

        return response;
    } catch (error) {
        return error.data;
    }
}

export const getVinculosProfileAluno = async (info, token) => {
    try {
        const response = await api.get('aluno/links', {
            params: info,
            headers: {
                authorization: `${token}`
            }
        });

        enterSockets(token);
        
        return response;
    } catch (error) {
        return error.data;
    }
}

export const getVinculosAluno = async (info, token) => {
    try {
        const response = await api.get('aluno/links/profile', {
            params: info,
            headers: {
                authorization: `${token}`
            }
        });

        enterSockets(token);

        return response;
    } catch (error) {
        console.log(error);
        return error.response.data;
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

export const getMeAluno = async (token) => {
    try {
        const response = await api.get('aluno/me', {
            headers: {
                authorization: `${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const refreshTokenAluno = async (token) => {
    try {
        const response = await api.get('aluno/token/refresh', {
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

        const response = await api.post('aluno/upload/image/profile', formData, {
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

        const response = await api.post('aluno/upload/image/banner', formData, {
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

export const changePassword = async (info, token) => {
    try {
        const response = await api.post('aluno/password/change', info, {
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
        const response = await api.post('aluno/message/send', infoMesssage, {
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

export const getLastMessages = async(token) => {
    try {
        const response = await api.get('aluno/messages', {
            headers: {
                Authorization: `${token}`
            }
        });

        enterSockets(token);

        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const getMessages = async(info, token) => {
    try {
        const response = await api.get('aluno/messages/between', {
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

function enterSockets(token){
    socket.emit(
        'enter',
        {
            authorization: `${token}`
        }
    );
}

export const sendBoletim = async (file, token) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        
        const response = await api.post('aluno/upload/boletim', formData, {
            headers: {
                authorization: `${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch (error) {
        console.log("ARQUIVO: " + file);
        // return error.response.data;
    }
}