/*
 * @Description: 
 * @Author: yuli
 * @Date: 2020-12-15 11:48:28
 * @LastEditors: yuli
 * @LastEditTime: 2020-12-15 16:04:07
 */
const router = require('koa-router')()
const schoolService = require('../controllers/mysqlConfig');

router.prefix('/school')

//获取所有用户(GET请求)
router.get('/list', async (ctx, next) => {
    //ctx.body = 'this is a school response!';
    ctx.body = await schoolService.findAllSchoolData();
})

router.post('/get', async (ctx, next) => {
    ctx.body = await schoolService.findSchoolData(ctx.request.body.id);
})

router.post('/update', async (ctx, next) => {
    ctx.body = await schoolService.updateSchoolData(ctx.request.body);
})

router.post('/delete', async (ctx, next) => {
    ctx.body = await schoolService.deleteSchoolData(ctx.request.body.id);
})

// 增加用户(POST请求)
router.post('/add', async (ctx, next) => {
    let arr = [];
    arr.push(ctx.request.body['school_name']);
    arr.push(ctx.request.body['school_location']);
    arr.push(ctx.request.body['school_type']);
    console.log(arr)
    await schoolService.addSchoolData(arr)
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