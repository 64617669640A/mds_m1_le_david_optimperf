Optimisation et performance projet M1
===================
L'objectifs de ce projet est de développer une API Rest avec node.js qui sera connectée au cloud avec un cluster mongoDB.

## Table des matières

- [Schematisation du cluster MongoDB et de l'architecture API REST](#architecture-technique)
- [Description du projet](#description-du-projet)
- [Configuration local](#configuration-local)


### Schéma architecture REST API avec un cluster mongoDB Atlas
![alt text](https://github.com/davidle93/mds_m1_le_david_optimperf/blob/master/sch%C3%A9ma/Architecture%20REST%20avec%20un%20cluster%20mongoDB.jpg)

Ce schéma est composé d'un client, d'une API REST et d'un cluster MongoDB Atlas.

Le client est une application qui envoie des demandes à un serveur. L'interraction entre le client et le serveur se fera avec des flux Rest/Json.

L'API REST est une architecture de données et une méthodologie de conception qui produit des sorties et des comportements prévisibles et cohérents en recevant un ensemble de méthodes standard appelées verbes (GET, POST, PUT, DELETE). Elle se chargera d'effectuer des requêtes sur le cluster de mongoDB Atlas ainsi que les données avant de les restituer à la partie client via des flux JSON.

Un cluster est un ensemble de machine, qui peuvent être par exemple des réplicaSets c'est à dire des réplications de données. Par exemple dans ce schéma vous pouvez voir un primary et deux secondary qui sont des réplications de données de la primary. L'avantage de ce système, c'est d'avoir une sécurité, une sorte de back-up par exemple lorsque que la base de donnée primary tombe, une secondary le remplacera d'aussitôt, cela permet de maintenir une continuité de donnée en toute fiabilité.


### Description du projet
Tout d'abord, pour la partie back-end, j'ai utilisé Express.js, c'est un Framework JS conçu pour la création d'un serveur d'application. Le serveur établira une connexion au cluster MongoDB, avec l'outil mongoose et se chargera d'effectuer des requêtes sur la base de données mongoDB. L'interaction entre le serveur et la base de donnée se fera avec des flux Rest/JSON.

Un système de CRUD (Create, Read, Update, Delete) TodoList est mis en place, après la définition de la routes et du model dans le serveur applicatif.

Dans le cadre de l'exercice du projet, il y'aurra deux configurations cluster, un cluster local qui serra expliqué ci-dessous et un cluster dans le Cloud, expliqué au-dessous (MongoDB Atlas).

Une configuration docker-compose.yml et dockerFile est mis en place pour l'automatisation ...

### Configuration local

mongoset1
``docker run -d --net mongo-cluster-dev -p 27017:27017 --name mongoset1 mongo mongod --replSet rs0 --port 27017 --logpath /tmp/mongo1.log``
mongoset2
``docker run -d --net mongo-cluster-dev -p 27018:27018 --name mongoset2 mongo mongod --replSet rs0 --port 27017 --logpath /tmp/mongo2.log``
mongoset3
``docker run -d --net mongo-cluster-dev -p 27019:27019 --name mongoset3 mongo mongod --replSet rs0 --port 27017 --logpath /tmp/mongo3.log``
mongoset4
``docker run -d --net mongo-cluster-dev -p 27020:27020 --name mongoset4 mongo mongod --replSet rs0 --port 27017 --logpath /tmp/mongo4.log``
mongoset5
``docker run -d --net mongo-cluster-dev -p 27021:27021 --name mongoset5 mongo mongod --replSet rs0 --port 27017 --logpath /tmp/mongo5.log``


### Fabriqué avec

Le serveur d'application:
* [Express](https://www.npmjs.com/package/express)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Mongoose](https://www.npmjs.com/package/mongoose)
* [BodyParser](https://www.npmjs.com/package/body-parsers)
