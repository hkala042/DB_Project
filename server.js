const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

/*------------------------*/

app.use('/public', express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.render('index')
})
;
const clientRouter = require('.\\routes\\client');

const employeeRouter = require('./routes/employeeRoutes')
app.use('/client', clientRouter)

app.use("/api/employee", employeeRouter);

const port = 3000;

console.log(`Server is listenning on port ${port}`);
 
app.listen(port)