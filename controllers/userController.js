const newUser = require('../models/user');
const path = require('path');
const viewFolderPath = path.join(__dirname, '..');

exports.addUser = async (req, res) => {
  
  try {
    const checkUserEmail = await newUser.User.find((err, usersInfo )=> {
      var userEmail = usersInfo.map((userInfo) => {
        // if(userInfo.email) {
        //   var email = [];
        //   email.push(userInfo.email);
        //   return email;
        // }
        console.log(userInfo.email)
        if(userInfo.email == req.body.email) {
          throw new Error('Email has been existed')
        }
      })
    })
  
    // console.log()
  
    const user = new newUser.User(req.body);
   
    user.save((err) => {
      if (err) throw err;
  
      console.log("Data has been inserted")
      res.redirect("/");
    })
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err);
  }
 
}