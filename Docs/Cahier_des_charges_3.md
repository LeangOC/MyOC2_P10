# Cahier des charges — Your Car Your Way

## Sommaire

1. Objet du document
2. Contexte du projet
3. Objectifs du projet
4. Périmètre
5. Parties prenantes
6. Profils utilisateurs
7. Analyse des besoins utilisateurs
8. Liste des fonctionnalités
9. Spécifications fonctionnelles

    * Gestion du compte
    * Gestion du profil
    * Recherche de véhicules
    * Agences
    * Offres de location
    * Réservation
    * Paiement
    * Confirmation de réservation
    * Historique des réservations
    * Modification d'une réservation
    * Annulation et remboursement
    * API interne pour les agences
    * Tchat avec le support
10. Exigences particulières

* Accessibilité
* Sécurité
* Protection des données personnelles
* Performance
* Internationalisation
* Éco-conception

11. Contraintes et dépendances
12. Product Backlog
13. Priorisation
14. Critères généraux d'acceptation
15. Points à préciser avant l'implémentation
16. Synthèse

---

# 1. Objet du document

Ce cahier des charges définit les besoins fonctionnels, les exigences utilisateurs et les contraintes non fonctionnelles de la nouvelle application **Your Car Your Way (YCYW)**.

L'objectif est de définir le périmètre fonctionnel de la future plateforme centralisée de location de véhicules et de fournir une base de référence pour les étapes suivantes du projet P10 :

* conception de l'architecture ;
* modélisation des données ;
* conception de l'API ;
* conception du front-end et du back-end ;
* définition des exigences de sécurité, performance et disponibilité.

---

# 2. Contexte du projet

Your Car Your Way est une entreprise de location de voitures implantée depuis plus de vingt ans en Europe et récemment développée en Amérique du Nord.

L'entreprise dispose actuellement de plusieurs applications développées indépendamment selon les différents marchés : France, Allemagne, Espagne, Italie, Royaume-Uni, Canada et États-Unis.

Cette organisation entraîne plusieurs difficultés :

* multiplication des applications et des technologies utilisées ;
* absence d'une API métier unifiée ;
* incohérences fonctionnelles entre les différents marchés ;
* difficultés de maintenance ;
* risques de sécurité liés à l'hétérogénéité des applications existantes.

L'objectif du projet est donc de remplacer progressivement ces applications par une **plateforme web centralisée, internationale, accessible, sécurisée et maintenable**.

---

# 3. Objectifs du projet

La nouvelle application doit permettre de :

1. centraliser l'accès aux services de location ;
2. proposer une expérience utilisateur homogène sur les différents marchés ;
3. permettre aux clients de rechercher et réserver un véhicule en ligne ;
4. permettre le paiement en ligne via un prestataire externe ;
5. permettre aux clients de gérer leurs réservations ;
6. fournir une API sécurisée destinée aux applications utilisées en agence ;
7. répondre aux exigences d'accessibilité ;
8. supporter plusieurs langues, pays, devises et fuseaux horaires ;
9. améliorer la sécurité et la confidentialité des données ;
10. disposer d'une architecture capable d'accompagner la croissance de l'entreprise.

---

# 4. Périmètre

## 4.1 Fonctionnalités incluses dans la V1

La première version comprend :

* création et gestion d'un compte client ;
* authentification et déconnexion ;
* réinitialisation du mot de passe ;
* gestion du profil ;
* recherche d'offres de location ;
* consultation des agences ;
* filtrage et tri des résultats ;
* consultation du détail d'une offre ;
* réservation d'un véhicule ;
* pré-remplissage des informations à partir du profil ;
* récapitulatif avant paiement ;
* paiement via Stripe ;
* confirmation de réservation ;
* consultation de l'historique des réservations ;
* modification d'une réservation ;
* annulation et remboursement ;
* API REST destinée aux agences ;
* tchat avec le support d'une agence ;
* exigences d'accessibilité, de sécurité, d'internationalisation et de performance.

Le portail client est accessible depuis les différents marchés de l'entreprise.

Le paiement est externalisé auprès de Stripe et l'API REST est consommée par les applications internes utilisées en agence.

## 4.2 Fonctionnalités hors périmètre

Les éléments suivants ne sont pas inclus dans la V1 :

* application mobile native ;
* développement d'un back-office complet destiné aux employés ;
* gestion complète de la flotte et du planning des agences ;
* programme de fidélité ;
* intégration avec des systèmes GDS (Global Distribution System).

---

# 5. Parties prenantes

| Partie prenante          | Rôle                                                    |
| ------------------------ | ------------------------------------------------------- |
| Client final             | Utilisateur principal de l'application web              |
| Agent en agence          | Utilisateur indirect de la plateforme via l'API interne |
| Équipe DSI               | Exploitation, sécurité, maintenance et déploiement      |
| Prestataire de paiement  | Traitement des paiements en ligne                       |
| Autorités réglementaires | Contrôle des exigences réglementaires applicables       |

---

# 6. Profils utilisateurs

## 6.1 Client

Le client utilise principalement l'application web pour :

* créer son compte ;
* rechercher un véhicule ;
* consulter les offres ;
* effectuer une réservation ;
* payer sa réservation ;
* consulter son historique ;
* modifier ou annuler une réservation ;
* contacter une agence via le tchat.

## 6.2 Agent en agence

L'agent utilise principalement les services exposés par l'API pour :

* consulter les utilisateurs ;
* consulter et gérer les réservations ;
* gérer les véhicules et les offres ;
* consulter et gérer les agences.

L'accès aux services d'agence doit être sécurisé et authentifié.

---

# 7. Analyse des besoins utilisateurs

## 7.1 Objectif

L'analyse des besoins utilisateurs permet d'identifier les attentes des différents utilisateurs de la future plateforme avant de les traduire en fonctionnalités.

Elle prend en compte :

* les profils utilisateurs ;
* leurs usages ;
* leurs besoins ;
* leurs difficultés ;
* les contraintes d'accessibilité ;
* les besoins métier ;
* le contexte international.

## 7.2 Personas

### Persona 1 — Client régulier

**Maria, 34 ans, Barcelone**

Maria utilise régulièrement le service de location pour ses déplacements professionnels.

* Utilise l'application depuis un smartphone en déplacement.
* Effectue plusieurs locations par an.
* Recherche un parcours de réservation rapide.
* Souhaite retrouver facilement son historique.
* Souhaite pouvoir modifier facilement une réservation.
* Ne souhaite pas ressaisir ses informations personnelles à chaque réservation.

**Besoins principaux :**

* rapidité ;
* historique accessible ;
* modification simple ;
* réutilisation des informations du profil.

---

### Persona 2 — Client occasionnel

**Thomas, 52 ans, Lyon**

Thomas réserve une voiture une à deux fois par an pour ses vacances.

* Est peu à l'aise avec les interfaces numériques.
* A besoin d'un parcours simple.
* Doit pouvoir comprendre facilement les erreurs éventuelles.
* Doit pouvoir identifier clairement la confirmation de sa réservation.

**Besoins principaux :**

* interface simple ;
* messages d'erreur clairs ;
* confirmation visible ;
* informations facilement compréhensibles.

---

### Persona 3 — Utilisateur en situation de handicap

**Amara, 29 ans, Londres**

Amara utilise un lecteur d'écran pour naviguer sur Internet.

* Utilise principalement le clavier.
* A besoin de labels accessibles.
* A besoin d'un ordre de focus logique.
* Utilise une technologie d'assistance.

**Besoins principaux :**

* navigation clavier complète ;
* labels ARIA cohérents ;
* ordre de focus logique ;
* compatibilité avec les lecteurs d'écran ;
* respect des exigences WCAG 2.1 niveau AA et RGAA 4.1.

---

### Persona 4 — Agent en agence

**Kenji, 41 ans, Toronto**

Kenji utilise l'application interne de son agence qui communique avec l'API de Your Car Your Way.

**Besoins principaux :**

* API stable ;
* documentation claire ;
* réponses rapides ;
* accès sécurisé ;
* données cohérentes.

## 7.3 Synthèse des besoins

| Profil                                             | Besoins principaux                                  |
| -------------------------------------------------- | --------------------------------------------------- |
| Client régulier                                    | Rapidité, historique, modification, pré-remplissage |
| Client occasionnel                                 | Simplicité, clarté, messages d'erreur               |
| Utilisateur utilisant une technologie d'assistance | Accessibilité, navigation clavier, lecteur d'écran  |
| Agent en agence                                    | API stable, sécurisée, documentée et performante    |

---

# 8. Liste des fonctionnalités

La V1 de Your Car Your Way comprend les principaux domaines fonctionnels suivants :

| Domaine              | Fonctionnalités principales                                            |
| -------------------- | ---------------------------------------------------------------------- |
| Gestion du compte    | Création, authentification, déconnexion, réinitialisation, suppression |
| Gestion du profil    | Consultation et modification des informations personnelles             |
| Recherche            | Recherche selon les critères de location                               |
| Agences              | Consultation des agences disponibles                                   |
| Offres               | Consultation, filtrage, tri et détail des offres                       |
| Réservation          | Sélection d'une offre et création d'une réservation                    |
| Paiement             | Paiement externe via Stripe                                            |
| Confirmation         | Confirmation de la réservation                                         |
| Réservations         | Historique, modification, annulation et remboursement                  |
| API agences          | Gestion des utilisateurs, réservations, offres et agences              |
| Support              | Tchat avec une agence                                                  |
| Accessibilité        | Navigation clavier et lecteurs d'écran                                 |
| Internationalisation | Langues, devises, fuseaux horaires et formats locaux                   |
| Sécurité             | Authentification, protection des données et sécurisation des échanges  |
| Performance          | Temps de réponse, disponibilité et montée en charge                    |
| Éco-conception       | Réduction de la consommation de ressources                             |

---

# 9. Spécifications fonctionnelles

## 9.1 Gestion du compte

### 9.1.1 Création de compte

Le visiteur doit pouvoir créer un compte à partir d'une adresse e-mail et d'un mot de passe.

Le système doit :

* vérifier les informations saisies ;
* empêcher la création de plusieurs comptes avec la même adresse e-mail ;
* sécuriser le stockage du mot de passe.

### 9.1.2 Authentification

Le client doit pouvoir :

* se connecter ;
* accéder à son espace personnel ;
* se déconnecter.

### 9.1.3 Réinitialisation du mot de passe

Un client ayant perdu son mot de passe doit pouvoir demander sa réinitialisation via son adresse e-mail.

### 9.1.4 Suppression du compte

Le client doit pouvoir demander la suppression de son compte.

La suppression nécessite une confirmation par mot de passe.

Les données personnelles doivent être traitées conformément aux règles applicables en matière de protection des données.

Si une réservation active empêche la suppression du compte, le système doit en informer explicitement le client.

---

## 9.2 Gestion du profil

Le client doit pouvoir consulter et gérer ses informations personnelles.

Les informations concernées comprennent notamment :

* nom ;
* prénom ;
* date de naissance ;
* adresse ;
* adresse e-mail ;
* mot de passe ;
* préférences de communication.

La modification de l'adresse e-mail doit faire l'objet d'une confirmation.

Le client ne doit pouvoir consulter ou modifier que ses propres informations.

---

## 9.3 Recherche de véhicules

Le client doit pouvoir rechercher une offre de location à partir des critères suivants :

* ville de départ ;
* ville de retour ;
* date et heure de départ ;
* date et heure de retour ;
* catégorie de véhicule.

Les villes peuvent être proposées par autocomplétion.

Le lieu de retour peut être différent du lieu de départ.

La date de retour doit être postérieure d'au moins deux heures à la date de départ.

---

## 9.4 Agences

L'application doit permettre de consulter les agences de location disponibles.

Une agence doit pouvoir être utilisée comme :

* lieu de départ ;
* lieu de retour ;
* point de contact pour le support.

---

## 9.5 Offres de location

Le client doit pouvoir consulter les offres correspondant aux critères de recherche.

Les résultats doivent pouvoir être :

* filtrés ;
* triés ;
* consultés sous forme de liste.

Lorsqu'aucune offre ne correspond aux critères, un message explicite doit être affiché.

Le client doit pouvoir accéder au détail d'une offre.

Le détail doit notamment présenter :

* la catégorie du véhicule ;
* les informations de location ;
* les lieux ;
* les dates et horaires ;
* le tarif.

Les catégories de véhicules doivent utiliser la classification **ACRISS**.

---

## 9.6 Réservation

Le client doit pouvoir réserver une offre disponible.

Lors de la réservation, les informations déjà enregistrées dans le profil doivent pouvoir être pré-remplies afin d'éviter une ressaisie inutile.

Avant le paiement, un récapitulatif doit présenter les informations essentielles :

* véhicule / catégorie ;
* lieu de départ ;
* lieu de retour ;
* dates et horaires ;
* informations client ;
* montant total.

Le client doit pouvoir vérifier ces informations avant de procéder au paiement.

---

## 9.7 Paiement

Le paiement doit être réalisé via un prestataire de paiement externe : **Stripe**.

L'application Your Car Your Way ne doit pas traiter directement les données bancaires sensibles.

Le résultat du paiement doit être récupéré par l'application afin de déterminer si la réservation peut être confirmée.

Les statuts de paiement doivent pouvoir être synchronisés via les mécanismes prévus par Stripe, notamment les webhooks.

---

## 9.8 Confirmation de réservation

Après paiement réussi, le client doit recevoir une confirmation de sa réservation.

La réservation doit posséder :

* un identifiant ;
* un statut ;
* les informations principales de la location.

Une confirmation par e-mail doit être envoyée au client.

---

## 9.9 Historique des réservations

Le client doit pouvoir consulter l'ensemble de ses réservations.

L'historique doit permettre de distinguer notamment :

* les réservations futures ;
* les réservations passées ;
* les réservations annulées.

Le client doit pouvoir consulter le détail d'une réservation.

---

## 9.10 Modification d'une réservation

Le client doit pouvoir modifier une réservation jusqu'à **48 heures avant son début**.

Une modification doit notamment permettre de vérifier :

* la disponibilité de l'offre ;
* les nouvelles dates et horaires ;
* les nouveaux lieux éventuels ;
* le nouveau montant.

Une modification n'est pas autorisée lorsque la réservation se situe à moins de 48 heures de son début.

---

## 9.11 Annulation et remboursement

Le client doit pouvoir demander l'annulation d'une réservation.

Les règles suivantes s'appliquent :

| Moment de l'annulation             | Remboursement |
| ---------------------------------- | ------------: |
| Plus de 7 jours avant le départ    |         100 % |
| Moins de 7 jours avant le départ   |          25 % |
| Moins de 48 heures avant le départ |           0 % |

Le montant du remboursement doit être calculé avant la confirmation de l'annulation.

Une annulation réalisée moins de 48 heures avant le départ ne permet pas de modifier la réservation.

---

## 9.12 API interne pour les agences

Une API REST doit permettre aux applications utilisées en agence d'accéder aux données métier.

Les opérations suivantes sont prévues :

| Domaine            | Opérations |
| ------------------ | ---------- |
| Utilisateurs       | CRUD       |
| Réservations       | CRUD       |
| Véhicules / offres | CRUD       |
| Agences            | CRUD       |

L'API doit être protégée par un mécanisme d'authentification adapté, notamment :

* clé API ;
* ou JWT de service.

L'API doit également contrôler les autorisations associées au système appelant.

Une rétrocompatibilité doit être prévue afin de permettre un déploiement progressif de la nouvelle plateforme.

---

## 9.13 Tchat avec le support

Un client connecté doit pouvoir ouvrir une session de tchat avec le support d'une agence.

Le tchat doit permettre :

* d'initier une session ;
* d'envoyer des messages ;
* de recevoir des messages en temps réel ;
* de consulter l'historique de la session ;
* de fermer la session.

Les échanges doivent être réalisés en temps réel via WebSocket.

Le protocole STOMP peut être utilisé pour les échanges temps réel.

L'historique des messages doit être conservé afin de pouvoir être rechargé lors de la réouverture d'une session.

La connexion WebSocket doit être authentifiée.

---

# 10. Exigences particulières

## 10.1 Accessibilité

L'application doit être accessible aux personnes en situation de handicap.

Les exigences principales sont :

* conformité WCAG 2.1 niveau AA ;
* conformité RGAA 4.1 pour le marché français ;
* navigation complète au clavier ;
* compatibilité avec les principaux lecteurs d'écran ;
* contraste suffisant ;
* textes alternatifs pour les images porteuses d'information ;
* messages d'erreur explicites ;
* absence de contenus susceptibles de provoquer des crises photosensibles.

### Accessibilité du tchat

Le tchat doit également permettre :

* une navigation au clavier ;
* une gestion correcte du focus ;
* la fermeture de la fenêtre au clavier ;
* l'annonce des nouveaux messages aux lecteurs d'écran ;
* l'utilisation d'un champ de saisie correctement labellisé.

---

## 10.2 Sécurité

La solution doit respecter les exigences de sécurité suivantes :

* mots de passe stockés sous forme de hash sécurisé, avec Argon2id ;
* utilisation obligatoire de HTTPS ;
* TLS 1.3 ;
* secrets stockés dans un gestionnaire de secrets ;
* rotation des secrets utilisés pour les services tiers ;
* protection contre les principales vulnérabilités de l'OWASP Top 10 ;
* protection contre les injections SQL ;
* protection contre les attaques XSS ;
* protection contre les attaques CSRF ;
* journalisation des accès et opérations sensibles.

Les opérations sensibles à tracer comprennent notamment :

* authentification ;
* modification d'une réservation ;
* suppression d'un compte.

---

## 10.3 Protection des données personnelles

Les données personnelles doivent être protégées conformément aux réglementations applicables.

La solution doit notamment permettre :

* le contrôle des accès aux données ;
* le droit d'accès ;
* le droit d'effacement ;
* la gestion du consentement lorsque nécessaire ;
* la limitation de la conservation des données.

La suppression d'un compte doit entraîner le traitement approprié des données personnelles conformément aux exigences de confidentialité.

---

## 10.4 Performance et disponibilité

Les objectifs de performance sont :

* temps de réponse **p95 inférieur à 500 ms** sur les pages critiques ;
* disponibilité cible de **99,5 %** ;
* taux d'erreur inférieur à **0,5 %** pendant les pics saisonniers ;
* capacité à supporter au moins **500 requêtes/seconde** sans dégradation significative.

Ces objectifs constituent les cibles de la future architecture.

---

## 10.5 Internationalisation

La nouvelle plateforme doit être conçue pour un fonctionnement international.

Les langues minimales prévues sont :

* français ;
* anglais ;
* allemand ;
* espagnol ;
* italien.

La solution doit également gérer :

* les fuseaux horaires ;
* les dates et heures selon la locale ;
* les devises ;
* les différents formats régionaux.

Les dates doivent être stockées de manière cohérente et affichées selon le contexte local.

---

## 10.6 Éco-conception

L'application doit limiter sa consommation de ressources.

Les principes suivants doivent être appliqués :

* optimisation des ressources statiques ;
* lazy loading lorsque pertinent ;
* compression des images ;
* limitation des appels réseau inutiles ;
* mise en cache lorsque pertinente ;
* pagination côté serveur pour les données volumineuses ;
* limitation des données transférées au navigateur.

L'objectif de performance Lighthouse est fixé à **85 minimum**, sur desktop comme sur mobile.

---

# 11. Contraintes et dépendances

| Élément                  | Contrainte                                                      |
| ------------------------ | --------------------------------------------------------------- |
| **Stripe**               | Paiement externalisé et intégration des statuts de paiement     |
| **ACRISS**               | Classification des véhicules                                    |
| **RGPD**                 | Protection des données, consentement et droit à l'effacement    |
| **API agences**          | Rétrocompatibilité lors du déploiement progressif               |
| **Accessibilité**        | WCAG 2.1 AA / RGAA 4.1                                          |
| **Internationalisation** | Support de plusieurs langues, pays, devises et fuseaux horaires |

---

# 12. Product Backlog

Le Product Backlog constitue la traduction opérationnelle des besoins définis dans ce cahier des charges.

| ID    | Epic / Domaine              | Fonctionnalité                   | User Story                                                                                                                              | Priorité    |
| ----- | --------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| US-01 | Gestion du compte           | Création de compte               | En tant que visiteur, je veux créer un compte afin de pouvoir effectuer des réservations.                                               | Must Have   |
| US-02 | Gestion du compte           | Authentification                 | En tant que client, je veux m'authentifier afin d'accéder à mon espace personnel.                                                       | Must Have   |
| US-03 | Gestion du compte           | Déconnexion                      | En tant que client, je veux me déconnecter afin de protéger l'accès à mon compte.                                                       | Must Have   |
| US-04 | Gestion du compte           | Réinitialisation du mot de passe | En tant que client, je veux réinitialiser mon mot de passe afin de récupérer l'accès à mon compte.                                      | Must Have   |
| US-05 | Gestion du profil           | Gestion du profil                | En tant que client, je veux consulter et modifier mes informations personnelles afin de maintenir mon profil à jour.                    | Must Have   |
| US-06 | Gestion du compte           | Suppression du compte            | En tant que client, je veux supprimer mon compte afin de contrôler mes données personnelles.                                            | Must Have   |
| US-07 | Agences                     | Consultation des agences         | En tant qu'utilisateur, je veux consulter les agences disponibles afin de choisir un lieu de départ ou de retour.                       | Should Have |
| US-08 | Recherche                   | Recherche de location            | En tant qu'utilisateur, je veux rechercher une location selon mes critères afin de trouver une offre adaptée.                           | Must Have   |
| US-09 | Offres                      | Filtrage et tri                  | En tant qu'utilisateur, je veux filtrer et trier les résultats afin de trouver plus facilement une offre.                               | Should Have |
| US-10 | Offres                      | Détail d'une offre               | En tant que client, je veux consulter le détail d'une offre afin de décider si je souhaite la réserver.                                 | Must Have   |
| US-11 | Offres                      | Classification ACRISS            | En tant que client, je veux connaître la catégorie du véhicule afin d'identifier précisément l'offre proposée.                          | Must Have   |
| US-12 | Réservation                 | Réservation                      | En tant que client, je veux réserver une offre disponible afin de louer un véhicule.                                                    | Must Have   |
| US-13 | Réservation                 | Pré-remplissage                  | En tant que client, je veux que mes informations de profil soient réutilisées lors d'une réservation afin d'éviter une ressaisie.       | Must Have   |
| US-14 | Réservation                 | Récapitulatif                    | En tant que client, je veux vérifier le détail et le montant de ma réservation avant paiement.                                          | Must Have   |
| US-15 | Paiement                    | Paiement                         | En tant que client, je veux payer via Stripe afin de finaliser ma réservation.                                                          | Must Have   |
| US-16 | Réservation                 | Confirmation                     | En tant que client, je veux recevoir une confirmation afin de disposer d'une preuve de ma réservation.                                  | Must Have   |
| US-17 | Réservations                | Historique                       | En tant que client, je veux consulter mes réservations afin de suivre mes locations passées et futures.                                 | Must Have   |
| US-18 | Réservations                | Modification                     | En tant que client, je veux modifier ma réservation afin d'adapter ma location.                                                         | Must Have   |
| US-19 | Réservations                | Annulation                       | En tant que client, je veux annuler ma réservation afin de ne plus utiliser le véhicule réservé.                                        | Must Have   |
| US-20 | Réservations                | Remboursement                    | En tant que client, je veux connaître le montant de mon remboursement avant d'annuler.                                                  | Must Have   |
| US-21 | API Agences                 | API utilisateurs                 | En tant qu'application agence, je veux gérer les utilisateurs via l'API afin de disposer des données nécessaires.                       | Must Have   |
| US-22 | API Agences                 | API réservations                 | En tant qu'application agence, je veux gérer les réservations via l'API afin de maintenir les informations à jour.                      | Must Have   |
| US-23 | API Agences                 | API offres                       | En tant qu'application agence, je veux gérer les véhicules et offres via l'API.                                                         | Must Have   |
| US-24 | API Agences                 | API agences                      | En tant qu'application agence, je veux gérer les agences via l'API.                                                                     | Must Have   |
| US-25 | API Agences                 | Authentification API             | En tant qu'application agence autorisée, je veux m'authentifier auprès de l'API afin de sécuriser les échanges.                         | Must Have   |
| US-26 | Support                     | Tchat support                    | En tant que client connecté, je veux contacter une agence via un tchat afin d'obtenir de l'assistance.                                  | Should Have |
| US-27 | Accessibilité               | Accessibilité clavier            | En tant qu'utilisateur, je veux naviguer entièrement au clavier afin d'utiliser l'application sans souris.                              | Must Have   |
| US-28 | Accessibilité               | Lecteurs d'écran                 | En tant qu'utilisateur utilisant une technologie d'assistance, je veux que l'application soit compatible avec les lecteurs d'écran.     | Must Have   |
| US-29 | Internationalisation        | Internationalisation             | En tant que client international, je veux utiliser l'application dans mon contexte local afin de pouvoir effectuer une location.        | Must Have   |
| US-30 | Sécurité                    | Sécurité et confidentialité      | En tant que client, je veux que mes données personnelles soient protégées afin d'utiliser le service en toute sécurité.                 | Must Have   |
| US-31 | Performance                 | Performance                      | En tant qu'utilisateur, je veux obtenir rapidement les résultats de mes recherches afin de bénéficier d'une expérience fluide.          | Must Have   |
| US-32 | Disponibilité / Évolutivité | Évolutivité et disponibilité     | En tant qu'entreprise, je veux disposer d'une application capable d'évoluer avec la croissance de l'activité.                           | Must Have   |
| US-33 | Éco-conception              | Éco-conception                   | En tant qu'entreprise, je veux limiter l'impact environnemental de l'application afin de réduire la consommation inutile de ressources. | Should Have |

---

# 13. Priorisation

## 13.1 Must Have

Les fonctionnalités indispensables au fonctionnement de la V1 sont :

* gestion du compte ;
* authentification ;
* recherche ;
* consultation des offres ;
* réservation ;
* paiement ;
* confirmation ;
* gestion des réservations ;
* API agences ;
* sécurité ;
* accessibilité ;
* internationalisation ;
* performance ;
* évolutivité et disponibilité.

## 13.2 Should Have

Les fonctionnalités importantes mais pouvant être priorisées après les fonctionnalités essentielles sont :

* consultation enrichie des agences ;
* filtrage et tri ;
* tchat support ;
* éco-conception.

## 13.3 Could Have

Aucune fonctionnalité supplémentaire n'est retenue à ce stade.

## 13.4 Won't Have

Les fonctionnalités suivantes sont explicitement hors périmètre de la V1 :

* application mobile native ;
* back-office complet des employés ;
* programme de fidélité ;
* intégration GDS.

---

# 14. Critères généraux d'acceptation

Une fonctionnalité est considérée comme conforme lorsque :

* le parcours nominal fonctionne ;
* les données saisies sont contrôlées ;
* les erreurs sont correctement gérées ;
* les droits d'accès sont respectés ;
* les exigences de sécurité applicables sont respectées ;
* les exigences d'accessibilité applicables sont respectées ;
* les données personnelles sont correctement protégées ;
* les tests nécessaires sont réalisés ;
* aucune régression connue n'est introduite.

---

# 15. Points à préciser avant l'implémentation

Certains éléments fonctionnels devront être précisés lors de la conception détaillée :

* comportement exact lors d'une modification entraînant une variation de prix ;
* gestion détaillée des remboursements via Stripe ;
* procédure complète de récupération du mot de passe ;
* règles précises de conservation et d'anonymisation des données ;
* langues et devises supplémentaires à supporter au-delà du socle initial ;
* modalités précises d'authentification des applications agence ;
* règles détaillées de gestion des sessions de tchat.

Ces points ne remettent pas en cause le périmètre fonctionnel ; ils devront être précisés avant leur implémentation.

---

# 16. Synthèse

La V1 de Your Car Your Way doit fournir une plateforme web centralisée permettant au client de réaliser l'ensemble du parcours principal :

**Créer un compte → rechercher un véhicule → consulter une offre → réserver → payer → recevoir la confirmation → gérer sa réservation.**

La plateforme doit également fournir une **API sécurisée pour les agences** et intégrer un **service de support par tchat**.

Le système doit être conçu dès l'origine pour répondre aux exigences de :

* sécurité ;
* accessibilité ;
* protection des données ;
* internationalisation ;
* performance ;
* disponibilité ;
* évolutivité ;
* éco-conception.

Ce cahier des charges constitue la **référence fonctionnelle de la suite du projet P10**. Il servira de base à la conception de l'architecture cible, du modèle de données et des interfaces de l'application.
