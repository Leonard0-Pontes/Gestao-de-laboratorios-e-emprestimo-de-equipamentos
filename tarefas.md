###PLANEJAMENTO INICIAL E ORGANIZAÇÃO

## Definição do Problema e Escopo

- [] Documentar o problema que o LabReserve 

- [] Definir as regras de negócio detalhadas

- [] Mapear fluxos de estado (reserva, empréstimo, devolução)

- [] Identificar operações inválidas e tratamentos necessários

# 1.2 Estrutura do Projeto

- [] Criar estrutura de diretórios do projeto NestJS

- [] Configurar ambiente de desenvolvimento

- [] Definir padrões de código 

## 2.  MODELAGEM DE DADOS E BANCO

# 2.1 Modelagem de Entidades

- [] Definir entidade Usuário 

- [] Definir entidade Laboratório

- [] Definir entidade Equipamento 

- [] Definir entidade Reserva 

- [] Definir entidade Empréstimo 

- [] Definir relacionamentos entre entidades

## 3. DESENVOLVIMENTO BACKEND

# 3.1 Configuração Base

 - [] Inicializar projeto NestJS

 - [] Instalar dependências necessárias

 - [] Configurar ValidationPipe global

 - [] Configurar class-validator e class-transformer

# 3.2 Módulo de Autenticação e Autorização (não sabemos se precisa)

- [] Criar módulo de autenticação

- [] Implementar cadastro de usuários

- [] Implementar login (JWT)

- [] Criar guard de autenticação

- [] Criar decorator de roles (Admin/Aluno)

- [] Proteger rotas com autorização

# 3.3 Módulo de Usuários

- [] Criar controller de usuários

- [] Implementar CRUD de usuários

- [] Criar DTOs para entrada e saída

- [] Implementar validações de dados

- [] Restringir operações por perfil

# 3.4 Módulo de Laboratórios

- [] Criar controller de laboratórios

- [] Implementar CRUD de laboratórios

- [] Criar DTOs de validação

- [] Implementar busca com filtros e paginação

# 3.5 Módulo de Equipamentos

- [] Criar controller de equipamentos

- [] Implementar CRUD de equipamentos

- [] Implementar upload de imagem (multipart/form-data)

- [] Validar tipo, tamanho e formato do arquivo

- [] Criar DTOs de validação

- [] Implementar busca com filtros e paginação

# 3.6 Módulo de Reservas

- [] Criar controller de reservas

- [] Implementar criação de reserva

- [] Implementar listagem com filtros

- [] Implementar cancelamento de reserva

- [] Implementar aprovação/rejeição (Admin)

- [] Validar disponibilidade de equipamento

- [] Validar conflito de datas

- [] Implementar regra: reservas canceladas não podem ser aprovadas

# 3.7 Módulo de Empréstimos

- [] Criar controller de empréstimos

- [] Implementar solicitação de empréstimo

- [] Implementar listagem com filtros

- [] Implementar aprovação de empréstimo (Admin)

- [] Implementar registro de devolução (Admin)

- [] Validar regras de negócio

- [] Implementar regra: apenas Admin aprova e registra devolução

# 3.8 Tratamento de Exceções

- [] Configurar filtros de exceção global

- [] Implementar tratamento para erros HTTP:

    - [] 400 (Bad Request)

    - [] 401 (Unauthorized)

    - [] 403 (Forbidden)

    - [] 404 (Not Found)

    - [] 409 (Conflict)
 
## 4. API REST E DOCUMENTAÇÃO

# 4.1 Implementação de Endpoints

- [] Implementar endpoints apropriados

- [] Implementar parâmetros de rota

- [] Implementar query strings para filtros

- [] Implementar paginação

- [] Configurar códigos HTTP apropriados

# 4.2 Documentação

- [] Configurar Swagger/OpenAPI

- [] Documentar todos os endpoints

- [] Incluir exemplos de requisição/resposta

- [] Criar coleção de requisições (Postman?)

## 5.  INTERFACE WEB (FRONTEND)

# 5.1 Configuração do Frontend

- [] Escolher tecnologia (HTML/CSS/JS)

- [] Configurar estrutura do projeto

- [] Configurar comunicação com API

# 5.2 Páginas e Funcionalidades

- [] Página de login

- [] Página de cadastro

- [] Listagem de equipamentos com filtros

- [] Formulário de criação de reserva

- [] Formulário de criação de empréstimo

- [] Área administrativa

# 5.3 Consumo da API

- [] Implementar autenticação com JWT?

- [] Consumir endpoints de listagem

- [] Consumir endpoints de criação/atualização

## 6. DOCKER E DEPLOY

# 6. 1 Configuração Docker

- [] Criar Dockerfile para backend

- [] Criar Dockerfile para frontend

- [] Criar .dockerignore

- [] Criar docker-compose.yml

# 6.2 Deploy

- [] Escolher plataforma de nuvem (Render)?

- [] Publicar aplicação?

- [] Configurar variáveis de ambiente?

- [] Verificar funcionamento da API publicada?

# 6.3 Observabilidade

- [] Implementar health check

## 7.  DOCUMENTAÇÃO E ENTREGA

# 7.1 Documentação do Projeto

- [] Escrever README.md contendo:

  - [] Problema solucionado

  - [] Integrantes e responsabilidades

  - [] Arquitetura e tecnologias

  - [] Instruções de execução

  - [] Variáveis de ambiente

  - [] Decisões técnicas

  - [] Criar diagrama de arquitetura

  - [] Criar diagrama de entidades

  - [] Incluir documentação Swagger

# 7.2 Controle de Versão

- [] Manter histórico de commits distribuído

- [] Todos os integrantes devem contribuir com código

- [] Manter branch principal estável

# 7.3 Apresentação

- [] Preparar slides (se necessário)

- [] Demonstrar funcionamento ao vivo

- [] Cada integrante explicar sua contribuição

- [] Justificar decisões técnicas

## 8.  TESTES E VALIDAÇÃO

# 8.1 Testes da API

- [] Testar endpoints com Postman

- [] Validar códigos HTTP

- [] Validar validações de dados

- [] Validar regras de negócio

# 8.2 Validação de Requisitos

- [] Verificar arquivos não versionados (node_modules, .env)

## 9.  ENTREGÁVEIS FINAIS

# 9.1 Links

- [] Link do repositório Git

- [] Link da API publicada?

- [] Link da interface web?

# 9.2 Arquivos

- [] README.md completo

- [] Diagrama de entidades

- [] .env.example?

- [] Scripts de migração e seed

- [] Dockerfile e docker-compose.yml

- [] Quadro de tarefas

# 9.3 Apresentação
