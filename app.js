  
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const detectFace = require('./apis/detectFace');
const static = require('koa-static')
const path = require('path');
