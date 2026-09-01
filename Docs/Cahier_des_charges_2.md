# Cahier des charges — Your Car Your Way

## 1. Objet du document

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

# 4. Périmètre fonctionnel

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

Le portail client est accessible depuis les différents marchés de l'entreprise. Le paiement est externalisé auprès de Stripe et l'API REST est consommée par les applications internes utilisées en agence.

---

# 5. Fonctionnalités hors périmètre

Les éléments suivants ne sont pas inclus dans la V1 :

* application mobile native ;
* développement d'un back-office complet destiné aux employés ;
* gestion complète de la flotte et du planning des agences ;
* programme de fidélité ;
* intégration avec des systèmes GDS (Global Distribution System).

---

# 6. Parties prenantes

| Partie prenante          | Rôle                                                    |
| ------------------------ | ------------------------------------------------------- |
| Client final             | Utilisateur principal de l'application web              |
| Agent en agence          | Utilisateur indirect de la plateforme via l'API interne |
| Équipe DSI               | Exploitation, sécurité, maintenance et déploiement      |
| Prestataire de paiement  | Traitement des paiements en ligne                       |
| Autorités réglementaires | Contrôle des exigences réglementaires applicables       |

---

# 7. Profils utilisateurs

## 7.1 Client

Le client utilise principalement l'application web pour :

* créer son compte ;
* rechercher un véhicule ;
* consulter les offres ;
* effectuer une réservation ;
* payer sa réservation ;
* consulter son historique ;
* modifier ou annuler une réservation ;
* contacter une agence via le tchat.

## 7.2 Agent en agence

L'agent utilise principalement les services exposés par l'API pour :

* consulter les utilisateurs ;
* consulter et gérer les réservations ;
* gérer les véhicules et les offres ;
* consulter et gérer les agences.

L'accès aux services d'agence doit être sécurisé et authentifié.

---

# 8. Parcours utilisateur principal

Le parcours principal correspond à la réservation d'un véhicule.

```text
Accueil
   ↓
Recherche
   ↓
Liste des offres
   ↓
Détail d'une offre
   ↓
Saisie / vérification des informations
   ↓
Récapitulatif
   ↓
Paiement Stripe
   ↓
Confirmation
```

Le parcours doit être simple et permettre au client de réaliser une réservation sans ressaisie inutile de ses informations lorsque celles-ci sont déjà disponibles dans son profil.

---

# 9. Spécifications fonctionnelles

## 9.1 Gestion du compte

### Création de compte

Le visiteur doit pouvoir créer un compte à partir d'une adresse e-mail et d'un mot de passe.

Le système doit :

* vérifier les informations saisies ;
* empêcher la création de plusieurs comptes avec la même adresse e-mail ;
* sécuriser le stockage du mot de passe.

### Authentification

Le client doit pouvoir :

* se connecter ;
* accéder à son espace personnel ;
* se déconnecter.

### Réinitialisation du mot de passe

Un client ayant perdu son mot de passe doit pouvoir demander sa réinitialisation via son adresse e-mail.

### Suppression du compte

Le client doit pouvoir demander la suppression de son compte.

La suppression nécessite une confirmation par mot de passe.

Les données personnelles doivent être traitées conformément aux règles applicables en matière de protection des données.

Si une réservation active empêche la suppression du compte, le système doit en informer explicitement le client.

---

# 10. Gestion du profil

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

# 11. Recherche de véhicules

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

# 12. Agences

L'application doit permettre de consulter les agences de location disponibles.

Une agence doit pouvoir être utilisée comme :

* lieu de départ ;
* lieu de retour ;
* point de contact pour le support.

---

# 13. Offres de location

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

# 14. Réservation

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

# 15. Paiement

Le paiement doit être réalisé via un prestataire de paiement externe : **Stripe**.

L'application Your Car Your Way ne doit pas traiter directement les données bancaires sensibles.

Le résultat du paiement doit être récupéré par l'application afin de déterminer si la réservation peut être confirmée.

Les statuts de paiement doivent pouvoir être synchronisés via les mécanismes prévus par Stripe, notamment les webhooks.

---

# 16. Confirmation de réservation

Après paiement réussi, le client doit recevoir une confirmation de sa réservation.

La réservation doit posséder :

* un identifiant ;
* un statut ;
* les informations principales de la location.

Une confirmation par e-mail doit être envoyée au client.

---

# 17. Historique des réservations

Le client doit pouvoir consulter l'ensemble de ses réservations.

L'historique doit permettre de distinguer notamment :

* les réservations futures ;
* les réservations passées ;
* les réservations annulées.

Le client doit pouvoir consulter le détail d'une réservation.

---

# 18. Modification d'une réservation

Le client doit pouvoir modifier une réservation jusqu'à **48 heures avant son début**.

Une modification doit notamment permettre de vérifier :

* la disponibilité de l'offre ;
* les nouvelles dates et horaires ;
* les nouveaux lieux éventuels ;
* le nouveau montant.

Une modification n'est pas autorisée lorsque la réservation se situe à moins de 48 heures de son début.

---

# 19. Annulation et remboursement

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

# 20. API interne pour les agences

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

# 21. Tchat avec le support

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

# 22. Exigences non fonctionnelles

## 22.1 Accessibilité

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

Pour le tchat :

* navigation au clavier ;
* gestion correcte du focus ;
* possibilité de fermer la fenêtre au clavier ;
* annonce des nouveaux messages aux lecteurs d'écran ;
* champ de saisie correctement labellisé.

Ces exigences sont issues des contraintes d'accessibilité définies dans le cahier des charges.

---

# 23. Sécurité

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

# 24. Protection des données personnelles

Les données personnelles doivent être protégées conformément aux réglementations applicables.

La solution doit notamment permettre :

* le contrôle des accès aux données ;
* le droit d'accès ;
* le droit d'effacement ;
* la gestion du consentement lorsque nécessaire ;
* la limitation de la conservation des données.

La suppression d'un compte doit entraîner le traitement approprié des données personnelles conformément aux exigences de confidentialité.

---

# 25. Performance

Les objectifs de performance sont :

* temps de réponse **p95 inférieur à 500 ms** sur les pages critiques ;
* disponibilité cible de **99,5 %** ;
* taux d'erreur inférieur à **0,5 %** pendant les pics saisonniers ;
* capacité à supporter au moins **500 requêtes/seconde** sans dégradation significative.

Ces objectifs constituent les cibles de la future architecture.

---

# 26. Internationalisation

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

# 27. Éco-conception

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

# 28. Contraintes et dépendances

| Élément                  | Contrainte                                                      |
| ------------------------ | --------------------------------------------------------------- |
| **Stripe**               | Paiement externalisé et intégration des statuts de paiement     |
| **ACRISS**               | Classification des véhicules                                    |
| **RGPD**                 | Protection des données, consentement et droit à l'effacement    |
| **API agences**          | Rétrocompatibilité lors du déploiement progressif               |
| **Accessibilité**        | WCAG 2.1 AA / RGAA 4.1                                          |
| **Internationalisation** | Support de plusieurs langues, pays, devises et fuseaux horaires |

Ces contraintes sont notamment identifiées comme dépendances du projet dans le cahier des charges de référence.

---

# 29. Product Backlog

Le Product Backlog constitue la traduction opérationnelle des besoins définis dans ce cahier des charges.

| ID    | Fonctionnalité                   | User Story                                                                                                                              | Priorité    |
| ----- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| US-01 | Création de compte               | En tant que visiteur, je veux créer un compte afin de pouvoir effectuer des réservations.                                               | Must Have   |
| US-02 | Authentification                 | En tant que client, je veux m'authentifier afin d'accéder à mon espace personnel.                                                       | Must Have   |
| US-03 | Déconnexion                      | En tant que client, je veux me déconnecter afin de protéger l'accès à mon compte.                                                       | Must Have   |
| US-04 | Réinitialisation du mot de passe | En tant que client, je veux réinitialiser mon mot de passe afin de récupérer l'accès à mon compte.                                      | Must Have   |
| US-05 | Gestion du profil                | En tant que client, je veux consulter et modifier mes informations personnelles afin de maintenir mon profil à jour.                    | Must Have   |
| US-06 | Suppression du compte            | En tant que client, je veux supprimer mon compte afin de contrôler mes données personnelles.                                            | Must Have   |
| US-07 | Consultation des agences         | En tant qu'utilisateur, je veux consulter les agences disponibles afin de choisir un lieu de départ ou de retour.                       | Should Have |
| US-08 | Recherche de location            | En tant qu'utilisateur, je veux rechercher une location selon mes critères afin de trouver une offre adaptée.                           | Must Have   |
| US-09 | Filtrage et tri                  | En tant qu'utilisateur, je veux filtrer et trier les résultats afin de trouver plus facilement une offre.                               | Should Have |
| US-10 | Détail d'une offre               | En tant que client, je veux consulter le détail d'une offre afin de décider si je souhaite la réserver.                                 | Must Have   |
| US-11 | Classification ACRISS            | En tant que client, je veux connaître la catégorie du véhicule afin d'identifier précisément l'offre proposée.                          | Must Have   |
| US-12 | Réservation                      | En tant que client, je veux réserver une offre disponible afin de louer un véhicule.                                                    | Must Have   |
| US-13 | Pré-remplissage                  | En tant que client, je veux que mes informations de profil soient réutilisées lors d'une réservation afin d'éviter une ressaisie.       | Must Have   |
| US-14 | Récapitulatif                    | En tant que client, je veux vérifier le détail et le montant de ma réservation avant paiement.                                          | Must Have   |
| US-15 | Paiement                         | En tant que client, je veux payer via Stripe afin de finaliser ma réservation.                                                          | Must Have   |
| US-16 | Confirmation                     | En tant que client, je veux recevoir une confirmation afin de disposer d'une preuve de ma réservation.                                  | Must Have   |
| US-17 | Historique                       | En tant que client, je veux consulter mes réservations afin de suivre mes locations passées et futures.                                 | Must Have   |
| US-18 | Modification                     | En tant que client, je veux modifier ma réservation afin d'adapter ma location.                                                         | Must Have   |
| US-19 | Annulation                       | En tant que client, je veux annuler ma réservation afin de ne plus utiliser le véhicule réservé.                                        | Must Have   |
| US-20 | Remboursement                    | En tant que client, je veux connaître le montant de mon remboursement avant d'annuler.                                                  | Must Have   |
| US-21 | API utilisateurs                 | En tant qu'application agence, je veux gérer les utilisateurs via l'API afin de disposer des données nécessaires.                       | Must Have   |
| US-22 | API réservations                 | En tant qu'application agence, je veux gérer les réservations via l'API afin de maintenir les informations à jour.                      | Must Have   |
| US-23 | API offres                       | En tant qu'application agence, je veux gérer les véhicules et offres via l'API.                                                         | Must Have   |
| US-24 | API agences                      | En tant qu'application agence, je veux gérer les agences via l'API.                                                                     | Must Have   |
| US-25 | Authentification API             | En tant qu'application agence autorisée, je veux m'authentifier auprès de l'API afin de sécuriser les échanges.                         | Must Have   |
| US-26 | Tchat support                    | En tant que client connecté, je veux contacter une agence via un tchat afin d'obtenir de l'assistance.                                  | Should Have |
| US-27 | Accessibilité clavier            | En tant qu'utilisateur, je veux naviguer entièrement au clavier afin d'utiliser l'application sans souris.                              | Must Have   |
| US-28 | Lecteurs d'écran                 | En tant qu'utilisateur utilisant une technologie d'assistance, je veux que l'application soit compatible avec les lecteurs d'écran.     | Must Have   |
| US-29 | Internationalisation             | En tant que client international, je veux utiliser l'application dans mon contexte local afin de pouvoir effectuer une location.        | Must Have   |
| US-30 | Sécurité et confidentialité      | En tant que client, je veux que mes données personnelles soient protégées afin d'utiliser le service en toute sécurité.                 | Must Have   |
| US-31 | Performance                      | En tant qu'utilisateur, je veux obtenir rapidement les résultats de mes recherches afin de bénéficier d'une expérience fluide.          | Must Have   |
| US-32 | Évolutivité et disponibilité     | En tant qu'entreprise, je veux disposer d'une application capable d'évoluer avec la croissance de l'activité.                           | Must Have   |
| US-33 | Éco-conception                   | En tant qu'entreprise, je veux limiter l'impact environnemental de l'application afin de réduire la consommation inutile de ressources. | Should Have |

---

# 30. Priorisation

## Must Have

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

## Should Have

* consultation enrichie des agences ;
* filtrage et tri ;
* tchat support ;
* éco-conception.

## Could Have

Aucune fonctionnalité supplémentaire n'est retenue à ce stade.

## Won't Have

* application mobile native ;
* back-office complet des employés ;
* programme de fidélité ;
* intégration GDS.

---

# 31. Critères généraux d'acceptation

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

# 32. Points à préciser avant l'implémentation

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

# 33. Synthèse

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
