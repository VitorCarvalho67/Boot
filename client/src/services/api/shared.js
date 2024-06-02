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