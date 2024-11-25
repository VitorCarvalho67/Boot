export interface VinculoDTO {
    email: string,
    sender: string,
    recipient: string,
    senderIdentifier: IdentificadorEnum,
    recipientIdentifier: IdentificadorEnum
}

export enum IdentificadorEnum {
    ALUNO = "ALUNO",
    PROFESSOR = "PROFESSOR",
    EMPRESA = "EMPRESA"
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
    message: string,
    sender: string,
    recipient: string,
    senderIdentifier: EntidadeEnum,
    recipientIdentifier: EntidadeEnum
}

export interface GetMessageBetweenDTO {
    email1: string;
    identifier1: EntidadeEnum;
    email2: string;
    identifier2: EntidadeEnum;
}

export enum EntidadeEnum {
    ALUNO = 'ALUNO',
    PROFESSOR = 'PROFESSOR',
    FUNCIONARIO = 'FUNCIONARIO',
    EMPRESA = 'EMPRESA',
}