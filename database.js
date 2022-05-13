const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'payoda@123',
  database: 'todo_db'
})


module.exports = connection;