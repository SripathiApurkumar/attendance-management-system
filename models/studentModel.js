const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    studentId: {
        type : String,
        trim : true,
        required : true,
        unique : true
    },
    name: {
        type : String,
        trim : true,
        required : true
    },
    year : {
        type : Number,
        required : true,
        trim : true,
    },
    class : {
        type : String,
        required : true,
        trim : true
    }
});

const student=mongoose.model('student',studentSchema);
module.exports=student;