# Gastos Residenciais

Sistema para controle de **gastos residenciais** desenvolvido com **.NET 8 (ASP.NET Core)** no backend e **React + TypeScript** no frontend, utilizando **PostgreSQL** como banco de dados.

O sistema permite gerenciar:

- Pessoas
- Categorias
- Transações
- Relatórios financeiros

---

# Tecnologias Utilizadas

## Backend
- .NET 8
- ASP.NET Core Web API
- Entity Framework Core
- PostgreSQL
- Clean Architecture
- Domain Driven Design (DDD)

## Frontend
- React
- TypeScript
- Vite
- Axios

## Infraestrutura
- Docker
- Docker Compose
- Nginx

---

# Estrutura do Projeto

```
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

# Arquitetura Backend

O backend segue princípios inspirados em **Clean Architecture**.

Cada módulo é separado em camadas:

```
src/modules
   ├── pessoas
   ├── categorias
   └── transacoes
```

Cada módulo possui:

```
application
domain
infra
```

---

## Application

Contém os **casos de uso da aplicação**.

Exemplos:

- CriarPessoaUseCase
- ListarPessoasUseCase
- EditarPessoaUseCase
- DeletarPessoaUseCase

---

## Domain

Contém as **regras de negócio e entidades**.

Exemplos:

- Pessoa
- Categoria
- Transacao

---

## Infra

Contém a implementação de infraestrutura:

- Controllers
- Repositories
- Configuração do banco
- Entity Framework Core

---

# Funcionalidades

## Pessoas

Permite gerenciar pessoas cadastradas no sistema.

Operações disponíveis:

- Criar pessoa
- Listar pessoas
- Editar pessoa
- Deletar pessoa

### Regras de validação

- Nome não pode conter números
- Idade máxima permitida: **110 anos**
- Campo idade limitado a **3 dígitos**

---

## Categorias

Categorias utilizadas para classificar as transações.

Operações disponíveis:

- Criar categoria
- Listar categorias
- Deletar categoria

### Finalidades possíveis

- Receita
- Despesa
- Ambas

A finalidade deve ser selecionada obrigatoriamente antes de consultar.

---

## Transações

Registro de movimentações financeiras.

Operações disponíveis:

- Criar transação
- Listar transações
- Deletar transação

Tipos de transação:

- Receita
- Despesa

---

## Relatórios

O sistema possui endpoints para geração de relatórios.

### Totais por Pessoa

```
GET /api/Relatorios/totais-por-pessoa
```

Retorna o total de receitas e despesas agrupadas por pessoa.

---

### Totais por Categoria

```
GET /api/Relatorios/totais-por-categoria
```

Retorna o total de receitas e despesas agrupadas por categoria.

---

# Segurança de Configuração

Credenciais sensíveis **não ficam no repositório**.

O projeto utiliza **User Secrets** no backend.

### Inicializar

```
dotnet user-secrets init
```

### Definir conexão com banco

```
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=gastos_residenciais;Username=postgres;Password=123456"
```

---

# Variáveis de Ambiente (Frontend)

Arquivo:

```
.env.development
```

Conteúdo:

```
VITE_API_BASE_URL=http://localhost:5158/api
```

Uso no código:

```ts
baseURL: import.meta.env.VITE_API_BASE_URL
```

---

# Executando o Projeto Sem Docker

## Backend

```
cd backend/GastosResidenciais.Api
dotnet run
```

API disponível em:

```
http://localhost:5158
```

Swagger:

```
http://localhost:5158/swagger
```

---

## Frontend

```
cd frontend
npm install
npm run dev
```

Aplicação:

```
http://localhost:5173
```

---

# Executando com Docker

Na raiz do projeto execute:

```
docker compose up --build
```

Containers criados:

- postgres
- gastos_api
- gastos_frontend

---

## URLs

Frontend

```
http://localhost:3000
```

API

```
http://localhost:5158
```

Swagger

```
http://localhost:5158/swagger
```

---

# Comandos Docker Úteis

Subir containers:

```
docker compose up --build
```

Rodar em background:

```
docker compose up -d
```

Parar containers:

```
docker compose down
```

Rebuild completo:

```
docker compose down -v
docker compose up --build
```

---

# Decisões Técnicas

### Clean Architecture

Separação clara entre:

- regras de negócio
- aplicação
- infraestrutura

Isso melhora a **manutenção e testabilidade do sistema**.

---

### Domain Driven Design

As regras de negócio são encapsuladas dentro das entidades.

Exemplo:

```
Pessoa.Criar()
Categoria.Criar()
```

---

### Use Cases

Toda lógica de aplicação fica em **casos de uso**, evitando lógica dentro dos controllers.

Exemplos:

```
CriarPessoaUseCase
CriarCategoriaUseCase
CriarTransacaoUseCase
```

---

### Repository Pattern

Abstração da camada de dados.

Interfaces:

```
IPessoaRepository
ICategoriaRepository
ITransacaoRepository
```

Implementações:

```
PessoaRepository
CategoriaRepository
TransacaoRepository
```

---

### Docker

Docker foi utilizado para:

- padronizar o ambiente
- facilitar execução
- isolar o banco de dados

Containers utilizados:

- PostgreSQL
- API .NET
- React + Nginx

