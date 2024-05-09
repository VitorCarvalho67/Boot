export interface InitEmpresaDTO {
    email: string,
    cnpj: string
}

export interface LoginEmpresaDTO {
    cnpj: string,
    password: string
}

export interface ValidateEmpresaDTO {
    cnpj: string,
    token: string
}

export interface RecoveryEmpresaDTO {
    cnpj: string,
    email: string
}

export interface ValidateRecoveryEmpresaDTO {
    cnpj: string,
    token: string,
    newPass: string
}

export interface RegisterEmpresaDTO {
    name: string,
    email: string,
    cnpj: string,
    password: string
}