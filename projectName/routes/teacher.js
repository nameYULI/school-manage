/*
 * @Description: 
 * @Author: yuli
 * @Date: 2020-12-15 20:57:16
 * @LastEditors: yuli
 * @LastEditTime: 2020-12-15 21:04:11
 */
const router = require('koa-router')()
const teacherService = require('../controllers/mysqlConfig');

router.prefix('/teacher')

//获取所有用户(GET请求)
router.get('/list', async (ctx, next) => {
    //ctx.body = 'this is a teacher response!';
    ctx.body = await teacherService.findAllTeacherData();
})

router.post('/get', async (ctx, next) => {
    ctx.body = await teacherService.findTeacherData(ctx.request.body.id);
})

router.post('/update', async (ctx, next) => {
    ctx.body = await teacherService.updateTeacherData(ctx.request.body);
})

router.post('/delete', async (ctx, next) => {
    ctx.body = await teacherService.deleteTeacherData(ctx.request.body.teacher_id);
})

// 增加用户(POST请求)
router.post('/add', async (ctx, next) => {
    let arr = [];
    arr.push(ctx.request.body['teacher_name']);
    arr.push(ctx.request.body['teacher_age']);
    arr.push(ctx.request.body['teacher_sex']);
    arr.push(ctx.request.body['teacher_level']);
    arr.push(ctx.request.body['school_id']);
    arr.push(ctx.request.body['academy_id']);
    console.log(arr)
    await teacherService.addTeacherData(arr)
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