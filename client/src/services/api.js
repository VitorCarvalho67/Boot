import axios from 'axios';
import alter from '../router/index.js';

const api =  axios.create({
    baseURL: 'http://localhost:3333/'
});

export const registerPreAluno = async (userPreAluno) =>{
    try{
        const response = await api.post('prealunos/create/', userPreAluno);
        return response.data;
    }catch{
        console.log(err.responde.data.detail);
    }
}

export const registerAluno = async (userAluno) => {
    try{
        const response = await api.post('alunos/create/', userAluno);
        return response.data;
    }catch(err){
        console.log(err.responde.data.detail);
    }
}

export const loginAluno = async (userAluno) =>{
    try{
        const response = await api.post('alunos/login/', userAluno);
        return response.data;
    }catch(err){
        console.log(err.responde.data.detail);
    }
}

export const recoveryAluno = async (infoAluno) =>{
    try {
        const response = await api.post('alunos/recovery', infoAluno);
        return response.data
    } catch (err) {
        console.log(err.response.data.detail)
    }
}

export const validateRecovery = async (infoAluno) => {
    try {
        const response = await api.post('alunos/recovery/validate', infoAluno);
        return response.data
    } catch (err) {
        console.log(err.response.data.detail) 
    }
}

export const loginAdmin = async (userAdmin) =>{
    try{
        const response = await api.post('admin/login', userAdmin);
        return response.data;
    }catch(err){
        console.log(err.responde.data.detail);
    }
}

export const authAdmin = async (token) =>{
    try {
        const response = await api.post('admin/auth', {}, {
            headers: {
                authorization: `${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error.response.data.detail);
    }
}

export const registerProfessor = async (infoProfessor, token) =>{
    try {
        const response = await api.post('admin/register/professor', infoProfessor, {
            headers: {
                authorization: `${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error.response.data.detail);
    }
}

export const getProfessores = async (token) =>{
    try {
        const response = await api.post('admin/professores', {}, {
            headers: {
                authorization: `${token}`
            }
    });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const registerCoordenador = async (name, token) =>{
    try {
        const response = await api.post('admin/register/coordenador',
            {
                name: name
            },
            {
                headers: {
                    authorization: `${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error.response.data.detail);
    }
}

export const getCoordenadores = async (token) =>{
    try {
        const response = await api.post('admin/coordenadores', {}, 
            {
                headers: {
                    authorization: `${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const registerCurso = async (infoCurso, token) =>{
    try {
        const response = await api.post('admin/register/course',
            infoCurso,
            {
                headers: {
                    authorization: `${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error.response.data.detail);
    }
}

export default api;