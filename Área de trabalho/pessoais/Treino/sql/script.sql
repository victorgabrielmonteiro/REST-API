create database if not exists users;
use users;

create table if not exists usuarios (
	id int auto_increment primary key,
    nome varchar(30) not null,
    email varchar(40) unique not null,
    dataNasc date not null,
    senha varchar(30) not null,
    dataCriacao date default (current_timestamp)
);


create table if not exists produtos (
	id int auto_increment primary key,
    nome varchar(30) not null,
    imagem_url varchar(255) not null,
    descricao varchar(500) not null,
	estoque int not null,
    preco decimal (10,2),
    dataCriacao datetime default (current_timestamp)
);

create table if not exists pedidos(
	id int auto_increment primary key,
    id_produto int,
    id_usuario int,
    quantidade_produto int,
    data_adicao timestamp default current_timestamp,
    foreign key (id_produto) references produtos(id),
    foreign key (id_usuario) references usuarios(id)
);

select * from produtos;
select * from usuarios;


INSERT INTO produtos (nome, preco, imagem_url, descricao, estoque) VALUES 
('Tênis Runner Pro', 299.90, 'https://picsum.photos/200', 'Ideal para corridas matinais.', 10),
('Camiseta Tech', 89.00, 'https://picsum.photos/201', 'Tecido respirável que não amassa.', 50),
('Fone Bluetooth v5', 150.00, 'https://picsum.photos/202', 'Bateria de 20 horas e som HD.', 15);