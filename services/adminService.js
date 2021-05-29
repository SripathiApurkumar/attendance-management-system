// const studentCourseNew1 = require('../models/studentCourse');
const student=require('../models/studentModel');
const course = require('../models/courseModel');
const teacher = require('../models/teacherModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const login = require('../models/loginModel');
const studentCourse = require('../models/studentCourseModel');
// const { json } = require('express');
// const student = require('../models/studentModel');

const addStudent = async (req,res)=>{
    console.log(req.body.name , req.body.studentId , req.body.password,req.body.year );
    const passwd = await bcryptjs.hash(req.body.password,10);
    const student1 =  new student({
        name: req.body.name,
        studentId : req.body.studentId,
        year : req.body.year,
        class : req.body.class
    });

    const login1 = new login({
        userId : req.body.studentId,
        password : passwd
    })
    await student1.save().then(async (result)=>{
        // res.status(200).json({meesage:"created succesfully"})
        await login1.save().then(result1=>{
            res.status(200).json({msg:"inserted Succesfully",result,status:200});
        }).catch(async (err)=>{
            await student.deleteOne({studentId:req.body.studentId}).then(result2=>{
                res.status(400).json({msg : "failed to insert",result:result2,err:err,status:400});
            }).catch(err1=>{
                res.status(200).json({msg: "failed to insert",status:400,err:err1})
            })
        });
    }).catch((err2)=>{
        res.status(400).json({msg : "something went wrong",err:err2,status:400});
    });
}

const addTeacher = async (req,res)=>{
    console.log(req.body.name , req.body.teacherId , req.body.password );
    const passwd = await bcryptjs.hash(req.body.password,10);
    const teacher1 =  new teacher({
        name: req.body.name,
        teacherId : req.body.teacherId
    });

    const login1 = new login({
        userId : req.body.teacherId,
        password : passwd
    })
    await teacher1.save().then(async (result)=>{
        // res.status(200).json({meesage:"created succesfully"})
        await login1.save().then(result1=>{
            res.status(200).json({msg:"inserted Succesfully",result,status:200});
        }).catch(async (err)=>{
            await teacher.deleteOne({teacherId:req.body.teacherId}).then(result2=>{
                res.status(400).json({msg : "failed to insert",result:result2,err:err,status:400});
            }).catch(err1=>{
                res.status(200).json({msg: "failed to insert",status:400,err:err1})
            })
        });
    }).catch((err2)=>{
        res.status(400).json({msg : "something went wrong",err:err2,status:400});
    });

}

const assignCourse = async (req,res)=>{
    //const token = req.headers.authorization.split(" ")[1];
    console.log(req.body.courseId , req.body.studentId);
    const studentCourse1 = new studentCourse({
        studentId : req.body.studentId,
        courseId : req.body.courseId,
    })

    // const pl = await jwt.verify(token,"student",(err,payload)=>{
    //     if(err){
    //         res.status(402).json({status : 402,err});
    //     } else {
    //         return payload;
    //     }
    // })

    // if(pl.studentId!==req.body.studentId) {
    //     res.status(400).json({msg : "You dont have access to other's courses",status:400});
    // }

    await student.find({studentId : req.body.studentId}).then(async (results)=>{
        if(results.length==0)
            res.status(400).json({msg : "Student Id does not exist",status:400});
        else {
            await course.find({courseId : req.body.courseId}).then(async (results1) => {
                if(results1.length==0)
                    res.status(400).json({status : 400,msg : "Course Id does not exist"});
                else {
                    await studentCourse1.save().then(result2=>{
                        res.status(200).json({status:200,msg : "registered Succesfully",result : result2});
                    }).catch(err2=>{res.status(400).json({status:400,msg : "something went wrong1",error : err2})});
                }
            }).catch(err1=>{res.status(400).json({status : 400, msg : "something went wrong2",error : err1})});
        }
    }).catch(err=>{res.status(400).json({status : 400, msg : "something went wrong3",error : err})});
}

const getStudents = async (req,res) => {
    console.log("services working");
    await student.find().then(results=>{
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

const addCourse = async (req,res)=>{
    const course1 = new course({
        courseId : req.body.courseId,
        courseName : req.body.courseName,
        teacherId : req.body.teacherId,
        timings : req.body.timings,
        link : req.body.link
    });
    await teacher.findOne({teacherId : req.body.teacherId}).then(async (result) => {
        if(result!=null) {
            await course1.save().then(result=>{
                res.status(200).json({msg:"Course Created Susscesfully"});
            }).catch(err=>{
                res.status(400).json({msg : "something went wrong",err});
            })
        }else{
            res.status(400).json({msg:"Teacher Id not found",err:err,status:400});
        }
    }).catch(err=>{
        res.status(400).json({msg : "something went wrong",err:err,status:400});
    })
}

const getStudentById = async (req,res)=>{
    await student.findOne({studentId : req.body.studentId}).then(result=>{
        res.status(200).json({status:200,result});
    }).catch(err=>{
        res.status(400).json({status:400,err});
    })
}

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

const getCourses = async (req,res) => {
    await studentCourse.find({studentId : req.body.studentId}).then(async (results)=>{
        const regCourses = [];
        for(i=0;i<results.length;i++){
            const c = await course.findOne({courseId : results[i].courseId});
            // result.courseName = c.courseName;
            // result.credits = c.credits;
            const result = { 
                timings : c.timings,
                teacherId  : c.teacherId,
                courseName : c.courseName,
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

const teacherUpdate = async (req,res) => {
    // const token = req.headers.authorization.split(" ")[1];
    // const pl =await jwt.verify(token,"teacher",(err,payload)=>{
    //     if(err){
    //         res.status(402).json({status : 402,err});
    //     } else {
    //         return payload;
    //     }
    // });
    // if(pl.teacherId!==req.body.teacherId){
    //     res.status(400).json({msg : "Authentication error",status : 400})
    // }

    const teacher1 =  {
        name: req.body.name,
        teacherId : req.body.teacherId,
    };

    //await course.findOne({courseId : req.body.courseId}).then(async (result1) => {
        //if(result1!=null) {
            await teacher.findOneAndUpdate({teacherId : req.body.teacherId},{$set : teacher1},{new : true}).then(async (result)=>{
                // res.status(200).json({meesage:"created succesfully"})
                res.status(200).json({msg:"Details Updated Succesfully",result,status:200});
                }).catch(err1=>{
                    res.status(400).json({msg: "failed to Update",status:400,err:err1});
                })
        //    }
        //else{
        //    res.status(400).json({msg:"invalid courseId",status:400});
        //}
        //}).catch((err2)=>{
        //    res.status(400).json({msg : "something went wrong",err:err2,status:400});
        //});
}

// const adminLogin = async (req,res) => {
//     const {userId,password} = req.body;
//     const login1 = await login.findOne({userId : userId});
//     if(login1!=null) {
//         if(await bcryptjs.compare(password,login1.password)) {
//             const token = await generateToken({adminId:userId,role : "admin"});
//             const admin1 = await student.findOne({adminId : userId});
//             res.status(200).json({status:200,token,admin:admin1});
//         }
//         else 
//         res.status(400).json({status:400,msg:"Incorrect Password"});
//     }
//     else {
//         res.status(400).json({status:400, msg: "Invalid UserId"});
//     }
// }

// const generateToken = async (payload) => {
//     return await jwt.sign(payload,"admin",{expiresIn : 1800});
// }

const studentUpdate = async (req,res) => {
    // const token = req.headers.authorization.split(" ")[1];
    // const pl =await jwt.verify(token,"student",(err,payload)=>{
    //     if(err){
    //         res.status(402).json({status : 402,err});
    //     } else {
    //         return payload;
    //     }
    // });
    // if(pl.studentId!==req.body.studentId){
    //     res.status(400).json({msg : "Authentication error",status : 400})
    // }

    const student1 =  {
        name: req.body.name,
        studentId : req.body.studentId,
        year : req.body.year,
        class : req.body.class
    };

    await student.findOneAndUpdate({studentId : req.body.studentId},{$set : student1},{new : true}).then(async (result)=>{
        // res.status(200).json({meesage:"created succesfully"})
        res.status(200).json({msg:"Details Updated Succesfully",result,status:200});
        }).catch(err1=>{
            res.status(400).json({msg: "failed to Update",status:400,err:err1});
            })
}

// const passwordUpdate = async (req,res)=>{
//     const token = req.headers.authorization.split(" ")[1];
//     const pl =await jwt.verify(token,"admin",(err,payload)=>{
//         if(err){
//             res.status(402).json({status : 402,err});
//         } else {
//             return payload;
//         }
//     });
//     console.log("payload");
//     console.log(pl);
//     if(pl.studentId!==req.body.userId){
//         res.status(400).json({msg : "Authentication error",status : 400})
//     }

//     const login1 = await login.findOne({userId : req.body.userId});
//     if(await bcryptjs.compare(req.body.currentPassword,login1.password)){
//         if(req.body.newPassword === req.body.confirmPassword){
//             const passwd = await bcryptjs.hash(req.body.newPassword,10);
//             const login2 = {
//                 userId : req.body.userId,
//                 password : passwd
//             };
//             login.findOneAndUpdate({userId:req.body.userId},{$set : login2},{new:true}).then(result => {
//                 res.status(200).json({msg : "password updated succesfully",result})
//             }).catch(err=>{
//                 res.status(400).json({msg : "something went wrong ",err});
//             })
//         }
//         else{
//             res.status(400).json({msg:"sorry,Password and confirmPassword doesn't match",status:400});
//         }
//     }
//     else{
//         res.status(400).json({msg:"sorry,current password is incorrect",status:400})
//     }
// }




module.exports = {addStudent, addTeacher,addCourse, getStudents,getStudentById,getTeachers,getCourses,
    getTeacherById,teacherUpdate,assignCourse,studentUpdate};