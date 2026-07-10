# LabReserve

> Sistema web para gerenciamento de laboratórios e empréstimo de equipamentos desenvolvido com **NestJS**, **PostgreSQL**, **Prisma** e **Vue.js**.

---

## Sobre o Projeto

O **LabReserve** é um sistema desenvolvido para instituições de ensino com o objetivo de gerenciar laboratórios e controlar reservas e empréstimos de equipamentos.

O sistema possui dois perfis de usuário:

### Administrador
- Gerenciar usuários
- Cadastrar laboratórios
- Cadastrar equipamentos
- Aprovar ou rejeitar reservas
- Aprovar empréstimos
- Registrar devoluções
- Visualizar relatórios

### Aluno
- Cadastro e Login
- Consultar equipamentos disponíveis
- Solicitar reservas
- Solicitar empréstimos
- Consultar histórico

---

# Funcionalidades

- ✅ Autenticação 
- ✅ Controle de acesso por papéis
- ✅ CRUD de Usuários
- ✅ CRUD de Laboratórios
- ✅ CRUD de Equipamentos
- ✅ Reservas
- ✅ Empréstimos
- ✅ Upload de imagens
- ✅ Integração de api externa (CEP)
- ✅ Cache
- ✅ Docker
- ✅ Deploy

---

# Tecnologias

| Tecnologia | Utilização |
|------------|------------|
| NestJS | Backend |
| TypeScript | Linguagem |
| PostgreSQL | Banco de Dados |
| Docker | Containers |
| HTML, CSS e Javascript| Frontend |


---

# Modelo de Dados

## Usuário

- id
- nome
- email
- senhaHash

## Laboratório

- id
- nome
- localização
- descrição

## Equipamento

- id
- nome
- descrição
- status
- imagem
- laboratorioId

## Reserva

- id
- usuarioId
- equipamentoId
- dataInicio
- dataFim
- status

## Empréstimo

- id
- usuarioId
- equipamentoId
- dataEmprestimo
- dataPrevista
- dataDevolucao
- status

---

# Regras de Negócio

- Equipamentos indisponíveis não podem ser reservados.
- Apenas administradores podem aprovar reservas.
- Não permitir duas reservas para o mesmo equipamento no mesmo período.
- Não permitir devoluções inexistentes.
- Reservas canceladas não podem ser aprovadas.
- Usuários não autenticados não podem acessar rotas protegidas.

---

# Endpoints

## Usuários

```http
GET /users
GET /users/:id
PATCH /users/:id
DELETE /users/:id
```

## Laboratórios

```http
GET /laboratorios
POST /laboratorios
PATCH /laboratorios/:id
DELETE /laboratorios/:id
```

## Equipamentos

```http
GET /equipamentos
GET /equipamentos?status=DISPONIVEL
GET /equipamentos?page=1&limit=10
POST /equipamentos
PATCH /equipamentos/:id
DELETE /equipamentos/:id
POST /equipamentos/:id/imagem
```

## Reservas

```http
POST /reservas
GET /reservas
PATCH /reservas/:id/aprovar
PATCH /reservas/:id/cancelar
```

## Empréstimos

```http
POST /emprestimos
GET /emprestimos
PATCH /emprestimos/:id/aprovar
PATCH /emprestimos/:id/devolver
```

---

# 👥 Divisão da Equipe

## Leonardo — Infraestrutura

### Responsabilidades

- Configuração do NestJS
- Configuração do PostgreSQL
- Prisma ORM
- Migrations
- Seeds
- Docker
- Cache
- Health Check
- Deploy
- Organização do GitHub
- Revisão dos Pull Requests

---

## Heros — Autenticação e Usuários

### Responsabilidades

- JWT
- Passport
- bcrypt
- Guards
- Controle de acesso
- CRUD de Usuários
- Cookies
- Autenticação

---

## Angelo — Laboratórios e Equipamentos

### Responsabilidades

- CRUD de Laboratórios
- CRUD de Equipamentos
- Upload de Imagens
- Integração ViaCEP
- Paginação
- Filtros
- Validação de Upload

---

## Paulo — Reservas, Empréstimos e Front-end

### Responsabilidades

- Reservas
- Empréstimos
- Regras de negócio
- Front-end
- Dashboard
- Histórico
- Swagger
- README
- Diagramas

---
