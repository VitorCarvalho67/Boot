export interface VinculoDTO {
    email: string,
    sender: string,
    recipient: string,
    senderIdentifier: IdentificadorEnum,
    recipientIdentifier: IdentificadorEnum
}

export enum IdentificadorEnum {
    ALUNO = "ALUNO",
    PROFESSOR = "PROFESSOR"
}

export interface ReagirVinculoDTO {
    email: string,
    sender: string,
    recipient: string,
    senderIdentifier: IdentificadorEnum,
    recipientIdentifier: IdentificadorEnum
}

export interface GetVinculosDTO {
    email: string,
    identifier: IdentificadorEnum,
}