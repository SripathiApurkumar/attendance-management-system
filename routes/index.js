const express = require('express')
const studentRoutes = require('./studentRoutes')
const teacherRoutes = require('./teacherRoutes')
const adminRoutes = require('./adminRoutes')

const cors = require('cors')
const app = express()
app.use(cors())

app.use('/student',studentRoutes);

app.use('/teacher',teacherRoutes);

app.use('/admin',adminRoutes);

module.exports = app;