// 删除所有与 abyss 相关的代码和函数
document.addEventListener('DOMContentLoaded', () => {
    // ... 保留现有的泡泡和编辑系统相关代码 ...

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
});
