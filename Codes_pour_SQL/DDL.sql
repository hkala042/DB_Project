CREATE TABLE Chaine_hoteliere (
    CH_ID VARCHAR(10),
    Nom VARCHAR(20) NOT NULL,
    Nombre_hotels INTEGER,
    PRIMARY KEY(CH_ID)
);

CREATE TABLE Contacts_Chaine (
    Numero VARCHAR,
    Courriel VARCHAR(20),
    CH_ID VARCHAR(10), 
    PRIMARY KEY(Numero),
    FOREIGN KEY (CH_ID) REFERENCES Chaine_hoteliere(CH_ID) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT Check_num_length CHECK (LENGTH(Numero) = 12)
);

CREATE TABLE Adresse (
    Code_Postal VARCHAR(7),
    Rue VARCHAR(25) NOT NULL,
    Num_de_Rue VARCHAR(25) NOT NULL,
    Ville VARCHAR(25) NOT NULL,
    PRIMARY KEY (Code_Postal),
    CONSTRAINT Len_Post_check CHECK (LENGTH(Code_Postal) = 7)
);

CREATE TABLE Bureaux_centraux (
    BC_ID VARCHAR(25),
    CH_ID VARCHAR(10),
    Code_postal VARCHAR(7),
    PRIMARY KEY(BC_ID),
    FOREIGN KEY (CH_ID) REFERENCES Chaine_hoteliere(CH_ID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Code_postal) REFERENCES Adresse(Code_postal) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Personne (
    NAS VARCHAR(25),
    Nom VARCHAR(25),
    Prenom VARCHAR(25),
    Code_Postal VARCHAR(7),
    PRIMARY KEY (NAS),
    FOREIGN KEY (Code_Postal) REFERENCES Adresse(Code_Postal) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Client (
    NAS VARCHAR(25),
    Mot_de_passe VARCHAR(25),
    Date_Enreg DATE,
    PRIMARY KEY(NAS),
    FOREIGN KEY (NAS) REFERENCES Personne(NAS) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Hotel (
    H_ID VARCHAR(10),
    nombre_chambres INTEGER,
    classement INTEGER,
    prix_moy DECIMAL(10,2),
    CH_ID VARCHAR(10),
    Code_postal VARCHAR(7),
    PRIMARY KEY(H_ID),
    FOREIGN KEY (CH_ID) REFERENCES Chaine_hoteliere(CH_ID) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (Code_postal) REFERENCES Adresse(Code_postal) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Contacts_Hotel (
    Numero VARCHAR(25),
    Courriel VARCHAR(20),
    H_ID VARCHAR(10),
    PRIMARY KEY(Numero),
    FOREIGN KEY (H_ID) REFERENCES Hotel(H_ID) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT Check_num_length CHECK (LENGTH(Numero) = 12)
);

CREATE TABLE Chambres (
    Chambres_ID VARCHAR(20),
    Prix DECIMAL(10,2) NOT NULL,
    Commodites VARCHAR(200),
    Capacite INTEGER,
    superficie VARCHAR(5),
    Particularite VARCHAR(200),
    Poss_Extens BOOLEAN,
    H_ID VARCHAR(10),
    PRIMARY KEY (Chambres_ID),
    FOREIGN KEY (H_ID) REFERENCES Hotel ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Problem (
    Prob_ID SERIAL,
    Description VARCHAR(300),
    Date_de_Commencement DATE,
    Date_de_Resol DATE,
    Chambres_ID VARCHAR(20),
    PRIMARY KEY (Prob_ID),
    FOREIGN KEY (Chambres_ID) REFERENCES Chambres(Chambres_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Reservation (
    Res_ID SERIAL,
    Chambres_ID VARCHAR(20), 
    NAS VARCHAR(25),
    Date_de_début DATE,
    Date_de_fin DATE,
    PRIMARY KEY (Res_ID),
    FOREIGN KEY (Chambres_ID) REFERENCES Chambres(Chambres_ID),
    FOREIGN KEY (NAS) REFERENCES Client(NAS)
);

CREATE TABLE Employe (
    NAS VARCHAR(25),
    Rôle VARCHAR(20),
    H_ID VARCHAR(10),
    PRIMARY KEY(NAS),
    FOREIGN KEY (NAS) REFERENCES Personne(NAS) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (H_ID) REFERENCES Hotel(H_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Gestionnaire (
    NAS VARCHAR(25),
    Roles VARCHAR(20),
    H_ID VARCHAR(10),
    PRIMARY KEY(NAS),
    FOREIGN KEY (H_ID) REFERENCES Hotel(H_ID) ON UPDATE CASCADE ON DELETE CASCADE
);