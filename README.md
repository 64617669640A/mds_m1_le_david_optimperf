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

Dans le cadre de l'exercice du projet, il y'aurra deux configurations cluster, un cluster local qui serra expliqué ci-dessous et un cluster dans le Cloud, expliqué au-dessus (MongoDB Atlas).

Une configuration docker-compose.yml et dockerFile est mis en place pour l'automatisation ...

### Configuration local

Dans cette partie je vais vous expliquez, comment créer un cluster mongoDB en local manuellement.

Pour commencer télécharger l'image docker, avec la commande ci-dessous:
``docker pull mongo``

Créer ensuite un réseau docker
``docker network create mongo-cluster-dev``

Démarrer les conteneurs
``docker run -d --net mongo-cluster-dev -p 27017:27017 --name mongoset1 mongo:4 mongod --replSet mongodb-replicaset --port 27017``

``docker run -d --net mongo-cluster-dev -p 27018:27018 --name mongoset2 mongo:4 mongod --replSet mongodb-replicaset --port 27018``

``docker run -d --net mongo-cluster-dev -p 27019:27019 --name mongoset3 mongo:4 mongod --replSet mongodb-replicaset --port 27019``

Il faut ensuite les ajouter dans votre fichier de configuration /etc/hosts
```
sudo vim /etc/hosts

Ajouter à la fin du fichier
127.0.0.1 mongoset1 mongoset2 mongoset3
```
Pour pouvoir configurer un replicatSet vous allez devoir d'abord vous connecter à un conteneur et exécuter la commande ci-dessous:
``docker exec -it mongoset1 mongo``

Copiez ce qui suit et collez dans le shell
```
db = (new Mongo('localhost:27017')).getDB('test')
config={"_id":"mongodb-replicaset","members":[{"_id":0,"host":"mongoset1:27017"},{"_id":1,"host":"mongoset2:27018"},{"_id":2,"host":"mongoset3:27019"}]}
rs.initiate(config)
```




### Fabriqué avec

Le serveur d'application:
* [Express](https://www.npmjs.com/package/express)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Mongoose](https://www.npmjs.com/package/mongoose)
* [BodyParser](https://www.npmjs.com/package/body-parsers)
