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
GET / categoria;
```

Essa é a rota que será chamada quando o usuario logado quiser listar todas as categorias cadastradas.

**Requisição**

Sem parâmetros de rota ou de query.Não deverá possuir conteúdo no corpo (body) da requisição.

**Resposta**

Em caso de sucesso, o corpo (body) da resposta deverá possuir um array dos objetos (categorias) encontrados.Em caso de falha na validação, a resposta deverá possuir status code apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade mensagem que deverá possuir como valor um texto explicando o motivo da falha.

**REQUISITOS OBRIGATÓRIOS**

O endpoint deverá responder com um array de todas as categorias cadastradas.

**Exemplo de requisição**

```javascript
// GET /categoria
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
]

Se não encontrar nada no banco de dados, retornar um array vazio
// HTTP Status 200
[]
```

**Cadastrar Usuário**

```javascript
POST / usuario;
```

Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.

**Requisição:**
Sem parâmetros de rota ou de query.O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

- nome;

- email;

- senha;

**Resposta:**
Em caso de sucesso, deveremos enviar no corpo (body) da resposta o conteúdo do usuário cadastrado, incluindo seu respectivo id e excluindo a senha criptografada. Em caso de falha na validação, a resposta deverá possuir status code apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade mensagem que deverá possuir como valor um texto explicando o motivo da falha.

```javascript
// 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
Já existe usuário cadastrado com o
e-mail informado.
```

**EQUISITOS OBRIGATÓRIOS**

Validar os campos obrigatórios:

- nome;

- email;

- senha;

- Validar se o e-mail informado já existe

- Não permitir que o mesmo e-mail seja usado por outro usuário,
  caso haja o mesmo email em outro usudario, retornar o status code adequado para o erro.

```javascript
// 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado
Já existe usuário cadastrado com o
e-mail informado.
```

Criptografar a senha antes de persistir no banco de dados com a biblioteca `bcrypt`

Cadastrar o usuário no banco de dados

Exemplo de requisição:

```javascript
// POST /usuario
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
// HTTP Status 403: o usuário não tem permissão de acessar o recurso solicitado

Já existe usuário cadastrado com o
e-mail informado.

```

**Login do usuário**

```javascript
POST / login;
```

Essa é a rota que permite o usuário cadastrado realizar o login no sistema.

**Requisição**
Sem parâmetros de rota ou de query.O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

- email

- senha

**Resposta**
Em caso de sucesso, o corpo (body) da resposta deverá possuir um objeto com a propriedade token que deverá possuir como valor o token de autenticação gerado e uma propriedade usuario que deverá possuir as informações do usuário autenticado, exceto a senha do usuário.Em caso de falha na validação, a resposta deverá possuir status code apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade mensagem que deverá possuir como valor um texto explicando o motivo da falha.

**REQUISITOS OBRIGATÓRIOS**

Validar os campos obrigatórios:

- email

- senha

- Verificar se o e-mail existe

- Validar se e-mail e senha estão corretos

- Criar token de autenticação com id do usuário

- Exemplo de requisição

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

// HTTP Status 401

 "Usuário e/ou senha inválido(s).

```

**Detalhar usuário**

```javascript
GET / usuario;
```

Essa é a rota que será chamada quando o usuario quiser obter os dados do seu próprio perfil.
Atenção!: O usuário deverá ser identificado através do ID presente no token de autenticação.

**Requisição**
Sem parâmetros de rota ou de query.Não deverá possuir conteúdo no corpo da requisição.

**Resposta**
Em caso de sucesso, o corpo (body) da resposta deverá possuir um objeto que representa o usuário encontrado, com todas as suas propriedades (exceto a senha), conforme exemplo abaixo, acompanhado de status code apropriado.Em caso de falha na validação, a resposta deverá possuir status code apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade mensagem que deverá possuir como valor um texto explicando o motivo da falha.Dica: neste endpoint podemos fazer uso do status code 401 (Unauthorized).

Exemplo de requisição

```javascript
// GET /usuario
// Sem conteúdo no corpo (body) da requisição
```

Exemplos de resposta

```javascript
// HTTP Status 200 (OK) = requisição bem sucedida
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}

// HTTP Status 403 (Forbidden) = o usuário não tem permissão de acessar o recurso solicitado

Para acessar este recurso um token de autenticação válido deve ser enviado.
```

**Atualizar usuário**

```javascript
PUT / usuario;
```

Essa é a rota que será chamada quando o usuário quiser realizar alterações no seu próprio usuário.
Atenção!: O usuário deverá ser identificado através do ID presente no token de autenticação.

**Requisição**
Sem parâmetros de rota ou de query.O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

- nome

- email

- senha

**Resposta**
Em caso de sucesso, não deveremos enviar conteúdo no corpo (body) da resposta.Em caso de falha na validação, a resposta deverá possuir status code apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade mensagem que deverá possuir como valor um texto explicando o motivo da falha.

**REQUISITOS OBRIGATÓRIOS**

Validar os campos obrigatórios:

- nome

- email

- senha

Validar se o novo e-mail já existe no banco de dados para outro usuário

Caso já exista o novo e-mail fornecido para outro usuário no banco de dados, a alteração não deve ser permitida (o campo de email deve ser sempre único no banco de dados)

Criptografar a senha antes de salvar no banco de dados com a biblioteca `bcrypt`

Atualizar as informações do usuário no banco de dados

Exemplo de requisição:

```javascript
// PUT /usuario
{
"nome": "Pedro De Assis",
"email": "pedrode_assis@email.com",
"senha": "b@1234"
}
```

Exemplos de resposta

```javascript
// HTTP Status 204
Sem conteúdo no corpo (body) da resposta

// HTTP Status 403 (Forbidden) = o usuário não tem permissão de acessar o recurso
//solicitado
O e-mail informado já está sendo utilizado por outro usuário.

```
