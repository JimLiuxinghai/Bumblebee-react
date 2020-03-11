const router = require('koa-router')()
const auth = require('../middlewares/auth')

module.exports = router
    .get('/', auth, async (ctx) => {
        try {
            await ctx.render('index', {
                
            })
        }
        catch (e) {
            console.log(e)
        }
    })