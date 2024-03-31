//stuff for database
const { Client } = require('pg');
const express = require('express');
const router = express.Router();

// Create a new client instance and connect to the database
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "s/83Fvq/pG",
    database: "CSI2532"
});

router.use('/public', express.static('public'));
client.connect();

router.get('/', async (req, res) => {
    res.render('client')
});


router.route('/login')
.get((req,res) =>{
    res.render('login')
})

.post((req,res) =>{
    const NAS = req.body.nas;
    const password = req.body.password
    const query = {
        text: 'SELECT * FROM client WHERE nas = $1 AND mot_de_passe = $2',
        values: [NAS, password]
    };

    client.query(query,(err, result)=> {
        if (err){
            console.error('Error', err.message);
            res.status(500).send('Internal Server Error');
            return;
        }

        if(result.rows.length > 0){
            res.redirect(`/client/${NAS}`);
        } else{
            res.render('login');
        }
    })  
})

router.route('/signup')
.get((req,res) =>{
    res.render('signup')
})

.post((req, res,next) =>{
    const first = req.body.firstname;
    const last = req.body.lastname;
    const NAS = req.body.nas;
    const pass = req.body.password;
    const streetname = req.body.streetname;
    const streetnumber = req.body.streetnumber;
    const postcode = req.body.postcode;
    const ville = req.body.city;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0'); 
    const formattedDate = `${year}-${month}-${day}`;

    console.log(postcode);

    client.query(`SELECT COUNT(*) AS count FROM Personne`)

    client.query('INSERT INTO adresse(code_postal, rue, num_de_rue, ville) VALUES ($1, $2, $3, $4)', [postcode, streetname, streetnumber, ville], (err, result) => {
        if (err) {
            if (err.message = "value too long for type character varying(7)"){
                console.error('Error inserting data into adresse:', err.message);
                res.status(500).send('you did not enter a valid postal code');
                
            } else{
            console.error('Error inserting data into adresse:', err.message);
            res.status(500).send('The NAS AND/OR Postal code inserted has already been registered');}
            return;
        }

        console.log('Data inserted successfully into adresse');

        client.query('INSERT INTO Personne(nas, nom, prenom, code_postal) VALUES($1,$2,$3,$4)', [NAS, last, first, postcode], (err, result) => {
            if (err) {
                console.error('Error inserting data into Personne:', err.message);
                res.status(500).send('Could not insert');
                return;
            }

            console.log('Data inserted successfully into Personne');

            client.query('INSERT INTO client(nas, mot_de_passe, date_enreg) VALUES($1,$2,$3)', [NAS, pass, formattedDate], (err, result) => {
                if (err) {
                    console.error('Error inserting data into client:', err.message);
                    res.status(500).send('Error inserting data into client');
                    return;
                }

                console.log('Data inserted successfully into client');
                res.redirect(`/client/${NAS}`);
                // Send response after completing all database operations
                
            });
        });
    });
})

router.get('/:id', (req,res) =>{
    const userid = req.params.id;
    res.render('loggedin', {id: userid});
})

router.route(`/:id/reservation`)
.get(async (req,res) =>{
    const userid = req.params.id;
    try {
        const villeresult = await client.query('SELECT DISTINCT ville FROM adresse, hotel where adresse.code_postal = hotel.code_postal');
        const villes = villeresult.rows.map(row => row.ville);
        villes.push('No preferance')

        const hotelresult = await client.query('SELECT DISTINCT nom FROM chaine_hoteliere');
        const hotels = hotelresult.rows.map(row => row.nom);
        hotels.push('No preferance')

        const superficieresult = await client.query('SELECT DISTINCT superficie from chambres')
        const superficie = superficieresult.rows.map(row => row.superficie);
        
        superficie.push('No preferance')

        const nchambresresult = await client.query('SELECT DISTINCT nombre_chambres FROM hotel')
        const nchambres = nchambresresult.rows.map(row => row.nombre_chambres);
        nchambres.push('No preferance')
        

        res.render(`reservation`, {id: userid,villes: villes, hotels: hotels, superficie: superficie, nchambres: nchambres});
    } catch (error) {
        console.error('Error executing query:', error.message);
        res.status(500).send('Internal Server Error');
    }
    res.render(`reservation`, {id: userid});
})
.post((req, res, next)=> {
    const hotelchoice = req.body.chaine_hotel;
    const villechoice = req.body.ville;
    const startdate = req.body.startdate;
    const enddate = req.body.enddate;
    const capacite = req.body.capacite;
    const categorie = req.body.categorie;
    const superficie = req.body.superficie;
    const nchambres = req.body.nchambres;
    const minprice = req.body.minprice;
    const maxprice = req.body.maxprice;

    /*
    SELECT chambres_id, prix, commodites, capacite, superficie, particularite, classement, rue, num_de_rue, ville
    FROM Chambres C
    INNER JOIN Hotel H ON C.H_ID = H.H_ID
    INNER JOIN adresse A ON A.code_postal = H.code_postal
    INNER JOIN Chaine_hoteliere CH ON H.CH_ID = CH.CH_ID
    INNER JOIN reservation R ON R.chambres_id = C.chambres_id
    WHERE CH.Nom = ''
    WHERE CH.capacite = ''
    WHERE CH.superficie = ''
    WHERE H.nombrs_chambres = ''
    WHERE prix BETWEEN min AND max*/
;

})



module.exports = router;