const express = require('express')
const {getTeachers,getTeacherById,getAttendanceDetails,getCourses,teacherLogin,
    passwordUpdate,getStudentsByCourse} = require('../services/teacherService')

const cors = require('cors')
const app = express()
app.use(cors())

app.get('/get',getTeachers);

app.post('/getById',getTeacherById);

app.post('/getCourses',getCourses);

app.post('/getAttendanceDetails',getAttendanceDetails);

app.post('/getStudentsByCourse',getStudentsByCourse);

//app.post('getPercent',getPercent);

app.post('/login',teacherLogin);

app.post('/updatePassword',passwordUpdate);

module.exports = app;