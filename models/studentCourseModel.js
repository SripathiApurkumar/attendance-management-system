const mongoose = require('mongoose');

const studentCourseSchema = mongoose.Schema({
    studentId: {
        type : String,
        trim : true,
        required : true
    },
    courseId: {
        type : String,
        trim : true,
        required : true
    },
});

studentCourseSchema.index({courseId:1,studentId:1},{unique : true});

const studentCourse=mongoose.model('studentCourse',studentCourseSchema);

module.exports=studentCourse;