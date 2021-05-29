// const studentCourseNew1 = require('../models/studentCourse');
const student=require('../models/studentModel');
const course = require('../models/courseModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const login = require('../models/loginModel');
const studentCourse = require('../models/studentCourseModel');
const attendance = require('../models/attendanceModel');
// const { json } = require('express');
// const student = require('../models/studentModel');

const getStudents = async (req,res) => {
    console.log("services working");
    await student.find().then( results =>{
        console.log(results);
        const obj = {status:200,results};
        console.log(obj);
        // return obj;
        res.status(200).json({results});
    }).catch(err => {
        res.status(400).json({results : output});
        // return {status:400,err};
    })
}

const submitAttendance = async(req,res) => {
    const report = new attendance({
        attendanceDate : req.body.attendanceDate,
        time : req.body.time,
        day : req.body.day,
        studentId : req.body.studentId,
        courseId : req.body.courseId,
        status : req.body.status
    })
    await report.save().then(result => {
        res.status(200).json({
            msg : "Marked Attendance",
            status : 200
        })
    }).catch(err => {
        res.status(400).json({
            msg : "Unable to Mark Attendance",
            status : 400,
            err
        })
    })

}

const getAttendanceDetails = async(req,res) => {
    await attendance.find({studentId:req.body.studentId,courseId:req.body.courseId}).then(async(results)=>{
        res.status(200).json({results});
    }).catch(err=>{
        res.status(400).json({results:output,msg : "Something went wrong",});
    })
}

const getPercent = async(req,res) => {
    await attendance.findOne({studentId : req.body.studentId}).then(async( result) =>{
        await attendance.findOne({courseId : req.body.courseId}).then(result=>{
            for(i=0;i<result.length;i++){
                const count1=result.length,count2=0;
                if(status == 1)
                    count2++;
                // result.courseName = c.courseName;
                // result.credits = c.credits;
                
            }
            const Percent = (count2/count1)*100;
            console.log(Percent);
            res.status(200).json({status:200});
        }).catch(err=>{
            res.status(400).json({status:400,err});
            console.log('CourseId Error');
            })
    }).catch(err=>{
        res.status(400).json({status:400,err});
        console.log('studentId Error');
        })
}

const getStudentById = async (req,res)=>{
    await student.findOne({studentId : req.body.studentId}).then(result=>{
        res.status(200).json({status:200,result});
    }).catch(err=>{
        res.status(400).json({status:400,err});
    })
}

const getCourses = async (req,res) => {
    await studentCourse.find({studentId : req.body.studentId}).then(async (results)=>{
        const regCourses = [];
        for(i=0;i<results.length;i++){
            const c = await course.findOne({courseId : results[i].courseId});
            // result.courseName = c.courseName;
            // result.credits = c.credits;
            const result = {
                courseId : c.courseId
            }
            // console.log(result)
            // console.log(c)
            regCourses.push(result)
        }
        res.status(200).json({status:200,results:regCourses});
    }).catch(err=>{
        res.status(400).json({status:400,err});
    })
    
}

const studentLogin = async (req,res) => {
    const {userId,password} = req.body;
    const login1 = await login.findOne({userId : userId});
    if(login1!=null) {
        if(await bcryptjs.compare(password,login1.password)) {
            const token = await generateToken({studentId:userId,role : "student"});
            const student1 = await student.findOne({studentId : userId});
            res.status(200).json({status:200,token,student:student1});
        }
        else 
        res.status(400).json({status:400,msg:"Incorrect Password"});
    }
    else {
        res.status(400).json({status:400, msg: "Invalid UserId"});
    }
}

const generateToken = async (payload) => {
    return await jwt.sign(payload,"student",{expiresIn : 1800});
}

const passwordUpdate = async (req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const pl =await jwt.verify(token,"student",(err,payload)=>{
        if(err){
            res.status(402).json({status : 402,err});
        } else {
            return payload;
        }
    });
    console.log("payload");
    console.log(pl);
    if(pl.studentId!==req.body.userId){
        res.status(400).json({msg : "Authentication error",status : 400})
    }

    const login1 = await login.findOne({userId : req.body.userId});
    if(await bcryptjs.compare(req.body.currentPassword,login1.password)){
        if(req.body.newPassword === req.body.confirmPassword){
            const passwd = await bcryptjs.hash(req.body.newPassword,10);
            const login2 = {
                userId : req.body.userId,
                password : passwd
            };
            login.findOneAndUpdate({userId:req.body.userId},{$set : login2},{new:true}).then(result => {
                res.status(200).json({msg : "password updated succesfully",result})
            }).catch(err=>{
                res.status(400).json({msg : "something went wrong ",err});
            })
        }
        else{
            res.status(400).json({msg:"sorry,Password and confirm Password doesn't match",status:400});
        }
    }
    else{
        res.status(400).json({msg:"sorry,current password is incorrect",status:400})
    }
}

module.exports = {getStudents,getAttendanceDetails,getPercent,getStudentById,getCourses,submitAttendance,studentLogin,passwordUpdate};