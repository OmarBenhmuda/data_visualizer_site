const express = require('express')
const cors = require("cors");
const mysql = require('mysql');
const compression = require('compression');
const path = require('path');

let db_config = require('./db')

const app = express();
app.use(cors());
app.use(compression());

app.use(express.static(path.join(__dirname, '../dist/workstudy-site')));



//Logging requests
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
})





function handleDisconnect() {
  connection = mysql.createConnection(db_config);
  connection.connect(function (err) {
    if (err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }
  });
  connection.on('error', function (err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}



app.get('/data/:graphName', async (req, res) => {
  let connection = mysql.createConnection(db_config);
  connection.connect(error => {
    if (!error) {
    } else {
      console.log("error" + JSON.stringify(error, undefined, 2))
    }
  });

  const graphName = req.params.graphName;


  const sql = `SELECT * FROM samdb.${graphName} GROUP BY timest;`;

  let dateTracker = 0;

  let data = {
    x: [],
    y: []
  }

  connection.query(sql, (e, results) => {
    if (e) { handleDisconnect() };

    if (typeof results != 'undefined') {
      for (let i = 0; i < results.length; i++) {
        if (i == 0) {
          dateTracker = results[i].timestamp.getDate();
        }
        if (dateTracker != results[i].timestamp.getDate()) {
          data.x.push(null);
          data.y.push(null)
          data.x.push((results[i].timestamp));
          data.y.push(results[i].value)
          dateTracker = results[i].timestamp.getDate();
        } else {
          data.x.push((results[i].timestamp));
          data.y.push(results[i].value)
        }
      }
    }

    connection.end()
    return res.send(data);

  })



})

app.get('/data/domain/:graphName/:from/:to', async (req, res) => {

  let connection = mysql.createConnection(db_config);
  connection.connect(error => {
    if (!error) {
    } else {
      console.log("error" + JSON.stringify(error, undefined, 2))
    }
  });


  const graphName = req.params.graphName;
  const from = req.params.from;
  const to = req.params.to;


  const sql = `SELECT * FROM samdb.${graphName} WHERE timest BETWEEN ${from} AND ${to} GROUP BY timest;`;

  const results = await connection.query(sql);
  connection.query(sql, (e, results) => {
    if (e) { handleDisconnect() };


    let data = {
      x: [],
      y: []
    }
    if (typeof results != 'undefined') {
      for (let i = 0; i < results.length; i++) {
        if (i == 0) {
          dateTracker = results[i].timestamp.getDate();
        }
        if (dateTracker != results[i].timestamp.getDate()) {
          data.x.push(null);
          data.y.push(null)
          data.x.push((results[i].timestamp));
          data.y.push(results[i].value)
          dateTracker = results[i].timestamp.getDate();
        } else {
          data.x.push((results[i].timestamp));
          data.y.push(results[i].value)
        }
      }
    }
    connection.end();
    return res.send(data);
  })
})


app.get('/data/realtime/:graphName', async (req, res) => {

  let connection = mysql.createConnection(db_config);
  connection.connect(error => {
    if (!error) {
    } else {
      console.log("error" + JSON.stringify(error, undefined, 2))
    }
  });

  const graphName = req.params.graphName;

  let sql = `SELECT * FROM samdb.${graphName} ORDER BY timest DESC LIMIT 1;`
  connection.query(sql, function (error, result) {
    if (error) throw error;
    let data = {
      timestamp: result[0]['timestamp'],
      value: result[0]['value']
    }

    connection.end();

    return res.send(data)
  });
})



const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}...`)
})


