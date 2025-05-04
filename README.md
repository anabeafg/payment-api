# 💳 Payment-API

API RESTful para gerenciamento de pagamentos. Permite criar, listar, buscar, atualizar dados e status de pagamentos, além de simular notificações de eventos. Projetada com foco em simplicidade, rastreabilidade e controle de status de cobranças.

---

## 📦 Tecnologias Utilizadas

- Node.js (v18+)
- TypeScript
- Express
- Zod (validações)
- Jest (testes unitários e de integração)
- File System (`fs`) para persistência local
- Swagger (documentação dos endpoints)

---

## 🚀 Como Rodar o Projeto

### 1. Instale o Yarn (caso não tenha)

Yarn é o gerenciador de pacotes utilizado neste projeto. Para instalar, siga os passos abaixo:

```bash
npm install -g yarn
```

> Verifique se a instalação foi bem-sucedida com:
>
> ```bash
> yarn --version
> ```

### 2. Clone o repositório

```bash
git clone https://github.com/anabeafg/payment-api.git
cd Payment-API
```

### 3. Instale as dependências

```bash
yarn install
```

### 4. Inicie o servidor

```bash
yarn dev
```

A aplicação estará disponível em: [http://localhost:3000](http://localhost:3000)

### 5. Acesse a documentação Swagger

A URL será exibida no terminal ao rodar o servidor. Acesse para explorar os endpoints da API diretamente no navegador. Tambem pode ser acessada via url abaixo após rodar a aplicação:
[http://localhost:3000/swagger](http://localhost:3000/swagger)

---

## 🧪 Testando os Endpoints

Você pode testar os endpoints de três formas:

### ✅ 1. Via Swagger

URL gerada automaticamente no terminal.

### ✅ 2. Via Postman

Importe a collection:

> [Download da Collection Postman](#https://.postman.co/workspace/My-Workspace~4f5376e0-753c-4a86-8d18-fa9d17c026ce/collection/32886418-66e451b4-c7a6-470b-9fee-d9d7c9fc93a1?action=share&creator=32886418)

---

## 📂 Estrutura da API

### Interface `Payment`

| Campo         | Tipo      | Descrição                                                                 |
|---------------|-----------|---------------------------------------------------------------------------|
| id            | string    | Identificador único gerado automaticamente                                |
| amount        | number    | Valor do pagamento                                                        |
| status        | string    | `"pending"`, `"paid"`, `"cancelled"`, `"overdue"`                         |
| createdDate   | string    | Data de criação (gerada automaticamente em UTC-3)                         |
| updatedDate   | string    | Data da última atualização (UTC-3)                                        |
| dueDate       | string    | Data de vencimento                                                        |
| paymentDate   | string    | Data de pagamento (preenchida automaticamente ao definir status como paid)|

---

## 📌 Rotas Disponíveis

| Método  | Rota                            | Descrição                                                       |
|---------|----------------------------------|-----------------------------------------------------------------|
| `POST`  | `/payments/create`              | Cria um novo pagamento                                          |
| `GET`   | `/payments/list`                | Lista todos os pagamentos criados                              |
| `GET`   | `/payments/list/:id`            | Busca um pagamento por ID                                       |
| `PUT`   | `/payments/update/:id`          | Atualiza `amount` e/ou `dueDate` com base no ID                 |
| `PATCH` | `/payments/updateStatus/:id`    | Atualiza o `status` de um pagamento com base no ID             |

---

## 🛠️ Decisões Técnicas

### ✅ Armazenamento Local com File System

- Os dados são salvos em `payments.json`, criado automaticamente na raiz do projeto.

### ✅ Validações com Zod

- Usado para garantir validação de dados recebidos nos endpoints.

### ✅ Middleware de Validação de JSON

- Garante que apenas requisições com JSON válido sejam aceitas.

### ✅ Fuso Horário UTC-3

- Toda gravação de data utiliza UTC -3 (horário de Brasília), por meio de uma função auxiliar, garantindo consistência para pagamentos nacionais.

### ✅ Simulação de Eventos

- Simula eventos de notificação na criação e atualização de pagamentos, similar ao funcionamento de sistemas como SNS.

---

## 🧪 Testes

### ▶️ Testes Unitários

```bash
yarn test:unit
```

### 🔁 Testes de Integração

```bash
yarn test:integration
```

---

## ❗ Observações

- A aplicação **sempre será executada na porta 3000**, mesmo se você definir outra no `.env`.
- O arquivo `payments.json` será gerado automaticamente ao rodar a aplicação.
- Datas e horários seguem o padrão UTC-3.