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

export interface GetEntidadeDTO {
    email: string,
    identifier: IdentificadorEnum,
}

export interface CreateMessageDTO {
    email: string,
    message: string,
    sender: string,
    recipient: string,
    senderIdentifier: EntidadeEnum,
    recipientIdentifier: EntidadeEnum
}

export enum EntidadeEnum {
    ALUNO = 'ALUNO',
    PROFESSOR = 'PROFESSOR',
    FUNCIONARIO = 'FUNCIONARIO',
    EMPRESA = 'EMPRESA',
}