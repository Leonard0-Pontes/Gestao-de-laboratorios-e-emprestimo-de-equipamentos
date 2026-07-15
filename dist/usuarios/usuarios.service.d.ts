import { LoginDto } from '../auth/dto/login.dto';
export interface Usuario {
    id: string;
    nome: string;
    email: string;
    senhaHash: string;
}
export type UsuarioSemSenha = Omit<Usuario, 'senhaHash'>;
export declare class UsuariosService {
    private readonly usuarios;
    criar(dados: LoginDto, idOperador: string): UsuarioSemSenha;
    listarTodos(): UsuarioSemSenha[];
    buscarPorId(id: string): UsuarioSemSenha;
    deletar(idParaDeletar: string, idOperador: string): boolean;
    buscarPorEmail(email: string): Usuario | undefined;
    removerSenha(usuario: Usuario): UsuarioSemSenha;
}
