
--Trigger 1: Mis-à jour des nombres de chambres après l'insertion ou delete dùne chambre
CREATE OR REPLACE FUNCTION update_nombre_chambres()
RETURNS TRIGGER AS
$$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE Hotel
        SET nombre_chambres = nombre_chambres + 1
        WHERE H_ID = NEW.H_ID;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE Hotel
        SET nombre_chambres = nombre_chambres - 1
        WHERE H_ID = OLD.H_ID;
    END IF;
    
    RETURN NULL; 
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER update_chambres_count
AFTER INSERT OR DELETE ON Chambres
FOR EACH ROW
EXECUTE FUNCTION update_nombre_chambres();


--Trigger 2: Mis-à jour du prix moyenne d'une hotel
CREATE OR REPLACE FUNCTION update_prix_moy()
RETURNS TRIGGER AS
$$
BEGIN
    IF TG_OP IN ('INSERT', 'UPDATE', 'DELETE') THEN
        UPDATE Hotel
        SET prix_moy = (
            SELECT AVG(Prix)
            FROM Chambres
            WHERE H_ID = COALESCE(NEW.H_ID, OLD.H_ID)
        )
        WHERE H_ID = COALESCE(NEW.H_ID, OLD.H_ID);
    END IF;

    RETURN NULL;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER update_prix_moy_trigger
AFTER INSERT OR UPDATE OR DELETE ON Chambres
FOR EACH ROW
EXECUTE FUNCTION update_prix_moy();
        
--Trigger 3: Mis a jour de nombre dhotels ouvert par chaines
CREATE OR REPLACE FUNCTION update_nombres_hotels()
RETURNS TRIGGER AS
$$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE chaine_hoteliere
        SET nombre_hotels = nombre_hotels + 1
        WHERE CH_ID = NEW.CH_ID;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE hotel
        SET nombre_hotels = nombre_hotels - 1
        WHERE CH_ID = OLD.CH_ID;
    END IF;

    RETURN NULL;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER update_hotels_count
AFTER INSERT OR DELETE ON hotel
FOR EACH ROW
EXECUTE FUNCTION update_nombres_hotels();

