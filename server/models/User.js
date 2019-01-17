const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: String,
  password: String
})

userSchema.pre("save", function(next) {
  if (!this.isModified("password")) return next();
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      next();
    });
  });
});

userSchema.methods.verifyPassword = function(password) {
  console.log(password, this.password);
  return new Promise((resolve, reject) => {
    bcrypt
      .compare(password, this.password)
      .then(res => {
        console.log(res);
        resolve(res);
      })
      .catch(err => {
        throw err;
      });
  });
};

module.exports = mongoose.model('User', userSchema)