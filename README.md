# YCYW Chat PoC

Proof of Concept du tchat temps réel de **Your Car Your Way (YCYW)**.

Ce projet a pour objectif de valider les choix techniques structurants de l'architecture cible :

**Angular → WebSocket/STOMP → Spring Boot → PostgreSQL**

Le PoC est volontairement limité au tchat. Il ne constitue pas une version complète de l'application YCYW.

---

## 1. Objectifs

Le PoC doit permettre de démontrer :

- la communication temps réel entre Angular et Spring Boot ;
- l'utilisation de WebSocket et STOMP ;
- la persistance des messages dans PostgreSQL ;
- la récupération de l'historique des messages ;
- la communication entre plusieurs clients ;
- une organisation du code compatible avec l'architecture cible ;
- un environnement de développement facilement reproductible.

---

## 2. Stack technique

| Technologie | Version          |
|---|------------------|
| Java | 17               |
| Spring Boot | 3.5.0            |
| Maven | 3.8.8            |
| Node.js | 20.19.4          |
| Angular | 21.2.22          |
| TypeScript | 5.9.3            |
| PostgreSQL | 17               |
| Docker | 29.1.3  |
| WebSocket | Spring WebSocket |
| STOMP | @stomp/stompjs   |
| ORM | Spring Data JPA  |

---

## 3. Architecture

```text
┌─────────────────────────┐
│       Angular 21        │
│                         │
│ Login                   │
│ Chat                    │
│ STOMP Client            │
└────────────┬────────────┘
             │
             │ HTTP / WebSocket
             ▼
┌─────────────────────────┐
│      Spring Boot        │
│                         │
│ REST                    │
│ WebSocket / STOMP       │
│ Services                │
│ JPA                     │
└────────────┬────────────┘
             │
             │ JDBC
             ▼
┌─────────────────────────┐
│      PostgreSQL 17      │
└─────────────────────────┘

---


```
## Structure du projet

```
D:.
├───backend/                # Spring Boot API
│   └───src/
│   │    ├───main/
│   │    │   ├───java/
│   │    │   │   └───com/
│   │    │   │       └───ycyw/
│   │    │   │           └───chatpoc/
│   │    │   │               ├───auth/
│   │    │   │               │   ├───controller/
│   │    │   │               │   ├───dto/
│   │    │   │               │   ├───exception/
│   │    │   │               │   └───service/
│   │    │   │               ├───support/
│   │    │   │               │   ├───config/
│   │    │   │               │   ├───controller/
│   │    │   │               │   ├───dto/
│   │    │   │               │   ├───entity/
│   │    │   │               │   ├───repository/
│   │    │   │               │   └───service/
│   │    │   │               └───user/
│   │    │   │                   ├───entity/
│   │    │   │                   └───repository/
│   │    │   └───resources/
│   │    └───test/
│   │        ├───java/
│   │        │   └───com/
│   │        │       └───ycyw/
│   │        │           └───chatpoc/
│   │        └───resources/
│   ├── .env
│   └── pom.xml
│
├───frontend/            # Angular
│   ├───src/
│   │    │───app/
│   │    │   ├───auth/
│   │    │   ├───chat/
│   │    │   ├───core/
│   │    │   │   └───services/
│   │    │   │───home/
│   │    │   ├── app.component.ts
│   │    │   ├── app.config.ts
│   │    │   ├── app.css
│   │    │   ├── app.html
│   │    │   ├── app.spec.ts
│   │    │   └── app-routes.ts
│   │    ├── index.html
│   │    ├── main.ts
│   │    └── styles.scss 
│   ├── angular.json    
│   └── package.json
│
├── docs/                 # Documentation projet      
│   ├── Dossier_Architecture.md
│   ├── cahier_des_charges.md
│   └── Audit.md
└── docker-compose.yml     # PostgreSQL 