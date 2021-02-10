const express = require('express')
const cors = require("cors");
const mysql = require('mysql');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
app.use(cors());
app.use(compression());
app.use(helmet());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Backend running on port: ${PORT}`)
})
//Logging requests
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
})

app.use(express.static('../workstudy-site/dist/workstudy-site/index.html')); //Serves resources from public folder

db_config = {
  host: '23.229.134.169',
  user: 'orfteam',
  password: 'orfproject',
  database: 'samd',
  timezone: '+00:00'
}

let connection = mysql.createConnection(db_config);
connection.connect(error => {
  if (!error) {
    console.log("connected")
  } else {
    console.log("error" + JSON.stringify(error, undefined, 2))
  }
});


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


app.get('/data/:graphName', (req, res) => {
  const graphName = req.params.graphName;

  const sql = `SELECT * FROM samd.${graphName} GROUP BY timest;`;
  connection.query(sql, (e, results) => {
    if (e) { handleDisconnect() };

    let data = {
      x: [],
      y: []
    }
    if (typeof results != 'undefined') {
      for (let i = 0; i < results.length; i++) {
        data.x.push((results[i].timestamp));
        data.y.push(results[i].value)
      }
    }

    return res.send(data);
  })
})

app.get('/data/domain/:graphName/:from/:to', (req, res) => {
  const graphName = req.params.graphName;
  const from = req.params.from;
  const to = req.params.to;


  const sql = `SELECT * FROM samd.${graphName} WHERE timest BETWEEN ${from} AND ${to} GROUP BY timest;`;
  connection.query(sql, (e, results) => {
    if (e) { handleDisconnect() };

    let data = {
      x: [],
      y: []
    }
    for (let i = 0; i < results.length; i++) {
      data.x.push((results[i].timestamp));
      data.y.push(results[i].value)
    }
    return res.send(data);
  })
})


app.get('/data/realtime/:graphName', (req, res) => {
  const graphName = req.params.graphName;

  let sql = `SELECT * FROM samd.${graphName} ORDER BY timest DESC LIMIT 1;`
  connection.query(sql, function (error, result) {
    if (error) throw error;
    let data = {
      timestamp: result[0]['timestamp'],
      value: result[0]['value']
    }

    return res.send(data)
  });
})




//                                                    // unused function to change date in seconds to a readable date
// function toDateTime(secs) {
//   let d = new Date(Date.UTC(1970, 0, 1));
//   d.setSeconds(secs);
//   d.setHours(d.getHours() - 2);


//   let currentHour = d.getUTCHours();
//   currentHour = ("0" + currentHour).slice(-2);

//   let currentMinute = d.getUTCMinutes();
//   currentMinute = ("0" + currentMinute).slice(-2);

//   let currentSecond = d.getUTCSeconds();
//   currentSecond = ("0" + currentSecond).slice(-2);

//   let

//   const date = d.getUTCFullYear() + "-" + d.getUTCMonth() + "-" + d.getUTCDate() + " " + currentHour + ":" + currentMinute + ":" + currentSecond;
//   // const clock = d.getHours() + ":" + d.getMinutes();
//   return date;
// }


setInterval(function () {
  connection.query('SELECT 1');
}, 5000);
