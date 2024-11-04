const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: { type: String, required: true},
    filecontent: { type: Object, required: true}
});

fileSchema.methods.toJSON = function () {
    const obj = this.toObject();
    return obj;
}


const File = mongoose.model('File', fileSchema);

module.exports = File;