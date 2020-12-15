/*
 * @Description: 
 * @Author: yuli
 * @Date: 2020-12-15 11:48:28
 * @LastEditors: yuli
 * @LastEditTime: 2020-12-15 20:08:44
 */
const router = require('koa-router')()
const classService = require('../controllers/mysqlConfig');

router.prefix('/classes')

//获取所有用户(GET请求)
router.get('/list', async (ctx, next) => {
    //ctx.body = 'this is a class response!';
    ctx.body = await classService.findAllClassData();
})

router.post('/get', async (ctx, next) => {
    ctx.body = await classService.findClassData(ctx.request.body.id);
})

router.post('/update', async (ctx, next) => {
    ctx.body = await classService.updateClassData(ctx.request.body);
})

router.post('/delete', async (ctx, next) => {
    ctx.body = await classService.deleteClassData(ctx.request.body.class_id);
})

// 增加用户(POST请求)
router.post('/add', async (ctx, next) => {
    let arr = [];
    arr.push(ctx.request.body['class_name']);
    arr.push(ctx.request.body['class_major']);
    arr.push(ctx.request.body['school_id']);
    arr.push(ctx.request.body['academy_id']);
    arr.push(ctx.request.body['class_renshu']);
    console.log(arr)
    await classService.addClassData(arr)
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