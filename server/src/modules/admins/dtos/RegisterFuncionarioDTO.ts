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