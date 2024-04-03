//stuff for database
//const { Client } = require('pg');
const express = require('express');
const router = express.Router();

// Create a new client instance and connect to the database
const client = require('../db');

router.use('/public', express.static('public'));
client.connect();

const queries = require('../src/queries');

//page principale du client
router.get('/', async (req, res) => {
    res.render('client')
});

//page de login du client
router.route('/login')
.get((req,res) =>{
    res.render('login',{errorMessage :''})
})
.post((req,res) =>{
    const NAS = req.body.nas;
    const password = req.body.password
    const query = {
        text: 'SELECT * FROM client WHERE nas = $1 AND mot_de_passe = $2',
        values: [NAS, password]
    };

    client.query(query,(err, result) => {
        if (err){
            console.error('Error', err.message);
            res.status(500).send('Internal Server Error');
            return;
        }

        if(result.rows.length > 0){
            res.redirect(`/client/${NAS}`);
        } else{
            res.render('login', {errorMessage: '**NAS ou mot de passe invalid**'});
        }
    })  
})

//page de login du client
router.route('/signup')
.get((req, res) => {
        res.render('signup', { errorMessage: '' }); 
    })
.post((req, res, next) => {
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

        client.query(queries.addAdress, [postcode, streetname, streetnumber, ville], (err, result) => {
            if (err) {
                if (err.message === 'new row for relation "adresse" violates check constraint "len_post_check"') {
                    res.render('signup', { errorMessage: 'Vous avez soumis un code postal non-valide' });
                } else {
                    next(err);
                }
            } else {
                client.query(queries.addPerson, [NAS, last, first, postcode], (err, result) =>{
                    if (err){
                        if(err.message === 'duplicate key value violates unique constraint "personne_pkey"'){
                            client.query(`DELETE FROM adresse WHERE code_postal = '${postcode}'`)
                            res.render('signup', { errorMessage: 'Vous avez utiliser un NAS deja inscrit'});
                        } else{
                            next(err);
                        }
                    } else{
                        client.query(queries.addClient, [NAS, pass, formattedDate], (err, result) =>{
                            if (err) {
                                console.error('Error inserting data into client:', err.message);
                                res.status(500).send('Error inserting data into client');
                                return;
                            }
            
                            console.log('Data inserted successfully into client');
                            res.redirect(`/client/${NAS}`); 
                        })
                    }
                })
            }
        });
 });

//page après le client fait login ou sign up
router.get('/:id', (req,res) =>{
    const userid = req.params.id;
    res.render('loggedin', { id: userid, errorMessage: '' });
})

//S'occupe de la reservation de chambres pour les clients
router.route(`/:id/ressearch`)
.get(async (req,res) =>{
    const userid = req.params.id;
    try {
        const villeresult = await client.query(queries.availVilles);
        const villes = villeresult.rows.map(row => row.ville);
        villes.push('No preferance')

        const hotelresult = await client.query(queries.getNomsdeChaines);
        const hotels = hotelresult.rows.map(row => row.nom);
        hotels.push('No preferance')

        const superficieresult = await client.query(queries.getsuperficies)
        const superficie = superficieresult.rows.map(row => row.superficie);
        
        superficie.push('No preferance')

        const nchambresresult = await client.query(queries.getNombresChambres)
        const nchambres = nchambresresult.rows.map(row => row.nombre_chambres);
        nchambres.push('No preferance')
        

        res.render(`ressearch`, {id: userid,villes: villes, hotels: hotels, superficie: superficie, nchambres: nchambres});
    } catch (error) {
        console.error('Error executing query:', error.message);
        res.status(500).send('Internal Server Error');
    }
    res.render(`ressearch`, {id: userid});
})
.post((req, res)=> {
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

    let query = 'SELECT chambres_id, prix, commodites, capacite, superficie, particularite, classement, rue, num_de_rue, ville\
    FROM Chambres C\
    INNER JOIN Hotel H ON C.H_ID = H.H_ID\
    INNER JOIN adresse A ON A.code_postal = H.code_postal\
    INNER JOIN Chaine_hoteliere CH ON H.CH_ID = CH.CH_ID\
    WHERE ';

    query += `C.prix BETWEEN '${minprice}' AND  '${maxprice}'`;
   
    if(hotelchoice !== "No preferance"){
        query += ` AND CH.nom = '${hotelchoice}'`; 
    }

    if(villechoice !== "No preferance"){
        query += ` AND A.ville = '${villechoice}'`; 
    }

    if(capacite !== "No preferance"){
        query += ` AND C.capacite = '${capacite}'`; 
    }

    if(categorie !== "No preferance"){
        query += ` AND H.classement = '${categorie}'`; 
    }

    if(superficie !== "No preferance"){
        query += ` AND C.superficie = '${superficie}'`; 
    }

    if(nchambres !== "No preferance"){
        query += ` AND H.nombre_chambres = '${nchambres}'`; 
    }

    query += ` AND C.chambres_id NOT IN (
        SELECT R.Chambres_ID
        FROM Reservation R
        WHERE R.Date_de_début <= '${enddate}' AND R.Date_de_fin >= '${startdate}'
    )`;

    console.log(query)
    client.query(query)
    .then(result => {
        const rows = result.rows;
        res.render('resresults',{rows: rows,startdate: startdate, enddate: enddate})
    })
    .catch(error => {
        console.error('Error executing query:', error.message);
        res.status(500).send(error.message);
    });
});

//S'occupe de la recherche res reservations possibles
router.route('/:id/resresults')
.get((req,res) => {
    res.send('hi')
})
.post(async (req,res)=>{
    const id = req.params.id
    const chambre_id = req.body.chambres_id
    const startdate = req.body.startdate
    const enddate = req.body.enddate

    try {
        await client.query(`INSERT INTO reservation (chambres_id, nas, date_de_début, date_de_fin) VALUES ('${chambre_id}', '${id}', '${startdate}', '${enddate}')`);
        
        res.redirect(`yourreservation`);
    } catch (error) {
        console.error('Error executing INSERT query:', error.message);
        res.status(500).send('Internal Server Error');
    }
    
    
})

//S'occupe de la page qui montre les reservations qu'un client a
router.route('/:id/yourreservation')
.get((req,res)=>{
    const id = req.params.id
    client.query(`SELECT chambres_id, date_de_début, date_de_fin FROM reservation R WHERE R.nas = '${id}'`)
    .then(result => {
        const rows = result.rows
        res.render('yourreservation',{rows: rows})
        }         
 )})
 .post((req,res)=>{
    const id = req.params.id
    res.redirect(`/client/${id}`)
 })

 //S'occupe de l'annulation des réservations
router.post('/:id/cancelRes',(req,res) =>{
    const id = req.params.id
    const chambre_id = req.body.chambres_id
    const startdate = new Date(req.body.startdate).toISOString().substring(0, 10); 
    const enddate = new Date(req.body.enddate).toISOString().substring(0, 10); 

    const currentDate = new Date();
    const startdateObj = new Date(startdate);
    if (currentDate >= startdateObj) {
        return res.status(400).send("Cannot cancel reservation")
    } 
    else{
        client.query(`DELETE FROM reservation R WHERE R.nas = '${id}' AND R.chambres_id = '${chambre_id}' AND R.date_de_début = '${startdate}' AND R.date_de_fin = '${enddate}' `,(err, result) =>{
            if(err){
                console.log(`DELETE FROM reservation R WHERE R.nas = ${id} AND R.chambres_id = '${chambre_id}' AND R.date_de_début = '${startdate}' AND R.date_de_fin = '${enddate}' `)
                return res.status(400).send("Cannot cancel reservation for unexplicable reasons")
            }
            else{
                client.query(`SELECT chambres_id, date_de_début, date_de_fin FROM reservation R WHERE R.nas = '${id}'`)
                .then(result => {
                const rows = result.rows;
                res.render('yourreservation',{rows: rows,currentDate: currentDate})
    })}})}})

 //S'occupe de l'enregistrement de problemes d'un chambre dans une reservation
router.post('/:id/probleme/:chambres_id',(req,res)=>{
    const chambres_id = req.body.chambres_id
    const id = req.params.id
    res.render('problem',{chambres_id: chambres_id, id: id})
})

//S'occupe de renvoyez le clients à ses reservations après la soumission d'un problème
router.post('/:id/probleme/:chambres_id/submitted', (req, res) => {
    const id = req.params.id;
    const chambres_id = req.params.chambres_id;
    const problem = req.body.problem;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    client.query(`INSERT INTO problem (description, date_de_commencement, chambres_id)
    VALUES ('${problem}', '${formattedDate}', '${chambres_id}')`, (err, result) => {
        if (err) {
            return res.status(400).send("Couldn't record problem");
        } else {
            res.redirect(`/client/${id}/yourreservation`);
        }
    });
});
  
module.exports = router;