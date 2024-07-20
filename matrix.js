// 获取Canvas元素并设置全屏
const canvas = document.getElementById('matrixCanvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 定义字符数组
const katakana = '高性能平台';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const matrixChars = katakana + latin + nums;

// 定义字符大小
const fontSize = 16;
const columns = canvas.width / fontSize; // 计算列数

// 每列的y位置
const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

// 绘制Matrix效果的函数
function drawMatrix() {
    // 添加半透明背景以产生尾迹效果
    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 设置文本颜色和字体
    context.fillStyle = '#0F0'; // 绿色文本
    context.font = fontSize + 'px monospace';

    // 循环遍历每一列
    for (let i = 0; i < drops.length; i++) {
        // 随机选择字符
        const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
        // 绘制字符
        context.fillText(text, i * fontSize, drops[i] * fontSize);
        // 随机重置列的y位置以产生不同的效果
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        // 向下移动y位置
        drops[i]++;
    }
    // 循环调用函数
    requestAnimationFrame(drawMatrix);
}

// 调用函数以启动效果
drawMatrix();





// 初始化模糊度
var blurValue = 0.1;
var blurDirection=1
var blurStep=0.01

// 更新backdrop-filter属性的函数
function updateBackdropFilter() {
    // 获取.container元素
    var container = document.getElementById('container');
    // 逐步增加模糊度
    blurValue += blurStep * blurDirection;

    // 最暗时刻
    if (blurValue >= 5) {
        blurDirection = -1
        blurStep=0.1
    }
    //最清楚时刻
    if(blurValue<=0){
        blurDirection = 1
        blurStep=0.01
    }

    // 更新.container的backdrop-filter属性
    container.style.backdropFilter = 'blur(' + blurValue + 'px)';
    requestAnimationFrame(updateBackdropFilter)
}

// 使用setInterval来周期性调用updateBackdropFilter函数
// setInterval(updateBackdropFilter, 100); // 每100毫秒更新一次

updateBackdropFilter()