const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    adminId: {
        type : Number,
        trim : true,
        required : true,
        unique : true
    },
    name: {
        type : String,
        trim : true,
        required : true
    }
});

const admin = mongoose.model('admin',adminSchema);
module.exports = admin;