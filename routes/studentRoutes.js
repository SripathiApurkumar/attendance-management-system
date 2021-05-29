const express = require('express')
const {getCourses,studentLogin,getStudentById,
    passwordUpdate,submitAttendance,getPercent,getStudents, getAttendanceDetails} = require('../services/studentService');

const cors = require('cors')
const app = express()
app.use(cors())

app.get('/getAll',getStudents);

app.post('/login',studentLogin);

app.post('/getPercent',getPercent);

app.post('/getAttendanceDetails',getAttendanceDetails);

app.post('/getStudentById',getStudentById);

app.post('/updatePassword',passwordUpdate);

app.post('/getCourses',getCourses);

app.post('/submitAttendance',submitAttendance);

module.exports = app;
