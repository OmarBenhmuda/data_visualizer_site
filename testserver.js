const express = require('express')
const cors = require("cors");
const mysql = require('mysql');

const app = express();
app.use(cors());


const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Backend running on port: ${PORT}`)
})
//Logging requests
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
})


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql123',
  database: 'testdb',
  timezone: '+00:00'
});

connection.connect(error => {
  if (!error) {
    console.log("connected")
  } else {
    console.log(JSON.stringify(error, undefined, 2))
  }
});


app.get('/data', (req, res) => {
  const sql = "SELECT * FROM data GROUP BY timest;";
  connection.query(sql, (error, results) => {
    if (error) throw error;

    let data = {
      x: [],
      y: []
    }
    for (let i = 0; i < results.length; i++) {
      data.x.push(results[i].timestamp);
      data.y.push(results[i].value)
    }
    return res.send(data);
  })
})

app.get('/data/realtime', (req, res) => {
  let sql = 'SELECT * FROM data ORDER BY timest DESC LIMIT 1;'
  connection.query(sql, function (error, result) {
    if (error) throw error;
    let data = {
      timestamp: result[0]['timestamp'],
      value: result[0]['value']
    }

    return res.send(data)
  });
})

app.get('/data/domain/:from/:to', (req, res) => {
  const from = req.params.from;
  const to = req.params.to;


  const sql = `SELECT * FROM data WHERE timest BETWEEN ${from} AND ${to} GROUP BY timest;`;
  connection.query(sql, (e, results) => {
    if (e) { handleDisconnect() };

    let data = {
      x: [],
      y: []
    }
    for (let i = 0; i < results.length; i++) {
      data.x.push(results[i].timestamp);
      data.y.push(results[i].value)
    }
    return res.send(data);
  })
})



function toDateTime(secs) {
  let d = new Date(Date.UTC(1970, 0, 1));
  d.setSeconds(secs);
  d.setHours(d.getHours() - 2);


  let currentHour = d.getUTCHours();
  currentHour = ("0" + currentHour).slice(-2);

  let currentMinute = d.getUTCMinutes();
  currentMinute = ("0" + currentMinute).slice(-2);

  let currentSecond = d.getUTCSeconds();
  currentSecond = ("0" + currentSecond).slice(-2);

  const date = d.getUTCFullYear() + "-" + d.getUTCMonth() + "-" + d.getUTCDate() + " " + currentHour + ":" + currentMinute + ":" + currentSecond;
  // const clock = d.getHours() + ":" + d.getMinutes();
  return date;
}
