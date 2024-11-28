import express from 'express'
const app = express()


// Importando Connection
import connection from './config/sequelize-config.js'

// Importando o controller
import GaleriaController from './controllers/GaleriaController.js'

app.use("/", GaleriaController)

import session from 'express-session'
app.use(session({
  secret: 'uploadsecret',
  cookie: {maxAge: 3600000},
  saveUninitialized: false,
  resave: false
}))

import flash from 'express-flash'
app.use(flash())


app.use(express.urlencoded({extended: false}))

//Configurações
app.use(express.static('public'))
app.set('view engine', 'ejs')

// ROTA PRINCIPAL
app.get("/", (req,res) => {
        res.render("index", {
            messages: req.flash()
        })
    })


// Realizando a conexão com o banco de dados
connection.authenticate()
.then(() => {
  console.log('Conexão com o Banco de Dados feita com sucesso!')
}).catch((error) => {
  console.log(error)
})

connection.query('CREATE DATABASE IF NOT EXISTS upload;')
.then(() => {
  console.log('Banco de Dados está criado')
}).catch((error) => {
  console.log(error)
})

const port = 8080
app.listen(port, (error) => {
    if(error){
        console.log(`Ocorreu um erro ${error}`);
    } else {
        console.log(`Servidor iniciado com sucesso em http://localhost:${port}`);
    }
})