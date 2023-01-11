

create database matias;


use matias;




create table contactos(
idContacto int unsigned not null auto_increment,
nombre varchar(150) not null,
apellido varchar(150) not null,
telefono int not null,
email varchar(150) not null,
mensaje varchar(450) not null,
primary key (idContacto)
);
