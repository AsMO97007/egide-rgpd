# Égide RGPD

Registre des traitements et pilotage de la conformité RGPD, sous forme d'application à installer sur son poste.

## Où sont les données ?

Nulle part sur GitHub. Ce dépôt ne contient que le code de l'application.
Les données restent sur l'ordinateur de l'utilisateur :

- dans le navigateur (copie de travail) ;
- dans le fichier `egide-donnees.json`, enregistré automatiquement à chaque saisie dans le dossier choisi (idéalement OneDrive ou SharePoint, pour qu'il soit sauvegardé et transmissible à un successeur).

**Ne déposez jamais `egide-donnees.json` dans ce dépôt.**

## Installer l'application

1. Ouvrir l'adresse de l'application dans **Microsoft Edge** ou **Google Chrome**.
2. Cliquer sur l'icône « Installer » à droite de la barre d'adresse (ou menu ⋯ > Applications > Installer Égide).
3. Égide s'ouvre dans sa propre fenêtre, avec une icône dans le menu Démarrer et la barre des tâches.

## Premier lancement

Menu **Sauvegarde** > **Ouvrir un fichier existant** pour reprendre un fichier `egide-donnees.json`,
ou **Créer un fichier de données** pour partir de zéro.

## Mettre à jour

Remplacer `index.html` dans ce dépôt par la nouvelle version. Chaque poste la reçoit au lancement suivant ; les données ne sont pas touchées.

## Fonctionnement hors connexion

L'application fonctionne sans réseau une fois ouverte une première fois. Seules les fonctions qui consultent Internet (actualités, Copilot) en ont besoin.
