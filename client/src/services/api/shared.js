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
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const getVagas = async () => {
    try {
        const response = await api.get('shared/vagas');
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const getVaga = async (id) => {
    try {
        const response = await api.get('shared/vaga', {
            params: id
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
}

export const getExtracurriculares = async (rm) => {
    try {
        const response = await api.get('shared/extracurriculares', {
            params: {
                rm: rm
            }
        });
        return response;
    } catch (error) {
        console.log('Erro: ' + error);
        return error.response.data;
    }
}

export const getNotaRanking = async (rm) => {
    try {
        const response = await api.get('/shared/ranking/boletim', {
        });
        return response;
    } catch (error) {
        console.log('Erro: ' + error);
        return error.response.data;
    }
}


export const getEmpresa = async (email) => {
    try {
        const response = await api.get('/shared/empresa', {
            params: {
                email: email
            }
        });
        return response;
    } catch (error) {
        console.log('Erro: ' + error);
        return error.response.data;
    }
}