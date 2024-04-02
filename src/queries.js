//-- Requete 1: Rechercher les chambres dans une ville et prix donner
const getRoomBy_city_price = "SELECT DISTINCT C.*FROM Chambres C INNER JOIN Hotel H ON C.H_ID = H.H_ID INNER JOIN Adresse A ON H.Code_postal = A.Code_Postal WHERE A.Ville = $1 and C.Prix BETWEEN $2 AND $3" ;

//-- Requete 2: Rechercher les emails et numeros d'un hotel donner
const getContactsBy_hotelName = "SELECT numero,courriel FROM contacts_hotel WHERE h_ID = $1";


//-- Requete 3: Rechercher les chambres selon une capacite et ville donner
const getRoomBy_capacity_city = "SELECT C.* FROM chambres C INNER JOIN hotel H ON H.h_id = C.h_id INNER JOIN adresse A ON A.Code_postal = H.Code_postal WHERE A.Ville = $1 AND C.Capacite = $2";



//-- Requete 4: Rechercher une reservation selon le nom d'un client
const getResBy_clientName = "SELECT R.* FROM Reservation R LEFT JOIN client C on R.Client_ID = C.Client_ID INNER JOIN Personne P on C.NAS = P.NAS WHERE P.Nom =$1 AND P.Prenom = $2";



//--Requete 5: Rechercher les chambres selon la ville, la capacite, et le prix
const getRoomBy_city_capacity_price = "SELECT C.* FROM chambres C INNER JOIN hotel H ON C.h_id = H.h_ID INNER JOIN adresse A ON A.Code_postal = H.Code_postal WHERE A.Ville = $1 AND C.Capacite = $2 AND C.Prix BETWEEN $3 AND $4";


//Requete 6 : Affiche toutes les réservations de l'id d'hôtel donnée en paramètre

const getAllReservations = "SELECT * FROM Reservation";

//Requete 7 : Permettant d'ajouter une nouvelle réservation

const addNewReservation = "INSERT INTO Reservation (Chambres_ID, Client_ID, Date_de_début, Date_de_fin) values ($1, $2, $3, $4)"

//Requête 8 : verifie s'il est possible de reserver une chambre pour la date de début choisi
const checkIfRoomAvailable = "SELECT * FROM Reservation WHERE Chambres_ID = $1 AND Date_de_début <= $2 AND Date_de_fin >= $2";

//Requête 9 : Recherche un client par son NAS

const getClientById = "SELECT * FROM Client WHERE NAS = $1";

//Requête 10 : Permet d'insérer une nouvelle personne

const addPerson = "INSERT INTO Personne (NAS, Nom, Prenom, Code_Postal) values ($1, $2, $3, $4)";

//Requête 11 : Permet d'insérer une nouvelle adresse

const addAdress = "INSERT INTO Adresse (Code_Postal, Rue, Num_de_rue, Ville) values ($1, $2, $3, $4)";

//Requête 12 : Permet d'insérer un nouveau Client

const addClient = "INSERT INTO Client (NAS, Date_Enreg) values ($1, $2)";


module.exports = {
    getRoomBy_city_price,
    getContactsBy_hotelName,
    getRoomBy_capacity_city,
    getResBy_clientName,
    getRoomBy_city_capacity_price,
    getAllReservations,
    addNewReservation,
    checkIfRoomAvailable,
    getClientById,
    addPerson,
    addAdress,
    addClient

}









