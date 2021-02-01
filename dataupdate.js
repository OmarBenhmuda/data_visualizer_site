const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql123',
  database: 'testdb'
});

connection.connect(error => {
  if (!error) {
    console.log("connected")
    populateTable();
  } else {
    console.log(JSON.stringify(error, undefined, 2))
  }
});
function populateTable() {
  const timest = Math.floor(new Date().getTime() / 1000)
  const data = Math.random();
  const sql = `INSERT INTO data (timest, value) VALUES (${timest}, ${data} )`;
  connection.query(sql, function (error, result) {
    if (error) throw error;
    console.log("1 record inserted");
  });
  setTimeout(populateTable, 6000)
}
