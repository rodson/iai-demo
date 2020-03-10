
// 密钥文件
const properties = require('./properties.json');
// 引入腾讯云SDK
const tencentcloud = require('tencentcloud-sdk-nodejs');
// 人脸识别client类，封装了人脸识别接口的调用
const IaiClient = tencentcloud.iai.v20180301.Client;
// 人脸识别Model，封装了各接口的请求结构
const models = tencentcloud.iai.v20180301.Models;
// 身份凭证类，存储secretId和secretKey
const Credential = tencentcloud.common.Credential

// 实例化调用client
let cred = new Credential(properties.secretId, properties.secretKey);
let client = new IaiClient(cred);

/**
 * DetectFace
 * @param { string } image 
 */
function detectFace(image) {
  return new Promise((resolve) => {
    const req = new models.DetectFaceRequest();
    req.Url = 'http://i2.sinaimg.cn/ty/nba/2015-07-05/U10236P6T12D7648505F44DT20150705114547.jpg';
    req.FaceModelVersion = '3.0';
    req.NeedFaceAttributes = 1;

    client.DetectFace(req, (errMsg, response) => {
        if (errMsg) {
          reject(errMsg);
          return;
        }
        resolve(response);
    });
  });
}

module.exports = {
  detectFace
};