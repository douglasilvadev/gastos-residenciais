# Sistema de Controle de Gastos Residenciais

Aplicação **Full Stack** para gerenciamento de gastos residenciais.  
Permite cadastrar **pessoas**, **categorias**, **transações financeiras** e visualizar **relatórios consolidados**.

O projeto foi desenvolvido utilizando **.NET 8 no backend** e **React + TypeScript no frontend**.

---

# Tecnologias Utilizadas

## Backend
- C#
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

---

# Funcionalidades

## Pessoas
- Criar pessoa
- Listar pessoas
- Buscar pessoa por ID
- Editar pessoa
- Excluir pessoa

### Regras de negócio
- Nome obrigatório
- Nome não pode conter números
- Nome máximo de **200 caracteres**
- Idade deve ser positiva
- Idade máxima permitida: **110 anos**

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
- Finalidade é obrigatória
- Não é permitido excluir categorias que possuem transações vinculadas

---

## Transações
- Criar transação
- Listar transações
- Excluir transação

### Regras
- Valor deve ser positivo
- Menores de idade **não podem registrar receitas**
- Categoria deve ser compatível com o tipo da transação

---

## Relatórios

### Totais por pessoa
Exibe:
- total de receitas
- total de despesas
- saldo

### Totais por categoria
Exibe:
- total de receitas
- total de despesas
- saldo

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
└── README.md
```

---

# Arquitetura do Backend

O backend segue uma estrutura inspirada em **Clean Architecture / Modular Architecture**.

```
src
│
├── modules
│   ├── pessoas
│   ├── categorias
│   └── transacoes
│
├── shared
│   ├── infra
│   │   ├── persistence
│   │   └── server
│
└── Program.cs
```

Cada módulo contém:

```
application
domain
infra
```

---

# Como Executar o Projeto

## 1. Backend

Entre na pasta da API:

```bash
cd backend/GastosResidenciais.Api
```

Execute:

```bash
dotnet run
```

A API será iniciada.

### Swagger

```
http://localhost:5158/swagger
```

---

## 2. Frontend

Entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:5173
```

---

# Endpoints da API

## Pessoas

```
POST /api/pessoas
GET /api/pessoas
GET /api/pessoas/{id}
PUT /api/pessoas/{id}
DELETE /api/pessoas/{id}
```

---

## Categorias

```
POST /api/categorias
GET /api/categorias
DELETE /api/categorias/{id}
```

---

## Transações

```
POST /api/transacoes
GET /api/transacoes
DELETE /api/transacoes/{id}
```

---

## Relatórios

```
GET /api/relatorios/totais-por-pessoa
GET /api/relatorios/totais-por-categoria
```

---

# Validações Implementadas

- Nome da pessoa obrigatório
- Nome não pode conter números
- Idade máxima de **110 anos**
- Valor da transação positivo
- Menor de idade não pode registrar **receita**
- Categoria deve ser compatível com o tipo da transação
- Categoria não pode ser excluída se possuir transações vinculadas

---

## Configuração local

### Backend
Utilize User Secrets para armazenar a string de conexão local:

```bash
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=gastos_residenciais;Username=postgres;Password=123456"