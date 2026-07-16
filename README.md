# Gestão de Laboratórios e Empréstimo de Equipamentos

## Sobre o Projeto

O **Gestão de Laboratórios e Empréstimo de Equipamentos** é um sistema web desenvolvido para facilitar o gerenciamento de laboratórios acadêmicos e o controle do empréstimo de equipamentos.

O sistema busca centralizar as informações referentes aos laboratórios, equipamentos e usuários, permitindo que administradores tenham maior controle sobre a disponibilidade dos recursos e que usuários possam solicitar empréstimos de forma organizada e segura.

O sistema possui dois perfis de usuário:

### Administrador
- Gerenciar usuários
- Cadastrar laboratórios
- Cadastrar equipamentos
- Registrar devoluções

### Aluno
- Cadastro e Login
- Consultar equipamentos disponíveis
- Solicitar reservas
- Solicitar empréstimos
- Consultar histórico

---

# Problema

Instituições de ensino frequentemente realizam o controle de laboratórios e empréstimos de equipamentos de forma manual ou utilizando planilhas, o que pode ocasionar:

- perda de informações;
- dificuldade em localizar equipamentos;
- conflitos de empréstimos;
- falta de histórico de utilização;
- dificuldade no gerenciamento dos laboratórios.

Este projeto propõe uma solução informatizada para automatizar esse processo, tornando o gerenciamento mais eficiente, confiável e organizado.

---

# Integrantes

- Angelo Gabriel
- Leonardo Pontes
- Heros Henrique
- Paulo Eduardo


---

# 🏗 Arquitetura

O sistema segue uma arquitetura cliente-servidor.

```
Cliente (Frontend)
        │
        │ HTTP/REST
        ▼
Backend (NestJS)
        │
        ▼
 Banco de Dados
```

### Organização

A aplicação está dividida em camadas:

- Controllers
- Services
- Modules
- DTOs

Essa separação facilita:

- manutenção;
- escalabilidade;
- reutilização de código;
- organização do projeto.

---

# 🛠 Tecnologias Utilizadas

## Backend

- NestJS
- TypeScript
- Node.js

## ~~Banco de Dados~~

- ~~PostgreSQL~~

## ~~ORM~~

- ~~TypeORM~~

## Ferramentas

- Git
- GitHub
- npm

# Containerização
- Docker
- Docker Compose

### Resumo teccnologias
| Tecnologia | Utilização |
|------------|------------|
| NestJS | Backend |
| TypeScript | Linguagem |
| Git, GitHub, npm | Ferramentas |
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
- Apenas administradores podem criar novos usuarios.
- Não permitir duas reservas para o mesmo equipamento no mesmo período.
- Não permitir devoluções inexistentes.
- Reservas canceladas não podem ser aprovadas.

---


# Endpoints

# Estrutura do Projeto

```
Gestao-de-laboratorios-e-emprestimo-de-equipamentos/
│
├── src/
│   ├── auth/
│   │   ├── dto/
│   │   │   └── login.dto.ts
│   │   ├── guards/
│   │   │   └── local-auth.guard.ts
│   │   ├── strategies/
│   │   │   └── local.strategy.ts
│   │   ├── auth.controller.spec.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.spec.ts
│   │   └── auth.service.ts
│   │
│   ├── emprestimo/
│   │   ├── dtos/
│   │   │   ├── create-emprestimo.dto.ts
│   │   │   └── update-emprestimo.dto.ts
│   │   ├── emprestimo.controller.spec.ts
│   │   ├── emprestimo.controller.ts
│   │   ├── emprestimo.module.ts
│   │   ├── emprestimo.service.spec.ts
│   │   └── emprestimo.service.ts
│   │
│   ├── equipamento/
│   │   ├── dtos/
│   │   │   ├── create-equip.dto.ts
│   │   │   └── update-equip.dto.ts
│   │   ├── equipamento.controller.spec.ts
│   │   ├── equipamento.controller.ts
│   │   ├── equipamento.module.ts
│   │   ├── equipamento.service.spec.ts
│   │   └── equipamento.service.ts
│   │
│   ├── laboratorio/
│   │   ├── dtos/
│   │   │   ├── create-lab.dto.ts
│   │   │   └── update-lab.dto.ts
│   │   ├── laboratorio.controller.spec.ts
│   │   ├── laboratorio.controller.ts
│   │   ├── laboratorio.module.ts
│   │   ├── laboratorio.service.spec.ts
│   │   └── laboratorio.service.ts
│   │
│   ├── reserva/
│   │   ├── dtos/
│   │   │   ├── create-reserva.dto.ts
│   │   │  └── update-reserva.dto.ts
│   │   ├── reserva.controller.spec.ts
│   │   ├── reserva.controller.ts
│   │   ├── reserva.module.ts
│   │   ├── reserva.service.spec.ts
│   │   └── reserva.service.ts
│   │
│   ├── usuarios/
│   │   ├── usuarios.controller.ts
│   │   ├── usuarios.module.ts
│   │   ├── usuarios.service.spec.ts
│   │   └── usuarios.service.ts
│   │
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
│
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── eslint.config.js
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json
```

---

# Instalação

## 1. Clone o repositório

```bash
git clone https://github.com/Leonard0-Pontes/Gestao-de-laboratorios-e-emprestimo-de-equipamentos.git
```

Entre na pasta

```bash
cd Gestao-de-laboratorios-e-emprestimo-de-equipamentos
```


---

## 2. Configure as variáveis de ambiente

Crie um arquivo

```
.env
```

Utilizando o modelo abaixo.

---

## 3. Inicie os containers

Execute o comando abaixo para construir as imagens e iniciar os serviços:

```bash
docker compose up --build
```

---
## Acesse a aplicação

Após a inicialização, a API estará disponível em:

```bash
http://localhost:3000
```

---
## 5. Encerrar a aplicação

```bash
docker compose down
```

---

# 🔐 Variáveis de Ambiente

Exemplo de configuração:

```env
PORT=3000
```

> Caso existam outras variáveis no projeto, basta adicioná-las neste arquivo.

---

# Funcionalidades

- Controle de empréstimos
- Consulta de disponibilidade
- Gerenciamento de usuários
- Controle de acesso por papéis
- CRUD de Usuários
- CRUD de Laboratórios
- CRUD de Equipamentos
- Reservas
- Upload de imagens
- Docker
- Deploy


---

# Decisões Técnicas

Durante o desenvolvimento foram adotadas as seguintes decisões:

### NestJS

Foi escolhido por possuir uma arquitetura modular, escalável e baseada em boas práticas de desenvolvimento backend. Essa tambem foi a tecnologia utilizada durante a disciplina

### TypeScript

Utilizado para aumentar a segurança do código através da sua forte tipagem e melhorar a manutenção do projeto.

### Arquitetura Modular

O projeto foi dividido em módulos independentes, permitindo maior organização e facilitando futuras expansões.

### Git Flow

O desenvolvimento foi realizado utilizando branches para separar funcionalidades e facilitar o trabalho colaborativo da equipe.

---

# Licença

Este projeto foi desenvolvido para fins acadêmicos.
