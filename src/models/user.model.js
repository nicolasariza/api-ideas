const mongoose = require('mongoose');
const { Schema } = mongoose;
const { compareSync, hashSync, genSaltSync } = require('bcryptjs');

const UserSchema = new Schema({
    name:{type:String, required=true},
    username:{type:String, required=true},
    password:{type=String, required=true}
})

// Para no mostrar la contraseña al devolver la informacion al cliente
UserSchema.methods.toJSON = function(){
    let user = this.toObject();
    delete user.password;
    return user;
}

// Compara la contraseña nueva con la existente en la bd 
UserSchema.methods.comparePasswords = function(password){
    return compareSync(password, this.password);
}

// Se ejecuta antes de guardar para cifrar la clave al modificarla o crear la password
UserSchema.pre('save', async function(next){
    const user = this;

    if(!user.isModified("password")){
        return next();
    }

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;
    next();
})

module.exports = mongoose.model("user", UserSchema);