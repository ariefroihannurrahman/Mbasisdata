const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParder = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParder());
app.use(express.static('public'));
app.options('*', cors());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'basdat',
});

// Add Person
app.post('/API/p/person', (req, res) => {
  const {
    firstname,
    lastname,
    username,
    city,
    state,
  } = req.body;

  con.connect(function(err) {
    const sql = `INSERT INTO person VALUES ('${firstname}', '${lastname}', '${'@' + username}', '${city}', '${state}', NULL)`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      const response = JSON.parse(JSON.stringify(result));
      console.log("1 Data Tersimpan");
      res.json(response);
    });
  });
})

// Delete Person
app.delete('/API/d/person/:id', (req, res)=>{
  let { id } = req.params;
  // console.log(id);
  con.connect(function(err) {
    console.log("Connected!");
    
    const sql = `DELETE FROM person WHERE id='${id}'`;
    con.query(sql, (err, result) => {
      if(err) throw err;
      // console.log(result);
      const response = JSON.parse(JSON.stringify(result));
      console.log("1 Data Terhapus");
      res.json(response);
    });
  });
})


// All Person
app.get('/API/g/person', (req, res)=>{
    con.connect(function(err) {
      const sql = "SELECT * FROM person";
      con.query(sql, function (err, result) {
        if (err) return console.log(err);
        const response = JSON.parse(JSON.stringify(result));
        console.log("Data Person Berhasil diambil!");
        res.json(response);
    });
  });
});

// One Person
app.get('/API/g/person/:id', (req, res)=>{
  const { id } = req.params;
  // console.log(id);
  con.connect(function(err) {
    const sql = `SELECT * FROM person where id = '${id}'`;
    con.query(sql, function (err, result) {
      if (err) return console.log(err);
      const response = JSON.parse(JSON.stringify(result));
      console.log(`Data ${id} Berhasil diambil!`);
      res.json(response);
    });
  });
});

app.post('/API/e/person/:id', (req, res)=>{
  const { id } = req.params;
  const {
    firstname,
    lastname,
    username,
    city,
    state,
  } = req.body;

  const sql = `UPDATE person SET firstname = '${firstname}', lastname = '${lastname}', username = '${'@' + username}', city = '${city}', state = '${state}' WHERE id = ${parseInt(id)}`;
  con.query(sql, function (err, result) {
    if (err) return console.log(err);
    console.log('1 Data Berhasil di Ubah')
    const response = JSON.parse(JSON.stringify(result));
    res.json(response);
  });
})

app.listen(5000, function () {
  console.log('App listening on port 5000!')
})