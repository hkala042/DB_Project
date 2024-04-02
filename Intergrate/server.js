const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true}))

/*------------------------*/

app.use('/public', express.static('public'));

app.set('view engine', 'ejs')

app.get('/', (req, res) =>{
    res.render('index')
})

const clientRouter = require('.\\routes\\client')
app.use('/client', clientRouter)
 
app.listen(3000)