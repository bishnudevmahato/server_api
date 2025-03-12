const mongoose = require('mongoose');
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone : {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isAdmin : {
        type: Boolean,
        default: false
    }
});

// JSON  web token
userSchema.methods.generateToken = function(){
    try {
        return Jwt.sign({
            userId : this._id.toString(),
            email : this.email,
            isAdmin : this.isAdmin
        })
        process.env.JWT_SECRET_KEY,{
            expiresIn : '30d'
        }
    } catch (error) {
        console.log(error); 
    }
};

// Compare User passsword
userSchema.methods.comparePassword = async function (password){
    return bcrypt.compare(password, this.password)
}


const User = mongoose.model("User", userSchema);

module.exports = User;