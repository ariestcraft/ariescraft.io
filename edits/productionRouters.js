const express = require('express');
const connection = require('../database/db');
const Routers = express.Router();
const fileUpload = require('express-fileupload');
var session = require('express-session');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');

function newId() {
  return uuidv4();
}

//cookie parser
Routers.use(cookieParser());

//file upload
Routers.use(fileUpload());


// session
const oneHour = 1000 * 60 * 15;
Routers.use(session({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767iamdeveloper" + uuidv4(),
  saveUninitialized: true,
  cookie: { maxAge: oneHour },
  resave: false
}));



Routers.get('/production', async function (req, res) {
  req.session.productionLogin = false;
  res.render(__dirname + '/production/login');
});

Routers.get('/production/login', async function (req, res) {
  req.session.productionLogin = false;
  res.render(__dirname + '/production/login');
});

Routers.get('/production/logout', async function (req, res) {
  req.session.productionLogin = false;
  res.render(__dirname + '/production/login');
});



//start account
Routers.get('/production/account_edit', async function (req, res) {
  if (req.session.productionLogin) {

    await getData("SELECT * FROM  production where id= '" + req.session.productionId + "'").then((data) => {
      obj2 = data;
    }).catch((err) => console.error(err));
    res.render(__dirname + '/production/account_edit', { user: obj2 });

  } else {

    //res.send('Please login to view this page!');
    req.session.productionLogin = false;
    res.render(__dirname + '/production/login');

  }
  res.end();

});



//start account
Routers.get('/production/view_files', async function (req, res) {
  if (req.session.productionLogin) {

    var cpid = req.query.cpid;

    await getData("SELECT * FROM pmupload WHERE cpid=" + cpid + "").then((data) => {
      porder = data;
      console.log(data)
    }).catch((err) => console.error(err));

    res.render(__dirname + '/production/view_files', { porder });

  } else {

    //res.send('Please login to view this page!');
    req.session.productionLogin = false;
    res.render(__dirname + '/production/login');

  }
  res.end();

});




//start account
Routers.get('/production/account', async function (req, res) {
  if (req.session.productionLogin) {

    await getData("SELECT * FROM  production where id= " + req.session.productionId + "").then((data) => {
      ac = data;
    }).catch((err) => console.error(err));

    res.render(__dirname + '/production/account', { ac });

  } else {

    //res.send('Please login to view this page!');
    req.session.productionLogin = false;
    res.render(__dirname + '/production/login');

  }
  res.end();

});

Routers.post('/production/account_updata', function (req, res) {
  // console.log("req",req.body);
  var today = new Date();
  var users = {
    "name": req.body.name,
    "email": req.body.email,
    "password": req.body.password,
    "phone_no": req.body.phone_no,
    "address": req.body.address,
    "city": req.body.city,
    "zip": req.body.zip,
    "created": today
  };
  connection.query('update users SET ? where id = "' + req.session.productionId + '"', users, function (error, results, fields) {
    if (error) {
      //console.log("error ocurred",error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      });
    } else {
      //   console.log('The solution is: ', results);

      res.redirect('/production/account_edit');
    }
  });
});

//end of account


//start contact_us
Routers.get('/production/contact_us', async function (req, res) {
  if (req.session.productionLogin) {

    await getData("SELECT * FROM users where id= " + req.session.productionId + "").then((data) => {
      obj2 = data;
    }).catch((err) => console.error(err));
    res.render(__dirname + '/production/contact_us', { user: obj2 });

  } else {

    //res.send('Please login to view this page!');
    req.session.productionLogin = false;
    res.render(__dirname + '/production/login');

  }
  res.end();

});
//end of contact_us

//start od login
Routers.post('/production/login', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  connection.query('SELECT * FROM production WHERE email = ?', [email], function (error, results, fields) {
    if (error) {
      console.log("error ocurred", error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      });
    } else {
      //console.log('The solution is: ', results);
      if (results.length > 0) {
        if (results[0].password == password) {

          req.session.productionLogin = email;
          req.session.productionEmail = email;
          req.session.productionId = results[0].id;
          req.session.productionName = results[0].name;

          res.redirect('/production/index');
        }
        else {
          res.send({
            "code": 204,
            "success": "Email and password does not match"
          });
        }
      }
      else {
        //console.log("error:"+ error);
        //console.log("result:"+ result);
        res.send({
          "code": 204,
          "success": "Email does not exits"

        });
      }
    }
  });
});


//end of login

//start of sign

Routers.post('/production/register', function (req, res) {
  // console.log("req",req.body);
  var today = new Date();
  var users = {
    "name": req.body.name,
    "email": req.body.email,
    "password": req.body.password,
    "phone_no": req.body.phone_no,
    "address": req.body.address,
    "city": req.body.city,
    "zip": req.body.zip,
    "created": today
  };
  connection.query('INSERT INTO users SET ?', users, function (error, results, fields) {
    if (error) {
      console.log("error ocurred", error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      });
    } else {
      //   console.log('The solution is: ', results);

      res.redirect('/production');
    }
  });
});


//emd of sing

//start of index

Routers.get('/production/index', async function (req, res) {
  if (req.session.productionLogin) {

    await getData("SELECT * FROM product where assign_id=" + req.session.productionId + "").then((data) => {
      product = data;
    }).catch((err) => console.error(err));


    res.render(__dirname + '/production/index', { product });
  } else {

    //res.send('Please login to view this page!');
    req.session.productionLogin = false;
    res.render(__dirname + '/production/login');

  }
  res.end();

});


// View product page
Routers.get('/production/view_product', async function (req, res) {

  var id = req.query.id;

  if (req.session.productionLogin) {

    await getData("SELECT * FROM product WHERE id=" + id + "").then((data) => {
      product = data;
    }).catch((err) => console.error(err));

    await getData("SELECT * FROM mupload WHERE order_id=" + id + "").then((data) => {
      order = data;
    }).catch((err) => console.error(err));

    res.render(__dirname + '/production/view_product', { product: product, order });


  } else {

    //res.send('Please login to view this page!');
    req.session.productionLogin = false;
    res.render(__dirname + '/production/login');

  }
  res.end();
});
// end of View product page




Routers.get('/production/upload_project', async (req, res) => {
  if (req.session.productionLogin) {
    var id = req.query.id;
    var pid = req.query.pid;
    var service = req.query.service;


    await getData("SELECT * FROM complete_project WHERE product_id=" + id + " AND user_id= " + req.session.productionId + "").then((data) => {
      project = data;
      // console.log(project)
    }).catch((err) => console.error(err));



    res.render(__dirname + '/production/upload_project', { id, pid, service, project });

  } else {
    //res.send('Please login to view this page!');
    req.session.productionLogin = false;
    res.render(__dirname + '/production/login');
  }
  res.end();
});
//end of upload page



// // Upload project
// Routers.post('/production/upload-project', async (req, res) => {
//   //console.log(req.body, req.files)
//   if (!req.body) {
//     res.send("No file upload now")

//     //console.log(req.body.product_id, req.files)

//   } else {
//     await getData("SELECT user_id FROM product WHERE id=" + req.body.product_id + "").then((data) => {
//       client = data;
//       console.log("client id :", client[0].user_id)
//     }).catch((err) => console.error(err));

//     var file = req.files.filename; // here 'image' in Home.ejs form input name
//     //for image upload
//     // this is used for unique file name
//     var imgsrc = file.name;
//     var user_id = req.session.productionId;

//     var product = {
//       "product_id": req.body.product_id,
//       "additional_info": req.body.additional_info,
//       "attachment": imgsrc,
//       "service": req.body.service,
//       "user_id": user_id,

//     }
//     console.log(product)

//     connection.query('INSERT INTO complete_project SET ?', [product], (err, result) => {

//       if (err) throw err;

//       file.mv('../public/production/upload-project/' + file.name);

//       connection.query("UPDATE product SET status = " + 4 + " WHERE id = " + req.body.product_id + "")
//       res.redirect('/production/index');
//     })
//   }
// });
// // end of Upload project





function getData(sqlQuery) {
  return new Promise((resolve, reject) => {

    connection.query(sqlQuery,
      (err, recordset) => {
        // Here we call the resolve/reject for the promise
        try {
          // If the results callback throws exception, it will be caught in 
          // the catch block
          resolve(resultsCallback(err, recordset));
        }
        catch (e) {
          reject(e);
        }
      }
    );
  })
}
function resultsCallback(err, recordset) {
  if (err) {
    console.log(err);
    throw err;
  }
  else {
    return recordset;

  }
};

module.exports = Routers;
