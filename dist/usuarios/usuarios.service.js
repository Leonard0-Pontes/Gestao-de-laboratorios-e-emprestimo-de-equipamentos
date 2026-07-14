"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
let UsuariosService = class UsuariosService {
    usuarios = [
        { id: '1', nome: 'Bruno Costa', email: 'bruno@example.com', senhaHash: '123456' }
    ];
    listarTodos() {
        return this.usuarios.map(u => this.removerSenha(u));
    }
    buscarPorId(id) {
        const usuario = this.usuarios.find(u => u.id === id);
        if (!usuario) {
            throw new common_1.NotFoundException(`Usuário com ID ${id} não foi encontrado.`);
        }
        return this.removerSenha(usuario);
    }
    criar(createUsuarioDto) {
        const emailExiste = this.usuarios.some(u => u.email === createUsuarioDto.email);
        if (emailExiste) {
            throw new common_1.BadRequestException('Este e-mail já está cadastrado.');
        }
        const novoUsuario = {
            id: (this.usuarios.length + 1).toString(),
            nome: createUsuarioDto.nome || 'Usuário Sem Nome',
            email: createUsuarioDto.email,
            senhaHash: createUsuarioDto.senha,
        };
        this.usuarios.push(novoUsuario);
        return this.removerSenha(novoUsuario);
    }
    deletar(id) {
        const index = this.usuarios.findIndex((u) => Number(u.id) === id);
        if (index === -1) {
            return false;
        }
        this.usuarios.splice(index, 1);
        return true;
    }
    buscarPorEmail(email) {
        return this.usuarios.find(u => u.email === email);
    }
    removerSenha(usuario) {
        const { senhaHash, ...usuarioSemSenha } = usuario;
        return usuarioSemSenha;
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)()
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map