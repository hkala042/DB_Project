Étapes pour bien démarrer notre projet

1.Créer une nouvelle database dans Postgres
2.Changer les criteres requis dans db.js pour connecter à cette database
3.Ouvrir et executer les prochaines fichiers dans l'ordre suivant:
    -DDL.sql
    -Triggers.sql
    -DML.sql
4.Pour démarrer le serveur, insérer `npm run dev`, le console imprimera Server is listenning on port 3000
5.Pour tester les différents utilisations des clients et employers, svp créer un client/employer à travere
les formes respectives dans l'appli web pour voire le bon fonctionnement de ses outils

Des notes à remarquer:
-Lors de la recherche de reservations pour le clients il est fort probable que des spécifications multiples seront
retourner avec aucun possibilité à cause des insertions limité, cependent pour voir tout les chambres, il faut simplement
sélectionner `no preferance` où il est applicable, cependent, voici une recherche avec des spécifications:
Hôtel Landon
Ottawa
(mettez des dates valabes)
5
3
L
50 à 500

On espère que vous amuserez :D