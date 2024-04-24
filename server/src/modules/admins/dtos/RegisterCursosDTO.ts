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