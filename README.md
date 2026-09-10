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
## 4. Structure du projet

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
```

## Installation
```bash
git clone git@github.com:anthony-openclassroom/p10-yourcaryourway.git ycyw
cd ycyw
```

### 2. Démarrer la base de données

```bash
docker compose up -d
```

PostgreSQL sera disponible sur `localhost:5433`.

### 3. Configurer le backend

```bash
cd backend
cp .env.sample .env
```

Éditer `.env` si nécessaire (les valeurs par défaut fonctionnent avec le `docker-compose.yml`) :

```env
SPRING_PROFILES_ACTIVE=dev

DATABASE_URL=jdbc:postgresql://localhost:5433/ycyw_dev
DATABASE_USERNAME=ycyw
DATABASE_PASSWORD=dev_password

FRONTEND_URL=http://localhost:4200
```

### 4. Installer les dépendances frontend

```bash
cd ../frontend
npm install
```

---

## Lancer le projet

Ouvrir **deux terminaux**.

**Terminal 1 - Backend**

```bash
cd backend
./mvnw spring-boot:run
```

API disponible sur `http://localhost:8081`
Swagger UI sur `http://localhost:8081/swagger-ui.html`

**Terminal 2 - Frontend**

```bash
cd frontend
npm start
```

Application disponible sur `http://localhost:4200`

---

## Utiliser le tchat (mode démo)

Le POC simule une session entre deux rôles via deux onglets. Aucune authentification n'est requise.

1. Ouvrir `http://localhost:4200` → cliquer **Contacter le support**
2. Une session est créée automatiquement et l'URL contient `?sessionId=...&role=client`
3. Copier le **lien agent** affiché dans le header du tchat
4. Ouvrir ce lien dans un **second onglet** → vue agent active
5. Les deux onglets communiquent en temps réel via WebSocket

---

## API REST

Base URL : `http://localhost:8081/api`

| Méthode | Endpoint                       | Description                         |
| ------- | ------------------------------ | ----------------------------------- |
| `POST`  | `/chat/sessions`               | Créer une session de tchat          |
| `GET`   | `/chat/sessions/{id}/messages` | Récupérer l'historique des messages |
| `PATCH` | `/chat/sessions/{id}/close`    | Fermer une session                  |

La documentation complète (schémas, exemples) est disponible sur **Swagger UI** :
`http://localhost:8081/swagger-ui.html`

---

## WebSocket (STOMP -> Simple Text Oriented Messaging Protocol)

Point de connexion : `http://localhost:8081/ws-sockjs` (SockJS fallback activé)

| Type          | Destination               | Description                         |
| ------------- | ------------------------- | ----------------------------------- |
| **Subscribe** | `/topic/chat/{sessionId}` | Recevoir les messages d'une session |
| **Publish**   | `/app/chat/{sessionId}`   | Envoyer un message                  |

**Format du message envoyé :**

```json
{
	"content": "Bonjour, j'ai besoin d'aide.",
	"senderRole": "client"
}
```

**Format du message reçu :**

```json
{
	"id": "uuid",
	"sessionId": "uuid",
	"senderRole": "client",
	"content": "Bonjour, j'ai besoin d'aide.",
	"sentAt": "2026-01-15T10:30:00Z"
}
```

---

## Base de données

Les migrations sont gérées par **Flyway** et s'exécutent automatiquement au démarrage du backend.

```sql
chat_sessions
  id          UUID PK
  user_id     UUID          -- ID client (auth externe)
  agency_id   UUID          -- ID agence (auth externe)
  status      VARCHAR(10)   -- 'open' | 'closed'
  created_at  TIMESTAMPTZ
  closed_at   TIMESTAMPTZ

chat_messages
  id          UUID PK
  session_id  UUID FK → chat_sessions(id)
  sender_role VARCHAR(10)   -- 'client' | 'agent'
  content     TEXT
  sent_at     TIMESTAMPTZ
```

---

## Tests

```bash
cd backend
./mvnw test
```

Les tests utilisent **H2 en mémoire** - aucune base externe requise. Flyway est désactivé pour les tests (schéma créé par `ddl-auto=create-drop`).

---

## Dépannage

### Le port 5433 est déjà utilisé

Le `docker-compose.yml` expose PostgreSQL sur **5433** (et non 5432) pour éviter les conflits avec une installation PostgreSQL locale. Si 5433 est déjà pris :

```bash
# Identifier le processus qui utilise le port
lsof -i :5433
# Arrêter le conteneur en conflit si c'est un autre Docker
docker ps
docker stop <nom_du_conteneur>
```

### `./mvnw` - Permission refusée

```bash
chmod +x backend/mvnw
```

### Le backend démarre mais les migrations Flyway échouent

Vérifier que le conteneur PostgreSQL est bien démarré avant de lancer le backend :

```bash
docker compose ps   # status doit être "running"
docker compose logs db
```

### Angular ne se connecte pas au backend (erreur CORS)

Vérifier que la variable `FRONTEND_URL` dans `.env` correspond exactement à l'URL utilisée par le navigateur (par défaut `http://localhost:4200`).

### Je ne vois pas les messages en temps réel

- Vérifier que les **deux onglets** utilisent le même `sessionId` dans l'URL.
- Vérifier que le backend est démarré avant l'ouverture du frontend (la connexion WebSocket échoue silencieusement si le backend est absent).

---

> **Sécurité** : le fichier `.env` contient vos identifiants de base de données - ne le commitez jamais. Seul `.env.sample` (sans valeurs sensibles) doit être versionné.

---

## Variables d'environnement - référence complète

| Variable                 | Défaut (`dev`)                              | Description                  |
| ------------------------ | ------------------------------------------- | ---------------------------- |
| `SPRING_PROFILES_ACTIVE` | `dev`                                       | Profil Spring actif          |
| `DATABASE_URL`           | `jdbc:postgresql://localhost:5433/ycyw_dev` | URL JDBC PostgreSQL          |
| `DATABASE_USERNAME`      | `ycyw`                                      | Utilisateur base de données  |
| `DATABASE_PASSWORD`      | `dev_password`                              | Mot de passe base de données |
| `FRONTEND_URL`           | `http://localhost:4200`                     | URL du frontend (CORS)       |

---

## Documentation

| Document                                                   | Contenu                                                                  |
| ---------------------------------------------------------- | ------------------------------------------------------------------------ |
| [`docs/architecture.md`](docs/architecture.md)             | Architecture cible complète, audit de l'existant, UML, modèle de données |
| [`docs/cahier_des_charges.md`](docs/cahier_des_charges.md) | Spécifications fonctionnelles, personas, règles métier                   |
| [`docs/resume.md`](docs/resume.md)                         | Référence rapide - stack, entités, fonctionnalités, contraintes          |
