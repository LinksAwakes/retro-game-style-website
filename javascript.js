document.addEventListener('DOMContentLoaded', (event) => {
    const header = document.querySelector('header h1');
    const actionsLog = document.getElementById('user-actions-log');
    const maxLogs = 7; // 最大记录数

    function changeColor() {
        const headerColors = ['red', 'green', 'blue', 'yellow', 'purple'];
        let colorIndex = 0;
        return function() {
            header.style.color = headerColors[colorIndex];
            colorIndex = (colorIndex + 1) % headerColors.length;
        };
    }

    setInterval(changeColor(), 1000); // Change color every 1000 milliseconds (1 second)

    function updateDateTime() {
        var now = new Date();
        var time = now.toLocaleTimeString(); // 获取时间字符串
        var date = now.toLocaleDateString(); // 获取日期字符串
        document.getElementById("time").textContent = time;
        document.getElementById("date").textContent = date;
    }

    setInterval(updateDateTime, 1000); // Update time every 1000 milliseconds (1 second)

    document.querySelector('.body-wrapper').addEventListener('click', () => {
        logAction(' ! You clicked on the background, but no respond');
    });

    header.addEventListener('click', () => {
        logAction(' ! You looked carefully at the title, which was blinking.');
        event.stopPropagation(); // 防止事件冒泡到 .body-wrapper
    });

        // 监听颜色按钮的点击事件
    document.querySelectorAll('.color-button').forEach(button => {
        button.addEventListener('click', (event) => {
            var color = button.getAttribute('data-color');
            document.querySelector('.body-wrapper').style.backgroundColor = color; // 改变背景颜色
            logAction(' ! You clicked the color button, and the background color changed.');
            event.stopPropagation(); // 停止事件冒泡
        });
    });

    document.querySelectorAll('.color-button').forEach((button, index) => {
        button.addEventListener('click', (event) => {
            const newColor = button.getAttribute('data-color');
            document.querySelectorAll('.color-strip').forEach((strip, stripIndex) => {
                setTimeout(() => {
                    strip.style.setProperty('--new-color', newColor);
                    strip.style.animation = 'none'; // 重置动画
                    // 强制浏览器重绘元素
                    strip.offsetHeight;
                    strip.style.animation = null; // 重新应用动画
                }, stripIndex * 100); // 每个条带的动画开始时间依次延后
            });
        });
    });
    

    document.getElementById('time').addEventListener('click', (event) => {
        logAction(' !You looked at the time, and it was passing.');
        event.stopPropagation(); // 停止事件冒泡
    });

    document.getElementById('date').addEventListener('click', (event) => {
        logAction(' !You clicked on the date, it stayed today.');
        event.stopPropagation(); // 停止事件冒泡
    });

    function logAction(message) {
        const logEntry = document.createElement('div');
        logEntry.textContent = message;
        actionsLog.prepend(logEntry);

        if (actionsLog.children.length > maxLogs) {
            const oldestLog = actionsLog.children[maxLogs];
            oldestLog.classList.add('fade-out');
            oldestLog.addEventListener('animationend', () => {
                oldestLog.remove();
            });
        }
    }
});

