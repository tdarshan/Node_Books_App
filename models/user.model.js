const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
});


userSchema.pre('save', async function(next){

    try {
        
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(this.password, salt);

        this.password = hashedPassword;
        next();

    } catch (error) {
        next(error);
    }
});


userSchema.methods.isValidPassword = async function(password){
    try {
        return await bcrypt.compare(password, this.password);
        
    } catch (error) {
        console.log(error);
        throw new Error('Password not match');
    }
}


const userModel = mongoose.model('user', userSchema);

module.exports = userModel;