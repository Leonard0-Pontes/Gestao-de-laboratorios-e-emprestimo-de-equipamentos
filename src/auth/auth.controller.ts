import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('login')
  async login(@Body() body: LoginDto) {
    
const usuario = await this.authService.validarUsuario(body.nome ?? '', body.email, body.senha);

    return {
      mensagem: 'Login realizado com sucesso!',
      usuario: {
        id: usuario.id,
        nome: usuario.nome,   
        email: usuario.email
      }
    };
  }
}