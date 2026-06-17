#  PetCare - Sistema de Agendamento de Serviços

<div align="center">

#  PetCare

### Sistema de Agendamento de Serviços para Pets

![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react)
![Node](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/API-Express-000000?style=for-the-badge&logo=express)
![MySQL](https://img.shields.io/badge/Banco-MySQL-4479A1?style=for-the-badge&logo=mysql)
![MVC](https://img.shields.io/badge/Arquitetura-MVC-orange?style=for-the-badge)

</div>

---

#  Sobre o Projeto

O **PetCare** é uma aplicação web desenvolvida para gerenciamento e agendamento de serviços para pets.

O sistema permite que usuários visualizem serviços disponíveis, escolham opções desejadas e realizem solicitações através de uma interface moderna desenvolvida com React.

---

#  Objetivos

- Cadastro de usuários
- Listagem de serviços
- Agendamento de serviços
- Controle de pagamentos
- Integração com banco de dados MySQL
- Organização utilizando padrão MVC

---

# 🛠 Tecnologias Utilizadas

## Frontend

- React
- Vite
- JavaScript
- CSS3
- HTML5

## Backend

- Node.js
- Express.js

## Banco de Dados

- MySQL
- XAMPP

---

#  Estrutura do Projeto

```bash
site/
│
├── petcare-frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── public/
│   └── package.json
│
├── petcare-backend/
│   ├── model/
│   │   └── db.js
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

#  Arquitetura MVC

##  Model

Responsável pela comunicação com o banco de dados.

Arquivo:

```js
model/db.js
```

Funções:

- Conexão MySQL
- Consultas SQL
- Inserções
- Atualizações
- Exclusões

---

##  Controller

Responsável pela lógica de negócio.

Exemplos:

```js
controllers/usuarioController.js
controllers/servicoController.js
controllers/agendamentoController.js
controllers/pagamentoController.js
```

Funções:

- Receber requisições
- Validar dados
- Chamar Models
- Retornar respostas

---

##  View

Responsável pela interface do usuário.

Local:

```bash
petcare-frontend/src/
```

Arquivos:

```bash
App.jsx
App.css
index.css
```

Funções:

- Exibir serviços
- Receber dados do usuário
- Mostrar resultados da API

---

# 🗄 Banco de Dados

Nome do banco:

```sql
petcare
```

## Tabela usuários

```sql
CREATE TABLE usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(255)
);
```

---

## Tabela serviços

```sql
CREATE TABLE servicos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    descricao TEXT,
    preco DECIMAL(10,2)
);
```

---

## Tabela agendamentos

```sql
CREATE TABLE agendamentos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    servico_id INT,
    data_agendamento DATETIME,
    FOREIGN KEY(usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY(servico_id) REFERENCES servicos(id)
);
```

---

## Tabela pagamentos

```sql
CREATE TABLE pagamentos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    agendamento_id INT,
    valor DECIMAL(10,2),
    status VARCHAR(30),
    FOREIGN KEY(agendamento_id) REFERENCES agendamentos(id)
);
```

---

#  Conexão com MySQL

Arquivo:

```js
db.js
```

Exemplo:

```js
const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'petcare'
});

module.exports = conexao;
```

---

#  Como Executar

## 1 Instalar Dependências Frontend

```bash
cd petcare-frontend

npm install
```

---

## 2 Executar Frontend

```bash
npm run dev
```

---

## 3 Instalar Dependências Backend

```bash
cd petcare-backend

npm install
```

---

## 4 Executar Backend

```bash
node server.js
```

ou

```bash
npm start
```

---

## 5 Iniciar MySQL no XAMPP

Abra o XAMPP e inicie:

 Apache

 MySQL

---

#  API

## Usuários

### Listar usuários

```http
GET /usuarios
```

### Criar usuário

```http
POST /usuarios
```

---

## Serviços

### Listar serviços

```http
GET /servicos
```

### Criar serviço

```http
POST /servicos
```

---

## Agendamentos

### Criar agendamento

```http
POST /agendamentos
```

---

## Pagamentos

### Registrar pagamento

```http
POST /pagamentos
```

---

#  Fluxo do Sistema

```text
Usuário
   ↓
Frontend React
   ↓
API Express
   ↓
Controller
   ↓
Model
   ↓
MySQL
```

---

#  Desenvolvedor

Projeto desenvolvido por:

**Bruno**

Curso de Desenvolvimento de Sistemas

2026 © Todos os direitos reservados.

---

