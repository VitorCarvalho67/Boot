export interface VinculoDTO {
    email1: string,
    email2: string,
    identifier1: IdentificadorEnum,
    identifier2: IdentificadorEnum
}

export enum IdentificadorEnum {
    ALUNO = "ALUNO",
    PROFESSOR = "PROFESSOR"
}