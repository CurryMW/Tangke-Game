const el = document.querySelector<HTMLCanvasElement>("#canvas")!;

const canvas = el.getContext("2d")!;
// canvas.fillStyle = "black";
// canvas.fillRect(0, 0, 100, 100);

// 画线条
/* canvas.strokeStyle = "#7ed6df";
canvas.lineWidth = 30;
canvas.lineJoin = "round";
canvas.strokeRect(50, 50, 100, 100); */

// 画圆形
/* // canvas.fillStyle = "#7ed6df"; // 填充颜色
canvas.strokeStyle = "#7ed6df"; // 线条填充颜色
canvas.lineWidth = 30;
canvas.arc(100, 100, 50, 0, 2 * Math.PI);
// canvas.fill(); // 全部填充
canvas.stroke(); // 线条填充 */

// 画多边形
// 开始绘制
/* canvas.beginPath();
canvas.moveTo(el.width / 2, 10); // 初始起点位置
canvas.lineTo(el.width, 150);
canvas.lineTo(10, 150);
canvas.closePath(); // 闭合回路
canvas.stroke(); */

// 渐变色的使用
/* const gradient = canvas.createLinearGradient(0, 0, 300, 300);
gradient.addColorStop(0, '#ff7979');
gradient.addColorStop(0.5, '#badc58');
gradient.addColorStop(1, '#eb4d4b'); // 渐变色的位置

canvas.strokeStyle = gradient;
canvas.lineWidth = 10;
canvas.lineJoin = 'round';
canvas.strokeRect(50, 50, 200, 200); */

// 文字处理
/* canvas.fillStyle = "#7ed6df"; // 填充颜色
canvas.fillRect(0, 0, el.width, el.height);
const gradient = canvas.createLinearGradient(0, 0, 300, 300);
gradient.addColorStop(0, '#ff7979');
gradient.addColorStop(0.5, '#badc58');
gradient.addColorStop(1, '#eb4d4b');
canvas.font = "30px SourceHanSansSC"; // 设置字体大小与字体
canvas.strokeStyle = gradient; // 设置字体颜色
// canvas.textBaseline = "top"; // 设置字体基线对齐方式
canvas.lineWidth = 2;
canvas.strokeText('yahu', 30, 100); // 设置字体内容位置
 */

// 图片贴图的使用
/* const img = document.createElement('img')!;
img.src = "../public/images/报纸女孩 白色长发漂亮动漫美女4k壁纸3840x2160_彼岸图网.jpeg";
img.onload = () => {
  const pattern = canvas.createPattern(img, 'repeat')!; // 贴图平铺
  canvas.fillStyle = pattern;
  canvas.fillRect(0, 0, el.width, el.height);
} */

// 图片的绘制：可以根据canvas的大小等比例的缩放
/* canvas.fillStyle = "#130f40";
canvas.fillRect(0, 0, el.width, el.height);
const img = document.createElement('img')!;
img.src = "../public/images/报纸女孩 白色长发漂亮动漫美女4k壁纸3840x2160_彼岸图网.jpeg";
img.onload = () => {
  // 根据画布的大小计算比例缩放
  el.width = img.naturalWidth * scale(img, el);
  el.height = img.naturalHeight * scale(img, el);
  canvas.drawImage(img, 50, 50, el.width, el.height) // 绘制图片实现等比例缩放与移动位置
}

function scale(img: HTMLImageElement, el: HTMLCanvasElement) {
  // naturalWidth属性：获取原始图片大小
  return Math.min(el.width / img.naturalWidth, el.height / img.naturalHeight)
} */

// 绘制随机色块
canvas.fillStyle = "#2c3e50";
canvas.fillRect(0, 0, el.width, el.height);
for (let i = 0; i < 20; i++) {
  canvas.beginPath(); // 循环绘制时需要重新开始
  canvas.fillStyle = ['#1abc9c', '#2ecc71', '#3498db', '#f1c40f', '#ecf0f1'].sort(() => Math.floor((Math.random() * 3)) ? 1 : -1)[0];
  canvas.arc(Math.random() * (el.width / 2), Math.random() * (el.height / 2), 10 + Math.random() * 50, 0, 2 * Math.PI) // arc: 大小，大小，半径，派
  canvas.fill();
}





