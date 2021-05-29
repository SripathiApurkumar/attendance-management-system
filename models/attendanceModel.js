const mongoose = require('mongoose')

const attendanceSchema = mongoose.Schema({
    attendanceDate : {
        type : Date,
        trim : true,
        required : true
    },
    time:{
        type : String,
        trim : true,
        required : true
    },
    day:{
        type : Number,
        trim : true,
        required : true
    },
    studentId : {
        type : String,     //nod double
        trim : true,
        required : true
    },
    courseId : {
        type : String,     //nod double
        trim : true,
        required : true
    },
    status : {
        type : Number,
        default : 0,
        trim : true,
        required : true
    }
})

attendanceSchema.index({courseId:1,studentId:1,attendanceDate:1},{unique : true});

const attendance = mongoose.model('attendance',attendanceSchema);

module.exports = attendance