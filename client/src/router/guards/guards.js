import Cookies from 'js-cookie';
import { authAluno }  from '../../services/api/aluno';
import { authAdmin }  from '../../services/api/admin';
import { authProfessor }  from '../../services/api/professor';
import { authFuncionario }  from '../../services/api/funcionario';
import { authEmpresa }  from '../../services/api/empresa';

// isAuths
export async function isAuthAluno(){
    var token = Cookies.get('token');
    if (!token) {
        return false;
    } else {
        try {
            const response = await authAluno(token);
            return (response.data == "Aluno autenticado com sucesso.") ? true : false
        } catch (error) {
            return false;
        }    
    }    
}    

export async function isAuthAdmin() {
    var token = Cookies.get('token-admin');
    if (!token) {
        return false;
    } else {
        try {
            const response = await authAdmin(token);
            return (response.data == "Admin autenticado com sucesso.") ? true : false
        } catch (error) {
            return false;
        }    
    }    
}    

export async function isAuthEmpresa(){
    var token = Cookies.get('token-empresa');
    if (!token) {
        return false;
    } else {
        try {
            const response = await authEmpresa(token);
            return(response.data == "Empresa autenticada com sucesso.") ? true : false;
        } catch (error) {
            return false;
        }
    }
}

export async function isAuthFuncionario(){
    var token = Cookies.get('token-funcionario');
    if (!token) {
        return false;
    } else {
        try {
            const response = await authFuncionario(token);
            return (response.data == "Funcionário autenticado com sucesso.") ? true : false
        } catch (error) {
            return false;
        }
    }
}

export async function isAuthProfessor(){
    var token = Cookies.get('token-professor');
    if (!token) {
        return false;
    } else {
        try {
            const response = await authProfessor(token);
            return (response.data == "Professor autenticado com sucesso.") ? true : false
        } catch (error) {
            return false;
        }
    }
}


// isRegisterings
export async function isRegistering(){
    return (Cookies.get('email-registro-aluno')) ? true : false;
}    

export async function isRegisteringEmpresa(){
    return (Cookies.get('cnpj-registro-empresa')) ? true : false;
}

// isRecoverings
export async function isRecoveringAluno(){
    return (Cookies.get('email-recovery-aluno')) ? true : false;
}    

export async function isRecoveringEmpresa(){
    return (Cookies.get('email-recovery-empresa')) ? true : false;
}

export async function isRecoveringFuncionario(){
    return (Cookies.get('email-recovery-funcionario')) ? true : false;
}

export async function isRecoveringProfessor(){
    return (Cookies.get('email-recovery-professor')) ? true : false;
}

// isInitings
export async function isInitingFuncionario(){
    return (Cookies.get('email-init-funcionario')) ? true : false;
}

export async function isInitingProfessor(){
    return (Cookies.get('email-init-professor')) ? true : false;
}