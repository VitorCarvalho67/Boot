export interface CreateAlunoDTO {
    email: string;
    token: string;
}

export interface CreatePreAlunoDTO {
    name: string;
    email: string;
    password: string;
}

export interface LoginAlunoDTO {
    email: string;
    password: string;
}

export interface RecoveryAlunoDTO {
    name: string;
    email: string;
}

export interface validateRecoveryDTO {
    email: string;
    recoveryPassword: string;
    newPass: string
}