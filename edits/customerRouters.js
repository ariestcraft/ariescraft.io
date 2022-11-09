const express = require('express');
const connection = require('../database/db');
const Routers = express.Router();
const fileUpload = require('express-fileupload')
const session = require('express-session');
const path = require('path')
const { text } = require('body-parser');
const date = require('date-and-time');
const cdown = require('countdown');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');




var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'webkesaridemo@gmail.com',
    pass: '9753346858'
  }
});


function newId() {
  return uuidv4();
}

//cookie parser
Routers.use(cookieParser());

// file upload
Routers.use(fileUpload());


// session
const oneHour = 1000 * 60 * 15;
Routers.use(session({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767iamdeveloper" + uuidv4(),
  saveUninitialized: true,
  cookie: { maxAge: oneHour },
  resave: false
}));


Routers.get('/customer', async function (req, res) {
  req.session.destroy();
  res.render(__dirname + '/customer/login');
});


Routers.get('/customer/id', async function (req, res) {
  res.send(newId);
});

Routers.get('/customer/logout', async function (req, res) {
  req.session.destroy(function (err) {
    console.log('logout done!')
    // cannot access session here
  })
  res.render(__dirname + '/customer/login');
});


// Artwork page view
Routers.get('/customer/artwork', async function (req, res) {
  if (req.session.customerLogin) {

    // SEARCH LAST ID DATA
    connection.query('SELECT id FROM product WHERE id=(SELECT max(id) FROM product)', function (err, rows) {
      if (err) {
        console.log(err)
      }
      var id = rows[0].id;
      res.render(__dirname + '/customer/artwork', { productid: id });
    })


  } else {
    req.session.destroy();
    res.render(__dirname + '/customer/login');
  }
});

// Digitizing page view
Routers.get('/customer/digitizing', async function (req, res) {
  if (req.session.customerLogin) {
    // SEARCH LAST ID DATA
    connection.query('SELECT id FROM product WHERE id=(SELECT max(id) FROM product)', function (err, rows) {
      if (err) {
        console.log(err)
      }
      var id = rows[0].id;
      res.render(__dirname + '/customer/digitizing', { productid: id });
    })

  } else {
    req.session.destroy();
    res.render(__dirname + '/customer/login');
  }
});

// Document page view
Routers.get('/customer/document', async function (req, res) {
  if (req.session.customerLogin) {
    // SEARCH LAST ID DATA
    connection.query('SELECT id FROM product WHERE id=(SELECT max(id) FROM product)', function (err, rows) {
      if (err) {
        console.log(err)
      }
      var id = rows[0].id;
      res.render(__dirname + '/customer/document', { productid: id });
    })

  } else {
    req.session.destroy();
    res.render(__dirname + '/customer/login');
  }
});



//start od login
Routers.post('/customer/login', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;


  connection.query('SELECT * FROM users WHERE email = ?', [email], function (err, result, fields) {
    if (err) {
      res.send('Invalid credentials refers to your login details; email address and password.')

    }
    else {
      //console.log('The solution is: ', results);
      if (result.length > 0) {
        if (result[0].password == password) {

          req.session.customerLogin = email;
          req.session.customerEmail = email;
          req.session.customerId = result[0].id;
          req.session.customerName = result[0].name;
          req.session.customerUserName = result[0].name;

          console.log(req.session.customerLogin)

          res.redirect('/customer/home');
        }
        else {
          res.redirect('/customer/home');
        }
      }
      else {
        res.redirect('/customer/home');
      }
    }
  });
});
//end of login


//start of Register
Routers.post('/customer/register', async function (req, res) {

  //mail function
  function registerMail() {
    //mail sent
    var userid = req.body.email;
    var password = req.body.password;
    var mailOptions = {
      from: 'webkesaridemo@gmail.com',
      to: `makhantarade@gmail.com`,
      subject: 'Ariescraft',
      text: `Congratulations! Your account with Aries craft is now active. Please use the following URL and credentials for accessing the Aries craft system, which you can use to submit and retrieve orders.\n Link : www.ariescraft.com/users\n User ID: ${userid}\n Password: ${password}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }


  // console.log("req",req.body);
  var today = new Date();
  var uemail = req.body.email;
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

  connection.query("SELECT email FROM users WHERE email = ?", uemail, function (err, rows) {
    if (err) {
      console.log(err)
    }
    var count = rows.length;

    if (count > 0) {
      res.send(uemail + ' email is already exists');
    } else {
      connection.query('INSERT INTO users SET ?', [users], function (err, result, fields) {
        if (err) {
          res.send(err)
        }
        if (result) {
          registerMail();
          res.render(__dirname + '/customer/login');
        }
        else {
          //   console.log('The solution is: ', result);
          req.session.destroy();
          res.render(__dirname + '/customer/login');
        }
      });

    }
  })
});
//end of Register



// Home page view
Routers.get('/customer/home', async function (req, res) {

  if (req.session.customerLogin) {

    await getData("SELECT * FROM product WHERE user_id = " + req.session.customerId + "").then((data) => {
      product = data;
    }).catch((err) => console.error(err));


    res.render(__dirname + '/customer/home', { product })

  } else {

    //res.send('Please login to view this page!');
    req.session.destroy();
    res.render(__dirname + '/customer/login');

  }
  res.end();
});
// end of Home page view



// Home uploaded files view
Routers.get('/customer/uploaded_files', async function (req, res) {

  if (req.session.customerLogin) {
    var id = req.query.id;

    await getData("SELECT * FROM complete_project WHERE cpid =" + req.query.id + " AND client_id =" + req.session.customerId + "").then((data) => {
      project = data;
    }).catch((err) => console.error(err));

    await getData("SELECT * FROM pmupload WHERE cpid =" + req.query.id + "").then((data) => {
      pmu = data;
    }).catch((err) => console.error(err));

    res.render(__dirname + '/customer/uploaded_files', { project: project, pmu });
  } else {

    //res.send('Please login to view this page!');
    req.session.destroy();
    res.render(__dirname + '/customer/login');

  }
  res.end();
});
// end of uploaded files page view


// View product details
Routers.get('/customer/view_product', async function (req, res) {

  var id = req.query.id;

  if (req.session.customerLogin) {
    await getData("SELECT * FROM product WHERE id = " + id + " AND user_id =" + req.session.customerId + "").then((data) => {
      product = data;

    }).catch((err) => console.error(err));

    await getData("SELECT * FROM mupload WHERE order_id = " + id + "").then((data) => {
      order = data;
      //console.log(data)

    }).catch((err) => console.error(err));


    res.render(__dirname + '/customer/view_product', { product: product, order });



  } else {
    //res.send('Please login to view this page!');
    req.session.destroy();
    res.render(__dirname + '/customer/login');

  }
  res.end();
});
//end of View product details





//start account - user data view
Routers.get('/customer/account_edit', async function (req, res) {
  if (req.session.customerLogin) {

    await getData("SELECT * FROM users where id= " + req.session.customerId + "").then((data) => {
      obj2 = data;
    }).catch((err) => console.error(err));

    res.render(__dirname + '/customer/account_edit', { user: obj2 });

  } else {
    //res.send('Please login to view this page!');
    req.session.destroy();
    res.render(__dirname + '/customer/login');
  }
  res.end();
});


// Update account - user data
Routers.post('/customer/account_updata', function (req, res) {
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
  connection.query('update users SET ? where id = "' + req.session.customerId + '"', users, function (error, results, fields) {
    if (error) {
      //console.log("error ocurred", error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      });
    } else {
      //   console.log('The solution is: ', results);
      res.redirect('/customer/account_edit');
    }
  });
});

//end of account


//start contact_us
Routers.get('/customer/contact_us', async function (req, res) {

  if (req.session.customerLogin) {

    await getData("SELECT * FROM users where id= '" + req.session.customerId + "'").then((data) => {
      obj2 = data;
    }).catch((err) => console.error(err));

    res.render(__dirname + '/customer/contact_us', { user: obj2 });
    //console.log(obj2)

  } else {
    //res.send('Please login to view this page!')
    req.session.destroy();
    res.render(__dirname + '/customer/login');
  }
  res.end();
});
//end of contact_us

//start help
Routers.get('/customer/help', async function (req, res) {
  var pid = req.query.id;
  console.log(pid)
  if (req.session.customerLogin) {
    res.render(__dirname + '/customer/help', { pid });
    //console.log(obj2)

  } else {

    //res.send('Please login to view this page!')
    req.session.destroy();
    res.render(__dirname + '/customer/login');

  }
  res.end();
});
//end of help

// contact us mail send
Routers.post('/customer/contact_us_mail', function (req, res, next) {
  var name = req.body.name;
  var subject = req.body.subject;
  var message = req.body.message;
  var mailOptions = {
    from: 'webkesaridemo@gmail.com',
    to: 'makhantarade@gmail.com',
    subject: 'Contact_us ' + name,
    text: `client name: ${name}\n subject: ${subject}\n message: ${message}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.redirect('/customer/contact_us')
    }
  });
});


//Help mail send
Routers.post('/customer/help-mail', function (req, res, next) {
  var order_id = req.body.order_id;
  var message = req.body.message;
  var mailOptions = {
    from: 'webkesaridemo@gmail.com',
    to: 'makhantarade@gmail.com',
    subject: 'Help ' + order_id,
    text: `client name: ${order_id}\n message: ${message}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.redirect('/customer/home')
    }
  });
});




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
}

module.exports = Routers;