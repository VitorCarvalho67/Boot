export interface LoginAdminDTO {
    email: string;
    password: string;
}

export interface RegisterCoordenadorDTO {
    name: string
}

export interface RegisterCursosDTO {
    cursoName: string,
    turno: Turno,
    duracao: string,
    coordenador: string
}

enum Turno {
    Manha = "MANHA",
    Tarde = "TARDE",
    Noite = "NOITE",
    Integral = "INTEGRAL"
}

export interface RegisterFuncionarioDTO {
    name: string,
    email: string,
    password: string,
    cargo: Cargo 
}

enum Cargo {
    GESTAO = "GESTAO",
    ADMINISTRACAO = "ADMINISTRACAO",
    DIRECAO = "DIRECAO",
    ORIENTACAO = "ORIENTACAO"
}

export interface RegisterProfessorDTO {
    name: string,
    email: string,
    password: string,
    tituloPrincipal: string
}

export interface RegisterTurmaDTO {
    inicio: string,
    fim: string,
    cursoName: string
}