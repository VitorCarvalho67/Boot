export interface InitFuncionarioDTO {
    email: string,
    cargo: Cargo
}

enum Cargo {
    GESTAO = "GESTAO",
    ADMINISTRACAO = "ADMINISTRACAO",
    DIRECAO = "DIRECAO",
    ORIENTACAO = "ORIENTACAO"
}

export interface LoginFuncionarioDTO {
    email: string,
    password: string
}

export interface ValidateFuncionarioDTO {
    email: string,
    temporaryPassword: string,
    newPassword: string
}

export interface RecoveryFuncionarioDTO {
    name: string;
    email: string;
}

export interface ValidateRecoveryDTO {
    email: string;
    recoveryPass: string;
    newPass: string;
}