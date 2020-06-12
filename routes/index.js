const express = require('express');
const router = express.Router();
const { addUser } = require('../controllers/userController');
const path = require('path');
const bodyParser = require('body-parser');

const viewFolderPath = path.join(__dirname, '..');

router.get("/", (req, res) => {
  res.sendFile(viewFolderPath + "/views/landing.html");
});

router.get("/register", (req, res) => {
  res.sendFile(viewFolderPath + "/views/register.html");
})

router.post("/register", addUser);

module.exports = router;