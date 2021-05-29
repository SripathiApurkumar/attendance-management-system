const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    courseId: {
        type : String,
        trim : true,
        required : true
    },
    courseName:{
        type : String,
        trim : true,
        required : true
    },
    teacherId: {
        type : String,
        trim : true,
        required : true
    },
    timings: {
        type : String,
        trim : true,
        required : true
    },
    link :{
        type : String,
        trim : true,
        required : true
    }
});
courseSchema.index({courseId:1,teacherId:1},{unique : true});
const course = mongoose.model('course',courseSchema);
module.exports = course;