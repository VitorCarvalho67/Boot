import api from '../api';

export const getCurriculo = async (infoAluno) => {
    try {
        const response = await api.get('shared/curriculo', {
            params: infoAluno
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const getImage = async (info) => {
    try {
        const response = await api.get('shared/profile/image', {
            params: info
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const getBanner = async (info) => {
    try {
        const response = await api.get('shared/profile/banner', {
            params: info
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const getUsers = async () => {
    try {
        const response = await api.get('shared/users');
        console.log(response.data.alunos);
        return response;
    } catch (error) {
        return error.response.data;
    }
}
