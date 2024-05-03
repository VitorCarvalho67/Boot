export interface InitFuncionarioDTO {
    email: string,
    cargo: Cargo
}

enum Cargo {
    GESTAO = "GESTAO",
    ADMINISTRACAO = "ADMINISTRACAO",
    DIRECAO = "DIRECAO",
    ORIENTACAO = "ORIENTACAO"
}