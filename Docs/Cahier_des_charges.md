# Cahier des charges fonctionnel

## Your Car Your Way – Nouvelle application web centralisée

**Version :** 2.0
**Projet :** Nouvelle application web internationale Your Car Your Way
**Rôle :** Lead Developer
**Statut :** Proposition consolidée à partir du cahier des charges V1

---

# Sommaire

1. Objet du document
2. Contexte et objectifs
3. Périmètre du projet
4. Acteurs et profils utilisateurs
5. Parcours utilisateurs
6. Besoins fonctionnels
7. Spécifications fonctionnelles
8. User Stories et critères d'acceptation
9. Règles métier
10. Exigences transverses
11. Priorisation des fonctionnalités
12. Hors périmètre
13. Points à clarifier avec le métier
14. Matrice de traçabilité
15. Conclusion

---

# 1. Objet du document

Le présent cahier des charges a pour objectif de consolider et compléter les besoins fonctionnels identifiés pour la nouvelle application web de **Your Car Your Way**.

L'entreprise souhaite remplacer plusieurs applications web nationales par une application centralisée destinée à l'ensemble de ses clients.

Le document précise :

* les profils utilisateurs ;
* le périmètre fonctionnel ;
* les principaux parcours utilisateurs ;
* les exigences fonctionnelles ;
* les règles métier ;
* les User Stories ;
* les critères d'acceptation ;
* les exigences transverses liées notamment à l'accessibilité, la sécurité et l'internationalisation ;
* les priorités fonctionnelles ;
* les points restant à confirmer avec les parties prenantes.

Ce document constitue la base fonctionnelle des étapes suivantes du projet, notamment l'audit de l'existant et la conception de l'architecture cible.

---

# 2. Contexte et objectifs

## 2.1 Contexte

Your Car Your Way est une entreprise spécialisée dans la location de voitures à l'échelle internationale.

Son développement historique s'est accompagné de la mise en place de plusieurs applications web distinctes selon les pays.

Cette situation entraîne notamment :

* une complexité technique importante ;
* des incohérences fonctionnelles entre les pays ;
* des difficultés de maintenance ;
* une multiplication des technologies et des systèmes ;
* une évolution plus difficile des fonctionnalités communes.

L'entreprise souhaite donc concevoir une nouvelle application web centralisée destinée à l'ensemble de ses clients.

## 2.2 Objectifs fonctionnels

La nouvelle application doit permettre de :

* proposer une expérience utilisateur homogène à l'international ;
* permettre aux clients de gérer leur compte ;
* rechercher des offres de location ;
* consulter le détail des offres ;
* réserver un véhicule ;
* effectuer le paiement ;
* consulter et gérer leurs réservations ;
* permettre la modification et l'annulation des réservations selon les règles métier ;
* prendre en compte les personnes en situation de handicap ;
* supporter un contexte international ;
* permettre aux applications utilisées en agence d'accéder aux données métier via une API.

## 2.3 Objectifs généraux

La solution cible doit également fournir un socle :

* maintenable ;
* évolutif ;
* sécurisé ;
* accessible ;
* internationalisé ;
* compatible avec l'intégration de services tiers ;
* adapté à l'évolution future du système d'information.

---

# 3. Périmètre du projet

## 3.1 Périmètre fonctionnel

La première version de l'application couvre principalement :

1. la gestion du compte client ;
2. la consultation des agences ;
3. la recherche de locations ;
4. la consultation des offres ;
5. la réservation ;
6. le paiement ;
7. la consultation de l'historique ;
8. la modification des réservations ;
9. l'annulation des réservations ;
10. l'accès aux données via une API pour les applications utilisées en agence.

## 3.2 Périmètre utilisateur

L'application est destinée aux clients de Your Car Your Way.

Elle doit également pouvoir être utilisée par des personnes en situation de handicap.

Les actions réalisées directement par les employés dans les agences ne font pas partie du périmètre de l'interface client.

En revanche, les applications utilisées en agence doivent pouvoir accéder aux données métier via l'API exposée par le nouveau système.

## 3.3 Contexte international

L'application doit être conçue pour une utilisation internationale.

La conception devra donc prendre en compte :

* plusieurs pays ;
* plusieurs langues ;
* différents formats de date ;
* différents formats horaires ;
* différentes devises ;
* différents fuseaux horaires ;
* des données géographiques internationales.

Les pays et langues précisément couverts par la première version devront être confirmés avec le métier.

---

# 4. Acteurs et profils utilisateurs

## 4.1 Visiteur non authentifié

Le visiteur est une personne consultant l'application sans être connectée à un compte.

Il peut notamment :

* consulter les agences ;
* effectuer une recherche d'offres ;
* consulter les offres disponibles.

Les fonctionnalités nécessitant des données personnelles ou une réservation nécessitent une authentification.

## 4.2 Client authentifié

Le client dispose d'un compte Your Car Your Way.

Il peut :

* consulter son profil ;
* modifier ses informations personnelles ;
* supprimer son compte ;
* rechercher une location ;
* consulter les offres ;
* effectuer une réservation ;
* effectuer un paiement ;
* consulter son historique ;
* modifier une réservation ;
* annuler une réservation.

## 4.3 Client en situation de handicap

Le client en situation de handicap doit pouvoir utiliser les mêmes fonctionnalités que les autres clients.

L'application doit être conçue conformément aux exigences d'accessibilité applicables, notamment aux recommandations du **RGAA** pour le contexte français.

L'accessibilité doit être considérée comme une exigence transverse de l'ensemble des fonctionnalités et non comme une fonctionnalité indépendante.

## 4.4 Applications utilisées en agence

Les applications utilisées en agence ne constituent pas des utilisateurs humains de l'interface client.

Elles constituent des systèmes externes consommateurs de l'API.

Elles doivent pouvoir :

* consulter les données nécessaires ;
* créer des données lorsque cela est autorisé ;
* modifier les données ;
* supprimer les données lorsque cela est autorisé.

Les droits d'accès devront être contrôlés et adaptés aux opérations réalisées.

## 4.5 Fournisseur de paiement

Le fournisseur de paiement constitue un système externe.

La gestion du paiement doit être externalisée auprès d'un prestataire spécialisé, par exemple Stripe.

L'application doit communiquer avec ce service afin de :

* initier le paiement ;
* récupérer le résultat du paiement ;
* associer le statut du paiement à la réservation.

Les données bancaires sensibles ne doivent pas être stockées directement par l'application.

---

# 5. Parcours utilisateurs

## 5.1 Parcours de création et de connexion

Le parcours nominal est le suivant :

```text
Visiteur
   ↓
Création du compte
   ↓
Validation des informations
   ↓
Compte créé
   ↓
Authentification
   ↓
Espace client
```

Le système doit informer l'utilisateur en cas d'erreur de saisie ou d'authentification.

---

# 5.2 Parcours de recherche

```text
Utilisateur
   ↓
Choix de la ville de départ
   ↓
Choix de la ville de retour
   ↓
Choix de la date/heure de départ
   ↓
Choix de la date/heure de retour
   ↓
Choix de la catégorie de véhicule
   ↓
Validation
   ↓
Recherche
   ↓
Liste des offres
```

Si aucune offre ne correspond aux critères, l'utilisateur doit en être informé.

---

# 5.3 Parcours de réservation

```text
Client
   ↓
Sélection d'une offre
   ↓
Consultation du détail
   ↓
Confirmation des informations personnelles
   ↓
Paiement
   ↓
Retour du fournisseur de paiement
   ↓
Confirmation de la réservation
```

Une réservation ne doit être considérée comme confirmée que lorsque le traitement du paiement a abouti conformément aux règles définies par le système.

---

# 5.4 Parcours de modification

```text
Client
   ↓
Sélection d'une réservation
   ↓
Vérification du délai
   ↓
Modification autorisée ?
   ├── Non → Information du client
   └── Oui
          ↓
      Nouvelle recherche de disponibilité
          ↓
      Recalcul du montant
          ↓
      Confirmation
```

La modification est possible jusqu'à **48 heures avant le début de la réservation**.

---

# 5.5 Parcours d'annulation

```text
Client
   ↓
Sélection de la réservation
   ↓
Demande d'annulation
   ↓
Calcul du remboursement
   ↓
Présentation du montant
   ↓
Confirmation de l'annulation
   ↓
Mise à jour de la réservation
```

À moins d'une semaine du début de la réservation, le remboursement est limité à **25 % du montant total de la réservation**.

---

# 6. Besoins fonctionnels

Les besoins fonctionnels sont regroupés par domaine.

## Domaine F01 — Gestion du compte

* F01.1 — Créer un compte.
* F01.2 — S'authentifier.
* F01.3 — Consulter son profil.
* F01.4 — Modifier ses informations personnelles.
* F01.5 — Supprimer son compte.
* F01.6 — Se déconnecter.

## Domaine F02 — Agences

* F02.1 — Consulter la liste des agences.
* F02.2 — Identifier la localisation d'une agence.

## Domaine F03 — Recherche

* F03.1 — Rechercher une location.
* F03.2 — Définir une ville de départ.
* F03.3 — Définir une ville de retour.
* F03.4 — Définir une date et une heure de départ.
* F03.5 — Définir une date et une heure de retour.
* F03.6 — Sélectionner une catégorie de véhicule.
* F03.7 — Afficher les résultats correspondants.
* F03.8 — Informer l'utilisateur lorsqu'aucune offre n'est disponible.

## Domaine F04 — Offres

* F04.1 — Afficher la liste des offres.
* F04.2 — Consulter le détail d'une offre.
* F04.3 — Afficher le tarif.
* F04.4 — Afficher la catégorie du véhicule.
* F04.5 — Afficher les lieux et horaires de location.

## Domaine F05 — Réservation

* F05.1 — Sélectionner une offre.
* F05.2 — Récupérer les informations personnelles du profil.
* F05.3 — Compléter les informations nécessaires.
* F05.4 — Confirmer une réservation.
* F05.5 — Effectuer le paiement.
* F05.6 — Obtenir la confirmation de réservation.

## Domaine F06 — Gestion des réservations

* F06.1 — Consulter l'historique.
* F06.2 — Consulter une réservation.
* F06.3 — Modifier une réservation.
* F06.4 — Annuler une réservation.
* F06.5 — Calculer le remboursement applicable.

## Domaine F07 — API métier

* F07.1 — Exposer les données métier via une API.
* F07.2 — Permettre la consultation des données.
* F07.3 — Permettre la création des données lorsque nécessaire.
* F07.4 — Permettre la modification des données.
* F07.5 — Permettre la suppression des données lorsque nécessaire.
* F07.6 — Sécuriser les accès à l'API.

---

# 7. Spécifications fonctionnelles

## SF-01 — Création d'un compte

L'utilisateur doit pouvoir créer un compte en fournissant les informations personnelles nécessaires.

Les informations minimales identifiées dans le cahier des charges sont :

* nom ;
* prénom ;
* date de naissance ;
* adresse ;
* adresse e-mail ;
* mot de passe.

Le système doit contrôler la validité des données.

Une adresse e-mail déjà associée à un compte ne doit pas pouvoir être utilisée pour créer un second compte.

---

## SF-02 — Authentification

Le client doit pouvoir s'authentifier avec ses identifiants.

En cas d'échec, le système doit fournir un message d'erreur compréhensible sans révéler d'information sensible.

Une session authentifiée doit permettre l'accès aux fonctionnalités privées du compte.

Le client doit pouvoir se déconnecter.

---

## SF-03 — Consultation du profil

Le client authentifié doit pouvoir consulter les informations associées à son compte.

Il ne doit pouvoir consulter que ses propres informations.

---

## SF-04 — Modification du profil

Le client doit pouvoir modifier :

* son nom ;
* son prénom ;
* sa date de naissance ;
* son adresse.

Les données doivent être validées avant leur enregistrement.

---

## SF-05 — Suppression du compte

Le client doit pouvoir supprimer son compte.

La suppression doit nécessiter la saisie du mot de passe du compte.

Une confirmation explicite doit être demandée avant l'opération définitive.

Le traitement des réservations historiques associées au compte devra respecter les obligations légales et les règles de conservation des données applicables.

---

## SF-06 — Consultation des agences

L'utilisateur doit pouvoir consulter les agences disponibles.

Une agence doit au minimum être associée à une localisation permettant de l'identifier.

Pour répondre au contexte international, les données d'agence doivent pouvoir représenter plusieurs pays et localisations.

Les informations complémentaires telles que l'adresse complète, les horaires, le téléphone ou les coordonnées GPS devront être confirmées avec le métier.

---

## SF-07 — Recherche d'une location

L'utilisateur doit pouvoir effectuer une recherche à partir des critères suivants :

* ville de départ ;
* ville de retour ;
* date et heure de début ;
* date et heure de retour ;
* catégorie du véhicule.

Le système doit vérifier la cohérence des critères avant de lancer la recherche.

---

## SF-08 — Validation d'une recherche

Le système doit notamment vérifier :

* la présence des champs obligatoires ;
* la validité des dates ;
* la cohérence entre date de départ et date de retour ;
* la cohérence des horaires ;
* la validité des villes ;
* la validité de la catégorie du véhicule.

Une recherche invalide ne doit pas être exécutée.

---

## SF-09 — Affichage des offres

Le système doit afficher les offres correspondant aux critères de recherche.

Chaque offre doit au minimum contenir :

* ville de départ ;
* ville de retour ;
* date et heure de départ ;
* date et heure de retour ;
* catégorie du véhicule ;
* tarif.

---

## SF-10 — Classification des véhicules

Les catégories de véhicules doivent respecter la norme **ACRISS**.

Le système doit donc utiliser une représentation compatible avec les codes ACRISS plutôt qu'une classification locale arbitraire.

La gestion détaillée des codes ACRISS devra être intégrée au modèle de données lors de la conception technique.

---

## SF-11 — Consultation du détail d'une offre

L'utilisateur doit pouvoir consulter le détail d'une offre avant de procéder à la réservation.

Les informations principales de l'offre doivent être clairement présentées.

---

## SF-12 — Réservation

Le client doit pouvoir réserver une offre disponible.

Les informations personnelles déjà présentes dans son profil doivent être récupérées afin d'éviter une nouvelle saisie inutile.

Le système doit contrôler la disponibilité et la validité de l'offre avant la confirmation.

---

## SF-13 — Paiement

Le paiement doit être réalisé auprès d'un fournisseur de paiement en ligne externe.

Le cahier des charges cite notamment Stripe comme exemple de fournisseur.

Le système doit :

1. initier le processus de paiement ;
2. transmettre les informations nécessaires au prestataire ;
3. récupérer le résultat de la transaction ;
4. mettre à jour le statut de la réservation ;
5. confirmer la réservation lorsque les conditions de paiement sont satisfaites.

Les données bancaires sensibles ne doivent pas être stockées directement dans l'application.

---

## SF-14 — Historique des réservations

Le client doit pouvoir consulter ses réservations :

* passées ;
* en cours ;
* futures.

Chaque réservation doit pouvoir être identifiée et consultée.

---

## SF-15 — Consultation du détail d'une réservation

Le client doit pouvoir consulter les informations associées à une réservation, notamment :

* offre ;
* dates et horaires ;
* lieux ;
* catégorie du véhicule ;
* tarif ;
* statut de la réservation ;
* statut du paiement lorsque cette information est disponible.

---

## SF-16 — Modification d'une réservation

Le client peut modifier une réservation jusqu'à **48 heures avant son début**.

Le système doit vérifier automatiquement le délai avant d'autoriser l'opération.

Si la modification est autorisée :

* les nouvelles informations doivent être validées ;
* la disponibilité doit être vérifiée ;
* le nouveau tarif doit être calculé ;
* la modification doit être confirmée.

Les règles détaillées concernant les éventuels écarts de prix devront être précisées par le métier.

---

## SF-17 — Annulation d'une réservation

Le client doit pouvoir demander l'annulation d'une réservation.

Le système doit déterminer le montant du remboursement applicable.

À moins d'une semaine du début de la réservation, le remboursement est limité à **25 % du montant total**.

Le montant du remboursement doit être présenté au client avant la confirmation de l'annulation.

---

## SF-18 — API destinée aux applications agence

Les applications utilisées en agence doivent pouvoir accéder aux données métier via une API.

Les opérations CRUD standard doivent être disponibles pour chaque domaine métier concerné.

Les opérations devront être sécurisées et soumises à des règles d'autorisation.

---

# 8. User Stories et critères d'acceptation

## Epic E01 — Gestion du compte

### US-01 — Créer un compte

**En tant que** visiteur,
**je veux** créer un compte,
**afin de** pouvoir utiliser les fonctionnalités nécessitant un compte client.

**Critères d'acceptation :**

* **Étant donné** que les informations obligatoires sont valides, **quand** je valide le formulaire, **alors** mon compte est créé.
* **Étant donné** qu'une adresse e-mail est déjà utilisée, **quand** je tente de créer le compte, **alors** la création est refusée.
* **Étant donné** qu'une donnée est invalide, **quand** je valide le formulaire, **alors** une erreur explicite est affichée.

**Priorité : Must Have**

---

### US-02 — S'authentifier

**En tant que** client,
**je veux** me connecter,
**afin de** pouvoir accéder à mon espace personnel.

**Critères d'acceptation :**

* **Étant donné** des identifiants valides, **quand** je me connecte, **alors** j'accède à mon espace personnel.
* **Étant donné** des identifiants invalides, **quand** je tente de me connecter, **alors** l'accès est refusé et un message est affiché.
* **Étant donné** que je suis connecté, **quand** je me déconnecte, **alors** ma session est terminée.

**Priorité : Must Have**

---

### US-03 — Consulter son profil

**En tant que** client,
**je veux** consulter mon profil,
**afin de** vérifier mes informations personnelles.

**Critères d'acceptation :**

* **Étant donné** que je suis authentifié, **quand** j'ouvre mon profil, **alors** mes informations sont affichées.
* **Étant donné** que je suis authentifié, **alors** je ne peux accéder qu'à mes propres informations.

**Priorité : Must Have**

---

### US-04 — Modifier son profil

**En tant que** client,
**je veux** modifier mes informations personnelles,
**afin de** maintenir mon profil à jour.

**Critères d'acceptation :**

* **Étant donné** que je suis authentifié, **quand** je modifie une information valide, **alors** elle est enregistrée.
* **Étant donné** une information invalide, **quand** je valide le formulaire, **alors** la modification est refusée.
* **Étant donné** une modification réussie, **alors** les nouvelles données sont affichées.

**Priorité : Must Have**

---

### US-05 — Supprimer son compte

**En tant que** client,
**je veux** supprimer mon compte,
**afin de** contrôler mes données personnelles.

**Critères d'acceptation :**

* **Étant donné** que je demande la suppression, **quand** je saisis un mot de passe incorrect, **alors** la suppression est refusée.
* **Étant donné** que je saisis le bon mot de passe, **quand** je confirme la suppression, **alors** le compte est supprimé.
* Une confirmation explicite doit être demandée avant la suppression définitive.

**Priorité : Must Have**

---

# Epic E02 — Recherche et consultation

### US-06 — Consulter les agences

**En tant que** utilisateur,
**je veux** consulter les agences disponibles,
**afin de** choisir un lieu de départ ou de retour.

**Critères d'acceptation :**

* La liste des agences disponibles peut être consultée.
* Chaque agence est identifiable.
* Les informations sont accessibles aux technologies d'assistance.

**Priorité : Should Have**

---

### US-07 — Rechercher une location

**En tant que** utilisateur,
**je veux** rechercher une location selon mes critères,
**afin de** trouver une offre correspondant à mon besoin.

**Critères d'acceptation :**

* La ville de départ peut être renseignée.
* La ville de retour peut être renseignée.
* La date et l'heure de départ peuvent être renseignées.
* La date et l'heure de retour peuvent être renseignées.
* Une catégorie de véhicule peut être sélectionnée.
* Une recherche valide retourne les offres correspondantes.

**Priorité : Must Have**

---

### US-08 — Gérer l'absence de résultat

**En tant que** utilisateur,
**je veux** être informé lorsqu'aucune offre n'est disponible,
**afin de** pouvoir modifier mes critères de recherche.

**Critères d'acceptation :**

* Si aucune offre ne correspond aux critères, un message explicite est affiché.
* L'utilisateur peut effectuer une nouvelle recherche.

**Priorité : Must Have**

---

### US-09 — Consulter une offre

**En tant que** client,
**je veux** consulter le détail d'une offre,
**afin de** décider si je souhaite effectuer la réservation.

**Critères d'acceptation :**

* L'offre sélectionnée est identifiable.
* Les lieux sont affichés.
* Les dates et horaires sont affichés.
* La catégorie du véhicule est affichée.
* Le tarif est affiché.

**Priorité : Must Have**

---

### US-10 — Identifier la catégorie ACRISS

**En tant que** client,
**je veux** identifier la catégorie du véhicule selon la norme ACRISS,
**afin de** comprendre précisément l'offre proposée.

**Critères d'acceptation :**

* L'offre possède une catégorie compatible avec ACRISS.
* La catégorie est présentée de manière compréhensible.

**Priorité : Must Have**

---

# Epic E03 — Réservation et paiement

### US-11 — Réserver une offre

**En tant que** client,
**je veux** réserver une offre disponible,
**afin de** louer un véhicule.

**Critères d'acceptation :**

* Une offre disponible peut être sélectionnée.
* Les informations personnelles déjà connues sont récupérées depuis le profil.
* Les informations obligatoires sont validées.
* Le montant de la réservation est présenté.
* Le paiement peut être effectué.

**Priorité : Must Have**

---

### US-12 — Payer une réservation

**En tant que** client,
**je veux** payer ma réservation via un prestataire de paiement,
**afin de** finaliser ma location.

**Critères d'acceptation :**

* Le processus de paiement est confié au fournisseur externe.
* L'application récupère le résultat du paiement.
* Un paiement réussi permet de poursuivre le processus de réservation.
* Un paiement échoué ne doit pas produire une réservation confirmée.
* Les données bancaires sensibles ne sont pas stockées dans l'application.

**Priorité : Must Have**

---

### US-13 — Confirmer une réservation

**En tant que** client,
**je veux** recevoir la confirmation de ma réservation,
**afin de** disposer d'une preuve de ma location.

**Critères d'acceptation :**

* La réservation possède un identifiant.
* Son statut est enregistré.
* Les informations principales de la réservation sont accessibles.

**Priorité : Must Have**

---

# Epic E04 — Gestion des réservations

### US-14 — Consulter ses réservations

**En tant que** client,
**je veux** consulter mes réservations,
**afin de** suivre mes locations passées et futures.

**Critères d'acceptation :**

* Les réservations du client sont affichées.
* Les réservations passées sont consultables.
* Les réservations futures sont consultables.
* Une réservation peut être sélectionnée pour afficher son détail.

**Priorité : Must Have**

---

### US-15 — Consulter le détail d'une réservation

**En tant que** client,
**je veux** consulter le détail d'une réservation,
**afin de** vérifier ses informations.

**Critères d'acceptation :**

* Les dates et horaires sont affichés.
* Les lieux sont affichés.
* La catégorie du véhicule est affichée.
* Le tarif est affiché.
* Le statut de la réservation est affiché.

**Priorité : Must Have**

---

### US-16 — Modifier une réservation

**En tant que** client,
**je veux** modifier ma réservation jusqu'à 48 heures avant son début,
**afin de** pouvoir adapter ma location.

**Critères d'acceptation :**

* **Étant donné** que la réservation débute dans plus de 48 heures, **quand** je demande une modification, **alors** elle peut être traitée.
* **Étant donné** que la réservation débute dans moins de 48 heures, **quand** je demande une modification, **alors** celle-ci est refusée.
* Une nouvelle disponibilité doit être vérifiée.
* Le nouveau tarif doit être calculé avant confirmation.

**Priorité : Must Have**

---

### US-17 — Annuler une réservation

**En tant que** client,
**je veux** annuler ma réservation,
**afin de** ne plus utiliser le véhicule réservé.

**Critères d'acceptation :**

* Une réservation peut faire l'objet d'une demande d'annulation.
* Le montant du remboursement est calculé.
* Le montant du remboursement est affiché avant confirmation.
* L'annulation est enregistrée après confirmation.

**Priorité : Must Have**

---

### US-18 — Connaître son remboursement

**En tant que** client,
**je veux** connaître le montant qui me sera remboursé avant d'annuler,
**afin de** prendre une décision informée.

**Critères d'acceptation :**

* Le système calcule le montant applicable.
* Si l'annulation intervient moins d'une semaine avant le début de la réservation, le remboursement est limité à 25 % du montant total.
* Le montant calculé est affiché avant confirmation.

**Priorité : Must Have**

---

# Epic E05 — API métier

### US-19 — Consulter les données via l'API

**En tant que** système utilisé en agence,
**je veux** consulter les données métier via une API,
**afin de** pouvoir utiliser les informations nécessaires à mon fonctionnement.

**Critères d'acceptation :**

* L'API permet aux systèmes autorisés de consulter les données.
* Les accès sont authentifiés.
* Les droits d'accès sont contrôlés.

**Priorité : Must Have**

---

### US-20 — Modifier les données via l'API

**En tant que** système utilisé en agence,
**je veux** créer et modifier les données métier via l'API,
**afin de** maintenir les informations synchronisées avec le système central.

**Critères d'acceptation :**

* Les opérations autorisées sont disponibles.
* Les données sont validées.
* Les accès sont sécurisés.
* Les opérations sensibles peuvent être tracées.

**Priorité : Must Have**

---

# 9. Règles métier

## RM-01 — Modification d'une réservation

Une réservation peut être modifiée jusqu'à **48 heures avant son début**.

Au-delà de cette limite, la modification doit être refusée.

---

## RM-02 — Annulation à moins d'une semaine

Lorsqu'une réservation est annulée moins d'une semaine avant son début, le remboursement est limité à **25 % du montant total de la réservation**.

---

## RM-03 — Annulation au moins une semaine avant

Le cahier des charges V1 ne précise pas explicitement le taux de remboursement applicable lorsqu'une annulation intervient au moins une semaine avant le début de la réservation.

Cette règle doit être confirmée par le métier avant l'implémentation définitive.

---

## RM-04 — Paiement

Le paiement est externalisé auprès d'un fournisseur spécialisé.

L'application ne doit pas assurer elle-même le traitement direct des données bancaires sensibles.

---

## RM-05 — Catégories de véhicules

Les catégories de véhicules doivent respecter la norme ACRISS.

---

## RM-06 — Suppression du compte

La suppression du compte nécessite la saisie du mot de passe du compte.

---

## RM-07 — Accès API

Les applications utilisées en agence doivent disposer d'un accès aux données via une API.

Les opérations CRUD standard sont requises pour chaque domaine métier concerné.

Les droits doivent être contrôlés afin qu'un système externe ne puisse effectuer que les opérations qui lui sont autorisées.

---

# 10. Exigences transverses

# 10.1 Accessibilité

L'application doit être conçue pour être utilisable par les personnes en situation de handicap.

L'accessibilité doit être prise en compte dès la conception fonctionnelle.

Les interfaces devront notamment prévoir :

* navigation au clavier ;
* ordre de navigation cohérent ;
* visibilité du focus ;
* structure sémantique correcte ;
* libellés explicites pour les champs ;
* messages d'erreur compréhensibles ;
* alternatives textuelles aux contenus non textuels ;
* contraste suffisant ;
* absence d'information reposant uniquement sur la couleur ;
* compatibilité avec les technologies d'assistance ;
* composants utilisables sans dispositif de pointage ;
* contenus compréhensibles.

Pour le contexte français, les recommandations du **RGAA** devront être prises en compte.

L'accessibilité devra être vérifiée sur l'ensemble des parcours, notamment :

* création de compte ;
* connexion ;
* recherche ;
* consultation des offres ;
* réservation ;
* paiement ;
* gestion des réservations.

---

# 10.2 Internationalisation

La solution doit être conçue pour une utilisation internationale.

Elle doit permettre de gérer :

* plusieurs langues ;
* plusieurs pays ;
* différents formats de date ;
* différents formats horaires ;
* différents formats monétaires ;
* différents fuseaux horaires ;
* les caractères spécifiques aux différentes langues.

Les dates et heures devront être manipulées de manière cohérente afin d'éviter les erreurs liées aux fuseaux horaires.

Les langues, pays et devises couverts par la première version devront être confirmés avec le métier.

---

# 10.3 Sécurité

La sécurité doit être prise en compte dès la conception.

Les exigences principales sont :

* authentification sécurisée ;
* contrôle des autorisations ;
* protection des données personnelles ;
* chiffrement des communications ;
* stockage sécurisé des mots de passe ;
* protection des API ;
* validation des données reçues ;
* protection contre les attaques web courantes ;
* protection des opérations sensibles ;
* traçabilité des opérations importantes.

La suppression d'un compte constitue une opération sensible et nécessite une vérification du mot de passe.

Les données de paiement doivent être traitées par un fournisseur spécialisé.

---

# 10.4 Confidentialité des données

Les données personnelles doivent être traitées conformément aux réglementations applicables.

La conception devra notamment prendre en compte :

* minimisation des données ;
* limitation des finalités ;
* contrôle des accès ;
* durée de conservation ;
* suppression ou anonymisation lorsque nécessaire ;
* traçabilité des opérations sensibles.

Les règles précises de conservation devront être définies avec le métier et les responsables concernés.

---

# 10.5 Écoconception

L'impact écologique doit être pris en compte dès la conception.

Les fonctionnalités devront limiter autant que possible :

* les données inutiles transmises ;
* les appels réseau inutiles ;
* les téléchargements de ressources lourdes ;
* les traitements inutiles ;
* les rafraîchissements automatiques excessifs.

Les listes importantes devront pouvoir être chargées progressivement ou paginées lorsque cela est pertinent.

L'objectif est de limiter les ressources consommées tout en conservant une expérience utilisateur satisfaisante.

Les choix techniques permettant d'atteindre ces objectifs seront détaillés dans la proposition d'architecture.

---

# 10.6 Performance

L'application doit fournir une expérience utilisateur fluide.

Les recherches et consultations doivent être suffisamment performantes pour permettre une utilisation internationale.

Les listes potentiellement volumineuses devront être conçues pour éviter de charger inutilement l'ensemble des données.

Les exigences quantitatives précises de performance devront être définies lors de la conception technique.

---

# 10.7 Disponibilité et évolutivité

La solution doit pouvoir évoluer avec la croissance internationale de Your Car Your Way.

L'architecture devra notamment permettre :

* l'ajout de nouvelles fonctionnalités ;
* l'ajout de nouveaux pays ;
* l'augmentation du nombre d'utilisateurs ;
* l'évolution des services tiers ;
* l'évolution des applications utilisées en agence.

Les choix techniques permettant de répondre à ces objectifs seront détaillés dans la proposition d'architecture.

---

# 11. Priorisation des fonctionnalités

La méthode **MoSCoW** est utilisée pour prioriser les fonctionnalités.

## 11.1 Must Have

Fonctionnalités indispensables à la première version :

* création de compte ;
* authentification ;
* consultation du profil ;
* modification du profil ;
* suppression du compte ;
* recherche de location ;
* consultation des offres ;
* consultation du détail d'une offre ;
* classification ACRISS ;
* réservation ;
* paiement ;
* consultation de l'historique ;
* consultation du détail d'une réservation ;
* modification d'une réservation ;
* annulation ;
* calcul du remboursement ;
* API métier ;
* sécurité ;
* accessibilité ;
* internationalisation.

## 11.2 Should Have

Fonctionnalités importantes pouvant être intégrées lorsque le périmètre et les délais le permettent :

* informations enrichies sur les agences ;
* informations détaillées sur les véhicules ;
* notifications liées aux réservations ;
* filtres complémentaires sur les offres ;
* amélioration de l'expérience de recherche.

## 11.3 Could Have

Fonctionnalités envisageables dans une évolution ultérieure :

* favoris ;
* comparaison d'offres ;
* recommandations personnalisées ;
* fonctionnalités avancées de personnalisation.

## 11.4 Won't Have dans la V1

Les fonctionnalités suivantes ne font pas partie du périmètre initial :

* application complète de gestion des employés en agence ;
* gestion RH ;
* administration interne complète ;
* remplacement du fournisseur de paiement ;
* développement complet des applications agence ;
* fonctionnalités métier non nécessaires au parcours de location.

---

# 12. Hors périmètre

La nouvelle application client ne doit pas reproduire l'ensemble des fonctionnalités internes de Your Car Your Way.

Sont notamment hors périmètre :

* gestion des employés ;
* gestion RH ;
* gestion administrative interne ;
* développement des outils internes utilisés en agence ;
* gestion complète de la flotte au niveau opérationnel ;
* remplacement des services de paiement externes ;
* développement d'une solution bancaire ;
* fonctionnalités commerciales non définies dans le cahier des charges.

Les applications agence restent des systèmes consommateurs de l'API.

---

# 13. Points à clarifier avec le métier

L'analyse du cahier des charges V1 fait apparaître plusieurs éléments qui doivent être précisés avant le développement.

## 13.1 Règles de remboursement

Le cahier des charges précise le remboursement de 25 % lorsque l'annulation intervient moins d'une semaine avant le début.

Il reste à déterminer :

* le taux de remboursement à partir de 7 jours ;
* le traitement d'un éventuel remboursement intégral ;
* les conditions particulières éventuelles.

---

## 13.2 Modification d'une réservation

Il faut préciser :

* quelles informations peuvent être modifiées ;
* si les dates peuvent être modifiées ;
* si les agences peuvent être modifiées ;
* si la catégorie du véhicule peut être modifiée ;
* comment gérer une augmentation de prix ;
* comment gérer une diminution de prix ;
* comment traiter un changement nécessitant un nouveau paiement.

---

## 13.3 Disponibilité

Il faut préciser :

* à quel moment une offre devient indisponible ;
* comment gérer deux réservations simultanées ;
* comment gérer une réservation temporairement bloquée pendant le paiement ;
* quelle règle s'applique lorsqu'un paiement échoue.

---

## 13.4 Paiement

Il faut préciser :

* le fournisseur retenu ;
* les moyens de paiement acceptés ;
* le comportement en cas d'échec ;
* le comportement en cas d'interruption ;
* la gestion des remboursements ;
* la gestion des paiements incomplets ou différés.

---

## 13.5 Compte utilisateur

Il faut préciser :

* les règles de complexité du mot de passe ;
* la récupération d'un mot de passe oublié ;
* les règles de verrouillage après plusieurs tentatives ;
* la politique de conservation des données ;
* le traitement de l'historique après suppression du compte.

---

## 13.6 Notifications

Le cahier des charges V1 ne précise pas les notifications.

Il convient de confirmer si le client doit recevoir :

* une confirmation de création de compte ;
* une confirmation de réservation ;
* une confirmation de paiement ;
* une confirmation de modification ;
* une confirmation d'annulation ;
* une confirmation de remboursement.

---

## 13.7 Internationalisation

Il faut déterminer :

* les pays concernés par la V1 ;
* les langues disponibles ;
* les devises ;
* les règles commerciales propres à certains pays ;
* les éventuelles différences réglementaires.

---

## 13.8 Agences

Il faut préciser les informations attendues pour une agence :

* adresse complète ;
* téléphone ;
* horaires ;
* coordonnées GPS ;
* services disponibles ;
* accessibilité de l'agence.

---

# 14. Matrice de traçabilité

La matrice suivante permet de maintenir la cohérence entre les besoins, les User Stories et les futures décisions techniques.

| Domaine       | Besoin                     | Spécification       | User Stories  | Priorité |
| ------------- | -------------------------- | ------------------- | ------------- | -------- |
| Compte        | Créer un compte            | SF-01               | US-01         | Must     |
| Compte        | Authentification           | SF-02               | US-02         | Must     |
| Compte        | Consulter le profil        | SF-03               | US-03         | Must     |
| Compte        | Modifier le profil         | SF-04               | US-04         | Must     |
| Compte        | Supprimer le compte        | SF-05               | US-05         | Must     |
| Agences       | Consulter les agences      | SF-06               | US-06         | Should   |
| Recherche     | Rechercher une location    | SF-07               | US-07         | Must     |
| Recherche     | Gérer absence de résultat  | —                   | US-08         | Must     |
| Offres        | Consulter une offre        | SF-09/SF-11         | US-09         | Must     |
| Offres        | ACRISS                     | SF-10               | US-10         | Must     |
| Réservation   | Réserver                   | SF-12               | US-11         | Must     |
| Paiement      | Payer                      | SF-13               | US-12         | Must     |
| Réservation   | Confirmation               | SF-13               | US-13         | Must     |
| Réservations  | Historique                 | SF-14               | US-14         | Must     |
| Réservations  | Détail                     | SF-15               | US-15         | Must     |
| Réservations  | Modification               | SF-16               | US-16         | Must     |
| Réservations  | Annulation                 | SF-17               | US-17         | Must     |
| Réservations  | Remboursement              | RM-02               | US-18         | Must     |
| API           | Consultation               | SF-18               | US-19         | Must     |
| API           | Modification               | SF-18               | US-20         | Must     |
| Accessibilité | Application accessible     | Exigence transverse | Toutes les US | Must     |
| Sécurité      | Protection des données     | Exigence transverse | Toutes les US | Must     |
| International | Application internationale | Exigence transverse | Toutes les US | Must     |
| Écoconception | Réduction des ressources   | Exigence transverse | Toutes les US | Must     |

---

# 15. Synthèse des exigences

La nouvelle application doit permettre à un client de réaliser l'ensemble du parcours de location :

```text
                    ┌──────────────────┐
                    │     Visiteur     │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Création compte  │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Authentification │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │    Recherche     │
                    │    location      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     Offres       │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     Détail       │
                    │      offre       │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   Réservation    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     Paiement     │
                    │   fournisseur    │
                    │     externe      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   Confirmation   │
                    └────────┬─────────┘
                             │
                  ┌──────────┴──────────┐
                  ▼                     ▼
        ┌──────────────────┐   ┌──────────────────┐
        │   Modification   │   │    Annulation    │
        │      ≤ 48 h      │   │   remboursement  │
        └──────────────────┘   └──────────────────┘
```

L'ensemble de ces fonctionnalités doit être accessible, sécurisé et adapté au contexte international.

---

# 16. Conclusion

L'analyse du cahier des charges V1 permet de définir une vision fonctionnelle consolidée de la nouvelle application Your Car Your Way.

Le périmètre principal est centré sur le parcours client :

**compte → recherche → offre → réservation → paiement → gestion de la réservation.**

Les fonctionnalités principales sont désormais formalisées sous forme de spécifications fonctionnelles et de User Stories accompagnées de critères d'acceptation.

Les exigences transverses d'accessibilité, de sécurité, d'internationalisation et d'écoconception sont intégrées dès cette étape afin de pouvoir être prises en compte dans la conception de l'architecture.

Plusieurs règles métier restent volontairement identifiées comme des **points à clarifier avec le métier**, notamment les règles de remboursement au-delà de 7 jours, les possibilités exactes de modification d'une réservation et le traitement des cas particuliers du paiement.

Cette formalisation constitue la base de référence pour l'étape suivante du projet : **l'audit de l'existant et l'analyse de la stack technique**, puis la définition de l'architecture cible.
