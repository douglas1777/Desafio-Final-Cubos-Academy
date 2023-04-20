# Desafio Módulo Final Módulo 4 - Backend

Construir uma API para um PDV (Frente de Caixa) que permita:

- Cadastrar Usuário
- Fazer Login
- Detalhar Perfil do Usuário Logado
- Editar Perfil do Usuário Logado
- Listar categorias

## **Banco de dados**

Você precisa criar um Banco de Dados PostgreSQL chamado `pdv`.
para persistir e manipular os dados de categorias, clientes, pedidos, produtos e usuários utilizados pela aplicação.

- O campo id das tabelas no banco de dados deve ser auto incremento, chave primária e não deve permitir edição uma vez criado.
- Qualquer valor monetário deverá ser representado em centavos (Ex.: R$ 10,00 reais = 1000)
  Crie as seguintes tabelas e colunas abaixo:

**ATENÇÃO! Os nomes das tabelas e das colunas a serem criados devem seguir exatamente os nomes listados abaixo.**

```javascript
* usuarios
    - id
    - nome
    - email (campo único)
    - senha
* categorias
    - id
    - descricao
```

Cadastrar na tabela Categorias os dados:

- Informática

- Celulares

- Beleza e Perfumaria

- Mercado

- Livros e Papelaria

- Brinquedos

- Moda

- Bebê

-Games

## **Status Codes**

Abaixo, listamos os possíveis **_status codes_** esperados como resposta da API.

```javascript
// 200 (OK) = requisição bem sucedida
// 201 (Created) = requisição bem sucedida e algo foi criado
// 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
// 400 (Bad Request) = o servidor não entendeu a requisição pois está com uma sintaxe/formato inválido
// 401 (Unauthorized) = o usuário não está autenticado (logado)
// 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
// 404 (Not Found) = o servidor não pode encontrar o recurso solicitado
// 500 (Internal Server Error) = erro inesperado do servidor
```

Listar categorias\_

```javascript
GET / categorias;
```

Essa é a rota que será chamada quando o usuario logado quiser listar todas as categorias cadastradas.

**Requisição**

Sem parâmetros de rota ou de query.Não deverá possuir conteúdo no corpo (body) da requisição.

**Exemplo de requisição**

```javascript
// GET /categorias
// Sem conteúdo no corpo (body) da requisição
```

**Exemplos de resposta**

```javascript
// HTTP Status 200
[
  {
    id: 1,
    descricao: "Informática",
  },
  {
    id: 2,
    descricao: "Mercado",
  },
];
```

Se não encontrar nada no banco de dados, retornar um array vazio

```javascript
// HTTP Status 200
[];
```

**Cadastrar Usuário**

```javascript
POST / usuarios;
```

Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.

**Métodos:**

- Pegar e validar os dados q vem do body **(nome, email, senha)**
- Criptografar senha antes de inserir no banco com \***\*bcrypt.hash**
- Verificar se o email existe. Se existir, não será possível cadastrar
- **Resposta:**
  Em caso de sucesso, deveremos enviar no corpo (body) da resposta o conteúdo do usuário cadastrado, incluindo seu respectivo id e excluindo a senha criptografada. Em caso de falha na validação, a resposta deverá possuir status code apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade mensagem que deverá possuir como valor um texto explicando o motivo da falha.

Exemplo de requisição:

```javascript
// POST /usuarios
{
    "nome": "José",
"email": "jose@email.com",
"senha": "123456"
}
```

Exemplos de resposta:

```javascript
// HTTP Status 200 / 201 / 204
{
"id": 1,
"nome": "José",
"email": "jose@email.com"
}
```

```javascript
// HTTP Status 404 (Bad Request)

"Já existe usuário cadastrado com o e-mail informado".
```

<br><br>

**Login do usuário**

```javascript
POST / login;
```

Essa é a rota que permite o usuário cadastrado realizar o login no sistema.

**Métodos**

- Pegar e validar os dados q vem do body **(email,senha)**
- Verificar se o email existe enviando o campo email para fazer a consulta no banco de dados e salvar o resultado em uma variável. Se não existir, não será possível logar
- Validar email e senha usando a variável q verifica se tem email, para verificar se a senha desse email é igual a senha do **bcrypt**
- Criar um token de autenticação com o **id** do usuário \***\*Usando JWT**
- Responder com um objeto contendo as propriedades usuario: id, nome e email e token: **\*\***\*\*\*\***\*\***jwt.sign**\*\***\*\*\*\***\*\***

**Exemplos de requisição**

```javascript
POST / login;
{
"email": "jose@email.com",
"senha": "123456"
}
```

**Exemplos de resposta:**

```javascript
// HTTP Status 200 (OK) = requisição bem sucedida
{
"usuario": {
"id": 1,
"nome": "José",
"email": "jose@email.com"
},
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

```javascript

// HTTP Status 401(Unauthorized)

 "Usuário e/ou senha inválido(s)".

```

<br><br>

> **REQUISITOS OBRIGATÓRIOS !!!**

> ## **Todas as rotas abaixo necessitam de autenticação**

> **Validar se o token foi enviado no header da requisição (Bearer Token) ok**

> **Verificar se o token é válido ok**
>
> <br>

**Detalhar usuário**

```javascript
GET / usuarios;
```

<br>

**Métodos**

- Consultar usuário no banco de dados pelo id presente na propriedade req.user que será salvo no intermediário de autenticação

Exemplo de requisição

```javascript
// GET /usuarios
// Sem conteúdo no corpo (body) da requisição
```

Exemplos de resposta

```javascript
// HTTP Status 200 (OK) = requisição bem sucedida
{
    "nome": "José",
    "email": "jose@email.com"
}

// HTTP Status 500 (INTERNAL_SERVER_ERROR) 
"Erro interno do servidor"

```

<br><br>

**Atualizar usuário**

```javascript
PUT / usuarios;
```

Essa é a rota que será chamada quando o usuário quiser realizar alterações no seu próprio usuário.

**Métodos**

- Consultar usuário no banco de dados pelo id presente na propriedade req.user que será salvo no intermediário de autenticação
- Pegar e validar os dados q vem do body (**nome, email, senha**)
- Verificar se o email existe. Se existir, não será possível atualizar
- Criptografar senha antes de inserir no banco com \***\*bcrypt.hash**
- • Atualizar as informações do usuário no banco de dados

Exemplo de requisição:

```javascript
// PUT /usuarios
{
"nome": "Pedro De Assis",
"email": "pedrode_assis@email.com",
"senha": "b@1234"
}
```

Exemplos de resposta

```javascript
// HTTP Status 204
"Sem conteúdo no corpo (body) da resposta"

// HTTP Status 400 (Bad Request)
"O e-mail informado já está sendo utilizado por outro usuário."

```
