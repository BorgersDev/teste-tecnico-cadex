# 📡 Cadex Asset Manager

Sistema para gerenciamento de Assets (Poles, CTOs & Equipments), desenvolvido como teste técnico para processo seletivo da Cadex.

## 🛠 Tecnologias Utilizadas

- **Frontend:** React, Vite, TypeScript, Tailwind CSS.
- **Backend:** Node.js, Express, TypeScript.
- **Arquitetura:** Monorepo (npm workspaces).

---

## 🚀 Como rodar o projeto

Siga os passos abaixo para executar a aplicação localmente.

### 1. Pré-requisitos

Certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (Versão 18 ou superior recomendada)
- Git

### 2. Instalação

1. Clone o repositório:
```bash
git clone https://github.com/BorgersDev/teste-tecnico-cadex.git
```

2. Entre na pasta do projeto:
```bash
cd teste-tecnico-cadex
```

3. Instale todas as dependências (Backend e Frontend) de uma vez:
```bash
npm install
```

---

### 3. Executando a Aplicação

Para rodar o projeto (Backend e Frontend simultaneamente), basta executar o comando abaixo na raiz:

```bash
npm run dev
```

> - **Backend:** [http://localhost:3001](http://localhost:3001)
> - **Frontend:** [http://localhost:3000](http://localhost:3000)

---

## Funcionalidades

- **Listagem de Assets:** Visualização em cards.
- **Filtros:** Busca por nome e filtro por tipo de equipamento (POLE, CTO, EQUIPMENT).

- **CRUD Completo:** Criação, Edição e Exclusão de Assets.
- **Feedback Visual:** Sistema de Toasts para sucesso/erro e Modais para formulários de criação e edição.
- **Persistência:** Dados armazenados em memória (Array).

## Padrão de Cores (Cadex Theme)

O projeto segue uma identidade visual personalizada configurada via Tailwind CSS:
- **Primary:** Verde Água
- **Secondary:** Azul Escuro
- **Background:** Cinza Claro 

> 💡 O visual foi inspirado no site oficial da [Cadex](https://www.cadex.com.br/).

---

## Considerações

### Facilidades
O desenvolvimento do **Backend** foi a parte mais fluida do processo. A manipulação dos dados em memória facilita bastante e a organização das rotas e métodos da API foram implementadas de forma rápida, permitindo focar nas regras de negócios sem grandes problemas.

### Desafios
A maior dificuldade inicial foi definir a **arquitetura do projeto**. Pra escolha de um Monorepo dei uma pesquisada melhor sobre como faria a estrutura de pastas, fiz de forma organizada e separei em backend e frontend usando **npm workspaces**.
No Frontend, embora o **Tailwind CSS** tenha facilitado a estilização, a integração da lógica de estado com a interface (React) exigiu atenção extra para manter o código organizado, já que havia um pequeno tempo que não fazia telas assim. O foco foi utilizar componentização dos componentes para manter a organização do projeto.

###  Melhorias Futuras
Com mais tempo, a prioridade seria a implementação de um **Banco de Dados** real (como PostgreSQL ou MongoDB). Isso traria persistência verdadeira aos dados, permitiria consultas mais complexas e garantiria a escalabilidade, pensando principalmente numa quantidade grande de Assets cadastrados.

---

## Visualização Frontend

https://github.com/user-attachments/assets/05d29278-142f-4f19-b82d-0abd28cb167e

---

Desenvolvido por Arthur Borges
