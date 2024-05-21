export interface CreateAlunoDTO {
    email: string,
    token: string
}

export interface CreatePreAlunoDTO {
    name: string,
    email: string,
    password: string
}

export interface LoginAlunoDTO {
    email: string,
    password: string
}

export interface RecoveryAlunoDTO {
    name: string,
    email: string
}

export interface validateRecoveryDTO {
    email: string,
    recoveryPassword: string,
    newPass: string
}

export interface CompleteAlunoDTO {
    email: string,
    nascimento: Date,
    turma: string,
    rm: string
    endereco: string
}

export interface UpdateCurriculoDTO {
    email: string,
    curriculo: string
}