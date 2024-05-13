const {Pool} = require("pg");


const pool = new Pool({
  user:"postgres",
  host:localhost,
  database:"tictoe",
  password:"admin12",
  port:5432
})

module.exports = pool;