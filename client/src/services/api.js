import axios from 'axios';
import alter from '../router/index.js';

const api =  axios.create({
    baseURL: 'http://localhost:3333/'
});

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

export default api;