const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true,unique: true },
    pwd: { type: String, required: true}
});

userSchema.pre('save', async function (next) {
    if (this.isModified('pwd')) {
        this.pwd = await bcrypt.hash(this.pwd, 10);
    }
    next();
});

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.pwd;
    return obj;
}


const User = mongoose.model('User', userSchema);

module.exports = User;