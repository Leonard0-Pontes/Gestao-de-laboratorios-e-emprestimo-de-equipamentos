export type Usuario = {
    id: number;
    nome: string;
    email: string;
    senhaHash: string;
};
export type UsuarioSemSenha = Omit<Usuario, 'senhaHash'>;
export declare class UsuariosService {
    private readonly usuarios;
    buscarPorEmail(email: string): Usuario | null;
    removerSenha(usuario: Usuario): UsuarioSemSenha;
}
