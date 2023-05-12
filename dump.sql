create database PDV;

create table usuarios(
id serial primary key,
  nome text not null,
  email text unique not null,
  senha text not null
);

create table categorias (
id serial primary key,
  descricao text not null  
);

create table produtos(
id serial primary key, 
descricao text,
quantidade_estoque text,
valor integer,
categoria_id integer references categorias(id)
);

create table clientes (
id serial primary key,
nome text not null,
email text unique not null,
cpf text unique not null,
cep text,
rua text,
numero text,
bairro text,
cidade text,
estado text
);

insert into categorias (descricao) values ('Informática');
insert into categorias (descricao) values ('Celulares');
insert into categorias (descricao) values ('Beleza e Perfumaria');
insert into categorias (descricao) values ('Mercado');
insert into categorias (descricao) values ('Livros e Papelaria');
insert into categorias (descricao) values ('Brinquedos');
insert into categorias (descricao) values ('Moda');
insert into categorias (descricao) values ('Bebê');
insert into categorias (descricao) values ('Games');


create table pedidos (
	id serial primary key,
  cliente_id integer references clientes(id) not null,
  observacao text,
  valor_total  integer not null   
);

create table pedido_produtos (
 id serial primary key, 
  pedido_id integer references pedidos(id) not null,
  produto_id integer references produtos(id) not null,
  quantidade_produto integer not null,
  valor_produto integer not null
);

alter table produtos add column imagem text; 

alter table produtos rename imagem to produto_imagem