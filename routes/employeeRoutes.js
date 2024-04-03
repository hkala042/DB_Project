 const { Router } = require('express');

 const path = require('path');

 const router = Router();

 const pool = require('../db');

 pool.connect();

 const queries = require('../src/queries');

 router.get("/", (req,res) => {
    res.render('../views/employee_page.ejs')
 });

 //S'occupe de l'affichage des reservations
 router.get("/all_res", (req, res) => {
    res.status(200).sendFile(path.join(__dirname,"../public/all_res.html"))
 });


router.get("/all_res_view", (req, res) => {
     pool.query(queries.getAllReservations, (error, result) => {
        if (error) throw error
        res.status(200).send(result.rows)
     });
   
});

//S'occupe de la mise-à-jour des contacts de hotels
router.get('/update_contact',(req,res)=>{
    const empid = req.query.empid
    const currentnum = req.query.currentnum
    console.log(empid)
    res.render('Update_hotelcontacts',{currentnum: currentnum, empid:empid})
})
router.post('/update_contact',(req,res)=>{
    const numbdetele = req.body.numbdetele
    const courriel = req.body.courriel
    const h_id = req.body.h_id
    const currentnum = req.body.currentnum
    const empid = req.body.empid;

    console.log(empid)
    console.log(currentnum)
    pool.query(
        `UPDATE contacts_hotel
         SET numero = '${numbdetele}', courriel = '${courriel}', h_id = '${h_id}'
         WHERE numero = '${currentnum}' `,
        (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(400).send('The modification was not successful');
            } else {
                res.redirect(`/api/employee/${empid}`);
            }
        }
    );
    
})

//S'occupe de la creation des reservations par employer
router.route(`/new_res`)
.get((req, res) => {
    res.status(200).sendFile(path.join(__dirname,"../public/new_res.html"))
})
.post((req, res) => {
    const data = req.body;
    pool.query(queries.checkIfRoomAvailable, [data.chambre_id, data.date_de_début], (error, results) => {
        if (error) throw error
        if (results.rows.length > 0) res.json({ res : false})
        else{
            pool.query(queries.addNewReservation, [data.chambre_id, data.client_id, data.date_de_début, data.date_de_fin], 
                (error, result) => {
                    if (error) res.status(500).send("Une erreur s'est produite putain!!!!")

                });
            res.status(200).json({ res : true })
    }
   
    })

    
});

//S'occupe de la creation des clients
router.route("/new_client")
.get((req, res) => {
    res.status(200).sendFile(path.join(__dirname,"../public/new_client.html"))
})
.post((req,res) => {
    const data = req.body;
    pool.query(queries.getClientById, [data.nas], (error, result) => {
        if (error) throw error
        if (result.rows.length > 0) res.json({ res: false})
        else{
    
    pool.query(queries.addAdress, [data.code_postal, data.rue, data.num_rue, data.ville], (error1, res1) =>{
        if (error1) throw error1
        pool.query(queries.addPerson, [data.nas, data.nom, data.prenom, data.code_postal], (error2, res2) =>{
            if (error2) throw error2
            pool.query(queries.addClient, [data.nas, data.reg_date], (error3, res3) => {
                if (error3) throw error3
            })
        })
    });
    
    res.status(200).json({res: true})
    }
    })
});

//S'occupe de le log in des employers
router.route('/login')
.get((req,res)=>{
    res.render('employee_login')
})
.post((req,res,next)=>{
    const action = req.body.action
    const nas = req.body.nas

    if(action === 'login'){
        const NAS = req.body.nas;
    
        const query = {
            text: 'SELECT * FROM employe WHERE nas = $1',
            values: [NAS]
        };
    
        pool.query(query,(err, result) => {
            if (err){
                console.error('Error', err.message);
                res.status(500).send('Internal Server Error');
                return;
            }
    
            if(result.rows.length > 0){
                res.redirect(`/api/employee/${NAS}`);
            } else{
                res.render('employee_login');
            }
        })  
    }else{
        const first = req.body.firstname;
        const last = req.body.lastname;
        const NAS = req.body.nas;
        const role = req.body.role;
        const streetname = req.body.streetname;
        const streetnumber = req.body.streetnumb;
        const postcode = req.body.postalcode;
        const ville = req.body.ville;
        const h_id = req.body.h_id

        pool.query('INSERT INTO adresse(code_postal, rue, num_de_rue, ville) VALUES ($1, $2, $3, $4)', [postcode, streetname, streetnumber, ville], (err, result) => {
            if (err) {
                if (err.message === 'new row for relation "adresse" violates check constraint "len_post_check"') {
                    res.render('signup', { errorMessage: 'Vous avez soumis un code postal non-valide' });
                } else {
                    next(err);
                }
            } else {
                pool.query('INSERT INTO personne(nas, nom, prenom, code_postal) VALUES($1,$2,$3,$4)', [NAS, last, first, postcode], (err, result) =>{
                    if (err){
                        if(err.message === 'duplicate key value violates unique constraint "personne_pkey"'){
                            pool.query(`DELETE FROM adresse WHERE code_postal = '${postcode}'`)
                            res.render('signup', { errorMessage: 'Vous avez utiliser un NAS deja inscrit'});
                        } else{
                            next(err);
                        }
                    } else{
                        pool.query('INSERT INTO employe(nas, rôle, h_id) VALUES($1,$2,$3)', [NAS, role, h_id], (err, result) =>{
                            if (err) {
                                console.error('Error inserting data into client:', err.message);
                                res.status(500).send('Error inserting data into client');
                                return;
                            }
            
                            console.log('Data inserted successfully into client');
                            res.redirect(`api/employee/${NAS}`); 
                        })
                    }
                })
            }
        });
  }
})

//
router.route('/mod_res')
.get((req, res) => {
        const res_id = req.query.res_id; 
        const empid= req.query.empid
        res.render('Update_reservation', { res_id: res_id, empid: empid });
    })

.post((req,res) =>{
    const resid = req.body.resid;
    const chambres_id = req.body.chambres_id;
    const nas = req.body.NAS;
    const startdate = req.body.startdate;
    const enddate = req.body.enddate;
    const empid = req.body.empid;

    const query = `Update reservation\
    SET chambres_id ='${chambres_id}', nas = '${nas}', date_de_début = '${startdate}', date_de_fin = '${enddate}' \
    WHERE res_id = ${resid}`
    console.log(empid)

    pool.query(
    query, (err, result)=>{
        if(err){
            res.status(400).send(query)
        }else{
            res.redirect(`/api/employee/${empid}`)
        }
    })})

//S'occupe du sections des clients pour les travailleurs
router.get("/search_client", (req, res) => {
    const empid = req.query.empid
    res.status(200).render("search_client",{empid: empid})
});

//S'occupe de la supprimation des clients
router.post('/search_client/delete', (req, res) => {
    const nas = req.body.nas;
    pool.query(queries.getClientById, [nas], (error, result) => {
        if (error){
            res.send( { res: false });
            throw error
        }
        if (result.rows.length > 0 ){
            pool.query(queries.delPerson, [nas], (error1, result1) => {
                if (error1){ 
                    res.send({ res:false });
                    throw error1
                }
                res.redirect('/api/employee/login')
            } )
        }else{ res.json({ res: false }) }
    })

});


//S'occupe de la mise-à-jour des clients
router.route('/search_client/update')
.get((req, res) => {
    const nas = req.query.nas;
    console.log(nas)
    
      pool.query(queries.getClientById, [nas], (error, result) => {
        if (error){
            res.send( { res: false });
            throw error
        }
        if (result.rows.length > 0){
            pool.query(queries.getPersonInfo, [nas], (err, resu) => {
                if (err){
                    res.send( { res: false });
                    throw err
                }
                const client = resu.rows[0];
                res.status(200).render("update_client", { client : client, nas : nas })
                
                
            })
        }
            

    })
})
.post((req, res) => {
    const nas = req.body.nas;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const code_postal = req.body.code_postal;
    const rue = req.body.rue;
    const num_rue = req.body.num_rue;
    const ville = req.body.ville;
    const empid = req.body.empid

 
    pool.query(queries.updtAdress, [nas, code_postal, rue, num_rue, ville], (err, resu) =>{
        if (err){
            res.status(400);
            throw err
        }
        pool.query(queries.updtPerson, [nas, nom, prenom], (err1, res1) =>{
            if(err1) throw err1
        })

    })

    res.redirect('/api/employee/login')
});

//S'occupe de la recherche des reservations
router.get("/search_res/s", (req, res) => {
    res.status(200).sendFile(path.join(__dirname,"../public/search_res.html"))
});


//S'occupe de la mise-à-jour des reservations
router.get("/search_res/update", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../public/update_res.html"))
});

//S'occupe de la supprimation des reservations
router.post("/search_res/delete", (req, res) => {
    const res_id = req.body.res_id;

    pool.query(queries.delRes, [res_id], (err, resu) => {
        if (err) throw err
        res.send({ res : true})
    })
});

//
router.post("/search_res/update/res", (req, res ) => {

    const res_id = req.body.res_id
    const chambre_id = req.body.chambre_id;
    const debut_date = req.body.debut_date;
    const fin_date = req.body.fin_date;

    pool.query(queries.checkIfRoomAvailable, [chambre_id, debut_date], (err, resu) =>{
        if (err) throw err
        if (resu.rows.length > 0) res.send( { res : 'NOT AVAILABLE'})
        else{
    pool.query(queries.updtRes, [res_id, chambre_id, debut_date, fin_date], (err1, res1)=>{
        if (err1) throw err1
        else{ res.send({ res : true})}
    })
    }
    })
});

//
router.get("/search_res/get_res/:id", (req, res)=>{
    pool.query(queries.getResById, [req.params.id], (err, resu)=>{
        if (err) throw err
        if (resu.rows.length > 0 ){
            res.status(200).send(resu.rows)
        }
        else{ res.send({ res:false }) }
    })
});

//
router.get('/:id',(req,res)=>{
    const empid = req.params.id
    res.render('employee_page',{empid:empid})
});


 module.exports = router