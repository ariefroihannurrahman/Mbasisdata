const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParder = require('body-parser');
app.use(bodyParder());
app.use(express.static('public'));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'basdat',
});

app.post('/create', (req, res) => {
  const {
    firstname,
    lastname,
    username,
    city,
    state,
    check,
  } = req.body;

  con.connect(function(err) {
    console.log("Connected!");
    
    const sql = `INSERT INTO person VALUES ('${firstname}', '${lastname}', '${'@' + username}', '${city}', '${state}', NULL)`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
      // console.log(result);
      res.redirect('/');
    });
  });
})

app.get('/edit', (req, res)=>{
  res.render('/edit');
})

app.get('/delete/:id', (req, res)=>{
  let id = req.params.id;
  console.log(id);
  con.connect(function(err) {
    console.log("Connected!");
    
    const sql = `DELETE FROM person WHERE id=${id};`;
    con.query(sql, (err, result) => {
      if(err) throw err;
      // console.log(result);
      console.log("1 record deleted");
      res.redirect('/');
    });
  });
})

app.get('/', (req, res)=>{
    con.connect(function(err) {
    console.log("Connected!");
    
    const sql = "SELECT * FROM person";
    con.query(sql, function (err, result) {
      if (err) return console.log(err);
      // console.log(result);
      res.render('crud.ejs', {
        person: result,
      })
    });
  });
});

app.get('/edit/:id', (req, res)=>{
  const id = req.params.id;

  const sql = `SELECT * FROM person WHERE id=${id}`;
  con.query(sql, function (err, result) {
    if (err) return console.log(err);
    // console.log(result[0]);
    res.render('edit.ejs', {
      person: result[0],
    })
  });
})

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})