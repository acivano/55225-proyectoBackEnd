const express = require('express')
const { api, home } = require('./src/routes')

const app = express()

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

//app.use('/', home)

app.use('/api', api)

//---- Defino Express------

const port = 8080

app.listen(port, ()=>{
    console.log(`Express Server listening at http://localhost:${port}`)
})

//-------------------------



