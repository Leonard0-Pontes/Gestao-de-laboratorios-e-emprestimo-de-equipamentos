import { UsuariosService, UsuarioSemSenha } from '../usuarios/usuarios.service';
export declare class AuthService {
    private readonly usuariosService;
    constructor(usuariosService: UsuariosService);
    validarUsuario(nome: string, email: string, senhaAberta: string): Promise<UsuarioSemSenha>;
}
