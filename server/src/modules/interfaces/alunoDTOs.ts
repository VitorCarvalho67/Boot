import { Multer } from "multer"

export interface ValidateAlunoDTO {
    email: string,
    token: string
}

export interface CreateAlunoDTO {
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
    nascimento: string,
    curso: string,
    inicio: string,
    rm: string,
    endereco: string
}

export interface UpdateCurriculoDTO {
    email: string,
    curriculo: string
}

export interface GetTurmasByCursoDTO {
    curso: string,
    turno: Turno
}

export interface UploadImageDTO {
    email: string,
    file: Express.Multer.File
}

export interface UpdatePassDTO {
    email: string,
    oldPass: string
    newPass: string
}

export interface RegisterExtracurricularDTO {
    alunoId: string;
    instituicao: string;
    descricao: string;
    inicio: Date;
    fim: Date;
}

export interface EditExtracurricularDTO {
    alunoId: string;
    extracurricularId: string;
    instituicao?: string;
    descricao?: string;
    inicio?: Date;
    fim?: Date;
}

export interface ExcludeExtracurricularDTO {
    extracurricularId: string;
    alunoId: string;
}

export interface SendNotasDTO {
    alunoId: string;
    boletim: Express.Multer.File
}

export enum Turno {
    MANHA = "MANHA",
    TARDE = "TARDE",
    NOITE = "NOITE",
    INTEGRAL = "INTEGRAL"
}