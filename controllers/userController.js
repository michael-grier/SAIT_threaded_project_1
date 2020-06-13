const newUser = require('../models/user');
const path = require('path');
const viewFolderPath = path.join(__dirname, '..');

exports.addUser = (req, res) => {
  console.log('JSON.stringify(req.body):', req.body)
  const user = new newUser.User(req.body);
  
  user.save((err) => {
    if (err) throw err;

    console.log("Data has been inserted")
    res.redirect("/");
  })
}