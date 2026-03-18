# 💰 Sistema de Gastos Residenciais

Aplicação fullstack para gerenciamento de gastos residenciais, permitindo o controle de pessoas, categorias e transações financeiras, além de relatórios consolidados.

---

# 🚀 Tecnologias Utilizadas

## Backend

* .NET 8 (ASP.NET Core)
* Entity Framework Core
* PostgreSQL
* Clean Architecture
* Docker

## Frontend

* React + Vite
* TypeScript
* Axios
* React Hook Form
* Zod (validação)
* Componentização (UI reutilizável)

---

# 📦 Funcionalidades

* Cadastro de pessoas
* Cadastro de categorias (Despesa / Receita / Ambas)
* Cadastro de transações
* Relatórios:

  * Total por pessoa
  * Total por categoria
* Validações completas no frontend
* Integração com API REST
* Banco de dados com migrations automáticas

---

# 🧠 Arquitetura

## Backend (Clean Architecture)

```
src/
  modules/
    categorias/
    pessoas/
    transacoes/
  shared/
    infra/
    domain/
```

Camadas:

* Domain → regras de negócio
* Application → use cases
* Infra → banco de dados
* API → controllers

---

## Frontend (Organização)

```
src/
  components/
  pages/
  schemas/
  utils/
```

* Forms separados por página
* Componentes reutilizáveis
* Validação centralizada com Zod

---

# ⚙️ Como Rodar o Projeto

## 🔹 1. Rodar com Docker (RECOMENDADO)

### Pré-requisitos:

* Docker instalado

### Rodar tudo:

```bash
docker compose up --build
```

### Serviços:

| Serviço  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:3000 |
| API      | http://localhost:5158 |
| Postgres | localhost:5432        |

---

## 🔹 2. Rodar Manualmente

### 📌 Backend

```bash
cd backend/GastosResidenciais.Api
dotnet restore
dotnet build
dotnet run
```

📌 A API roda em:

```
http://localhost:5158
```

✔ As tabelas são criadas automaticamente com:

```csharp
db.Database.Migrate();
```

---

### 📌 Frontend

```bash
cd frontend
npm install
npm run dev
```

📌 Frontend:

```
http://localhost:5173
```

---

# 🔐 Configuração de Ambiente

## Frontend (.env)

Crie um arquivo:

```
frontend/.env
```

```env
VITE_API_BASE_URL=http://localhost:5158/api
```

Uso no código:

```ts
import.meta.env.VITE_API_BASE_URL
```

---

# 🐘 Banco de Dados

* PostgreSQL
* Criado automaticamente via Docker
* Persistência via volume

### String de conexão (local):

```
Host=localhost;Port=5432;Database=gastos_residenciais;Username=postgres;Password=postgres
```

---

# 🐳 Docker

O projeto utiliza:

* API (.NET)
* Frontend (Nginx)
* PostgreSQL
* Network interna
* Volume persistente

### Principais recursos:

* Build automático
* Banco persistente
* Containers isolados
* Setup completo com 1 comando

---

# 🧪 Validação de Dados (Frontend)

Implementado com:

* Zod
* React Hook Form

### Exemplo (Pessoa):

* Nome:

  * obrigatório
  * apenas letras
* Idade:

  * número inteiro
  * entre 1 e 110

### Benefícios:

* Validação centralizada
* Erros por campo
* Menos código manual
* Melhor UX

---

# 🎨 Componentização

Criados componentes reutilizáveis:

* Button
* Input
* Select
* FormField
* Card
* Alert

### Benefícios:

* Evita duplicação
* Padroniza UI
* Facilita manutenção

---

# 💡 Melhorias Implementadas

* ✔ Docker completo (API + Front + DB)
* ✔ Migrations automáticas
* ✔ Tratamento de erros na API
* ✔ Integração frontend/backend
* ✔ Validação com Zod
* ✔ Forms com React Hook Form
* ✔ Componentização de UI
* ✔ Filtro de categorias por tipo de transação
* ✔ Formatação de moeda centralizada

---

# 📊 Próximas Melhorias

* DataTable reutilizável
* Paginação
* Melhor tratamento de erros de rede
* Toast notifications
* Testes automatizados
