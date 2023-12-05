var colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF5']; // 预定义的颜色数组
var currentColorIndex = 0; // 当前颜色索引

function changeBackgroundColor() {
    // 设置背景颜色
    document.body.style.backgroundColor = colors[currentColorIndex];
    
    // 更新颜色索引
    currentColorIndex = (currentColorIndex + 1) % colors.length;
}


