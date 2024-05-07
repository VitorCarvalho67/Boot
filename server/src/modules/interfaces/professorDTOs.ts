export interface InitProfessorDTO {
    email: string
}

export interface LoginProfessorDTO {
    email: string,
    password: string
}

export interface ValidateProfessorDTO {
    email: string,
    temporaryPassword: string,
    newPassword: string
}