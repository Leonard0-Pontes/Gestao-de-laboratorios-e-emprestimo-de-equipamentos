import { LoginDto } from '../auth/dto/login.dto';
export interface Usuario {
    id: string;
    nome: string;
    email: string;
    senhaHash: string;
}
export type UsuarioSemSenha = Omit<Usuario, 'senhaHash'>;
export declare class UsuariosService {
    private usuarios;
    listarTodos(): UsuarioSemSenha[];
    buscarPorId(id: string): UsuarioSemSenha;
    criar(createUsuarioDto: LoginDto): UsuarioSemSenha;
    deletar(id: number): boolean;
    buscarPorEmail(email: string): Usuario | undefined;
    removerSenha(usuario: Usuario): UsuarioSemSenha;
}
