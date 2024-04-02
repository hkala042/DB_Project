//stuff for database
const { Client } = require('pg');
const express = require('express');
const router = express.Router();

// Create a new client instance and connect to the database
const client = require('../db');

router.use('/public', express.static('public'));
client.connect();

router.get('/',(req,res) =>{
    res.render('client')
})

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

module.exports = router;