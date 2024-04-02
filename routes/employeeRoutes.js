 const { Router } = require('express');

 const path = require('path');

 const router = Router();

 const pool = require('../db');

 pool.connect();

 const queries = require('../src/queries');

 router.get("/", (req,res) => {
    res.render('../views/employee_page.ejs')
 });

 router.get("/all_res", (req, res) => {
    res.status(200).sendFile(path.join(__dirname,"../public/all_res.html"))
 });

router.get("/all_res_view", (req, res) => {
     pool.query(queries.getAllReservations, (error, result) => {
        if (error) throw error
        res.status(200).send(result.rows)
     });
   
});

router.get("/new_res", (req, res) => {
    res.status(200).sendFile(path.join(__dirname,"../public/new_res.html"))
});

router.post("/new_res", (req, res) => {
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

router.get("/new_client", (req, res) => {
    res.status(200).sendFile(path.join(__dirname,"../public/new_client.html"))
});

router.post("/new_client", (req,res) => {
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


 module.exports = router