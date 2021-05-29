const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    teacherId : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    name : {
        type : String,
        required : true,
        trim : true
    }
});

const teacher = mongoose.model('teacher',teacherSchema);

module.exports = teacher;

