const express = require('express');
const path = require('path')
const connection = require('../database/db');
var session = require('express-session');
const adminRouters = express.Router();
const fileUpload = require('express-fileupload');
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
adminRouters.use(cookieParser());

//file upload
adminRouters.use(fileUpload());

// adminRouters.use(session({
//   secret: 'secret',
//   resave: false,
//   saveUninitialized: true,
//   //cookie: { secure: true }
// }))

// session
const oneHour = 1000 * 60 * 15;
adminRouters.use(session({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767iamdeveloper" + uuidv4(),
  saveUninitialized: true,
  cookie: { maxAge: oneHour },
  resave: false
}));

// home
adminRouters.get('/', async function (req, res) {
  console.log(req.session.adminLogin)
  res.render(__dirname + '/views/index');
});

//start of views
adminRouters.get('/documents', async function (req, res) {
  res.render(__dirname + '/views/documents');
});

//portfolio
adminRouters.get('/portfolio', async function (req, res) {
  await getData("SELECT * FROM portfolio_edit").then((data) => {
    obj6 = data;
  }).catch((err) => console.error(err));
  res.render(__dirname + '/views/portfolio', { users: obj6 });
});

// about
adminRouters.get('/About_us', async function (req, res) {
  res.render(__dirname + '/views/About_us');
});

// creative
adminRouters.get('/custom_creative', async function (req, res) {
  res.render(__dirname + '/views/custom_creative');
});

// digital marketing
adminRouters.get('/digital_maketing', async function (req, res) {
  res.render(__dirname + '/views/digital_maketing');
});

// embroidery digitizing
adminRouters.get('/embroidery_digitizing', async function (req, res) {
  res.render(__dirname + '/views/embroidery_digitizing');
});

// logo assign
adminRouters.get('/logo_design', async function (req, res) {
  res.render(__dirname + '/views/logo_design');
});

// privacy policy
adminRouters.get('/privacy_policy', async function (req, res) {
  res.render(__dirname + '/views/privacy_policy');
});

// vector artwork
adminRouters.get('/vector_artwork', async function (req, res) {
  res.render(__dirname + '/views/vector_artwork');
});

// web dev
adminRouters.get('/web_dev', async function (req, res) {
  res.render(__dirname + '/views/web_dev');
});

// img editing
adminRouters.get('/img_editing', async function (req, res) {
  res.render(__dirname + '/views/img_editing');
});

// add users
adminRouters.get('/add_user', async function (req, res) {
  res.render(__dirname + '/admin/add_user');
});

// add teams
adminRouters.get('/add_team', async function (req, res) {
  res.render(__dirname + '/admin/add_team');
});
//end of views


//start of admin
adminRouters.get('/admin', async function (req, res) {
  req.session.destroy();
  res.render(__dirname + '/admin/login');
});

// logout
adminRouters.get('/logout', async function (req, res) {
  req.session.destroy();
  res.render(__dirname + '/admin/login');
});


//start od login
adminRouters.post('/login', function (req, res) {

  var email = req.body.email;
  var username = email;
  var password = req.body.password;

  //console.log("get body:", email, password);

  connection.query('SELECT * FROM admin WHERE email = ?', [email], function (error, results, fields) {
    if (error) {
      // console.log("error ocurred", error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      });
    } else {


      if (results.length > 0) {
        if (results[0].password == password) {

          req.session.adminLogin = email;
          req.session.adminEmail = email;
          req.session.adminId = results[0].id;
          req.session.adminUserName = results[0].name;

          res.redirect('/users');
        }
        else {
          res.render(__dirname + '/admin/login');
        }
      }
      else {
        res.render(__dirname + '/admin/login');
      }
    }
  });
});
//end of login



//staart of users_request
adminRouters.get('/users', async function (req, res) {

  if (req.session.adminLogin) {

    await getData("SELECT * FROM users ").then((data) => {
      user = data;
    }).catch((err) => console.error(err));
    // users count
    await getData("SELECT COUNT(id) count FROM users;").then((data) => {
      cusers = data[0];
    }).catch((err) => console.error(err));
    // order count
    await getData("SELECT COUNT(id) count FROM product;").then((data) => {
      torder = data[0];
    }).catch((err) => console.error(err));
    // assign count
    await getData("SELECT COUNT(id) count FROM product WHERE assign_id>0;").then((data) => {
      assign = data[0];
    }).catch((err) => console.error(err));
    // pending count
    await getData("SELECT COUNT(id) count FROM product WHERE assign_id = 0 ").then((data) => {
      pending = data[0];
      //console.log(pending)
    }).catch((err) => console.error(err));


    res.render(__dirname + '/admin/users_req', { user, cusers, torder, assign, pending });

  } else {

    //res.send('Please login to view this page!');
    //req.session.adminLogin = false;
    req.session.destroy();
    res.render(__dirname + '/admin/login');

  }
  res.end();
});
//end of users_requsst



//start of production
adminRouters.get('/production_team', async function (req, res) {
  if (req.session.adminLogin) {

    await getData("SELECT * FROM production ").then((data) => {
      obj3 = data;
    }).catch((err) => console.error(err));

    res.render(__dirname + '/admin/production_team', { user: obj3 });

  } else {
    //res.send('Please login to view this page!');
    req.session.destroy();
    res.render(__dirname + '/admin/login');
  }
  res.end();
});
//end of production




//start of view project details
adminRouters.get('/view_project_details', async function (req, res) {
  if (req.session.adminLogin) {

    var id = req.query.id;

    await getData("SELECT * FROM product WHERE id =" + id + "").then((data) => {
      product = data;
    }).catch((err) => console.error(err));

    await getData("SELECT * FROM mupload WHERE order_id =" + id + "").then((data) => {
      order = data;
    }).catch((err) => console.error(err));

    res.render(__dirname + '/admin/view_project_details', { product, order });
  } else {
    //res.send('Please login to view this page!');
    req.session.destroy();
    res.render(__dirname + '/admin/login');
  }
  res.end();
});
//end of view project details


//start of new project
adminRouters.post("/post_ent", (req, res) => {

  if (!req.files) {
    res.send("No file upload")
  } else {

    var file = req.files.image // here 'image' in Home.ejs form input name
    //for image upload
    // this is used for unique file name
    var imgsrc = '/doc/' + file.name
    var insertData = "INSERT INTO entries(heading,remark,doc)VALUES('" + req.body.name + "','" + req.body.body + "','" + imgsrc + "')"
    connection.query(insertData, [imgsrc], (err, result) => {
      if (err) throw err
      file.mv('public/doc/' + file.name)
      res.redirect('/index');
    })
    // for any file like pdf,docs etc. upload

  }
})
//end of new project



//start of download
adminRouters.get('/download', function (req, res) {
  const file = `public/portfolio/407469.jpg`;
  res.download(file); // Set disposition and send it.
});
//end of download



//start of assign
adminRouters.get('/assign', async function (req, res) {
  if (req.session.adminLogin) {
    await getData("SELECT * FROM product ").then((data) => {
      product = data;
      console.log(req.body)
    }).catch((err) => console.error(err));

    await getData("SELECT * FROM production ").then((data) => {
      obj4 = data;
    }).catch((err) => console.error(err));

    res.render(__dirname + '/admin/assign', { product, four: obj4 });
  } else {
    //res.send('Please login to view this page!');
    req.session.destroy();
    res.render(__dirname + '/admin/login');
  }
  res.end();
});
//emd of assign



//start of massages
// update
adminRouters.post('/message_post', async function (req, res) {
  let data = { subject: req.body.subject, message: req.body.message };
  let sql = "update entries set subject='" + req.body.subject + "',message ='" + req.body.message + "' WHERE id = '2'";
  let query = connection.query(sql, data, (err, results) => {
    if (err) throw err;
  });
  res.redirect('/index');
});
//end of massages




// portfolio 
adminRouters.get('/portfolio_edit', async function (req, res) {
  if (req.session.adminLogin) {

    await getData("SELECT * FROM portfolio_edit").then((data) => {
      obj6 = data;
    }).catch((err) => console.error(err));

    res.render(__dirname + '/admin/portfolio_edit', { users: obj6 });
  } else {
    //res.send('Please login to view this page!');
    req.session.destroy();
    res.render(__dirname + '/admin/login');
  }
  res.end();
});



// Uploaded Files
adminRouters.get('/uploaded-files', async function (req, res) {
  if (req.session.adminLogin) {
    var oid = req.query.id;

    await getData("SELECT * FROM complete_project WHERE product_id =" + oid + "").then((data) => {
      project = data;
    }).catch((err) => console.error(err));

    console.log(project)
    res.render(__dirname + '/admin/uploaded_files', { project });
  } else {
    //res.send('Please login to view this page!');
    req.session.destroy();
    res.render(__dirname + '/admin/login');
  }
  res.end();
});


// portfolio files upload
adminRouters.post("/post_entries", async (req, res) => {
  if (req.session.adminLogin) {
    //console.log(req.body)

    if (!req.files) {
      res.send("No file upload")
    } else {

      var file = req.files.image // here 'image' in Home.ejs form input name
      //for image upload
      // this is used for unique file name
      var imgsrc = '/portfolio/' + file.name
      var insertData = "INSERT INTO portfolio_edit(heading,body,services,image_name)VALUES('" + req.body.name + "','" + req.body.body + "','" + req.body.services + "','" + imgsrc + "')"
      connection.query(insertData, [imgsrc], (err, result) => {
        if (err) throw err;
      })
      file.mv('public/portfolio/' + file.name)
      res.redirect('/portfolio_edit');
      // for any file like pdf,docs etc. upload
    }
  } else {
    //res.send('Please login to view this page!');
    req.session.destroy();
    res.render(__dirname + '/admin/login');
  }
  res.end();
});

//end of work section


// portfolio files delete
adminRouters.get("/delete-entries", async (req, res) => {
  if (req.session.adminLogin) {
    var id = req.query.id;

    connection.query("DELETE from portfolio_edit where id =" + id + "", function (err) {
      if (err) throw err;
    })
    res.redirect('/portfolio_edit')

  } else {
    //res.send('Please login to view this page!');
    req.session.destroy();
    res.render(__dirname + '/admin/login');
  }
  res.end();

});
//end of delete


//  user delete
adminRouters.get("/delete-user", async function (req, res) {
  if (req.session.adminLogin) {
    var id = req.query.id;

    connection.query("DELETE from users WHERE id =" + id + "", function (err) {
      if (err) throw err;
    })
    res.redirect('/users')

  } else {
    //res.send('Please login to view this page!');
    req.session.destroy();
    res.render(__dirname + '/admin/login');
  }
  res.end();

});
//end of user delete

//  production team delete
adminRouters.get("/delete-team", async (req, res) => {

  //mail function
  function teamDeleteMail() {
    //mail sent
    var id = req.query.id;

    var mailOptions = {
      from: 'webkesaridemo@gmail.com',
      to: `makhantarade@gmail.com`,
      subject: 'Ariescraft',
      text: `Your account delete successfull\n Your id: ${id}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }


  if (req.session.adminLogin) {
    var id = req.query.id;

    connection.query("DELETE from production where id =" + id + "", function (err) {
      if (err) throw err;
    })
    teamDeleteMail()

    res.redirect('/production_team')
  } else {
    //res.send('Please login to view this page!');
    req.session.destroy();
    res.render(__dirname + '/admin/login');
  }
  res.end();

});
//end of production team delete


//start of add user
adminRouters.post("/add-user", async (req, res) => {
  var uemail = req.body.email;

  if (req.session.adminLogin) {

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
    }
    console.log(users)
    connection.query("SELECT email FROM users WHERE email = ?", uemail, function (err, rows) {
      if (err) {
        console.log(err);
      }

      if (rows.length != 0) {
        // res.send(uemail + ' email is already exists');
        console.log('email is already exists')
        // res.setHeader('Content-Type', 'text/plain');
        // res.status(400).json('email is already exists');
      }
      else {

        connection.query('INSERT INTO users SET ?', [users], function (err) {
          if (err) {
            console.log(err);
          }
        })
        res.redirect('/users');
      }
    });



  } else {
    req.session.destroy();
    res.render(__dirname + '/admin/login');
  }
  res.end();
});
//end of add user

// edit user view
adminRouters.get('/edit_user', async function (req, res) {
  if (req.session.adminLogin) {
    const id = req.query.id;
    //console.log(id)
    await getData("SELECT * from users WHERE id=" + id + "").then((data) => {
      user = data;
    }).catch((err) => console.error(err));

    res.render(__dirname + '/admin/edit_user', { user });

  } else {
    //res.send('Please login to view this page!');
    req.session.destroy();
    res.render(__dirname + '/admin/login');
  }
  res.end();
});
// end of edit user view



// edit user
adminRouters.post('/edit-user', function (req, res) {
  console.log("req", req.body);
  var uemail = req.body.email;
  user = {

    "name": req.body.name,
    "email": req.body.email,
    "phone_no": req.body.phone_no,
    "address": req.body.address,
    "city": req.body.city,
    "zip": req.body.zip,
    "password": req.body.password,

  }

  connection.query("SELECT email FROM users WHERE email = ?", uemail, function (err, rows) {
    if (err) {
      console.log(err)
    }

    connection.query("update users SET ? WHERE id =" + req.body.id + "", [user], function (error, results, fields) {
      if (error) {
        console.log("error ocurred", error);
        res.send({
          "code": 400,
          "failed": "error ocurred"
        });
      } else {
        //   console.log('The solution is: ', results);
        res.redirect('/users');
      }
    })
  })
});
// end of edit user


// Team view and edit part
//start of add team
adminRouters.post("/add-team", async (req, res) => {
  if (req.session.adminLogin) {

    var today = new Date();
    var team = {
      "name": req.body.name,
      "email": req.body.email,
      "phone": req.body.phone,
      "service": req.body.service,
      "password": req.body.password,
      "created": today
    }
    connection.query('INSERT INTO production SET ?', [team], function (err) {
      if (err) throw err;
    })
    res.redirect('/production_team');
    //console.log(team)
  } else {
    //res.send('Please login to view this page!');
    req.session.destroy();
    res.render(__dirname + '/admin/login');
  }
  res.end();
});
//end of add team


// edit team view
adminRouters.get('/edit_team', async function (req, res) {
  if (req.session.adminLogin) {
    const id = req.query.id;
    console.log(id)

    await getData("SELECT * from production WHERE id=" + id + "").then((data) => {
      team = data;
    }).catch((err) => console.error(err));

    res.render(__dirname + '/admin/edit_team', { team });


  } else {
    //res.send('Please login to view this page!');
    req.session.destroy();
    res.render(__dirname + '/admin/login');
  }
  res.end();
});
// end of edit team view

// edit team
adminRouters.post('/edit-team', function (req, res) {

  //mail function
  function teamUpdateMail() {
    //mail sent
    var email = req.body.email;

    var mailOptions = {
      from: 'webkesaridemo@gmail.com',
      to: `makhantarade@gmail.com`,
      subject: 'Ariescraft',
      text: `Your account update successfull\n Your email: ${email}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  //console.log("req", req.body);
  var uemail = req.body.email;
  team = {
    "name": req.body.name,
    "email": req.body.email,
    "phone": req.body.phone,
    "service": req.body.service,
    "password": req.body.password,
  }

  connection.query("update production SET ? WHERE id =" + req.body.id + "", [team], function (error, results, fields) {
    if (error) {
      console.log("error ocurred", error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      });
    } else {
      //   console.log('The solution is: ', results);
      teamUpdateMail()
      res.redirect('/production_team');
    }
  });
});
// end of edit team
// Team view and edit part



// assign team view
adminRouters.get('/assign_team', async function (req, res) {
  if (req.session.adminLogin) {
    const id = req.query.id;
    console.log(id)

    await getData("SELECT * from product WHERE id=" + id + "").then((data) => {
      assign = data;
    }).catch((err) => console.error(err));

    await getData("SELECT * from production").then((data) => {
      team = data;
    }).catch((err) => console.error(err));

    res.render(__dirname + '/admin/assign_team', { assign, team });

  } else {
    //res.send('Please login to view this page!');
    req.session.destroy();
    res.render(__dirname + '/admin/login');
  }
  res.end();
});
// end of assign team view


// team view and assign part
// assign team
adminRouters.post('/assign-team', function (req, res) {


  const team_id = req.body.team_id;

  connection.query('SELECT * FROM production WHERE id = ?', [team_id], function (error, results, fields) {
    if (error) {
      // console.log("error ocurred", error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      });
    } else {

      if (results.length > 0) {

        var assign_id = results[0].id;
        var assign_name = results[0].name;
        var mail_to = results[0].email;
        var oid = req.body.oid;
        var id = req.body.id;
        //console.log(assign_id, assign_name)
        team = {
          "assign_id": assign_id,
          "assign_name": assign_name,
          "status": "In Progress",
          "text": "warning",
          "btn_pen": "disabled",
          "btn_down": "disabled",
          "btn_up": "",

        }
        connection.query("update product SET ? WHERE id =?", [team, id], function (error, results, fields) {
          if (error) {
            console.log("error ocurred", error);
            res.send({
              "code": 400,
              "failed": "error ocurred"
            });
          } else {
            //   console.log('The solution is: ', results);
            //mail
            //mail sent

            var mailOptions = {
              from: 'webkesaridemo@gmail.com',
              to: `makhantarade@gmail.com`,
              cc: mail_to,
              subject: 'Ariescraft',
              text: `Dear ${assign_name},\n Your new Order is: ${oid}\n please complete this project.`,
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
            //mail
            res.redirect('/assign');
          }
        })
      }
    }
  })
});
// end of assign team
// team view and assign part



// // Product data add   customer order data
// adminRouters.post("/customer/product_add", async (req, res) => {

//   //console.log(req.files.filename);

//   if (req.files != undefined && req.files != null) {
//     //console.log(req.body, req.files)

//     var file = req.files.filename;
//     //for image upload
//     // this is used for unique file name
//     var imgsrc = file.name;

//     var product = {
//       "product_id": req.body.product_id,
//       "product_type": req.body.product_type,
//       "order_type": req.body.order_type,
//       "product_name": req.body.product_name,
//       "reference": req.body.reference,
//       "format_type": req.body.format_type,
//       "use_for": req.body.use_for,
//       "additional_info": req.body.additional_info,
//       "attachment": imgsrc,
//       "placement": req.body.placement,
//       "size": req.body.size,
//       "color": req.body.color,
//       "user_id": req.session.customerId,
//       "user_name": req.session.customerUserName,
//       "assign_id": 0,
//       "assign_name": req.body.assign_name,
//       "status": "Ordered",
//       "text": "danger",
//       "btn_down": "disabled",
//       "btn_pen": "",
//       "btn_up": "",

//     }
//     connection.query('INSERT INTO product SET ?', [product], (err, result) => {
//       if (err) throw err;
//       file.mv('public/customer/upload/' + file.name);
//     })
//     res.redirect('/customer/home');
//     // for any file like pdf,docs etc. upload
//   } else {
//     res.send("No file upload now")
//     //return res.status(400).redirect('/customer/home');
//   }
// });
// // end of Product data add


// Product data add   customer order data
adminRouters.post("/customer/product_add", async (req, res) => {

  //console.log(req.files.filename);

  if (req.files != undefined && req.files != null) {
    //console.log(req.body, req.files)    

    var product = {
      "product_id": req.body.product_id,
      "product_type": req.body.product_type,
      "order_type": req.body.order_type,
      "product_name": req.body.product_name,
      "reference": req.body.reference,
      "format_type": req.body.format_type,
      "use_for": req.body.use_for,
      "additional_info": req.body.additional_info,
      "placement": req.body.placement,
      "size": req.body.size,
      "color": req.body.color,
      "user_id": req.session.customerId,
      "user_name": req.session.customerUserName,
      "assign_id": 0,
      "assign_name": req.body.assign_name,
      "status": "Ordered",
      "text": "danger",
      "btn_down": "disabled",
      "btn_pen": "",
      "btn_up": "",
    }
    connection.query('INSERT INTO product SET ?', [product], (err, result) => {
      if (err) throw err;
    })

    //multifile
    try {
      const files = req.files.mfiles;
      //console.log(files) 


      files.forEach(file => {

        let mproduct = {
          'file_name': file.name,
          'order_id': req.body.id
        }

        connection.query('INSERT INTO mupload SET ?', [mproduct], async function (err, rows) {
          if (err) throw err;
        })

      })


      const promises = files.map(file => {
        return file.mv('public/customer/fileupload/' + file.name)
      })

      await Promise.all(promises);


      //console.log('file uploaded')
      //mail
      //mail sent
      var uname;
      if (uname != undefined || uname != null) {
        uname = 'Costomer';
      } else {
        uname = req.session.customerName;
      }
      var uemail = req.session.customerEmail;
      var uoreder = req.body.product_id;
      var uproduct;
      if (uproduct == undefined || uproduct == null) {
        uproduct = '';
      } else {
        uproduct = 'Product: ' + req.body.product_name;
      }

      var mailOptions = {
        from: 'webkesaridemo@gmail.com',
        to: `${uemail}`,
        cc: 'makhantarade@gmail.com',
        subject: 'Ariescraft',
        text: `Dear ${uname},

              This is to notify your order has been successfully placed
              
              If we need any clarification, we will get in touch with you.
              
              If you have any additional information to add, please email us 
              
              Regards,
              Aries Craft
              
              Order Number: ${uoreder}
              ${uproduct}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      //mail

    } catch {
      console.log('error')
    }

    res.redirect('/customer/home');

  } else {
    res.send("No file upload now")
    //return res.status(400).redirect('/customer/home');
  }
});
// end of Product data add


// adminRouters.get('/customer/mupload', (req, res, next) => {
//   res.render(__dirname + '/customer/mupload')
// })





//production team Upload project
adminRouters.post('/production/upload-project', async (req, res) => {
  //console.log(req.body, req.files)
  var cpid = parseInt(req.body.id + 246546);
  if (!req.files) {
    res.send("No file upload now")
    //console.log(req.body.product_id, req.files)
  } else {
    await getData("SELECT user_id FROM product WHERE id=" + req.body.id + "").then((data) => {
      client = data;
      console.log("client id :", client[0].user_id)
    }).catch((err) => console.error(err));


    var user_id = req.session.productionId;

    var product = {
      "cpid": cpid,
      "order_id": req.body.product_id,
      "product_id": req.body.id,
      "additional_info": req.body.additional_info,
      "service": req.body.service,
      "user_id": req.session.productionId,// production team id
      "user_name": req.session.productionName,
      "status": "Completed",
      "client_id": client[0].user_id,
    }
    //console.log(product)

    connection.query('INSERT INTO complete_project SET ?', [product], (err, result) => {
      if (err) throw err;

      var o_id = req.body.id;
      var udata = {
        "status": "completed",
        "text": "success",
        "btn_pen": "",
        "btn_down": "",
        "btn_up": "disabled",
        "cpid": cpid,
      }
      connection.query("UPDATE product SET ? WHERE id =? ", [udata, o_id], function (err) {
        if (err) throw err;
        console.log('updade ', udata)
      })


      //res.redirect('/production/index');
    })

    //multifile
    try {
      const files = req.files.mfiles;
      //console.log(files) 

      files.forEach(file => {

        let mproduct = {
          "cpid": cpid,
          'file_name': file.name,
          'order_id': req.body.id
        }

        connection.query('INSERT INTO pmupload SET ?', [mproduct], async function (err, rows) {
          if (err) throw err;
        })

      })

      const promises = files.map(file => {
        return file.mv('public/production/fileupload/' + file.name)
      })

      await Promise.all(promises)
      //console.log('file uploaded')


      res.redirect('/production/index');

    } catch {
      console.log('error')
    }
  }
});
// end of Upload project


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

module.exports = adminRouters;