const express = require('express')
const connection = require('./database')
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const todoreq = require("./routes/todo")


//Database Connection
connection.connect(function(err){
  if(err) throw err
  console.log("Database Connected")
})

//Middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:false}));

//routes
app.use(todoreq);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

