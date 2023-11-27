// 线条对象
class Line {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d');
        this.vertices = [];
        this.edges = [];
        this.numVertices = Math.floor(Math.random() * 5) + 3; // 随机 3 到 7 个顶点

        for (let i = 0; i < this.numVertices; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            this.vertices.push({ x, y });
        }

        // 创建边
        for (let i = 0; i < this.numVertices; i++) {
            const nextIndex = (i + 1) % this.numVertices;
            this.edges.push({
                x1: this.vertices[i].x,
                y1: this.vertices[i].y,
                x2: this.vertices[nextIndex].x,
                y2: this.vertices[nextIndex].y,
                speedX1: Math.random() * 0.5 - 0.25,
                speedY1: Math.random() * 0.5 - 0.25,
                speedX2: Math.random() * 0.5 - 0.25,
                speedY2: Math.random() * 0.5 - 0.25
            });
        }
    }

    draw() {
        this.edges.forEach(edge => {
            this.ctx.beginPath();
            this.ctx.moveTo(edge.x1, edge.y1);
            this.ctx.lineTo(edge.x2, edge.y2);
            this.ctx.strokeStyle = 'rgba(128,128,128,0.5)'; // 灰色线条
            this.ctx.stroke();
        });
    }

    update() {
        this.edges.forEach(edge => {
            edge.x1 += edge.speedX1;
            edge.y1 += edge.speedY1;
            edge.x2 += edge.speedX2;
            edge.y2 += edge.speedY2;

            // 边界检测和反弹
            if (edge.x1 < 0 || edge.x1 > this.canvas.width) edge.speedX1 *= -1;
            if (edge.y1 < 0 || edge.y1 > this.canvas.height) edge.speedY1 *= -1;
            if (edge.x2 < 0 || edge.x2 > this.canvas.width) edge.speedX2 *= -1;
            if (edge.y2 < 0 || edge.y2 > this.canvas.height) edge.speedY2 *= -1;
        });
    }
}

// 动画循环
function animate(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    lines.forEach(line => {
        line.update();
        line.draw();
    });

    animationFrameId = requestAnimationFrame(() => animate(canvas));
}

let lines = [];
let animationFrameId;

export function startCanvasDrawing(canvas) {
    if (!animationFrameId) {
        // 创建线条数组
        lines = [];
        for (let i = 0; i < 50; i++) { // 可以调整线条数量
            lines.push(new Line(canvas));
        }
        animate(canvas);
    }
}

export function stopCanvasDrawing() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}
