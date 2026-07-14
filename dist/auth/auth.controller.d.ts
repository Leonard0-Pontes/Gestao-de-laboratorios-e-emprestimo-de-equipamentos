import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginDto): Promise<{
        mensagem: string;
        usuario: {
            id: string;
            nome: string;
            email: string;
        };
    }>;
}
