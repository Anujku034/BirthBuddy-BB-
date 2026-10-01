const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        match:/^[A-Za-z]+(?: [A-Za-z]+)*$/,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
        match: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
    },
    resetPasswordOtp:{
        type: String,

    },
    resetPasswordOtpExpire: {
        type: Date,
    },

});
const User = mongoose.model("User", UserSchema);
module.exports = User;