  
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const detectFace = require('./apis/detectFace');

const app = new Koa();

app.use(bodyParser());

const router = new Router();
router.post('/detectFace', detectFace);
app.use(router.routes());

app.listen(3000);

module.exports = app;