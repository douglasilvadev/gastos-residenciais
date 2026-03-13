# Gastos Residenciais

Sistema para controle de **gastos residenciais** desenvolvido com **.NET 8 (ASP.NET Core Web API)** no backend e **React + TypeScript** no frontend, utilizando **PostgreSQL** como banco de dados.

O projeto permite gerenciar:

- Pessoas
- Categorias
- Transações
- Relatórios financeiros por pessoa e por categoria

---

# O que foi feito no projeto

## Backend
Foi desenvolvida uma API REST em **.NET 8** com organização modular, separando responsabilidades em camadas inspiradas em **Clean Architecture**.

### Implementado no backend:
- CRUD de **Pessoas**
  - criar
  - listar
  - buscar por id
  - editar
  - excluir

- CRUD parcial de **Categorias**
  - criar
  - listar
  - excluir

- CRUD parcial de **Transações**
  - criar
  - listar
  - excluir

- Relatórios:
  - totais por pessoa
  - totais por categoria

- Validações de negócio:
  - nome da pessoa não pode conter números
  - idade máxima de 110 anos
  - valor da transação deve ser positivo
  - categoria deve ser compatível com o tipo da transação
  - categoria com transações vinculadas não pode ser excluída

- Persistência com **Entity Framework Core**
- Banco **PostgreSQL**
- **Migrations automáticas** na inicialização com `Database.Migrate()`
- Middleware global de tratamento de erros
- Swagger para documentação e testes da API

---

## Frontend
Foi desenvolvida uma interface em **React + TypeScript** para consumir a API e permitir o uso completo das principais funcionalidades.

### Implementado no frontend:
- Tela de **Pessoas**
  - cadastrar
  - editar
  - excluir
  - listar

- Tela de **Categorias**
  - cadastrar
  - excluir
  - listar
  - finalidade obrigatória

- Tela de **Transações**
  - cadastrar
  - excluir
  - listar

- Telas de **Relatórios**
  - totais por pessoa
  - totais por categoria

- Validações de formulário:
  - nome sem números
  - idade limitada
  - finalidade obrigatória em categoria
  - feedback de erro e sucesso

- Integração com backend usando **Axios**
- Rotas com **React Router**
- Configuração por variável de ambiente com `VITE_API_BASE_URL`

---

## Docker
O projeto também foi preparado para rodar de forma containerizada.

### Implementado com Docker:
- Container do **PostgreSQL**
- Container da **API .NET**
- Container do **Frontend React**
- Frontend servido com **Nginx**
- `docker-compose.yml` para subir tudo junto
- Volume persistente para o banco
- Migrations aplicadas automaticamente ao subir a API

---

# Tecnologias Utilizadas

## Backend
- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL
- Swagger

## Frontend
- React
- TypeScript
- Vite
- Axios
- React Router

## Infraestrutura
- Docker
- Docker Compose
- Nginx

---

# Estrutura do Projeto

```text
teste-tecnico-maxprodi
│
├── backend
│   └── GastosResidenciais.Api
│
├── frontend
│
└── docker-compose.yml
```

---

# Arquitetura do Backend

O backend foi organizado por módulos:

```text
src/modules
   ├── pessoas
   ├── categorias
   └── transacoes
```

Cada módulo possui:

```text
application
domain
infra
```

## application
Contém os casos de uso e DTOs.

Exemplos:
- `CriarPessoaUseCase`
- `EditarPessoaUseCase`
- `CriarCategoriaUseCase`
- `CriarTransacaoUseCase`

## domain
Contém entidades, enums e regras de negócio.

Exemplos:
- `Pessoa`
- `Categoria`
- `Transacao`

## infra
Contém infraestrutura, persistência e controllers.

Exemplos:
- Controllers
- Repositories
- DbContext

---

# Decisões Técnicas

## Arquitetura modular
O backend foi separado em módulos para organizar melhor o domínio e facilitar manutenção e evolução.

## Use Cases
A lógica da aplicação foi concentrada em casos de uso, evitando colocar regra de negócio dentro dos controllers.

## Repository Pattern
Foi utilizado para desacoplar a lógica de domínio da camada de persistência.

## Entity Framework Core
Utilizado para mapear entidades e manipular o banco PostgreSQL de forma produtiva e segura.

## Migrations automáticas
Foi adicionado `db.Database.Migrate()` na inicialização da API para garantir que o banco de dados seja criado/atualizado automaticamente, inclusive no Docker.

## Configuração segura
A string de conexão foi externalizada com **User Secrets** no desenvolvimento local e preparada para uso com variáveis de ambiente.

## Frontend com Vite
Foi utilizado Vite para ter um ambiente mais rápido e simples durante o desenvolvimento com React.

## Dockerização completa
O projeto foi preparado para subir banco, API e frontend em containers separados, facilitando execução e padronização de ambiente.

---

# Funcionalidades

## Pessoas
- Criar pessoa
- Listar pessoas
- Buscar por id
- Editar pessoa
- Excluir pessoa

### Regras
- Nome é obrigatório
- Nome não pode conter números
- Idade deve ser válida
- Idade máxima: **110 anos**

---

## Categorias
- Criar categoria
- Listar categorias
- Excluir categoria

### Finalidades
- Receita
- Despesa
- Ambas

### Regras
- Finalidade obrigatória
- Categoria com transações vinculadas não pode ser excluída

---

## Transações
- Criar transação
- Listar transações
- Excluir transação

### Regras
- Valor deve ser positivo
- Categoria deve ser compatível com o tipo
- Menores de idade não podem registrar receita

---

## Relatórios

### Totais por pessoa
```text
GET /api/Relatorios/totais-por-pessoa
```

### Totais por categoria
```text
GET /api/Relatorios/totais-por-categoria
```

---

# Como rodar o projeto

## Opção 1 — Rodar localmente sem Docker

---

## Pré-requisitos
Você precisa ter instalado:

- .NET 8 SDK
- Node.js
- npm
- PostgreSQL
- Git

---

## 1. Clonar o projeto

```bash
git clone <URL_DO_REPOSITORIO>
cd teste-tecnico-maxprodi
```

---

## 2. Configurar o banco PostgreSQL

Crie um banco chamado:

```text
gastos_residenciais
```

Exemplo usando `psql`:

```bash
psql -U postgres
```

Depois no console do PostgreSQL:

```sql
CREATE DATABASE gastos_residenciais;
```

---

## 3. Configurar a string de conexão com User Secrets

Entre na pasta da API:

```bash
cd backend/GastosResidenciais.Api
```

Inicialize os User Secrets:

```bash
dotnet user-secrets init
```

Configure a connection string:

```bash
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=gastos_residenciais;Username=postgres;Password=123456"
```

Confira:

```bash
dotnet user-secrets list
```

---

## 4. Rodar o backend

Ainda em `backend/GastosResidenciais.Api`:

```bash
dotnet build
dotnet run
```

A API ficará disponível em:

```text
http://localhost:5158
```

Swagger:

```text
http://localhost:5158/swagger
```

> As migrations são aplicadas automaticamente ao iniciar a API.

---

## 5. Configurar o frontend

Abra outro terminal e entre na pasta do frontend:

```bash
cd frontend
```

Crie o arquivo `.env.development` com o conteúdo:

```env
VITE_API_BASE_URL=http://localhost:5158/api
```

Instale as dependências:

```bash
npm install
```

---

## 6. Rodar o frontend

```bash
npm run dev
```

O frontend ficará disponível em:

```text
http://localhost:5173
```

---

## 7. Fluxo esperado
Com backend e frontend rodando:

- abra `http://localhost:5173`
- cadastre pessoas
- cadastre categorias
- cadastre transações
- teste os relatórios

---

# Opção 2 — Rodar com Docker

## Pré-requisitos
Você precisa ter:

- Docker
- Docker Compose

---

## 1. Ir para a raiz do projeto

```bash
cd teste-tecnico-maxprodi
```

---

## 2. Subir os containers

```bash
docker compose up --build
```

Ou em background:

```bash
docker compose up -d --build
```

---

## 3. O que será criado
O compose sobe:

- `gastos_postgres`
- `gastos_api`
- `gastos_frontend`

---

## 4. URLs com Docker

### Frontend
```text
http://localhost:3000
```

### API
```text
http://localhost:5158
```

### Swagger
```text
http://localhost:5158/swagger
```

---

## 5. Banco com Docker
O PostgreSQL sobe automaticamente com o banco configurado.

As tabelas são criadas automaticamente porque a API executa:

```csharp
db.Database.Migrate();
```

Ou seja, **não é necessário rodar `dotnet ef database update` manualmente**.

---

## 6. Ver logs

```bash
docker compose logs -f
```

---

## 7. Parar containers

```bash
docker compose down
```

---

## 8. Reset completo do ambiente Docker

```bash
docker compose down -v
docker compose up --build
```

Isso remove volumes e recria tudo do zero.

---

# Endpoints da API

## Pessoas

```text
POST /api/Pessoas
GET /api/Pessoas
GET /api/Pessoas/{id}
PUT /api/Pessoas/{id}
DELETE /api/Pessoas/{id}
```

## Categorias

```text
POST /api/Categorias
GET /api/Categorias
DELETE /api/Categorias/{id}
```

## Transações

```text
POST /api/Transacoes
GET /api/Transacoes
DELETE /api/Transacoes/{id}
```

## Relatórios

```text
GET /api/Relatorios/totais-por-pessoa
GET /api/Relatorios/totais-por-categoria
```

---

# Variáveis e Configuração

## Backend
A string de conexão é lida por:

```text
ConnectionStrings:DefaultConnection
```

No desenvolvimento local foi usado:

- User Secrets

No Docker foi usado:

- variável de ambiente no `docker-compose.yml`

---

## Frontend
A URL da API é lida por:

```text
VITE_API_BASE_URL
```

Exemplo:

```env
VITE_API_BASE_URL=http://localhost:5158/api
```

---

# Validações implementadas

- Nome da pessoa obrigatório
- Nome sem números
- Idade máxima de 110 anos
- Valor da transação positivo
- Finalidade obrigatória em categoria
- Categoria incompatível com tipo de transação não é permitida
- Categoria com transações vinculadas não pode ser excluída
