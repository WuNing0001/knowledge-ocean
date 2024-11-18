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

    // 深渊通道交互
    const abyssPortal = document.querySelector('.abyss-portal');
    const abyssTunnel = document.querySelector('.abyss-tunnel');
    
    let ghostSounds = [
        new Audio('path/to/sound1.mp3'),
        new Audio('path/to/sound2.mp3'),
        new Audio('path/to/sound3.mp3')
    ];
    
    abyssPortal.addEventListener('click', () => {
        openAbyssTunnel();
    });
    
    function openAbyssTunnel() {
        abyssTunnel.style.display = 'block';
        createGhosts();
        playAmbientSound();
    }
    
    function createGhosts() {
        const ghostContainer = document.querySelector('.ghost-container');
        for(let i = 0; i < 5; i++) {
            const ghost = document.createElement('div');
            ghost.className = 'ghost';
            ghost.style.animationDelay = `${Math.random() * 2}s`;
            ghost.addEventListener('click', playGhostSound);
            ghostContainer.appendChild(ghost);
        }
    }
    
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
}); 