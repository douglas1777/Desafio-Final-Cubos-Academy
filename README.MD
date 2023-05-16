# Desafio Módulo Final Módulo 4 - Backend

Construir uma API para um PDV (Frente de Caixa) que permita:

- Cadastrar Usuário
- Fazer Login
- Detalhar Perfil do Usuário Logado
- Editar Perfil do Usuário Logado
- Listar categorias

# **Banco de dados**

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

# **Status Codes**

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

# **Listar categorias**

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

# **Cadastrar Usuário**

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

# **Login do usuário**

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
<br><br>


# **2° Sprint**

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

# **Cadastrar Produto**


```javascript
POST / produto;
```

Essa é a rota que será utilizada para cadastrar um novo produto no sistema.

**Métodos:**

    -Deverá  vincular uma imagem a um produto. Deverá ser criada uma coluna produto_imagem para que seja possível efetuar o vínculo entre a imagem e o produto.
- Validar os campos obrigatórios que vem do body **(descricao, quantidade_estoque, valor,  categoria_id)**

 **Critérios de aceite:**

    - O campo produto_imagem deve ser opcional.

- **Resposta:**
  Em caso de sucesso, deveremos enviar no corpo (body) da resposta o conteúdo do produto cadastrado, incluindo seu respectivo id. 
  Em caso de falha na validação, a resposta deverá possuir status code apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade mensagem que deverá possuir como valor um texto explicando o motivo da falha.

Exemplo de requisição:

```javascript
// POST /usuarios
{
    "descricao": "Teclado",
    "quantidade_estoque": "4",
    "valor": "3000",
    "categoria_id":"1",
    "produto_imagem": <arquivo_da_imagem>
}
```

Exemplos de resposta:

```javascript
// HTTP Status 201 (Created) 
{
    "id": 1,
    "descricao": "Teclado",
    "quantidade_estoque": "4",
    "valor": "3000"
    "categoria_id":"1"
    "produto_imagem": <arquivo_da_imagem>
}
```

```javascript
// HTTP Status 404 (Bad Request)
{
 "mensagem": "Categoria inexistente"
}
```
### Caso não seja lançado a descricao
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "Descricao é um campo obrigatório"          

 }
 
```
### Caso não seja lançado quantidade_estoque
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "Quantidade em estoque é um campo obrigatório"          

 }
 ```
 
### Caso não seja lançado o valor
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "Valor é um campo obrigatório"          

 }
 categoria_id

 ```

 ### Caso não seja lançado categoria_id
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "O id da categoria é um campo obrigatório"          

 }
 

 ```
<br><br>

# **Editar dados do Produto**


```javascript
PUT /produto/:id
```
Essa é a rota que permite atualizar as informações de um produto cadastrado no sistema com base no id do produto informado no parâmetro da rota.


**Critérios de aceite:**

    -Deverá permitir vincular uma imagem a um produto existente.



**Métodos:**
    

    - Caso exista uma imagem vinculada a esse produto, e o campo `produto_imagem` de atualização possuir valor `null`deverá ser excluída a imagem vinculada anteriormente e o valor `null` será atribuído a coluna `produto_imagem` deixando o produto sem imagem vinculada.
 
-Validar categoria informada na qual o produto será atualizado .

   - Validar os campos obrigatórios que vem do body **(descricao, quantidade_estoque, valor,  categoria_id)**

- **Resposta:**
  Em caso de sucesso, a resposta deverá possuir status code (200),  e em seu corpo (body) deverá possuir um objeto com uma propriedade "mensagem": "Produto atualizado com sucesso".
  Em caso de falha na validação, a resposta deverá possuir status code apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade mensagem que deverá possuir como valor um texto explicando o motivo da falha.

Exemplo de requisição:

```javascript
// PUT /produto/:id
{
    "id": 1,
    "descricao": "Teclado ",
    "quantidade_estoque": 10,
    "valor": 4500,
    "categoria_id": 2,
    "produto_imagem": null
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
// HTTP Status 404 (Not found)
{
 "mensagem": "Produto inexistente"
}
```
```javascript
// HTTP Status 404 (Not found)
{
 "mensagem": "Categoria inexistente"
}
```
### Caso não seja lançado a descricao
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "Descricao é um campo obrigatório"          

 }
 
```
### Caso não seja lançado quantidade_estoque
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "Quantidade em estoque é um campo obrigatório"          

 }
 ```
 
### Caso não seja lançado o valor
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "Valor é um campo obrigatório"          

 }
 categoria_id

 ```

 ### Caso não seja lançado categoria_id
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "O id da categoria é um campo obrigatório"          

 }


 
```
<br><br>

# **Listar Produtos**

```javascript
GET / produto
```

Essa é a rota que permite listar as informações dos produtos cadastrados por categoria no sistema.

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
// GET /produto?categoria_id=1
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
    "produto_imagem":"null"

   
},{
    "id":"2"
    "descricao": "Mouse optico",
    "quantidade_estoque": "2",
    "valor": "1000"
    "categoria_id":"1"
    "produto_imagem":"url: 'http://example.com/imagem1.jpg'"
   
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
     "produto_imagem":"url: 'http://example.com/imagem1.jpg'"
   
},{
    "id":"2"
    "descricao": "Mouse optico",
    "quantidade_estoque": "2",
    "valor": "1000"
    "categoria_id":"1"
     "produto_imagem":"url: 'http://example.com/imagem2.jpg'"
   
}, {
    "id":"3"
    "descricao": "Motorola E7",
    "quantidade_estoque": "1",
    "valor": "55000"
    "categoria_id":"2"
     "produto_imagem":"url: 'http://example.com/imagem3.jpg'"
   
},{
    "id":"4"
    "descricao": "Sabonete Dove",
    "quantidade_estoque": "15",
    "valor": "800"
    "categoria_id":"3"
     "produto_imagem":"null"
   
}
];
```
<br><br>

# **Detalhar Produto**
```javascript
GET/produto/:id
```
Essa é a rota que será chamada quando o usuario logado quiser obter um de seus produtos cadastrados.   


-   **Requisição**  
    Deverá ser enviado o ID do produto no parâmetro de rota do endpoint.  

    O corpo (body) da requisição não deverá possuir nenhum conteúdo.

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto que representa o produto encontrado, com todas as suas propriedades, acompanhado de **_status code_** apropriado.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**

    -Validar se existe produto para o id enviado como parâmetro na rota.

### **Exemplo de requisição**

```javascript
// GET /produto/:2
// Sem conteúdo no corpo (body) da requisição
```

### **Exemplos de resposta**

```javascript
// HTTP Status 200 (OK) = requisição bem sucedida
{
    "id":"2"
    "descricao": "Mouse optico",
    "quantidade_estoque": "2",
    "valor": "1000"
    "categoria_id":"1"
    "produto_imagem":"url: 'http://example.com/imagem1.jpg'"
   
}
```

```javascript
// HTTP Status  404
{
    "mensagem": "Produto não encontrado."
}
```

<br><br>


# **Excluir Produto por ID**
```javascript
DELETE/produto/:id
```
Essa é a rota que será chamada quando o usuario logado quiser deletar um de seus produtos cadastrados.   

-   **Requisição**  
    - Deverá ser enviado o ID do produto a ser deletado no parâmetro de rota do endpoint.  
    - O corpo (body) da requisição não deverá possuir nenhum conteúdo.
    -Deverá ser aplicada uma regra de negócio que não permitirá exclusão de produto que tenha sido registrado em algum pedido.
    - Na exclusão do produto a imagem vinculada a este produto deverá ser excluída do servidor de armazenamento.

-   **Resposta**  
    Em caso de **sucesso**, o corpo (body) da resposta deverá possuir um objeto com uma propriedade **mensagem** de sucesso.  
    Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

-   **REQUISITOS OBRIGATÓRIOS**

    - Validar se existe produto para o id enviado como parâmetro na rota.
    - Validar se o produto que está sendo excluído não está vinculado a nenhum pedido, caso estiver, não poderá ser excluido,

### **Exemplo de requisição**

```javascript
// DELETE /produto/2
// Sem conteúdo no corpo (body) da requisição
```

### **Exemplos de resposta**

```javascript
// HTTP Status 204 (no content) 

```

```javascript
// HTTP Status  404
{
    "mensagem": "Produto não encontrado."
}
```
```javascript
// HTTP Status 400 (Bad Request)
{
    "mensagem": "O produto não pode ser excluído pois está presente em um pedido."
}
```

<br><br>

# **Cadastrar Cliente**

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
### Caso não seja lançado o nome
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "Nome é um campo obrigatório"          

 }
 
```
### Caso não seja lançado o email
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "Email é um campo obrigatório"          

 }
 ```
 
### Caso não seja lançado o cpf
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "Cpf é um campo obrigatório"          

 }
 
```

<br><br>

# **Editar dados do Cliente**


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

### Caso não seja lançado o nome
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "Nome é um campo obrigatório"          

 }
 
```
### Caso não seja lançado o email
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "email é um campo obrigatório"          

 }
 ```
 
### Caso não seja lançado o cpf
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

## **Detalhar Cliente**
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

### **Exemplo de requisição**

```javascript
// GET /cliente/2
// Sem conteúdo no corpo (body) da requisição
```

### **Exemplos de resposta**

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

# **3° Sprint**

<br><br>

## **Banco de dados**

Continuar a implementação do  Banco de Dados PostgreSQL chamado `pdv`.
para persistir e manipular os dados de categorias, clientes, pedidos, produtos e usuários utilizados pela aplicação.

- O campo id das tabelas no banco de dados deve ser auto incremento, chave primária e não deve permitir edição uma vez criado.
- Qualquer valor monetário deverá ser representado em centavos (Ex.: R$ 10,00 reais = 1000)
  Crie as seguintes tabelas e colunas abaixo:

**ATENÇÃO! Os nomes das tabelas e das colunas a serem criados devem seguir exatamente os nomes listados abaixo.**

```javascript

* pedidos
  -id
  -cliente_id
  -observacao
  -valor_total
  
* pedido_produtos

  -id
  -pedido_id
  -produto_id
  -quantidade_produto
  -valor_produto
  
```
> ## ATENÇÃO: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, tambem  deverão exigir o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade será necessário validar o token informado.

> ## Em caso de **falha na validação**, a resposta deverá possuir **_status code_** apropriado, e em seu corpo (body) deverá possuir um objeto com uma propriedade **mensagem** que deverá possuir como valor um texto explicando o motivo da falha.

<br><br>

## **Cadastrar pedido**

```javascript
POST /pedido
```

Essa é a rota que será utilizada para cadastrar um novo pedido no sistema.  

- Cada pedido deverá conter ao menos um produto vinculado.


**REQUISITOS OBRIGATÓRIOS**

  -   Validar os campos obrigatórios:

    -   cliente_id
    -   pedido_produtos
        -   produto_id
        -   quantidade_produto

-   Validar se existe cliente para o id enviado no corpo (body) da requisição.
-   Validar se existe produto para cada produto_id informado dentro do array enviado no corpo (body) da requisição.
-   Validar se existe a quantidade em estoque de cada produto existente dentro do array, de acordo com a quantidade informada no corpo (body) da requisição.
-   O pedido deverá ser cadastrado, apenas, se todos os produtos estiverem validados. 
-   Enviar e-mail para o cliente notificando que o pedido foi efetuado com sucesso.  


 **Resposta:**

  Em caso de sucesso, deveremos enviar no corpo (body) da resposta um objeto com as propiedades do pedido cadastrado, incluindo seu respectivo id. 
  

Exemplo de requisição:

```javascript
// POST /pedido
{
    "cliente_id": 1,
    "observacao": "Em caso de ausência recomendo deixar com algum vizinho",
    "pedido_produtos": [
        {
            "produto_id": 1,
            "quantidade_produto": 10
        },
        {
            "produto_id": 2,
            "quantidade_produto": 20
        }
    ]
}
```
Exemplos de resposta:

```javascript
// HTTP Status 201 (Created) 
{
    "id":1
    "cliente_id": 1,
    "observacao": "Em caso de ausência recomendo deixar com algum vizinho",
    "valor_total": 230000,
}
```
### Caso usuario não esteja logado
```javascript

// HTTP Status 401 (Unauthorized)
{
 "mensagem": "O usuário não está autenticado".
}
```
### Caso não seja lançado o cliente_id
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "O id do cliente é um campo obrigatório"          
 }
 
```
### Caso não seja lançado o produto_id
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "O id do produto é um campo obrigatório"          
 }
 
```
### Caso não seja lançado o quantidade_produto
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "A quantidade do  produto é um campo obrigatório"          

 }
 
```
### Caso não exista cliente_id enviado no corpo do (body) da requisição.
```javascript
// HTTP Status 404 (Not Found)
{
 "mensagem": "Cliente não encontrado na banco de dados "          

 }
 
```
### Caso não exista  produto_id informado dentro do array enviado no corpo (body) da requisição.
```javascript
// HTTP Status 404 (Not Found)
{
     "mensagem": "Produto não encontrado",
    "produto_id": 35         

 }
 ```
 ### Caso não exista a quantidade em estoque de cada produto existente dentro do array, de acordo com a quantidade informada no corpo (body) da requisição.
```javascript
// HTTP Status 400 (Bad Request)
{
 "mensagem": "A quantidade de produto solicitada está acima do volume em estoque",
    "produto_id": 5,
    "quantidade_estoque": "0"      

 }
 ```

 <br><br>

## **Listar Pedidos**

```javascript
GET / pedido
```

Essa é a rota que será chamada quando o usuário logado quiser listar todos os pedidos cadastrados.

**Métodos:**

  **Deveremos incluir um parâmetro do tipo query cliente_id para que seja possível consultar pedidos por clientes, de modo, que serão filtrados de acordo com o id de um cliente.**

- Caso seja enviado o parâmetro do tipo query  **cliente_id** , filtrar os pedidos de acordo com o cliente, caso o id do cliente informada exista.
- Caso não seja informado o parâmetro do tipo query **cliente_id** todos os pedidos cadastrados deverão ser retornados.


-   **Requisição**  
    Parâmetro opcional do tipo query **cliente_id**.
    Não deverá possuir conteúdo no corpo (body) da requisição.

-   **Resposta**  
      
    
        -   O parâmetro opcional do tipo query ( **cliente_id**), quando enviado, deverá rertornar sempre um array de objetos contendo a descrição de um ou mais pedidos do cliente_id informado.
        
    -Caso não seja informado o parâmetro do tipo query **cliente_id** todos os pedidos cadastrados deverão ser retornados.

**Exemplo de requisição**

```javascript
// GET /produto?cliente_id=1
// Sem conteúdo no corpo (body) da requisição
```

**Exemplos de resposta**

```javascript
// HTTP Status 200
[
    {
        "pedido": {
            "id": 1,
            "valor_total": 230010,
            "observacao": null,
            "cliente_id": 1
        },
        "pedido_produtos": [
            {
                "id": 1,
                "quantidade_produto": 1,
                "valor_produto": 10,
                "pedido_id": 1,
                "produto_id": 1
            },
            {
                "id": 2,
                "quantidade_produto": 2,
                "valor_produto": 230000,
                "pedido_id": 1,
                "produto_id": 2
            }
        ]
    }
]
```
### Caso usuario não esteja logado
```javascript

// HTTP Status 401 (Unauthorized)
{
 "mensagem": "O usuário não está autenticado".
}
```

### Caso não encontrar nada no banco de dados, retornar um array vazio

```javascript
// HTTP Status 200 (ok)
[];
```

### Caso seja informado o parâmetro do tipo query **cliente_id** inexistente.
```javascript
//HTTP Status 404 (Not Found)

{
 "mensagem": "Cliente não encontrado no banco de dados"
}
```


### Caso não seja informado o parâmetro do tipo query.
```javascript
// HTTP Status 200 (ok)
[
    {
        "pedido": {
            "id": 1,
            "valor_total": 230010,
            "observacao": null,
            "cliente_id": 1
        },
        "pedido_produtos": [
            {
                "id": 1,
                "quantidade_produto": 1,
                "valor_produto": 10,
                "pedido_id": 1,
                "produto_id": 1
            },
            {
                "id": 2,
                "quantidade_produto": 2,
                "valor_produto": 230000,
                "pedido_id": 1,
                "produto_id": 2
            }
        ]
    }


    {
        "pedido": {
            "id": 2,
            "valor_total": 250010,
            "observacao": "Horário de entrega das 9:00  às 17:00 hs",
            "cliente_id": 1
        },
        "pedido_produtos": [
            {
                "id": 5,
                "quantidade_produto": 1,
                "valor_produto": 10,
                "pedido_id": 2,
                "produto_id": 13
            },
            {
                "id": 2,
                "quantidade_produto": 2,
                "valor_produto": 230000,
                "pedido_id": 2,
                "produto_id": 23
            }
        ]
    }
]
```
<br><br>




## **Upload de imagem**

```javascript
POST /arquivo/upload
```

Essa é a rota que será utilizada para fazer o upload de uma imagem no servidor de armazenamento.

**Lembre-se:** O nome da imagem deverá ser gerado, de modo, que não deverá ser passada a propriedade relacionada ao nome da imagem.

             -Cada imagem deverá ter um nome gerado exclusivo, ou seja, não poderá ter risco de uma imagem possuir o mesmo nome de uma outra já existente no servidor de armazenamento.

**REQUISITOS OBRIGATÓRIOS**

  - Validar se a propriedade `imagem`, foi informada no corpo da requisição.
  - Receber a propriedade `imagem` em formato base64 e enviar para o servidor de armazenamento.
  - Obter e retornar a URL da imagem que teve upload concluído. 

-   **Requisição**  
    
    Deverá possuir conteúdo no multipart Form (body) da requisição o arquivo de  imagem.

-   **Resposta**  
      
    - Retornar a URL da imagem que teve upload concluído.


**Exemplo de requisição**

```javascript
// POST /arquivo/upload


    "arquivo":" imagem"

```

**Exemplos de resposta**

### Caso o upload tenha sucesso.
```javascript
// HTTP Status Status 201 (Created) 

    {
        "url": "https://.imagem.jpge.js.org/chokidar/-/chokidar-3.5.3.tgz",
    }

```
### Caso usuario não esteja logado
```javascript

// HTTP Status 401 (Unauthorized)
{
 "mensagem": "O usuário não está autenticado".
}
```


### Caso não seja informado o arquivo a ser enviado.
```javascript
//HTTP Status 400 (Bad Request)

{
 "mensagem": "A seleção de uma imagem é obrigatório"
}
```

<br><br>



## **Listar imagem**

```javascript
GET /arquivo
```

Essa é a rota que será utilizada para obter a URL de todas imagens no servidor de armazenamento.


**REQUISITOS OBRIGATÓRIOS**

  - Obter e retornar a URL e o diretório de todas imagens que estão armazenadas dentro do servidor de armazenamento.

-   **Requisição**  
    
    Não deverá possuir conteúdo no corpo (body) da requisição .

-   **Resposta**  
      
    -  Retornar a URL e o diretório de todas imagens que estão armazenadas dentro do servidor de armazenamento


**Exemplo de requisição**

```javascript
// GET /arquivo
   
```

**Exemplos de resposta**

### Caso de  sucesso na requisição.
```javascript
// HTTP Status 200 (ok)

    {
         "url": 'http://example.com/imagem1.jpg',
         "diretorio": '/imagens/imagem1.jpg',
    },
    {
         "url": 'http://example.com/imagem2.jpg',
         "diretorio": '/imagens/imagem2.jpg',
    }

```
### Caso usuario não esteja logado
```javascript

// HTTP Status 401 (Unauthorized)
{
 "mensagem": "O usuário não está autenticado".
}
```


### Caso não tenha arquivo no banco de dados.
```javascript
// HTTP Status 200 (ok)
[];
```




## **Emplementações de edpoints**

```javascript

// Aplicar validação na exclusão de produto


Deverá ser aplicada uma regra de negócio que não permitirá exclusão de produto que tenha sido registrado em algum pedido.

"Critérios de aceite:"

-  Validar se o produto que está sendo excluído não está vinculado a nenhum pedido, caso estiver, não poderá ser 
```

```javascript

// Aprimorar cadastro de produto


Deverá ser aprimorado o cadastro de produto para permitir vincular uma imagem a um produto. Deverá ser criada uma coluna produto_imagem para que seja possível efetuar o vínculo entre a imagem e o produto.

"Critérios de aceite:"

-  O campo produto_imagem deve ser opcional.
```
```javascript

// Aprimorar atualização de produto


-Deverá ser aprimorada a atualização de produto para permitir vincular uma imagem a um produto existente.


"Critérios de aceite:"

- Caso exista uma imagem vinculada a esse produto, a imagem vinculada anteriormente deverá ser excluída no servidor de armazenamento e substituída pela nova imagem.
- Caso exista uma imagem vinculada a esse produto, e o campo `produto_imagem` de atualização possuir valor `null`deverá ser excluída a imagem vinculada anteriormente e o valor `null` será atribuído a coluna `produto_imagem` deixando o produto sem imagem vinculada.

```

```javascript

// Aprimorar exclusão de produto


-Deverá ser aprimorada a exclusão de produto para que quando o produto for excluído também seja removida a imagem vinculada a ele na servidor de armazenamento.


"Critérios de aceite:"

- Na exclusão do produto a imagem vinculada a este produto deverá ser excluída do servidor de armazenamento.

```
