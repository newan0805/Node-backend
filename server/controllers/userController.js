const mysql = require("mysql");

//connection
const pool = mysql.createPool({
  connctionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "node_CRUD_new",
});
// const pool = mysql.createPool({
//     connctionLimit: 10,
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
// });

// View users
exports.view = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    console.log(`Connected as ID: ${conn.threadId}`);

    conn.query('SELECT * FROM users WHERE status = "active"', (err, result) => {
      //Connection release
      conn.release();

      if (!err) {
        let removedUserMsg = req.query.removed;
        res.render("home", { result, removedUserMsg });
      } else {
        console.log(err);
      }

      // console.log('The data from Users table \n', result)
    });
  });
};

//Find user by search
exports.find = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    console.log(`Connected as ID: ${conn.threadId}`);
    let searchTerm = req.body.search;

    conn.query(
      "SELECT * FROM users WHERE first_name OR last_name OR email OR id LIKE ?",
      ["%" + searchTerm + "%"],
      (err, result) => {
        //Connection release
        conn.release();

        if (!err) {
          res.render("home", { result });
        } else {
          console.log(err);
        }

        // console.log('The data from Users table \n', result)
      }
    );
  });
};

exports.form = (req, res) => {
  res.render("add-user");
};

//Add new user
exports.create = (req, res) => {
  // res.render('add-user')
  const { first_name, last_name, email, phone, comments } = req.body;

  pool.getConnection((err, conn) => {
    if (err) throw err;
    console.log(`Connected as ID: ${conn.threadId}`);

    conn.query(
      "INSERT INTO users SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?",
      [first_name, last_name, email, phone, comments],
      (err, result) => {
        //Connection release
        conn.release();

        if (!err) {
          res.render("add-user", { alert: "User added successfully!" });
        } else {
          console.log(err);
        }

        // console.log('The data from Users table \n', result)
      }
    );
  });
};

//Edit user
exports.edit = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    console.log(`Connected as ID: ${conn.threadId}`);

    conn.query(
      'SELECT * FROM users WHERE id = ? && status = "active"',
      [req.params.id],
      (err, result) => {
        //Connection release
        conn.release();

        if (!err) {
          res.render("edit-user", { result });
          // console.log(result)
        } else {
          console.log(err);
        }

        // console.log('The data from Users table \n', result)
      }
    );
  });
};

//Update user
exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;

  pool.getConnection((err, conn) => {
    if (err) throw err;
    console.log(`Connected as ID: ${conn.threadId}`);

    conn.query(
      "UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?",
      [first_name, last_name, email, phone, comments, req.params.id],
      (err, result) => {
        //Connection release
        conn.release();

        if (!err) {
          pool.getConnection((err, conn) => {
            if (err) throw err;
            console.log(`Connected as ID: ${conn.threadId}`);

            conn.query(
              'SELECT * FROM users WHERE id = ? && status = "active"',
              [req.params.id],
              (err, result) => {
                //Connection release
                conn.release();

                if (!err) {
                  res.render("edit-user", {
                    result,
                    alert: `User: ${first_name} has been updated!`,
                  });
                  // console.log(result)
                } else {
                  console.log(err);
                }

                // console.log('The data from Users table \n', result)
              }
            );
          });
        } else {
          console.log(err);
        }

        // console.log('The data from Users table \n', result)
      }
    );
  });
};

//Delete user from id OR can update user to 'removed'
exports.delete = (req, res) => {
  // pool.getConnection((err, conn) => {
  //   if (err) throw err;
  //   console.log(`Connected as ID: ${conn.threadId}`);

  //   conn.query(
  //     'DELETE FROM users WHERE id = ? && status = "active"',
  //     [req.params.id],
  //     (err, result) => {
  //       //Connection release
  //       conn.release();

  //       if (!err) {
  //         res.redirect('/')
  //         // console.log(result)
  //       } else {
  //         console.log(err);
  //       }

  //       // console.log('The data from Users table \n', result)
  //     }
  //   );
  // });

  pool.getConnection((err, conn) => {
    if (err) throw err;
    console.log(`Connected as ID: ${conn.threadId}`);

    conn.query(
      "UPDATE users SET status = ? WHERE id = ? ",
      ["removed", req.params.id],
      (err, result) => {
        //Connection release
        conn.release();

        if (!err) {
          let userRemoveMsg = encodeURIComponent("User successfully removed!");
          res.redirect("/?removed=" + userRemoveMsg);
          // console.log(result)
        } else {
          console.log(err);
        }

        // console.log('The data from Users table \n', result)
      }
    );
  });
};

//View user by id
exports.view_user = (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;
    console.log(`Connected as ID: ${conn.threadId}`);

    conn.query(
      'SELECT * FROM users WHERE id = ? && status = "active"',
      [req.params.id],
      (err, result) => {
        //Connection release
        conn.release();

        if (!err) {
          res.render("view-user", { result });
        } else {
          console.log(err);
        }

        // console.log('The data from Users table \n', result)
      }
    );
  });
};

//Upload a picture
exports.getPicture = (req, res) => {
  // res.render("upload-picture");
  pool.getConnection((err, conn) => {
    if (err) throw err;
    console.log(`Connected as ID: ${conn.threadId}`);

    conn.query(
      'SELECT * FROM users WHERE id = 100 && status = "active"',
      (err, result) => {
        //Connection release
        conn.release();
        if (!err) {
          // console.log(result)
          res.render("upload-picture", { result });
        } else {
          console.log(err);
        }

        // console.log('The data from Users table \n', result)
      }
    );
  });
};


exports.uploadPicture = (req, res) => {
  let sampleFile;
  let uploadPath;
  
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(500).send("No files were uploaded!");
  }
  root_dir = ( __dirname + '/upload/')
  //get image data
  sampleFile = req.files.sampleFile;
  uploadPath = root_dir + sampleFile.name;
  // uploadPath = __dirname + "/upload/" + sampleFile.name;
  sampleFile.mv(uploadPath, (err) => {
    // if (!err) {
    //   return res.status(200);
    //   // return alert('Image uploaded!');
    // }
    return res.status(200);

  });
  // console.log(sampleFile + "\n", uploadPath);
  // res.render("upload-picture");
  pool.getConnection((err, conn) => {
    if (err) throw err;
    console.log(`Connected as ID: ${conn.threadId}`);

    conn.query(
      'UPDATE users SET image = ? WHERE id = 100 && status = "active"', [sampleFile.name],
      (err, result) => {
        //Connection release
        conn.release();
        if (!err) {
          // console.log(result)
          res.redirect("/");
        } else {
          console.log(err);
        }

        // console.log('The data from Users table \n', result)
      }
    );
  });
};
