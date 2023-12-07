document.addEventListener('DOMContentLoaded', (event) => {
    const header = document.querySelector('header h1');
    const actionsLog = document.getElementById('user-actions-log');
    const maxLogs = 5; // 最大记录数

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

    let lastMessage = ''; // 用于存储上一次的消息

    function logAction(message) {
        // 如果此次消息与上一次相同，则不添加新的日志条目
        if (lastMessage === message) {
            return;
        }

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

        lastMessage = message; // 更新最后一条消息
    }

    const video = document.getElementById('myVideo');
    const playPauseBtn = document.getElementById('playPause');
    const playImg = playPauseBtn.querySelector('img');

    // 给播放/暂停按钮添加点击事件监听
    playPauseBtn.addEventListener('click', () => {
        // 判断视频的播放状态，并切换图片
        if (video.paused) {
            video.play();
            playImg.src = 'stop.png';  // 切换为暂停图标
        } else {
            video.pause();
            playImg.src = 'start.png';  // 切换为播放图标
        }
    });

    // 给倒退按钮添加点击事件监听
    document.getElementById('rewind').addEventListener('click', () => {
        video.currentTime -= 10;  // 视频倒退 10 秒
    });

    // 给前进按钮添加点击事件监听
    document.getElementById('forward').addEventListener('click', () => {
        video.currentTime += 10;  // 视频前进 10 秒
    });

    document.getElementById('helpButton').addEventListener('click', () => {
        const helpText = document.getElementById('helpText');
        const sentences = [
            "Hello, I am your assistant. What can I do for you?",
            "Don't click it, and there is no reaction if you click again.",
            "Can't you just click on the web page yourself? Do I have to teach you? ",
            "It's a nice day, isn't it?",
            "What idiot made this page? What a piece of shit!",
            "You can try clicking the close button on my right, it will run amok~",
            "The author admitted she couldn't spot the close button either, probably because her coding was pretty bad."

            // 添加更多帮助句子
        ];
        helpText.textContent = sentences[Math.floor(Math.random() * sentences.length)];
        helpText.style.display = 'block'; // 显示帮助文本

        // 设置定时器，在 8 秒后隐藏文本
        setTimeout(() => {
            helpText.style.display = 'none';
        }, 6000); // 8000 毫秒后执行
    });
    
    document.getElementById('closeButton').addEventListener('click', () => {
        const button = document.getElementById('closeButton');
        const maxX = window.innerWidth - button.clientWidth;
        const maxY = window.innerHeight - button.clientHeight;
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        button.style.position = 'absolute';
        button.style.left = randomX + 'px';
        button.style.top = randomY + 'px';
    });
    
});


