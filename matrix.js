class MatrixBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'matrix-rain';
        document.body.insertBefore(this.canvas, document.body.firstChild);
        
        this.ctx = this.canvas.getContext('2d');
        this.fontSize = 20;
        this.drops = [];
        this.symbols = "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789:・.=*+-<>¦｜╌";
        
        this.initialize();
        window.addEventListener('resize', () => this.initialize());
    }

    initialize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = [];
        
        for(let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.floor(Math.random() * -100);
        }
    }

    draw() {
     
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        for(let i = 0; i < this.drops.length; i++) {
            const symbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
            
       
            this.ctx.fillStyle = '#00FF00';
            this.ctx.font = this.fontSize + 'px monospace';
            this.ctx.fillText(symbol, i * this.fontSize, this.drops[i] * this.fontSize);
            
          
            if(this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.95) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize Matrix background when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    const matrix = new MatrixBackground();
    matrix.animate();
});
