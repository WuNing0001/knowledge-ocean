document.addEventListener('DOMContentLoaded', () => {
    // 泡泡动画系统
    const createBubble = (type) => {
        const bubble = document.createElement('div');
        bubble.className = `bubble bubble-${type}`;
        bubble.style.left = Math.random() * 80 + 10 + '%';
        bubble.style.bottom = Math.random() * 40 + 20 + '%';
        bubble.style.width = Math.random() * 100 + 50 + 'px';
        bubble.style.height = bubble.style.width;
        return bubble;
    };

    // 泡泡点击事件
    document.querySelectorAll('.bubble').forEach(bubble => {
        bubble.addEventListener('click', (e) => {
            const editPanel = document.querySelector('.edit-panel');
            editPanel.style.display = 'flex';
            e.stopPropagation();
        });
    });

    // 波浪动画效果增强
    const ocean = document.querySelector('.ocean');
    ocean.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        ocean.style.background = `linear-gradient(${y * 45}deg, #b8e3ff ${x * 100}%, #89cff0)`;
    });

    // 添加遮阳伞动画
    const umbrellas = document.querySelector('.umbrellas');
    setInterval(() => {
        const rotation = Math.sin(Date.now() / 2000) * 3;
        umbrellas.style.transform = `rotate(${rotation}deg)`;
    }, 100);

    // 添加椰子树摇摆动画
    const palmTrees = document.querySelector('.palm-trees');
    setInterval(() => {
        const rotation = Math.sin(Date.now() / 1500) * 2;
        palmTrees.style.transform = `rotate(${rotation}deg)`;
    }, 100);

    // 编辑系统功能
    const editSystem = document.querySelector('.edit-system');
    const richEditor = document.querySelector('.rich-editor');
    const toolbarButtons = document.querySelectorAll('.editor-toolbar button');
    
    toolbarButtons.forEach(button => {
        button.addEventListener('click', () => {
            const command = button.dataset.tool;
            executeCommand(command);
        });
    });
    
    function executeCommand(command) {
        switch(command) {
            case 'bold':
                document.execCommand('bold', false, null);
                break;
            case 'italic':
                document.execCommand('italic', false, null);
                break;
            case 'image':
                insertImage();
                break;
            case 'link':
                insertLink();
                break;
        }
    }
    
    // 保存功能
    document.querySelector('.save-btn').addEventListener('click', () => {
        const title = document.querySelector('.title-input').value;
        const content = richEditor.innerHTML;
        const category = document.querySelector('.category-btn.active').dataset.category;
        
        saveBubble({
            title,
            content,
            category,
            timestamp: new Date().toISOString()
        });
        
        closeEditPanel();
    });
    
    function saveBubble(data) {
        // 这里可以连接后端API
        console.log('Saving bubble:', data);
        createBubbleElement(data);
    }
    
    function createBubbleElement(data) {
        const bubble = document.createElement('div');
        bubble.className = `bubble bubble-${data.category}`;
        bubble.innerHTML = `<h4>${data.title}</h4>`;
        document.querySelector('.bubbles-container').appendChild(bubble);
        
        // 添加动画和交互
        initializeBubble(bubble);
    }

    // 在现有代码中添加以下函数
    function playAmbientSound() {
        // 可以在这里添加背景音效
        console.log('Playing ambient sound');
    }

    function playGhostSound() {
        const randomSound = ghostSounds[Math.floor(Math.random() * ghostSounds.length)];
        randomSound.play().catch(err => console.log('Audio play failed:', err));
    }

    function insertImage() {
        const url = prompt('请输入图片URL:');
        if (url) {
            document.execCommand('insertImage', false, url);
        }
    }

    function insertLink() {
        const url = prompt('请输入链接URL:');
        const text = prompt('请输入链接文字:');
        if (url && text) {
            const html = `<a href="${url}" target="_blank">${text}</a>`;
            document.execCommand('insertHTML', false, html);
        }
    }

    function closeEditPanel() {
        document.querySelector('.edit-system').style.display = 'none';
    }

    function initializeBubble(bubble) {
        bubble.addEventListener('click', (e) => {
            const editPanel = document.querySelector('.edit-panel');
            editPanel.style.display = 'flex';
            e.stopPropagation();
        });
        
        // 添加浮动动画
        bubble.style.animationDelay = `${Math.random() * 2}s`;
    }

    // 在 DOMContentLoaded 事件处理函数中添加
    // 关闭编辑面板的功能
    document.querySelector('.close-btn').addEventListener('click', closeEditPanel);
    document.querySelector('.cancel-btn').addEventListener('click', closeEditPanel);

    // 点击空白处关闭编辑面板
    document.querySelector('.edit-system').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeEditPanel();
        }
    });

    // 分类按钮点击效果
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}); 
