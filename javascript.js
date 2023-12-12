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
            "The author admitted she couldn't spot the close button either, probably because her coding was pretty bad.",
            "Stop clicking on me! I'm gonna get worn out from all this play!",
            " :P ",
            "; )",
            "🤔",
            "❔",
            "🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔",
            "The author says she's really into this 🤔 emoji, so she's gonna stuff a few more of them into the webpage 🤔",
            "Feels like being an assistant is exhausting. Must be that assistant-tiredness kicking in.",
            "If you take a moment to listen to what I'm saying, you'll realize you just take a moment.",
            "Fine, as long as you're happy, whatever."


            // 添加更多帮助句子
        ];
        // 清除现有的隐藏文本定时器
        clearTimeout(window.hideTimer);

        if (window.isAnimating) {
            // 如果当前正在播放动画，则立即完成当前句子的显示
            clearInterval(window.letterTimer);
            helpText.textContent = window.currentSentence;
            window.isAnimating = false;
        } else {
            // 随机选择一个新句子并开始播放动画
            window.currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    
            let currentText = '';
            let letterIndex = 0;
            clearInterval(window.letterTimer);
            helpText.textContent = '';
            helpText.style.display = 'block';
            window.isAnimating = true;
    
            window.letterTimer = setInterval(() => {
                currentText += window.currentSentence.charAt(letterIndex);
                helpText.textContent = currentText;
                letterIndex++;
    
                if (letterIndex === window.currentSentence.length) {
                    clearInterval(window.letterTimer);
                    window.isAnimating = false;
    
                    // 设置定时器，8秒后隐藏文本
                    window.hideTimer = setTimeout(() => {
                        helpText.style.display = 'none';
                    }, 8000);
                }
            }, 50);
        }
    });
    
    // 初始化变量
    window.isAnimating = false;
    window.currentSentence = '';

        let inactivityTimer;
        const helpText = document.getElementById('helpText');
    
        function showInactivityMessage() {
            const inactivityMessages = [
                "Anyone still around? Hellooo? Knock-knock!",
                "So bored over here. Anyone wanna hang out with me?...",
                "(Tweeting like a little bird) Chirp chirp!~",
                "(Imitating a puppy's bark) Woof woof!! Awooo~"
            ];
            helpText.textContent = inactivityMessages[Math.floor(Math.random() * inactivityMessages.length)];
            helpText.style.display = 'block';

            setTimeout(() => {
                helpText.style.display = 'none';
            }, 8000);
        }

        
    
        function resetInactivityTimer() {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(showInactivityMessage, 30000); // 设置 10 秒无操作后显示消息
        }
    
        // 为整个文档添加事件监听器以重置定时器
        document.addEventListener('click', resetInactivityTimer);
        document.addEventListener('keypress', resetInactivityTimer);
    
        // 初始化定时器
        resetInactivityTimer();

        const closeButton = document.getElementById('closeButton');
        let x = 0, y = 0; // 初始位置
        let dx = -2, dy = 2; // 初始移动速度和方向
        let clickCount = 0; // 点击次数
        let movingInterval; // 移动定时器
        
        function moveButton() {
            const maxX = window.innerWidth - closeButton.clientWidth;
            const maxY = window.innerHeight - closeButton.clientHeight;
        
            x += dx;
            y += dy;
        
            // 检测并反转方向
            if (x <= 0 || x >= maxX) dx = -dx;
            if (y <= 0 || y >= maxY) dy = -dy;
        
            // 更新按钮位置
            closeButton.style.left = x + 'px';
            closeButton.style.top = y + 'px';
        }
        
        closeButton.addEventListener('click', () => {
            clickCount++;
        
            if (clickCount === 1) {
                // 第一次点击，开始移动
                movingInterval = setInterval(moveButton, 20); // 调整时间间隔以改变速度
            } else if (clickCount === 2) {
                // 第二次点击，加速
                clearInterval(movingInterval);
                movingInterval = setInterval(moveButton, 10);
            } else {
                // 第三次点击，消失
                const button = document.getElementById('closeButton');
                const boomGif = document.getElementById('boomGif');
                const audio = new Audio('explore sound.wav');
                const gifDuration = 1000; // 假设 GIF 播放时长为 3000 毫秒（3秒）
        
                // 获取按钮当前的位置
                const buttonRect = button.getBoundingClientRect();
        
                // 隐藏按钮
                button.style.display = 'none';
        
                // 显示并定位 GIF 到按钮的位置
                boomGif.style.display = 'block';
                boomGif.style.left = buttonRect.left - 70 + 'px';
                boomGif.style.top = buttonRect.top + 'px';
        
                // 播放音效
                audio.play();
        
                // 添加事件监听器以便在 GIF 播放结束后隐藏它
                setTimeout(() => {
                    boomGif.style.display = 'none'; // 或者 boomGif.remove();
                }, gifDuration);
            }
        });
            
        
        // 初始化按钮位置
        closeButton.style.position = 'absolute';
        closeButton.style.left = x + 'px';
        closeButton.style.top = y + 'px';

        // 创建音频对象
        const clickSound = new Audio('click.wav');

        // 定义一个函数来设置自定义光标
        function setCustomCursor() {
            document.body.style.cursor = 'url(m1.png), auto';
        }

        // 初始化时设置自定义光标
        setCustomCursor();

        // 为整个文档添加点击事件监听器
        document.addEventListener('click', () => {
            clickSound.play(); // 播放点击音效

            // 在播放音效时再次设置自定义光标
            setCustomCursor();
        });

        // 确保音效播放完后光标不会改变
        clickSound.onended = () => {
            setCustomCursor();
        };


        // 创建一个音频对象
        const typingSound = new Audio('explore sound.wav');

        // 为整个文档添加键盘按下事件监听器
        document.addEventListener('keydown', () => {
            // 如果音效正在播放，则重置音效
            if (!typingSound.paused) {
                typingSound.pause();
                typingSound.currentTime = 0;
            }
            
            // 播放打字音效
            typingSound.play();
        });

        document.addEventListener('mousemove', (event) => {
            const trail = document.createElement('img');
            trail.src = 'm1.png'; // 您的图像路径
            trail.className = 'trail';
            trail.style.left = `${event.pageX - 1}px`; // 调整位置使其居中于鼠标
            trail.style.top = `${event.pageY - 1}px`;
            document.body.appendChild(trail);
        
            // 设置定时器以移除拖尾元素
            setTimeout(() => {
                document.body.removeChild(trail);
            }, 100); // 拖尾持续时间，可调整
        });


            const popup = document.getElementById('popup');
            const dingSound = document.getElementById('dingSound');
        
            function showPopup() {
                popup.style.display = 'block';
                dingSound.play();
                document.removeEventListener('click', showPopup); // 移除监听器，确保只显示一次
            }
        
            function closePopup() {
                popup.style.display = 'none';
            }
        
            document.addEventListener('click', showPopup, { once: true });
            document.getElementById('okButton').addEventListener('click', closePopup);
            document.getElementById('greatButton').addEventListener('click', closePopup);
        
        
        

    
        
});


