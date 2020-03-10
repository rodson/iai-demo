const iaiClient = require('../iaiClient');

module.exports = async (ctx) => {
  const { image } = ctx.request.body;
  try {
    const response = await iaiClient.detectFace(image);
    ctx.body = response;
  } catch (e) {
    ctx.body = e;
  }
};

