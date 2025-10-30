npx prisma generate

npx prisma migrate dev --name init

npx prisma db push --force-reset

npx prisma studio

npm run generate 

npm run dev

// Caso de reset do banco
npx prisma migrate reset


Cart
Endpoints para gerenciamento de carrinho



POST
/cart
Adiciona um item ao carrinho

Cria um novo item no carrinho de compras vinculando um produto a um pedido existente.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "quantify": 3,
  "orderId": 1,
  "produtoId": 5
}
Responses
Code	Description	Links
201	
Item adicionado ao carrinho com sucesso

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 8,
  "quantify": 3,
  "orderId": 1,
  "produtoId": 5
}
No links
301	
Erros (Pedido ou produto)

Media type

application/json
Example Value
Schema
{
  "error": "Pedido não encontrado | Produto não encontrado"
}
No links

GET
/cart
Lista os itens do carrinho

Retorna todos os itens do carrinho. É possível filtrar por quantidade (quantify) usando query params.

Parameters
Try it out
Name	Description
quantify
integer
(query)
Filtra os itens do carrinho pela quantidade.

Example : 2

2
Responses
Code	Description	Links
200	
Lista de itens do carrinho retornada com sucesso

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": 1,
    "quantify": 2,
    "orderId": 1,
    "produtoId": 5
  }
]
No links

GET
/cart/{id}
Busca um item do carrinho pelo ID

Retorna os dados de um item específico do carrinho com base no seu ID.

Parameters
Try it out
Name	Description
id *
integer
(path)
ID do item do carrinho a ser buscado

Example : 1

1
Responses
Code	Description	Links
200	
Item do carrinho encontrado com sucesso

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 1,
  "quantify": 2,
  "orderId": 1,
  "produtoId": 5
}
No links

DELETE
/cart/{id}
Remove um item do carrinho pelo ID


Deleta um item específico do carrinho com base no seu ID. É necessário estar autenticado.

Parameters
Try it out
Name	Description
id *
integer
(path)
ID do item do carrinho a ser removido

Example : 1

1
Responses
Code	Description	Links
200	
Item do carrinho removido com sucesso

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 1,
  "quantify": 2,
  "orderId": 1,
  "produtoId": 5
}
No links
401	
Erro (Token)

Media type

application/json
Example Value
Schema
{
  "error": "Token não enviado"
}
No links
403	
Erro (Token)

Media type

application/json
Example Value
Schema
{
  "erro": "Token inválido ou expirado"
}
No links
404	
Erro

Media type

application/json
Example Value
Schema
{
  "error": "não encontrado"
}
No links

PUT
/cart/{id}
Atualiza um item do carrinho pelo ID

Atualiza os dados de um item específico do carrinho com base no seu ID. Atualmente, é possível atualizar quantify, orderId e produtoId.

Parameters
Try it out
Name	Description
id *
integer
(path)
ID do item do carrinho a ser atualizado

Example : 1

1
Request body

application/json
Example Value
Schema
{
  "quantify": 1,
  "orderId": 9,
  "produtoId": 9
}
Responses
Code	Description	Links
200	
Item do carrinho atualizado com sucesso

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 1,
  "quantify": 5,
  "orderId": 9,
  "produtoId": 9
}
No links
404	
Carrinho não encontrado

Media type

application/json
Example Value
Schema
{
  "error": "Carrinho não encontrado"
}
No links
Ingredientes
Rotas de gerenciamento de ingredientes



POST
/ingredientes
Cria um novo ingrediente


Registra um novo ingrediente no sistema (acesso restrito).

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "name": "Farinha",
  "description": "Ingrediente base para bolos",
  "quantify": 20,
  "stock": 100,
  "maturity": "2025-12-01"
}
Responses
Code	Description	Links
201	
Ingrediente criado com sucesso

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 1,
  "name": "Farinha",
  "description": "Ingrediente base para bolos",
  "quantify": 20,
  "stock": 100,
  "maturity": "2025-12-01T00:00:00.000Z"
}
No links
400	
Erro nos dados enviados

No links

GET
/ingredientes
Lista todos os ingredientes

Retorna uma lista de todos os ingredientes, com suporte a filtros opcionais por nome, quantidade ou descrição.

Parameters
Try it out
Name	Description
name
string
(query)
Filtra ingredientes pelo nome

name
quantify
number
(query)
Filtra ingredientes pela quantidade

quantify
description
string
(query)
Filtra ingredientes pela descrição

description
Responses
Code	Description	Links
200	
Lista de ingredientes retornada com sucesso

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": 0,
    "name": "string",
    "description": "string",
    "quantify": 0,
    "stock": 0,
    "maturity": "2025-10-30"
  }
]
No links

GET
/ingredientes/{id}
Busca um ingrediente pelo ID

Retorna um ingrediente específico pelo seu ID.

Parameters
Try it out
Name	Description
id *
integer
(path)
ID do ingrediente

id
Responses
Code	Description	Links
200	
Ingrediente encontrado

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 1,
  "name": "Farinha",
  "description": "Ingrediente base para bolos",
  "quantify": 20,
  "stock": 100,
  "maturity": "2025-12-01"
}
No links
400	
Ingrediente não encontrado

No links

DELETE
/ingredientes/{id}
Exclui um ingrediente


Remove permanentemente um ingrediente pelo ID (acesso restrito).

Parameters
Try it out
Name	Description
id *
integer
(path)
ID do ingrediente a ser removido

id
Responses
Code	Description	Links
200	
Ingrediente removido com sucesso

No links
404	
Ingrediente não encontrado

No links

PUT
/ingredientes/{id}
Atualiza um ingrediente


Atualiza parcialmente os dados de um ingrediente (acesso restrito).

Parameters
Try it out
Name	Description
id *
integer
(path)
ID do ingrediente a ser atualizado

id
Request body

application/json
Example Value
Schema
{
  "name": "Açúcar refinado",
  "quantify": 30,
  "stock": 80,
  "description": "Açúcar branco usado em bolos e doces",
  "maturity": "2025-11-10"
}
Responses
Code	Description	Links
200	
Ingrediente atualizado com sucesso

No links
400	
Erro ao atualizar ingrediente

No links
Orders
Rotas para gerenciamento de pedidos



POST
/orders
Cria um novo pedido

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "which_product": "Cupcake",
  "who_order": "Maria",
  "value": 15.5,
  "quantify": 6,
  "delivery_day": "2025-11-02",
  "userId": 2,
  "paymentId": 1
}
Responses
Code	Description	Links
201	
Pedido criado com sucesso

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 1,
  "which_product": "Bolo de Chocolate",
  "who_order": "Gabriel",
  "value": 49.9,
  "quantify": 2,
  "delivery_day": "2025-10-30",
  "userId": 3,
  "paymentId": 1
}
No links
400	
Erro nos dados enviados

No links

GET
/orders/{id}
Retorna um pedido específico pelo ID


Parameters
Try it out
Name	Description
id *
integer
(path)
ID do pedido

id
Responses
Code	Description	Links
200	
Pedido encontrado

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 1,
  "which_product": "Bolo de Chocolate",
  "who_order": "Gabriel",
  "value": 49.9,
  "quantify": 2,
  "delivery_day": "2025-10-30",
  "userId": 3,
  "paymentId": 1
}
No links
400	
Pedido não encontrado

No links

DELETE
/orders/{id}
Exclui um pedido existente


Parameters
Try it out
Name	Description
id *
integer
(path)
ID do pedido a ser excluído

id
Responses
Code	Description	Links
200	
Pedido excluído com sucesso

No links
404	
Pedido não encontrado

No links

PUT
/orders/{id}
Atualiza um pedido existente


Parameters
Try it out
Name	Description
id *
integer
(path)
ID do pedido

id
Request body

application/json
Example Value
Schema
{
  "value": 59.9,
  "quantify": 3
}
Responses
Code	Description	Links
200	
Pedido atualizado com sucesso

No links
400	
Erro ao atualizar o pedido

No links
Payments
Rotas de gerenciamento dos pagamentos da confeitaria



POST
/payments
Cria um novo pagamento

Cria um pagamento no sistema. É possível pagar via cartão, pix ou dinheiro. Se informado cartão, ele será validado.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "card": "4111111111111111",
  "pix": "123e4567-e89b-12d3-a456-426614174000",
  "money": true,
  "value": 100.5,
  "scheduling": "2025-10-25T15:30:00Z"
}
Responses
Code	Description	Links
201	
Pagamento criado com sucesso

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 1,
  "card": "4111111111111111",
  "pix": "123e4567-e89b-12d3-a456-426614174000",
  "money": true,
  "value": 100.5,
  "scheduling": "2025-10-25T15:30:00Z"
}
No links
400	
Erro (cartão)

Media type

application/json
Example Value
Schema
{
  "error": "Cartão inválido"
}
No links

GET
/payments
Lista todos os pagamentos

Retorna todos os pagamentos cadastrados. É possível filtrar por valor ou data de agendamento usando query parameters.

Parameters
Try it out
Name	Description
value
number($float)
(query)
Filtra pagamentos pelo valor

Example : 100.5

100.5
scheduling
string($date-time)
(query)
Filtra pagamentos pela data de agendamento

Example : 2025-10-25T15:30:00Z

2025-10-25T15:30:00Z
Responses
Code	Description	Links
200	
Lista de pagamentos retornada com sucesso

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": 1,
    "card": "4111111111111111",
    "pix": "123e4567-e89b-12d3-a456-426614174000",
    "money": true,
    "value": 100.5,
    "scheduling": "2025-10-25T15:30:00Z"
  }
]
No links

GET
/payments/{id}
Busca um pagamento específico

Retorna um pagamento baseado no ID informado.

Parameters
Try it out
Name	Description
id *
integer
(path)
ID do pagamento

Example : 1

1
Responses
Code	Description	Links
200	
Pagamento encontrado

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 1,
  "card": "4111111111111111",
  "pix": "123e4567-e89b-12d3-a456-426614174000",
  "money": true,
  "value": 100.5,
  "scheduling": "2025-10-25T15:30:00Z"
}
No links
404	
Pagamento não encontrado

No links

DELETE
/payments/{id}
Deleta um pagamento existente

Remove um pagamento do banco de dados usando o ID informado.

Parameters
Try it out
Name	Description
id *
integer
(path)
ID do pagamento que será deletado

Example : 1

1
Responses
Code	Description	Links
200	
Pagamento deletado com sucesso

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 1,
  "card": "4111111111111111",
  "pix": "123e4567-e89b-12d3-a456-426614174000",
  "money": true,
  "value": 100.5,
  "scheduling": "2025-10-25T15:30:00Z"
}
No links
404	
Pagamento não encontrado

No links

PUT
/payments/{id}
Atualiza um pagamento existente

Atualiza os dados de um pagamento no banco de dados com base no ID informado.

Parameters
Try it out
Name	Description
id *
integer
(path)
ID do pagamento a ser atualizado

Example : 1

1
Request body

application/json
Example Value
Schema
{
  "card": "5555555555554444",
  "pix": "987e6543-e89b-12d3-a456-426614174999",
  "money": false,
  "value": 200.75,
  "scheduling": "2025-11-05T15:00:00Z"
}
Responses
Code	Description	Links
200	
Pagamento atualizado com sucesso

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 1,
  "card": "5555555555554444",
  "pix": "987e6543-e89b-12d3-a456-426614174999",
  "money": false,
  "value": 200.75,
  "scheduling": "2025-11-05T15:00:00Z"
}
No links
404	
Error

No links
Products
Rotas de gerenciamento dos produtos da confeitaria



POST
/products
Cria um novo produto

Registra um novo produto no sistema.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "name": "Produto Exemplo",
  "description": "Produto de teste para demonstração",
  "quantify": "10",
  "stock": "Em estoque",
  "maturity": "2025-12-31",
  "foto": "https://example.com/foto.jpg",
  "preco": 49.9
}
Responses
Code	Description	Links
201	
Produto criado com sucesso

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 1,
  "name": "Bolo de aniversário",
  "description": "Chocolate e leite ninho com morango",
  "quantify": "2",
  "stock": "5",
  "maturity": "2025-12-31",
  "foto": "https://example.com/foto.jpg",
  "preco": 79.9
}
No links

GET
/products
Lista todos os produtos

Retorna uma lista de produtos. Pode ser filtrada por description, name ou `quantify' usando query parameters.

Parameters
Try it out
Name	Description
description
string
(query)
Filtra produtos pela descrição

Example : Chocolate

Chocolate
name
string
(query)
Filtra produtos pelo nome

Example : Bolo

Bolo
quantify
string
(query)
Filtra produtos pela quantidade

Example : 5

5
Responses
Code	Description	Links
200	
Lista de produtos retornada com sucesso

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": 1,
    "name": "Bolo de cenoura",
    "description": "Cobertura de chocolate",
    "quantify": 3,
    "stock": 5,
    "maturity": "2025-12-31",
    "foto": "http://site.com/foto.png",
    "preco": 59.9
  }
]
No links

GET
/products/{id}
Busca um produto pelo ID

Retorna os dados de um produto específico com base no seu ID.

Parameters
Try it out
Name	Description
id *
integer
(path)
ID do produto a ser buscado.

Example : 1

1
Responses
Code	Description	Links
200	
Produto encontrado com sucesso

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 1,
  "name": "Bolo de amêndoa",
  "description": "amêndua ",
  "quantify": 2,
  "stock": 3,
  "maturity": "2025-12-31",
  "foto": "http://site.com/foto.png",
  "preco": 100
}
No links
404	
Erro (produto)

Media type

application/json
Example Value
Schema
{
  "error": "Produto não encontrado"
}
No links

DELETE
/products/{id}
Exclui um produto pelo ID


Remove um produto específico do banco de dados com base no seu ID. É necessário estar autenticado e possuir a permissão ProductDelete.

Parameters
Try it out
Name	Description
id *
integer
(path)
ID do produto a ser excluído.

Example : 1

1
Responses
Code	Description	Links
200	
Produto excluído com sucesso

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 1,
  "name": "Bolo de amêndoa",
  "description": "amêndua",
  "quantify": 2,
  "stock": 3,
  "maturity": "2025-12-31",
  "foto": "http://site.com/foto.png",
  "preco": 100
}
No links
401	
Erro (Token ou autentificação)

Media type

application/json
Example Value
Schema
{
  "erro": "Token não enviado | Não autenticado"
}
No links
403	
Erros (Token, Acesso, Permissão )

Media type

application/json
Example Value
Schema
{
  "erro": "Token inválido ou expirado | Acesso negado | Usuário não possui permissão "
}
No links
404	
Erro (produto)

Media type

application/json
Example Value
Schema
{
  "error": "Produto não encontrado"
}
No links

PUT
/products/{id}
Atualiza um produto pelo ID


Atualiza os dados de um produto específico com base no seu ID. É necessário estar autenticado e possuir a permissão ProductUpdate.

Parameters
Try it out
Name	Description
id *
integer
(path)
ID do produto a ser atualizado.

Example : 1

1
Request body

application/json
Example Value
Schema
{
  "name": "Bolo de chocolate",
  "description": "Bolo de chocolate com cobertura",
  "quantify": 5,
  "stock": 10,
  "maturity": "2025-11-30"
}
Responses
Code	Description	Links
200	
Produto atualizado com sucesso

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 1,
  "name": "Bolo de Morango",
  "description": "Nihno com morango",
  "quantify": 2,
  "stock": 4,
  "maturity": "2025-11-30",
  "foto": "http://site.com/foto.png",
  "preco": 150
}
No links
401	
(Token ou autentificação)

Media type

application/json
Example Value
Schema
{
  "erro": "Token não enviado | Não autenticado"
}
No links
403	
Erros (Token, Acesso, Usuário)

Media type

application/json
Example Value
Schema
{
  "erro": "Acesso negado | Token inválido | Usuário não possui acesso"
}
No links
404	
Erro (produto)

Media type

application/json
Example Value
Schema
{
  "error": "Produto não encontrado"
}
No links
Receitas
Rotas de gerenciamento das receitas da confeitaria



POST
/receitas
Cria uma nova receita


Registra uma nova receita no sistema. Verifica se o ingrediente e o produto informados existem antes da criação.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "name": "Massa de bolo de chocolate",
  "description": "Receita base para bolos de chocolate",
  "quantify": 5,
  "stock": 20,
  "maturity": "2025-12-01",
  "ingredientId": 1,
  "produtoId": 3
}
Responses
Code	Description	Links
201	
Receita criada com sucesso

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 1,
  "name": "Massa de bolo de chocolate",
  "description": "Receita base para bolos de chocolate",
  "quantify": 5,
  "stock": 20,
  "maturity": "2025-12-01T00:00:00.000Z"
}
No links
301	
Ingrediente ou produto informado não existe

Media type

application/json
Example Value
Schema
{
  "error": "Ingrediente não identificado"
}
No links
400	
Erro nos dados enviados

No links

GET
/receitas
Lista todas as receitas

Retorna todas as receitas cadastradas, com suporte a filtros opcionais por nome, descrição ou quantidade.

Parameters
Try it out
Name	Description
name
string
(query)
Filtra receitas pelo nome

name
description
string
(query)
Filtra receitas pela descrição

description
quantify
number
(query)
Filtra receitas pela quantidade

quantify
Responses
Code	Description	Links
200	
Lista de receitas retornada com sucesso

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": 0,
    "name": "string",
    "description": "string",
    "quantify": 0,
    "stock": 0,
    "maturity": "2025-10-30"
  }
]
No links

GET
/receitas/{id}
Busca uma receita pelo ID

Retorna uma receita específica pelo ID informado.

Parameters
Try it out
Name	Description
id *
integer
(path)
ID da receita

id
Responses
Code	Description	Links
200	
Receita encontrada

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 1,
  "name": "Massa de bolo de chocolate",
  "description": "Receita base para bolos de chocolate",
  "quantify": 5,
  "stock": 20,
  "maturity": "2025-12-01"
}
No links
404	
Receita não encontrada

No links

DELETE
/receitas/{id}
Exclui uma receita


Remove uma receita pelo seu ID. Acesso restrito a usuários autorizados.

Parameters
Try it out
Name	Description
id *
integer
(path)
ID da receita a ser removida

id
Responses
Code	Description	Links
200	
Receita excluída com sucesso

No links
404	
Receita não encontrada

No links

PUT
/receitas/{id}
Atualiza uma receita existente


Atualiza parcialmente ou completamente uma receita existente (acesso restrito).

Parameters
Try it out
Name	Description
id *
integer
(path)
ID da receita a ser atualizada

id
Request body

application/json
Example Value
Schema
{
  "name": "Massa de bolo simples",
  "description": "Receita base para bolos simples",
  "quantify": 10,
  "stock": 50,
  "maturity": "2025-11-15"
}
Responses
Code	Description	Links
200	
Receita atualizada com sucesso

No links
404	
Receita não encontrada

No links
Users
Endpoints para gerenciamento de usuários



POST
/users
Cria um novo usuário

Registra um novo usuário no sistema com validação de email, senha, telefone e CPF.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "name": "João da Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "phone": "(11)98765-4321",
  "CPF": "123.456.789-00"
}
Responses
Code	Description	Links
201	
Usuário criado com sucesso

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 1,
  "name": "João da Silva",
  "email": "joao@email.com",
  "phone": "(11)98765-4321",
  "CPF": "123.456.789-00"
}
No links
400	
Erros de validação (email, senha, telefone, CPF)

Media type

application/json
Example Value
Schema
{
  "error": "Email inválido | Senha fraca | Telefone inválido | CPF inválido"
}
No links

GET
/users
Lista todos os usuários

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
Lista de usuários retornada com sucesso

Media type

application/json
Controls Accept header.
Example Value
Schema
[
  {
    "id": 1,
    "name": "João",
    "email": "joaosilvao@gmail.com",
    "phone": "(16)99979-9695",
    "CPF": "121.468.932.70"
  }
]
No links

POST
/users/aunt
Autentica um usuário

Valida email e senha do usuário e retorna um token JWT válido por 8 horas.

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "email": "joao@email.com",
  "senha": "senha123"
}
Responses
Code	Description	Links
200	
Autenticação realizada com sucesso, token retornado

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
No links
401	
Erro de login (senha)

Media type

application/json
Example Value
Schema
{
  "erro": "Erro na senha"
}
No links
404	
Erro no login (email)

Media type

application/json
Example Value
Schema
{
  "erro": "Erro no Email"
}
No links

GET
/users/{id}
Busca um usuário pelo ID

Retorna os dados de um usuário específico com base no seu ID.

Parameters
Try it out
Name	Description
id *
integer
(path)
ID do usuário a ser buscado.

1
Responses
Code	Description	Links
200	
Usuário encontrado com sucesso.

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 1,
  "name": "João da Silva",
  "email": "joao@email.com",
  "phone": "(16)98765-4321",
  "CPF": "123.456.789-00"
}
No links
404	
Erro (usuário)

Media type

application/json
Example Value
Schema
{
  "error": "Usuário não encontrado"
}
No links

DELETE
/users/{id}
Remove um usuário pelo ID


Exclui um usuário existente no sistema usando o ID fornecido. Requer autenticação e permissão de exclusão.

Parameters
Try it out
Name	Description
id *
integer
(path)
ID do usuário a ser excluído

Example : 1

1
Responses
Code	Description	Links
200	
Usuário excluído com sucesso

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 1,
  "name": "João da Silva",
  "email": "joao@email.com",
  "phone": "(16)98765-4321",
  "CPF": "123.456.789-00"
}
No links
404	
Erro (usuário)

Media type

application/json
Example Value
Schema
{
  "error": "Usuário não encontrado"
}
No links

PUT
/users/{id}
Atualiza os dados de um usuário


Permite atualizar o nome, email e telefone de um usuário existente pelo ID. Requer autenticação e permissão de atualização.

Parameters
Try it out
Name	Description
id *
integer
(path)
ID do usuário a ser atualizado

Example : 1

1
Request body

application/json
Example Value
Schema
{
  "name": "João da Silva",
  "email": "joao@email.com",
  "phone": "(11)98765-4321"
}
Responses
Code	Description	Links
200	
Usuário atualizado com sucesso

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "id": 1,
  "name": "João da Silva",
  "email": "joao@email.com",
  "phone": "(11)98765-4321"
}
No links
401	
Erro (token ou autetificação)

Media type

application/json
Example Value
Schema
{
  "erro": "Token não enviado | Não autenticado"
}
No links
403	
erro (Token, Acesso, Usuário)

Media type

application/json
Example Value
Schema
{
  "erro": " Token Invalido ou expirado | Acesso negado | O usuário não possui permissão "
}
No links
404	
Erro (usuário)

Media type

application/json
Example Value
Schema
{
  "error": "Usuário não encontrado"
}