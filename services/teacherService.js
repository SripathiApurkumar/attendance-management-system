const teacher = require('../models/teacherModel');
const course = require('../models/courseModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const login = require('../models/loginModel');
const studentCourse = require('../models/studentCourseModel');

const mailer = require('nodemailer');
const schedule = require('node-schedule');

const getTeachers = async (req,res) => {
    console.log("services working");
    await teacher.find().then(results=>{
        console.log(results);
        const obj = {status:200,results};
        console.log(obj);
        // return obj;
        res.status(200).json({results});
    }).catch(err => {
        res.status(400).json({results : output,err});
        // return {status:400,err};
    })
}

const getTeacherById = async (req,res)=>{
    await teacher.findOne({teacherId : req.body.teacherId}).then(result=>{
        res.status(200).json({status:200,result});
    }).catch(err=>{
        res.status(400).json({status:400,err});
    })
}

const getAttendanceDetails = async(req,res) => {
    await attendance.find({courseId:req.body.courseId}).then(async(results)=>{
        res.status(200).json({results});
    }).catch(err=>{
        res.status(400).json({results:output,msg : "Something went wrong",});
    })
}

// const getPercent = async(req,res) =>{
//     await teacher.findOne({tea})
// }

const getCourses = async (req,res) => {
    await course.find({teacherId : req.body.teacherId}).then(results=>{
        res.status(200).json({status:200,results});
    }).catch(err=>{
        res.status(400).json({status:400,err});
    })
    
}

const getStudentsByCourse = async (req,res) => {
    await studentCourse.find({courseId : req.body.courseId}).then(results => {
        res.status(200).json({status:200,results});
    }).catch(err=>{
        res.status(400).json({status:400,err});
    })
}

const teacherLogin = async (req,res) => {
    const {userId,password} = req.body;
    const login1 = await login.findOne({userId : userId});
    if(login1!=null) {
        if(await bcryptjs.compare(password,login1.password)) {
            const token = await generateToken({teacherId:userId,role : "teacher"});
            const teacher1 = await teacher.findOne({teacherId : userId});
            res.status(200).json({status:200,token,teacher:teacher1});
        }
        else 
        res.status(400).json({status:400,msg:"Incorrect Password"});
    }
    else {
        res.status(400).json({status:400, msg: "Invalid UserId"});
    }
}

const generateToken = async (payload) => {
    return await jwt.sign(payload,"teacher",{expiresIn : 1800});
}

const passwordUpdate = async (req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const pl =await jwt.verify(token,"teacher",(err,payload)=>{
        if(err){
            res.status(402).json({status : 402,err});
        } else {
            return payload;
        }
    });
    console.log("payload");
    console.log(pl);
    if(pl.teacherId!==req.body.userId){
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


module.exports = {getTeachers,getAttendanceDetails,getTeacherById,getCourses,teacherLogin,passwordUpdate,getStudentsByCourse};