/*
 * @Description: 
 * @Author: yuli
 * @Date: 2020-12-15 10:51:41
 * @LastEditors: yuli
 * @LastEditTime: 2020-12-15 21:06:09
 */
var mysql = require('mysql');
var config = require('./defaultConfig');

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let allServices = {
    query: function (sql, values) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })

    },
    //user
    findAllUserData: () => {
        let _sql = `select * from users;`
        return allServices.query(_sql)
    },
    findUserData: (name) => {
        let _sql = `select * from users where name="${name}";`
        return allServices.query(_sql)
    },
    addUserData: (obj) => {
        let _sql = "insert into users set name=?,pass=?,avator=?,moment=?;"
        return allServices.query(_sql, obj)
    },

    //school
    findAllSchoolData: () => {
        let _sql = `select * from school_table;`
        return allServices.query(_sql)
    },
    findSchoolData: (id) => {
        let _sql = `select * from school_table where school_id="${id}";`
        return allServices.query(_sql)
    },
    updateSchoolData: (obj) => { 
        let _sql=`update school_table set school_name="${obj.school_name}",school_location="${obj.school_location}",school_type="${obj.school_type}" where id="${obj.id}"`
        return allServices.query(_sql)
    },
    deleteSchoolData:(id)=>{
        let _sql = `delete from school_table where school_id="${id}";`
        return allServices.query(_sql)
    },
    addSchoolData: (obj) => {
        let _sql = `insert into school_table set school_name="${obj[0]}",school_location="${obj[1]}",school_type="${obj[2]}";`
        return allServices.query(_sql, obj)
    },

    //academy
    findAllAcademyData: () => {
        let _sql = `select * from academy_table left join school_table on academy_table.school_id=school_table.school_id;`
        return allServices.query(_sql)
    },
    findAcademyData: (id) => {
        let _sql = `select * from academy_table where id="${id}";`
        return allServices.query(_sql)
    },
    updateAcademyData: (obj) => { 
        let _sql=`update academy_table set name="${obj.name}",major="${obj.major}",renshu="${obj.renshu}",school_id="${obj.school_id}" where id="${obj.id}"`
        return allServices.query(_sql)
    },
    deleteAcademyData:(id)=>{
        let _sql = `delete from academy_table where id="${id}";`
        return allServices.query(_sql)
    },
    addAcademyData: (obj) => {
        let _sql = `insert into academy_table set name="${obj[0]}",major="${obj[1]}",renshu="${obj[2]}",school_id="${obj[3]}";`
        return allServices.query(_sql, obj)
    },

    //class
    findAllClassData: () => {
        let _sql = `select * from class_table left join school_table on class_table.school_id=school_table.school_id left join academy_table on class_table.academy_id=academy_table.id;`
        return allServices.query(_sql)
    },
    findClassData: (id) => {
        let _sql = `select * from class_table where class_id="${id}";`
        return allServices.query(_sql)
    },
    updateClassData: (obj) => { 
        let _sql=`update class_table set class_name="${obj.class_name}",class_major="${obj.class_major}",school_id="${obj.school_id}",academy_id="${obj.academy_id}",class_renshu="${obj.class_renshu}" where class_id="${obj.class_id}"`
        return allServices.query(_sql)
    },
    deleteClassData:(id)=>{
        let _sql = `delete from class_table where class_id="${id}";`
        return allServices.query(_sql)
    },
    addClassData: (obj) => {
        let _sql = `insert into class_table set class_name="${obj[0]}",class_major="${obj[1]}",school_id="${obj[2]}",academy_id="${obj[3]}",class_renshu="${obj[4]}";`
        return allServices.query(_sql, obj)
    },

    //student
    findAllStudentData: () => {
        let _sql = `select * from student_table left join school_table on student_table.school_id=school_table.school_id left join academy_table on student_table.academy_id=academy_table.id left join class_table on student_table.class_id=class_table.class_id;;`
        return allServices.query(_sql)
    },
    findStudentData: (id) => {
        let _sql = `select * from student_table where student_id="${id}";`
        return allServices.query(_sql)
    },
    updateStudentData: (obj) => { 
        let _sql=`update student_table set student_name="${obj.student_name}",student_age="${obj.student_age}",student_num="${obj.student_num}",student_sex="${obj.student_sex}",school_id="${obj.school_id}",academy_id="${obj.academy_id}",class_id="${obj.class_id}" where student_id="${obj.student_id}"`
        return allServices.query(_sql)
    },
    deleteStudentData:(id)=>{
        let _sql = `delete from student_table where student_id="${id}";`
        return allServices.query(_sql)
    },
    addStudentData: (obj) => {
        let _sql = `insert into student_table set student_name="${obj[0]}",student_age="${obj[1]}",student_num="${obj[2]}",student_sex="${obj[3]}",school_id="${obj[4]}",academy_id="${obj[5]}",class_id="${obj[6]}";`
        return allServices.query(_sql, obj)
    },

    //teacher
    findAllTeacherData: () => {
        let _sql = `select * from teacher_table left join school_table on teacher_table.school_id=school_table.school_id left join academy_table on teacher_table.academy_id=academy_table.id;`
        return allServices.query(_sql)
    },
    findTeacherData: (id) => {
        let _sql = `select * from teacher_table where teacher_id="${id}";`
        return allServices.query(_sql)
    },
    updateTeacherData: (obj) => { 
        let _sql=`update teacher_table set teacher_name="${obj.teacher_name}",teacher_age="${obj.teacher_age}",teacher_sex="${obj.teacher_sex}",teacher_level="${obj.teacher_level}",school_id="${obj.school_id}",academy_id="${obj.academy_id}" where teacher_id="${obj.teacher_id}"`
        return allServices.query(_sql)
    },
    deleteTeacherData:(id)=>{
        let _sql = `delete from teacher_table where teacher_id="${id}";`
        return allServices.query(_sql)
    },
    addTeacherData: (obj) => {
        let _sql = `insert into teacher_table set teacher_name="${obj[0]}",teacher_age="${obj[1]}",teacher_sex="${obj[2]}",teacher_level="${obj[3]}",school_id="${obj[4]}",academy_id="${obj[5]}";`
        return allServices.query(_sql, obj)
    }
}

module.exports = allServices;