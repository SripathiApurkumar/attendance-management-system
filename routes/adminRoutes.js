const express = require('express')
const {getCourses,addStudent,addTeacher,adminLogin,getStudentById,getTeachers,getTeacherById,teacherUpdate,studentUpdate,
    passwordUpdate,assignCourse,addCourse,getStudents} = require('../services/adminService');

const cors = require('cors')
const app = express()
app.use(cors())

app.get('/getStudents',getStudents);

app.post('/addStudent',addStudent);

app.post('/addTeacher',addTeacher);

//app.post('/login',adminLogin);

app.get('/getTeachers',getTeachers);

app.post('/getTeacherById',getTeacherById);

app.post('/teacherUpdate',teacherUpdate);

app.post('/addCourse',addCourse);

app.post('/assignCourse',assignCourse);

app.post('/studentUpdate',studentUpdate);

app.get('/getStudentById',getStudentById);

//app.put('/updatePassword',passwordUpdate);

app.post('/getCourses',getCourses);

module.exports = app;
