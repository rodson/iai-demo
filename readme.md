# iai-demo
基于腾讯云人脸识别接口的人脸检测demo

## 简介
检测人脸框位置，获取人脸属性和人脸质量分

![示意图](http://p.qpic.cn/zc_pic/0/0b8f9256c9a4a4dfe261ea081709226f15839782424638/0)

## 腾讯云人脸识别接入流程

### 服务开通

进入[人脸识别控制台](https://console.cloud.tencent.com/aiface)，点击开通服务

### 获取SecretId/SecretKey

进入[API密钥管理](https://console.cloud.tencent.com/cam/capi)，创建SecretId/SecretKey

### 接口调用

开通服务并获取了SecretId/SecretKey之后就可以进行接口调用了，在[api explorer](https://console.cloud.tencent.com/api/explorer?Product=iai&Version=2018-03-01&Action=CreateGroup&SignVersion=)上提供了在线调用的能力

## 安装

```
npm install
```

## 添加密钥

在项目根目录创建properties.json文件，填入云API的密钥secretId、secretKey

```json
{
  "secretId": "your secretId",
  "secretKey": "your secretKey"
}
```

## 启动服务

```
npm start
```

## 页面访问

在浏览器输入http://localhost:3000/detectFace.html

## 相关资料
* [腾讯云人脸识别文档](https://cloud.tencent.com/document/product/867/32769)
* [腾讯云人脸识别控制台](https://console.cloud.tencent.com/aiface)
* [腾讯云SDK](https://github.com/TencentCloud)