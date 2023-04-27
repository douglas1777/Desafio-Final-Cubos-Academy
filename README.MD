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

### **2° Sprint**

<br><br>

## **Banco de dados**

Continuar a implementação do  Banco de Dados PostgreSQL chamado `pdv`.
para persistir e manipular os dados de categorias, clientes, pedidos, produtos e usuários utilizados pela aplicação.

- O campo id das tabelas no banco de dados deve ser auto incremento, chave primária e não deve permitir edição uma vez criado.
- Qualquer valor monetário deverá ser representado em centavos (Ex.: R$ 10,00 reais = 1000)
  Crie as seguintes tabelas e colunas abaixo:

**ATENÇÃO! Os nomes das tabelas e das colunas a serem criados devem seguir exatamente os nomes listados abaixo.**

```javascript

* produtos
  -id
  -descricao
  -quantidade_estoque
  -valor
  -categoria_id

* clientes
  -id
  -nome
  -email (campo único)
  -cpf (campo único)
  -cep
  -rua
  -numero
  -bairro
  -cidade
  -estado
```
> ## ATENÇÃO: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, tambem  deverão exigir o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade será necessário validar o token informado.

<br><br>

### **Cadastrar Produto**


```javascript
POST / produto;
```

Essa é a rota que será utilizada para cadastrar um novo produto no sistema.

**Métodos:**

**Lembre-se:** Deverá ser possível cadastrar **apenas** com usuário logado, que deverá ser identificado através do ID presente no token de validação.

  - Validar se existe produto para o id enviado como parâmetro na rota
- Validar os campos obrigatórios que vem do body **(descricao, quantidade_estoque, valor,  categoria_id)**

- **Resposta:**
  Em caso de sucesso, deveremos enviar no corpo (body) da resposta o conteúdo do produto cadastrado, incluindo seu respectivo id. 
  Em caso de falha na validação, a resposta deverá possuir status code apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade mensagem que deverá possuir como valor um texto explicando o motivo da falha.

Exemplo de requisição:

```javascript
// POST /usuarios
{
    "descricao": "Teclado",
    "quantidade_estoque": "4",
    "valor": "3000"
    "categoria_id":"1"
   
}
```

Exemplos de resposta:

```javascript
// HTTP Status 201 (Created) 
{
    "id": 1,
    "descricao": "Teclado",
    "quantidade_estoque": "04",
    "valor": "3000"
    "categoria_id":"01"
}
```

```javascript
// HTTP Status 404 (Bad Request)
{
 "mensagem": "Categoria inexistente"
}
```
#### Caso não seja lançado a descricao
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "Descricao é um campo obrigatório"          

 }
 
```
#### Caso não seja lançado quantidade_estoque
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "Quantidade em estoque é um campo obrigatório"          

 }
 ```
 
#### Caso não seja lançado o valor
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "Valor é um campo obrigatório"          

 }
 categoria_id

 ```

 #### Caso não seja lançado categoria_id
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "O id da categoria é um campo obrigatório"          

 }
 

 ```
<br><br>

## **Editar dados do Produto**


```javascript
PUT /produto/:id
```

Essa é a rota que permite atualizar as informações de um produto cadastrado no sistema.

**Métodos:**

**Lembre-se:** Deverá ser possível atualizar o produto **apenas** com usuário logado, que deverá ser identificado através do ID presente no token de validação.

   -Validar se existe produto para o id enviado como parâmetro na rota.
  
   -Validar categoria informada na qual o produto será atualizado .

   - Validar os campos obrigatórios que vem do body **(descricao, quantidade_estoque, valor,  categoria_id)**

- **Resposta:**
  Em caso de sucesso, a resposta deverá possuir status code (200),  e em seu corpo (body) deverá possuir um objeto com uma propriedade "mensagem": "Produto atualizado com sucesso".
  Em caso de falha na validação, a resposta deverá possuir status code apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade mensagem que deverá possuir como valor um texto explicando o motivo da falha.

Exemplo de requisição:

```javascript
// PUT /produto/:id
{
    "id":"1"
    "descricao": "Teclado",
    "quantidade_estoque": "4",
    "valor": "3000"
    "categoria_id":"1"
   
}
```

Exemplos de resposta:

```javascript
// HTTP Status 200 (OK) = requisição bem sucedida
{
    "mensagem": "Produto atualizado com sucesso".
}
```

```javascript
// HTTP Status 404 (Bad Request)
{
 "mensagem": "Produto inexistente"
}
```
```javascript
// HTTP Status 404 (Bad Request)
{
 "mensagem": "Categoria inexistente"
}
```
#### Caso não seja lançado a descricao
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "Descricao é um campo obrigatório"          

 }
 
```
#### Caso não seja lançado quantidade_estoque
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "Quantidade em estoque é um campo obrigatório"          

 }
 ```
 
#### Caso não seja lançado o valor
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "Valor é um campo obrigatório"          

 }
 categoria_id

 ```

 #### Caso não seja lançado categoria_id
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "O id da categoria é um campo obrigatório"          

 }


 
```
<br><br>

## **Listar Produtos**

```javascript
GET / produto
```

Essa é a rota que permite listar as informações de um produto cadastrado por categoria no sistema.

**Métodos:**

**Lembre-se:** Deverá ser possível listar os produtos **apenas** com usuário logado, que deverá ser identificado através do ID presente no token de validação.

  **Deveremos incluir um parâmetro do tipo query categoria_id para que seja possível consultar produtos por categorias, de modo, que serão filtrados de acordo com o id de uma categoria.**

- Caso seja enviado o parâmetro do tipo query **categoria_id**, filtrar os produtos de acordo com a categoria, caso o id de categoria informada exista.
- Caso não seja informado o parâmetro do tipo query **categoria_id** todos os produtos cadastrados deverão ser retornados.


-   **Requisição**  
    Parâmetro opcional do tipo query **filtro**.
    Não deverá possuir conteúdo no corpo (body) da requisição.

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um array dos objetos (produtos) encontrados.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.


     -   O parâmetro opcional do tipo query ( **categoria_id**), quando enviado, deverá ser sempre um array contendo a descrição de um ou mais produtos.
    -   O endpoint deverá responder com um array de todos os produtos associadas a categoria passadas no parâmetro query. 
    
    -Caso não seja informado o parâmetro do tipo query **categoria_id** todos os produtos cadastrados deverão ser retornados.

**Exemplo de requisição**

```javascript
// GET /produto?filtro[]=1
// Sem conteúdo no corpo (body) da requisição
```

**Exemplos de resposta**

```javascript
// HTTP Status 200
[
 {
    "id":"1"
    "descricao": "Teclado",
    "quantidade_estoque": "4",
    "valor": "3000"
    "categoria_id":"1"
   
},{
    "id":"2"
    "descricao": "Mouse optico",
    "quantidade_estoque": "2",
    "valor": "1000"
    "categoria_id":"1"
   
}
];
```

Caso não encontrar nada no banco de dados, retornar um array vazio

```javascript
// HTTP Status 404
[];
```
-Caso seja informado o parâmetro do tipo query **categoria_id** inexistente.

```javascript
// HTTP Status 404

{
 "mensagem": "Categoria inexistente"
}
```


-Caso não seja informado o parâmetro do tipo query.

```javascript
// HTTP Status 200
[
 {
    "id":"1"
    "descricao": "Teclado",
    "quantidade_estoque": "4",
    "valor": "3000"
    "categoria_id":"1"
   
},{
    "id":"2"
    "descricao": "Mouse optico",
    "quantidade_estoque": "2",
    "valor": "1000"
    "categoria_id":"1"
   
}, {
    "id":"3"
    "descricao": "Motorola E7",
    "quantidade_estoque": "1",
    "valor": "55000"
    "categoria_id":"2"
   
},{
    "id":"4"
    "descricao": "Sabonete Dove",
    "quantidade_estoque": "15",
    "valor": "800"
    "categoria_id":"3"
   
}
];
```
<br><br>

### **Detalhar Produto**
```javascript
GET/produto/:id
```
Essa é a rota que será chamada quando o usuario logado quiser obter um de seus produtos cadastrados.   

**Lembre-se:** Deverá ser possível obter o produto **apenas** com usuário logado, que deverá ser identificado através do ID presente no token de validação.

-   **Requisição**  
    Deverá ser enviado o ID do produto no parâmetro de rota do endpoint.  

    O corpo (body) da requisição não deverá possuir nenhum conteúdo.

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto que representa o produto encontrado, com todas as suas propriedades, acompanhado de **_status code_** apropriado.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**

    -Validar se existe produto para o id enviado como parâmetro na rota.

#### **Exemplo de requisição**

```javascript
// GET /produto/:2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 (OK) = requisição bem sucedida
{
    "id":"2"
    "descricao": "Mouse optico",
    "quantidade_estoque": "2",
    "valor": "1000"
    "categoria_id":"1"
   
}
```

```javascript
// HTTP Status  404
{
    "mensagem": "Produto não encontrado."
}
```

<br><br>


### **Excluir Produto por ID**
```javascript
DELETE/produto/:id
```
Essa é a rota que será chamada quando o usuario logado quiser deletar um de seus produtos cadastrados.   

**Lembre-se:** Deverá ser possível deletar o produto **apenas** com usuário logado, que deverá ser identificado através do ID presente no token de validação.

-   **Requisição**  
    Deverá ser enviado o ID do produto a ser deletado no parâmetro de rota do endpoint.  

    O corpo (body) da requisição não deverá possuir nenhum conteúdo.

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto com uma propriedade **mensagem** de sucesso.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**

    -Validar se existe produto para o id enviado como parâmetro na rota.

#### **Exemplo de requisição**

```javascript
// DELETE /produto/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 (OK) = requisição bem sucedida
{
    "mensagem": "Produto excluido com sucesso."
}
```

```javascript
// HTTP Status  404
{
    "mensagem": "Produto não encontrado."
}
```
<br><br>

**Cadastrar Cliente**

```javascript
POST /cliente
```

Essa é a rota que será chamada quando o usuario logado quiser cadastrar um novo cliente no sistema.   

**Lembre-se:** Deverá ser possível cadastrar um novo cliente **apenas** com usuário logado, que deverá ser identificado através do ID presente no token de validação.

**Métodos:**

- Receber e validar os campos obrigatórios que vem do body **(nome, email, cpf)**

**REQUISITOS OBRIGATÓRIOS**

   -Validar se o email existe no banco de dados. Se existir, não será possível cadastrar.
  
   -Validar se o cpf existe no banco de dados. Se existir, não será possível cadastrar.


- **Resposta:**
  Em caso de sucesso, deveremos enviar no corpo (body) da resposta um objeto com as propiedades do cliente cadastrado, incluindo seu respectivo id. 
  Em caso de falha na validação, a resposta deverá possuir status code apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade mensagem que deverá possuir como valor um texto explicando o motivo da falha.
 

Exemplo de requisição:

```javascript
// POST /cliente
{
    "nome":"José",
    "email":"jose@email.com",
    "cpf":"12345668804",
    "cep":"12345110",   
    "rua":"Rua Tapajós",
    "numero":"55",
    "bairro":"São Cristovan",
    "cidade":"São Paulo",
    "estado":"SP"
}
```
Exemplos de resposta:

```javascript
// HTTP Status 200 / 201 / 204
{
    "id":"1",
    "nome":"José",
    "email":"jose@email.com",
    "cpf":"12345668804",
    "cep":"12345110",   
    "rua":"Rua Tapajós",
    "numero":"55",
    "bairro":"São Cristovan",
    "cidade":"São Paulo",
    "estado":"SP"
}
```

```javascript
// HTTP Status 404 (Bad Request)

 "mensagem": "Já existe cliente cadastrado com o e-mail informado".
```

```javascript
// HTTP Status 404 (Bad Request)

 "mensagem": "Já existe cliente cadastrado com o Cpf informado".
```
#### Caso não seja lançado o nome
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "Nome é um campo obrigatório"          

 }
 
```
#### Caso não seja lançado o email
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "Email é um campo obrigatório"          

 }
 ```
 
#### Caso não seja lançado o cpf
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "Cpf é um campo obrigatório"          

 }
 
```

<br><br>

## **Editar dados do Cliente**


```javascript
PUT /cliente/:id
```

Essa é a rota que permite atualizar as informações de um cliente cadastrado no sistema.

**Lembre-se:** Deverá ser possível atualizar o cliente **apenas** com usuário logado, que deverá ser identificado através do ID presente no token de validação.

**Métodos:**

- Validar se existe cliente para o id enviado como parâmetro na rota.
- Receber e validar os campos obrigatórios que vem do body **(nome, email, cpf)**

  -Validar se o email existe no banco de dados. Se existir, não será possível atualizar.
  
   -Validar se o cpf existe no banco de dados. Se existir, não será possível cadastrar.


- **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto com uma propriedade **mensagem** de sucesso.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

Exemplo de requisição:

```javascript
// PUT /cliente /:id
{
    "id":"1",
    "nome":"José",
    "email":"jose@email.com",
    "cpf":"12345668804",
    "cep":"12345110",   
    "rua":"Rua Tapajós",
    "numero":"55",
    "bairro":"São Cristovan",
    "cidade":"São Paulo",
    "estado":"SP"
}
```

Exemplos de resposta:

```javascript
// HTTP Status 200 (OK) = requisição bem sucedida
{
    "mensagem": "Cliente atualizado com sucesso".
}
```

```javascript
// HTTP Status 404 (Bad Request)

 "O e-mail informado já está sendo utilizado por outro usuário."
```

```javascript
// HTTP Status 404 (Bad Request)

"O cpf informado já está sendo utilizado por outro usuário."
```

#### Caso não seja lançado o nome
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "Nome é um campo obrigatório"          

 }
 
```
#### Caso não seja lançado o email
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "email é um campo obrigatório"          

 }
 ```
 
#### Caso não seja lançado o cpf
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "cpf é um campo obrigatório"          

 }
```
<br><br>

## **Listar Cliente**


```javascript
GET / cliente;
```

Essa é a rota que será chamada quando o usuario logado quiser listar todos os clientes cadastrados.

**Lembre-se:** Deverá ser possível listar cliente **apenas** com usuário logado, que deverá ser identificado através do ID presente no token de validação.


**Requisição**

Sem parâmetros de rota ou de query.Não deverá possuir conteúdo no corpo (body) da requisição.

**Exemplo de requisição**

```javascript
// GET /cliente
// Sem conteúdo no corpo (body) da requisição
```

**Exemplos de resposta**

```javascript
// HTTP Status 200 (OK) = requisição bem sucedida
[
 {
    "id":"1",
    "nome":"Maria",
    "email":"maria@email.com",
    "cpf":"12345668364",
    "cep":"12345145",   
    "rua":"Rua Rio Branco",
    "numero":"125",
    "bairro":"São José",
    "cidade":"Salvador",
    "estado":"BA"
},
{
    "id":"2",
    "nome":"José",
    "email":"jose@email.com",
    "cpf":"12345668804",
    "cep":"12345110",   
    "rua":"Rua Tapajós",
    "numero":"55",
    "bairro":"São Cristovan",
    "cidade":"São Paulo",
    "estado":"SP"
}
];
```

Se não encontrar nada no banco de dados, retornar um array vazio

```javascript
// HTTP Status 200
[];
```

<br><br>

### **Detalhar Cliente**
```javascript
GET/cliente/:id
```
Essa é a rota que será chamada quando o usuario logado quiser obter um de seus clientes cadastrados.   

**Lembre-se:** Deverá ser possível obter o produto **apenas** com usuário logado, que deverá ser identificado através do ID presente no token de validação.

-   **Requisição**  
    Deverá ser enviado o ID do cliente no parâmetro de rota do endpoint.  

    O corpo (body) da requisição não deverá possuir nenhum conteúdo.

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto que representa o cliente encontrado, com todas as suas propriedades, acompanhado de **_status code_** apropriado.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**

    -Validar se existe produto para o id enviado como parâmetro na rota.

#### **Exemplo de requisição**

```javascript
// GET /cliente/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 (OK) = requisição bem sucedida
{
    "id":"2",
    "nome":"José",
    "email":"jose@email.com",
    "cpf":"12345668804",
    "cep":"12345110",   
    "rua":"Rua Tapajós",
    "numero":"55",
    "bairro":"São Cristovan",
    "cidade":"São Paulo",
    "estado":"SP"
}
```

```javascript
// HTTP Status  404
{
    "mensagem": "cliente não encontrado."
}
```

<br><br>
