const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//CRUD operations
router.get("/", userController.view);
router.post("/", userController.find);
router.get("/adduser", userController.form);
router.post("/adduser", userController.create);

router.get("/edituser/:id", userController.edit);
router.post("/edituser/:id", userController.update);

router.get("/deleteuser/:id", userController.delete);

router.get("/viewuser/:id", userController.view_user);

router.get("/uploadpicture/", userController.getPicture);
router.post("/uploadpicture/", userController.uploadPicture);

// router.get("/uploadpicture/", (req, res) => {res.render("upload-picture");});


//test template
// router.get("", (req, res) => {
//   res.render("home");
// });

module.exports = router;
