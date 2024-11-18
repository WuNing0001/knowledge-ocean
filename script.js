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
            const editPanel = document.querySelector('.edit-system');
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

    function createBubbleElement(data) {
        const bubble = document.createElement('div');
        bubble.className = `bubble bubble-${data.category}`;
        bubble.innerHTML = `<span>${data.title}</span>`;
        document.querySelector('.bubbles-container').appendChild(bubble);
        initializeBubble(bubble);
    }

    function initializeBubble(bubble) {
        bubble.addEventListener('click', (e) => {
            const editPanel = document.querySelector('.edit-system');
            editPanel.style.display = 'flex';
            e.stopPropagation();
        });
        bubble.style.animationDelay = `${Math.random() * 2}s`;
    }

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

    // 保存功能
    document.querySelector('.save-btn').addEventListener('click', () => {
        const title = document.querySelector('.title-input').value;
        const content = richEditor.innerHTML;
        const activeBtn = document.querySelector('.category-btn.active');
        
        if (!title || !content || !activeBtn) {
            alert('请填写完整信息');
            return;
        }

        const category = activeBtn.classList[1]; // 获取类别
        
        createBubbleElement({
            title,
            content,
            category
        });
        
        closeEditPanel();
    });
});
