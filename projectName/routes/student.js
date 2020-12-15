/*
 * @Description: 
 * @Author: yuli
 * @Date: 2020-12-15 20:22:30
 * @LastEditors: yuli
 * @LastEditTime: 2020-12-15 20:51:23
 */
const router = require('koa-router')()
const studentService = require('../controllers/mysqlConfig');

router.prefix('/student')

//获取所有用户(GET请求)
router.get('/list', async (ctx, next) => {
    //ctx.body = 'this is a student response!';
    ctx.body = await studentService.findAllStudentData();
})

router.post('/get', async (ctx, next) => {
    ctx.body = await studentService.findStudentData(ctx.request.body.id);
})

router.post('/update', async (ctx, next) => {
    ctx.body = await studentService.updateStudentData(ctx.request.body);
})

router.post('/delete', async (ctx, next) => {
    ctx.body = await studentService.deleteStudentData(ctx.request.body.student_id);
})

// 增加用户(POST请求)
router.post('/add', async (ctx, next) => {
    let arr = [];
    arr.push(ctx.request.body['student_name']);
    arr.push(ctx.request.body['student_age']);
    arr.push(ctx.request.body['student_num']);
    arr.push(ctx.request.body['student_sex']);
    arr.push(ctx.request.body['school_id']);
    arr.push(ctx.request.body['academy_id']);
    arr.push(ctx.request.body['class_id']);
    console.log(arr)
    await studentService.addStudentData(arr)
        .then((data) => {
            let r = '';
            if (data.affectedRows != 0) {
                r = 'ok';
            }
            ctx.body = {
                data: r
            }
        }).catch(() => {
            ctx.body = {
                data: 'err'
            }
        })
})

module.exports = router