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
        { id: '1', nome: 'Admin Bruno', email: 'bruno@example.com', senhaHash: '123456' }
    ];
    criar(dados, idOperador) {
        if (idOperador !== '1') {
            throw new common_1.ForbiddenException('Apenas o administrador (ID 1) pode cadastrar novos usuários.');
        }
        const emailExistente = this.usuarios.find(u => u.email === dados.email);
        if (emailExistente) {
            throw new common_1.BadRequestException('Este endereço de e-mail já está cadastrado.');
        }
        const novoUsuario = {
            id: (this.usuarios.length + 1).toString(),
            nome: dados.nome || 'Usuário Sem Nome',
            email: dados.email,
            senhaHash: dados.senha,
        };
        this.usuarios.push(novoUsuario);
        return this.removerSenha(novoUsuario);
    }
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
    deletar(idParaDeletar, idOperador) {
        if (idOperador !== '1') {
            throw new common_1.ForbiddenException('Apenas o administrador (ID 1) possui permissão para excluir contas.');
        }
        if (idParaDeletar === '1') {
            throw new common_1.BadRequestException('A conta de Administrador (ID 1) não pode ser excluída do sistema.');
        }
        const index = this.usuarios.findIndex((u) => u.id === idParaDeletar);
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