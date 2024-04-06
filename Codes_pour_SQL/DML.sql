INSERT INTO chaine_hoteliere (ch_id, nom, nombre_hotels)
VALUES('hil','Hôtel Hilaire', 0);

INSERT INTO chaine_hoteliere (CH_ID, nom, nombre_hotels )
VALUES('stef','Hôtel Stefan', 0);

INSERT INTO chaine_hoteliere (CH_ID, nom, nombre_hotels )
VALUES('Lando','Hôtel Landon', 0);

INSERT INTO chaine_hoteliere (CH_ID, nom, nombre_hotels )
VALUES('Comf','Hôtel Comfort', 0);

INSERT INTO chaine_hoteliere (CH_ID, nom, nombre_hotels )
VALUES('Bonne','Hôtel Bonne-nuit', 0);

-- Inserting tuples into Adresse table for the postal codes used in hotels
INSERT INTO Adresse (code_postal, rue, num_de_rue, ville) VALUES
('K1A-0B1', 'Main St', '123', 'Ottawa'),
('K1A-0B3', 'Broadway Ave', '456', 'Ottawa'),
('R2C-0A1', 'Park St', '789', 'Winnipeg'),
('R2C-0A2', 'Elm St', '987', 'Winnipeg'),
('T2E-0A1', 'Oak St', '654', 'Calgary'),
('T2E-0A2', 'Maple Ave', '321', 'Calgary'),
('M5A-0A1', 'Cedar Rd', '852', 'Toronto'),
('M5A-0A2', 'Pine St', '147', 'Toronto'),

('K1A-0B5', 'Oak St', '789', 'Ottawa'),
('K1A-0B6', 'Maple Ave', '654', 'Ottawa'),
('R2C-0A5', 'Cedar Rd', '321', 'Winnipeg'),
('R2C-0A6', 'Pine St', '852', 'Winnipeg'),
('T2E-0A5', 'Main St', '456', 'Calgary'),
('T2E-0A6', 'Broadway Ave', '123', 'Calgary'),
('M5A-0A5', 'Park St', '147', 'Toronto'),
('M5A-0A6', 'Elm St', '987', 'Toronto'),

('K1A-0B7', 'Cedar Rd', '852', 'Ottawa'),
('K1A-0B8', 'Pine St', '147', 'Ottawa'),
('R2C-0A7', 'Main St', '123', 'Winnipeg'),
('R2C-0A8', 'Broadway Ave', '456', 'Winnipeg'),
('T2E-0A7', 'Park St', '789', 'Calgary'),
('T2E-0A8', 'Elm St', '987', 'Calgary'),
('M5A-0A7', 'Oak St', '654', 'Toronto'),
('M5A-0A8', 'Maple Ave', '321', 'Toronto'),

('K1A-0B9', 'Cedar Rd', '321', 'Ottawa'),
('K1A-0C0', 'Pine St', '852', 'Ottawa'),
('R2C-0A9', 'Main St', '456', 'Winnipeg'),
('R2C-0B0', 'Broadway Ave', '123', 'Winnipeg'),
('T2E-0A9', 'Park St', '147', 'Calgary'),
('T2E-0B0', 'Elm St', '987', 'Calgary'),
('M5A-0A9', 'Oak St', '789', 'Toronto'),
('M5A-0B0', 'Maple Ave', '654', 'Toronto'),

('K1A-0C1', 'Cedar Rd', '987', 'Ottawa'),
('K1A-0C2', 'Pine St', '456', 'Ottawa'),
('R2C-0B1', 'Main St', '321', 'Winnipeg'),
('R2C-0B2', 'Broadway Ave', '852', 'Winnipeg'),
('T2E-0B1', 'Park St', '654', 'Calgary'),
('T2E-0B2', 'Elm St', '147', 'Calgary'),
('M5A-0B1', 'Oak St', '987', 'Toronto'),
('M5A-0B2', 'Maple Ave', '789', 'Toronto');

--insertion des hotels
INSERT INTO Hotel (h_id, nombre_chambres, classement, ch_id, code_postal) VALUES
('hil1', 0, 5, 'hil', 'K1A-0B1'),
('hil2', 0, 5, 'hil', 'T2E-0A1'),
('hil3', 0, 5, 'hil', 'R2C-0A1'),
('hil4', 0, 4, 'hil', 'M5A-0A2'),

('stef1', 0, 4, 'stef', 'M5A-0A5'),
('stef2', 0, 4, 'stef', 'K1A-0B6'),
('stef3', 0, 4, 'stef', 'R2C-0A5'),
('stef4', 0, 3, 'stef', 'R2C-0A6'),

('Lando1', 0, 3, 'Lando', 'K1A-0B7'),
('Lando2', 0, 3, 'Lando', 'K1A-0B8'),
('Lando3', 0, 3, 'Lando', 'K1A-0B7'),
('Lando4', 0, 2, 'Lando', 'R2C-0A8'),

('Comf1', 0, 3, 'Comf', 'R2C-0A9'),
('Comf2', 0, 3, 'Comf', 'K1A-0C0'),
('Comf3', 0, 3, 'Comf', 'K1A-0B9'),
('Comf4', 0, 2, 'Comf', 'R2C-0B0'),

('Bonne1', 0, 3, 'Bonne', 'M5A-0B2'),
('Bonne2', 0, 3, 'Bonne', 'K1A-0C2'),
('Bonne3', 0, 3, 'Bonne', 'T2E-0B2'),
('Bonne4', 0, 2, 'Bonne', 'R2C-0B2');


-- Insertion des chambres
INSERT INTO chambres(chambres_id, prix, commodites, capacite, particularite, poss_extens, superficie, h_id)
VALUES
('hil1-01',600.00, '3 lits queens avec télévision et mini-bar',5,'Parfait pour les groupes de 5,vue de la mer', TRUE, 'XL','hil1'),
('hil1-02',550.00, '2 lits queens avec télévision et mini-bar',4,'Pour une famille de 2 enfants,vue de la montagne',TRUE, 'XL','hil1'),
('hil1-03',500.00, '2 lits queens avec télévision et mini-bar',3,'Pour une famille un enfant, vue de la montagne',TRUE ,'L','hil1'),
('hil1-04',450.00, '1 lits queens avec télévision et mini-bar',2,'Parfait pour un couple, vue de la mer',TRUE ,'M','hil1'),
('hil1-05',400.00, '1 lits queens avec télévision et mini-bar',1,'Parfait pour une personne,vue de la mer',TRUE ,'S','hil1'),

('hil2-01',600.00, '3 lits queens avec télévision et mini-bar',5,'Parfait pour les groupes de 5,vue de la mer', TRUE, 'XL','hil2'),
('hil2-02',550.00, '2 lits queens avec télévision et mini-bar',4,'Pour une famille de 2 enfants,vue de la montagne',TRUE, 'XL','hil2'),
('hil2-03',500.00, '2 lits queens avec télévision et mini-bar',3,'Pour une famille un enfant, vue de la montagne',TRUE ,'L','hil2'),
('hil2-04',450.00, '1 lits queens avec télévision et mini-bar',2,'Parfait pour un couple, vue de la mer',TRUE ,'M','hil2'),
('hil2-05',400.00, '1 lits queens avec télévision et mini-bar',1,'Parfait pour une personne,vue de la mer',TRUE ,'S','hil2'),

('hil3-01',600.00, '3 lits queens avec télévision et mini-bar',5,'Parfait pour les groupes de 5,vue de la mer', TRUE, 'XL','hil3'),
('hil3-02',550.00, '2 lits queens avec télévision et mini-bar',4,'Pour une famille de 2 enfants,vue de la montagne',TRUE, 'XL','hil3'),
('hil3-03',500.00, '2 lits queens avec télévision et mini-bar',3,'Pour une famille un enfant, vue de la montagne',TRUE ,'L','hil3'),
('hil3-04',450.00, '1 lits queens avec télévision et mini-bar',2,'Parfait pour un couple, vue de la mer',TRUE ,'M','hil3'),
('hil3-05',400.00, '1 lits queens avec télévision et mini-bar',1,'Parfait pour une personne,vue de la mer',TRUE ,'S','hil3'),

('hil4-01',500.00, '3 lits queens avec télévision et mini-bar',5,'Parfait pour les groupes de 5, vue de la ville',TRUE, 'L','hil4'),
('hil4-02',450.00, '2 lits queens avec télévision et mini-bar',4,'Pour une famille de 2 enfants, vue de la ville',TRUE,'L','hil4'),
('hil4-03',400.00, '2 lits queens avec télévision et mini-bar',3,'Pour une famille un enfant, accès directe à la piscine',TRUE, 'M','hil4'),
('hil4-04',350.00, '1 lits queens avec télévision et mini-bar',2,'Parfait pour un couple, accès directe à la piscine',TRUE,'M','hil4'),
('hil4-05',300.00, '1 lits queens avec télévision et mini-bar',1,'Parfait pour une personne, accès directe à la piscine',TRUE,'S','hil4'),

--------

('stef1-01',500.00, '3 lits queens avec télévision et mini-bar',5,'Parfait pour les groupes de 5, vue de la ville',TRUE, 'L','stef1'),
('stef1-02',450.00, '2 lits queens avec télévision et mini-bar',4,'Pour une famille de 2 enfants, vue de la ville',TRUE,'L','stef1'),
('stef1-03',400.00, '2 lits queens avec télévision et mini-bar',3,'Pour une famille un enfant, accès directe à la piscine',TRUE, 'M','stef1'),
('stef1-04',350.00, '1 lits queens avec télévision et mini-bar',2,'Parfait pour un couple, accès directe à la piscine',TRUE,'M','stef1'),
('stef1-05',300.00, '1 lits queens avec télévision et mini-bar',1,'Parfait pour une personne, accès directe à la piscine',TRUE,'S','stef1'),

('stef2-01',500.00, '3 lits queens avec télévision et mini-bar',5,'Parfait pour les groupes de 5, vue de la ville',TRUE, 'L','stef2'),
('stef2-02',450.00, '2 lits queens avec télévision et mini-bar',4,'Pour une famille de 2 enfants, vue de la ville',TRUE,'L','stef2'),
('stef2-03',400.00, '2 lits queens avec télévision et mini-bar',3,'Pour une famille un enfant, accès directe à la piscine',TRUE, 'M','stef2'),
('stef2-04',350.00, '1 lits queens avec télévision et mini-bar',2,'Parfait pour un couple, accès directe à la piscine',TRUE,'M','stef2'),
('stef2-05',300.00, '1 lits queens avec télévision et mini-bar',1,'Parfait pour une personne, accès directe à la piscine',TRUE,'S','stef2'),

('stef3-01',500.00, '3 lits queens avec télévision et mini-bar',5,'Parfait pour les groupes de 5, vue de la ville',TRUE, 'L','stef3'),
('stef3-02',450.00, '2 lits queens avec télévision et mini-bar',4,'Pour une famille de 2 enfants, vue de la ville',TRUE,'L','stef3'),
('stef3-03',400.00, '2 lits queens avec télévision et mini-bar',3,'Pour une famille un enfant, accès directe à la piscine',TRUE, 'M','stef3'),
('stef3-04',350.00, '1 lits queens avec télévision et mini-bar',2,'Parfait pour un couple, accès directe à la piscine',TRUE,'M','stef3'),
('stef3-05',300.00, '1 lits queens avec télévision et mini-bar',1,'Parfait pour une personne, accès directe à la piscine',TRUE,'S','stef3'),

('stef4-01',375.00, '3 lits queens avec télévision',5,'Parfait pour les groupes de 5, air-conditioner',TRUE,'L','stef4'),
('stef4-02',300.00, '2 lits queens avec télévision',4,'Pour une famille de 2 enfants, air-conditioner',TRUE,'M','stef4'),
('stef4-03',250.00, '2 lits queens avec télévision',3,'Pour une famille un enfant, air-conditioner', TRUE,'M','stef4'),
('stef4-04',200.00, '1 lits queens avec télévision',2,'Parfait pour un couple, air-conditioner',TRUE, 'S','stef4'),
('stef4-05',150.00, '1 lits queens avec télévision',1,'Parfait pour une personne, air-conditioner',TRUE,'S','stef4'),

------
('Lando1-01',375.00, '3 lits queens avec télévision',5,'Parfait pour les groupes de 5, air-conditioner',TRUE,'L','Lando1'),
('Lando1-02',300.00, '2 lits queens avec télévision',4,'Pour une famille de 2 enfants, air-conditioner',TRUE,'M','Lando1'),
('Lando1-03',250.00, '2 lits queens avec télévision',3,'Pour une famille un enfant, air-conditioner', TRUE,'M','Lando1'),
('Lando1-04',200.00, '1 lits queens avec télévision',2,'Parfait pour un couple, air-conditioner',TRUE, 'S','Lando1'),
('Lando1-05',150.00, '1 lits queens avec télévision',1,'Parfait pour une personne, air-conditioner',TRUE,'S','Lando1'),

('Lando2-01',375.00, '3 lits queens avec télévision',5,'Parfait pour les groupes de 5, air-conditioner',TRUE,'L','Lando2'),
('Lando2-02',300.00, '2 lits queens avec télévision',4,'Pour une famille de 2 enfants, air-conditioner',TRUE,'M','Lando2'),
('Lando2-03',250.00, '2 lits queens avec télévision',3,'Pour une famille un enfant, air-conditioner', TRUE,'M','Lando2'),
('Lando2-04',200.00, '1 lits queens avec télévision',2,'Parfait pour un couple, air-conditioner',TRUE, 'S','Lando2'),
('Lando2-05',150.00, '1 lits queens avec télévision',1,'Parfait pour une personne, air-conditioner',TRUE,'S','Lando2'),

('Lando3-01',375.00, '3 lits queens avec télévision',5,'Parfait pour les groupes de 5, air-conditioner',TRUE,'L','Lando3'),
('Lando3-02',300.00, '2 lits queens avec télévision',4,'Pour une famille de 2 enfants, air-conditioner',TRUE,'M','Lando3'),
('Lando3-03',250.00, '2 lits queens avec télévision',3,'Pour une famille un enfant, air-conditioner', TRUE,'M','Lando3'),
('Lando3-04',200.00, '1 lits queens avec télévision',2,'Parfait pour un couple, air-conditioner',TRUE, 'S','Lando3'),
('Lando3-05',150.00, '1 lits queens avec télévision',1,'Parfait pour une personne, air-conditioner',TRUE,'S','Lando3'),

('Lando4-01',300.00, '3 lits queens avec télévision',5,'Parfait pour les groupes de 5',TRUE,'M','Lando4'),
('Lando4-02',250.00, '2 lits queens avec télévision',4,'Pour une famille de 2 enfants',TRUE,'M','Lando4'),
('Lando4-03',200.00, '2 lits queens avec télévision',3,'Pour une famille un enfant',TRUE,'M','Lando4'),
('Lando4-04',150.00, '1 lits queens avec télévision',2,'Parfait pour un couple',TRUE,'S','Lando4'),
('Lando4-05',100.00, '1 lits queens avec télévision',1,'Parfait pour une personne',TRUE,'XS','Lando4'),

----

('Comf1-01',375.00, '3 lits queens avec télévision',5,'Parfait pour les groupes de 5, air-conditioner',TRUE,'L','Comf1'),
('Comf1-02',300.00, '2 lits queens avec télévision',4,'Pour une famille de 2 enfants, air-conditioner',TRUE,'M','Comf1'),
('Comf1-03',250.00, '2 lits queens avec télévision',3,'Pour une famille un enfant, air-conditioner', TRUE,'M','Comf1'),
('Comf1-04',200.00, '1 lits queens avec télévision',2,'Parfait pour un couple, air-conditioner',TRUE, 'S','Comf1'),
('Comf1-05',150.00, '1 lits queens avec télévision',1,'Parfait pour une personne, air-conditioner',TRUE,'S','Comf1'),

('Comf2-01',375.00, '3 lits queens avec télévision',5,'Parfait pour les groupes de 5, air-conditioner',TRUE,'L','Comf2'),
('Comf2-02',300.00, '2 lits queens avec télévision',4,'Pour une famille de 2 enfants, air-conditioner',TRUE,'M','Comf2'),
('Comf2-03',250.00, '2 lits queens avec télévision',3,'Pour une famille un enfant, air-conditioner', TRUE,'M','Comf2'),
('Comf2-04',200.00, '1 lits queens avec télévision',2,'Parfait pour un couple, air-conditioner',TRUE, 'S','Comf2'),
('Comf2-05',150.00, '1 lits queens avec télévision',1,'Parfait pour une personne, air-conditioner',TRUE,'S','Comf2'),

('Comf3-01',375.00, '3 lits queens avec télévision',5,'Parfait pour les groupes de 5, air-conditioner',TRUE,'L','Comf3'),
('Comf3-02',300.00, '2 lits queens avec télévision',4,'Pour une famille de 2 enfants, air-conditioner',TRUE,'M','Comf3'),
('Comf3-03',250.00, '2 lits queens avec télévision',3,'Pour une famille un enfant, air-conditioner', TRUE,'M','Comf3'),
('Comf3-04',200.00, '1 lits queens avec télévision',2,'Parfait pour un couple, air-conditioner',TRUE, 'S','Comf3'),
('Comf3-05',150.00, '1 lits queens avec télévision',1,'Parfait pour une personne, air-conditioner',TRUE,'S','Comf3'),

('Comf4-01',300.00, '3 lits queens avec télévision',5,'Parfait pour les groupes de 5',TRUE,'M','Comf4'),
('Comf4-02',250.00, '2 lits queens avec télévision',4,'Pour une famille de 2 enfants',TRUE,'M','Comf4'),
('Comf4-03',200.00, '2 lits queens avec télévision',3,'Pour une famille un enfant',TRUE,'M','Comf4'),
('Comf4-04',150.00, '1 lits queens avec télévision',2,'Parfait pour un couple',TRUE,'S','Comf4'),
('Comf4-05',100.00, '1 lits queens avec télévision',1,'Parfait pour une personne',TRUE,'XS','Comf4'),

----

('Bonne1-01',375.00, '3 lits queens avec télévision',5,'Parfait pour les groupes de 5, air-conditioner',TRUE,'L','Bonne1'),
('Bonne1-02',300.00, '2 lits queens avec télévision',4,'Pour une famille de 2 enfants, air-conditioner',TRUE,'M','Bonne1'),
('Bonne1-03',250.00, '2 lits queens avec télévision',3,'Pour une famille un enfant, air-conditioner', TRUE,'M','Bonne1'),
('Bonne1-04',200.00, '1 lits queens avec télévision',2,'Parfait pour un couple, air-conditioner',TRUE, 'S','Bonne1'),
('Bonne1-05',150.00, '1 lits queens avec télévision',1,'Parfait pour une personne, air-conditioner',TRUE,'S','Bonne1'),

('Bonne2-01',375.00, '3 lits queens avec télévision',5,'Parfait pour les groupes de 5, air-conditioner',TRUE,'L','Bonne2'),
('Bonne2-02',300.00, '2 lits queens avec télévision',4,'Pour une famille de 2 enfants, air-conditioner',TRUE,'M','Bonne2'),
('Bonne2-03',250.00, '2 lits queens avec télévision',3,'Pour une famille un enfant, air-conditioner', TRUE,'M','Bonne2'),
('Bonne2-04',200.00, '1 lits queens avec télévision',2,'Parfait pour un couple, air-conditioner',TRUE, 'S','Bonne2'),
('Bonne2-05',150.00, '1 lits queens avec télévision',1,'Parfait pour une personne, air-conditioner',TRUE,'S','Bonne2'),

('Bonne3-01',375.00, '3 lits queens avec télévision',5,'Parfait pour les groupes de 5, air-conditioner',TRUE,'L','Bonne3'),
('Bonne3-02',300.00, '2 lits queens avec télévision',4,'Pour une famille de 2 enfants, air-conditioner',TRUE,'M','Bonne3'),
('Bonne3-03',250.00, '2 lits queens avec télévision',3,'Pour une famille un enfant, air-conditioner', TRUE,'M','Bonne3'),
('Bonne3-04',200.00, '1 lits queens avec télévision',2,'Parfait pour un couple, air-conditioner',TRUE, 'S','Bonne3'),
('Bonne3-05',150.00, '1 lits queens avec télévision',1,'Parfait pour une personne, air-conditioner',TRUE,'S','Bonne3'),

('Bonne4-01',300.00, '3 lits queens avec télévision',5,'Parfait pour les groupes de 5',TRUE,'M','Bonne4'),
('Bonne4-02',250.00, '2 lits queens avec télévision',4,'Pour une famille de 2 enfants',TRUE,'M','Bonne4'),
('Bonne4-03',200.00, '2 lits queens avec télévision',3,'Pour une famille un enfant',TRUE,'M','Bonne4'),
('Bonne4-04',150.00, '1 lits queens avec télévision',2,'Parfait pour un couple',TRUE,'S','Bonne4'),
('Bonne4-05',100.00, '1 lits queens avec télévision',1,'Parfait pour une personne',TRUE,'XS','Bonne4');




