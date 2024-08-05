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
    name: string,
    email: string
}

export interface ValidateRecoveryDTO {
    email: string,
    recoveryPass: string,
    newPass: string
}

export interface RegisterVagaDTO {
    titulo: string;
    cadastrador: string;
    empresa: string;
    requisitos: string[];
    beneficios: string[];
    remuneracao: string;
    cargaHoraria: string;
    entrada: string;
    saida: string;
    status: string;
    curso: string;
    descricao: string;
}

export interface SetEmpresaParceiraDTO {
    funcionarioId: string;
    emailEmpresa: string;
}

export interface CompareBoletimDTO {
    boletimId: string;
    file: Express.Multer.File;
}