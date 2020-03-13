// 图片选择input
const sourceInput = document.getElementById('source-input');
// 图片预览容器
const previewContainer = document.getElementById('preview-container');
// 预览图片
const previewImage = document.getElementById('preview-image');
// 结果展示
const resultDisplay = document.getElementById('result');
// 人脸框
const faceRect = document.getElementById('img-analysis-rect');
// 请求loading
const requestLoading = document.getElementById('request-loading');

// 监听文件变化
sourceInput.addEventListener('change', handleImageChange);

// 处理图片选择
async function handleImageChange() {
  faceRect.style.display = 'none';

  const file = sourceInput.files[0];
  const imgBase64 = await toBase64(file);

  // 设置图片预览
  await setPreviewImage(imgBase64);
  // 请求人脸检测接口
  const result = await requestDetectFace(imgBase64);
  // 显示检测结果
  showResult(JSON.stringify(result, null, 4));
  // 画人脸框
  drawFaceRect(result);
}

async function setPreviewImage(imgBase64) {
  const { width, height } = await getImgSize(imgBase64);
  const previewMaxWidth = previewContainer.offsetWidth;
  const previewMaxHeight = previewContainer.offsetHeight;

  const imgRatio = width / height;  // 图片的宽高比
  const previewRatio = previewMaxWidth / previewMaxHeight;

  if (imgRatio > previewRatio) {
    previewImage.style.width = '100%';
    previewImage.style.height = 'auto';
    // 垂直居中
    const showHeight = height * previewMaxWidth / width;
    if (showHeight < previewMaxHeight) {
      previewImage.style.marginTop = ((previewMaxHeight - showHeight) / 2) + 'px';
    }
  } else {
    previewImage.style.width = 'auto';
    previewImage.style.height = '100%';
    previewImage.style.marginTop = 0;
  }

  previewImage.src = imgBase64;
}

async function requestDetectFace(imgBase64) {
  resultDisplay.innerHTML = '';
  requestLoading.style.display = 'block';

  // 去除base64头
  const image = imgBase64.replace(/^data:image\/\w+;base64,/, '')
  const response = await fetch('/detectFace', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ image })
  });

  requestLoading.style.display = 'none';

  return await response.json();
}

function showResult(result) {
  resultDisplay.innerHTML = '<pre>' + result + '</pre>';
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

async function getImgSize(imgSrc) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      });
    };
  });
};

function drawFaceRect(result) {
  if (!result.ImageWidth) {
    return;
  }
  const startX = previewImage.offsetLeft;
  const startY = previewImage.offsetTop;
  const ratio = previewImage.offsetWidth / result.ImageWidth;

  const face = result.FaceInfos[0];

  faceRect.style.left = (startX + face.X * ratio) + 'px';
  faceRect.style.top = (startY + face.Y * ratio) + 'px';
  faceRect.style.width = face.Width * ratio + 'px';
  faceRect.style.height = face.Height * ratio + 'px';

  faceRect.style.display = 'block';
}