/*
 * @Description: 
 * @Author: yuli
 * @Date: 2020-12-15 16:20:22
 * @LastEditors: yuli
 * @LastEditTime: 2020-12-15 18:30:04
 */
const router = require('koa-router')()
const academyService = require('../controllers/mysqlConfig');

router.prefix('/academy')

//获取所有用户(GET请求)
router.get('/list', async (ctx, next) => {
    // ctx.body = 'this is a school response!';
    ctx.body = await academyService.findAllAcademyData();
})

router.post('/get', async (ctx, next) => {
    ctx.body = await academyService.findAcademyData(ctx.request.body.id);
})

router.post('/update', async (ctx, next) => {
    ctx.body = await academyService.updateAcademyData(ctx.request.body);
})

router.post('/delete', async (ctx, next) => {
    ctx.body = await academyService.deleteAcademyData(ctx.request.body.id);
})

// 增加用户(POST请求)
router.post('/add', async (ctx, next) => {
    let arr = [];
    arr.push(ctx.request.body['name']);
    arr.push(ctx.request.body['major']);
    arr.push(ctx.request.body['renshu']);
    arr.push(ctx.request.body['school_id']);
    await academyService.addAcademyData(arr)
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