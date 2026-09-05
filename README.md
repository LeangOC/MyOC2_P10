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

| Technologie | Version |
|---|---|
| Java | 17 LTS |
| Spring Boot | 3.5.x |
| Maven | 3.9.x |
| Node.js | 24 LTS |
| Angular | 21.x |
| TypeScript | 5.9.x |
| PostgreSQL | 17 |
| Docker | version récente |
| WebSocket | Spring WebSocket |
| STOMP | @stomp/stompjs |
| ORM | Spring Data JPA |

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