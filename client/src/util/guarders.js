import Cookies from 'js-cookie';
import { authAdmin } from '../services/api.js';

export async function isAuthAdmin() {
    var token = Cookies.get('token');
    if (!token) {
        return false;
    } else {
        try {
            const response = await authAdmin(token);
            if (response.data !== "Admin autenticado com sucesso.") {
                return false;
            } else {
                return true;
            }
        } catch (error) {
            return false;
        }
    }
}

export async function isRegistering(){
    return (Cookies.get('email-registro-aluno')) ? true : false;
}

export async function isRecoverigAluno(){
    return (Cookies.get('email-recovery-aluno')) ? true : false;
}

export async function isInitingProfessor(){
    return (Cookies.get('email-init-professor')) ? true : false;
}

export async function isRecoverigProfessor(){
    return (Cookies.get('email-recovery-professor')) ? true : false;
}

export async function isInitingFuncionario(){
    return (Cookies.get('email-init-funcionario')) ? true : false;
}

export async function isRecoverigFuncionario(){
    return (Cookies.get('email-recovery-funcionario')) ? true : false;
}
