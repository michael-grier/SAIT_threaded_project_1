const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fName: {type: String, required: true, trim: true},
  lName: {type: String, required: true, trim: true},
  email: {type: String, required: true, trim: true},
  // examID: {type: String, required: false, trim: true},
  // examineeID: {type: String, required: false, trim: true},
});

module.exports = mongoose.model('User', userSchema);