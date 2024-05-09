export interface InitEmpresaDTO {
    email: string,
    cnpj: string
}

export interface LoginEmpresaDTO {
    email: string,
    cnpj: string,
    password: string
}

export interface ValidateEmpresaDTO {
    email: string,
    temporaryPassword: string,
    newPassword: string
}

export interface RecoveryEmpresaDTO {
    cnpj: string
    email: string;
}

export interface ValidateRecoveryDTO {
    email: string;
    cnpj: string
    recoveryPass: string;
    newPass: string;
}

export interface RegisterEmpresaDTO {
    name: string,
    email: string;
    cnpj: string
    password: string
}