// 密钥文件
const properties = require('./properties.json');

// 引入腾讯云SDK
const tencentcloud = require('tencentcloud-sdk-nodejs');

// 人脸识别client类，封装了人脸识别接口的调用
// 人脸识别Model，封装了各接口的请求结构
const { Client, Models } = tencentcloud.iai.v20180301;

// 身份凭证类，存储secretId和secretKey
const Credential = tencentcloud.common.Credential;

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static')
const path = require('path');
