Optimisation et performance projet M1
===================
L'objectifs de ce projet est de développer une API Rest avec node.js qui sera connectée au cloud avec un cluster mongoDB.

## Table des matières

- [Schematisation du cluster MongoDB et de l'architecture API REST](#architecture-technique)
- [Description du projet](#description-du-projet)
- [Configuration du cluster cloud](#configuration-du-cluster-cloud)
- [Configuration du cluster local manuel](#configuration-du-cluster-local-manuel)
- [Configuration du cluster local avec dockercompose](#configuration-du-cluster-local-avec-dockercompose)
- [Techologie utilisée](#technologie-utilisée)


### Schéma architecture REST API avec un cluster mongoDB Atlas
![alt text](https://github.com/davidle93/mds_m1_le_david_optimperf/blob/master/sch%C3%A9ma/Architecture%20REST%20avec%20un%20cluster%20mongoDB.jpg)

Ce schéma est composé d'un client, d'une API REST et d'un cluster MongoDB Atlas.

Le client est une application qui envoie des demandes à un serveur. L'interraction entre le client et le serveur se fera avec des flux Rest/Json.

L'API REST est une architecture de données et une méthodologie de conception qui produit des sorties et des comportements prévisibles et cohérents en recevant un ensemble de méthodes standard appelées verbes (GET, POST, PUT, DELETE). Elle se chargera d'effectuer des requêtes sur le cluster de mongoDB Atlas ainsi que les données avant de les restituer à la partie client via des flux JSON.

Un cluster est un ensemble de machine, qui peuvent être par exemple des réplicaSets c'est à dire des réplications de données. Par exemple dans ce schéma vous pouvez voir un primary et deux secondary qui sont des réplications de données de la primary. L'avantage de ce système, c'est d'avoir une sécurité, une sorte de back-up par exemple lorsque que la base de donnée primary tombe, une secondary le remplacera d'aussitôt, cela permet de maintenir une continuité de donnée en toute fiabilité.


### Description du projet
Tout d'abord, pour la partie back-end, j'ai utilisé Express.js, c'est un Framework JS conçu pour la création d'un serveur d'application. Le serveur établira une connexion au cluster MongoDB, avec l'outil mongoose et se chargera d'effectuer des requêtes sur la base de données mongoDB. L'interaction entre le serveur et la base de donnée se fera avec des flux Rest/JSON.

Un système de CRUD (Create, Read, Update, Delete) TodoList est mis en place, après la définition de la routes et du model dans le serveur applicatif.

Dans le cadre de l'exercice du projet, il y'aurra deux configurations cluster, un cluster local et un cluster dans le cloud (MongoDB Atlas).

Une configuration docker-compose.yml et dockerFile est mis en place pour l'automatisation ...
### Configuration du cluster cloud

La configuration du cluster de mongoDB Atlas, est assez simple:
1) Tout d'abord, il faut se créer un compte mongoDB Atlas.
2) Créer un projet.
3) Choisissez le pays pour l'hébergement cloud.
4) Créer votre cluster (réplique simple à 3 noeuds par défaut)
5) Configurer la white list, si vous voulez donner accès à tout le monde, entrer cette adresse 0.0.0.0/0 dans l'IP Whitelist.
6) Etablir une connexion.
7) Configurer user + password.
8) Après avoir établie la connexion vous pouvez récupérer l'url ci-dessous et l'intégrer dans votre API REST.

### Configuration du cluster local manuel

Dans cette partie je vais vous expliquez, comment créer un cluster mongoDB en local manuellement.

Pour commencer télécharger l'image docker, avec la commande ci-dessous:
```sh
docker pull mongo
```

Créer ensuite un réseau docker
```sh
docker network create mongo-cluster-dev
```

Démarrer les conteneurs
```sh
docker run -d --net mongo-cluster-dev -p 27017:27017 --name mongoset1 mongo:4 mongod --replSet mongodb-replicaset --port 27017
```

```sh
docker run -d --net mongo-cluster-dev -p 27018:27018 --name mongoset2 mongo:4 mongod --replSet mongodb-replicaset --port 27018
```

```sh
docker run -d --net mongo-cluster-dev -p 27019:27019 --name mongoset3 mongo:4 mongod --replSet mongodb-replicaset --port 27019
```


Il faut ensuite les ajouter dans votre fichier de configuration /etc/hosts
```sh
sudo vim /etc/hosts

Ajouter à la fin du fichier
127.0.0.1 mongoset1 mongoset2 mongoset3
```

Pour pouvoir configurer un replicatSet vous allez devoir d'abord vous connecter à un conteneur et exécuter la commande ci-dessous:
```sh
docker exec -it mongoset1 mongo
```

Copiez ce qui suit et collez dans le shell
```sh
db = (new Mongo('localhost:27017')).getDB('test')
config={"_id":"mongodb-replicaset","members":[{"_id":0,"host":"mongoset1:27017"},{"_id":1,"host":"mongoset2:27018"},{"_id":2,"host":"mongoset3:27019"}]}
rs.initiate(config)
```
### Configuration du cluster local avec dockercompose

```bash
version: '3.1'

services:
  mongo_one:
    container_name: mongo1
    image: mongo
    command: mongod --replSet my-mongo-set
    ports:
      - 30001:27017
    networks:
      - my-mongo-cluster

  mongo_two:
    container_name: mongo2
    image: mongo
    command: mongod --replSet my-mongo-set
    ports:
      - 30002:27017
    networks:
      - my-mongo-cluster

  mongo_three:
    container_name: mongo3
    image: mongo
    command: mongod --replSet my-mongo-set
    ports:
      - 30003:27017
    networks:
      - my-mongo-cluster

networks:
  my-mongo-cluster:
```



### Technologie utilisée

* [Express](https://www.npmjs.com/package/express) - Framework d'application réseau Node.js (back-end)
* [Nodemon](https://www.npmjs.com/package/nodemon) - Outil qui permet de redémarrer automatique le serveur si un des fichiers de l'application est modifié. (back-end)
* [Mongoose](https://www.npmjs.com/package/mongoose) - Mongoose est une bibliothèque ODM (Object Data Modeling) pour MongoDB et Node.js (back-end)
* [BodyParser](https://www.npmjs.com/package/body-parsers) - Middleware (back-end)
* [React](https://www.npmjs.com/package/body-parsers) - Framework JS front-end
* [React Redux](https://www.npmjs.com/package/body-parsers) - Conteneur d'état prévisible (front-end)

