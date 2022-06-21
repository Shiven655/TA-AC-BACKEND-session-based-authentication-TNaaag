var mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minlength: 5, required: true },
    age: Number,
    phone: Number,
  },
  {
    timestamps: true,
  }
);
userSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    bcrypt.hash(this.password, 10, (err, hashedbValue) => {
      if (err) {
        return next(err);
      }
      this.password = hashedValue;
      return next();
    });
  } else {
    next();
  }
});
module.exports = mongoose.model('user', userSchema);
