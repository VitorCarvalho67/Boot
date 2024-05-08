import Cookies from 'js-cookie';
import { authAdmin }  from '../../services/api/admin';
import { authProfessor }  from '../../services/api/professor';
import { authFuncionario }  from '../../services/api/funcionario';

export async function isAuthAdmin() {
    var token = Cookies.get('token-admin');
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

export async function isAuthProfessor(){
    var token = Cookies.get('token-professor');
    if (!token) {
        return false;
    } else {
        try {
            const response = await authProfessor(token);
            if (response.data !== "Professor autenticado com sucesso.") {
                console.log("aaa");
                return false;
            } else {
                return true;
            }
        } catch (error) {
            return false;
        }
    }
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

export async function isAuthFuncionario(){
    var token = Cookies.get('token-funcionario');
    if (!token) {
        return false;
    } else {
        try {
            const response = await authFuncionario(token);
            if (response.data !== "Funcionário autenticado com sucesso.") {
                return false;
            } else {
                return true;
            }
        } catch (error) {
            return false;
        }
    }
}