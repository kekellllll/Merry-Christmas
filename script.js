document.addEventListener('DOMContentLoaded', () => {
    // --- Input Logic ---
    const nameInput = document.getElementById('nameInput');
    const nameDisplay = document.getElementById('nameDisplay');

    if (nameInput && nameDisplay) {
        nameInput.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            nameDisplay.textContent = val ? val : "Classmate";
        });
    }

    // --- Advanced Snow System (3D Parallax) ---
    const canvas = document.getElementById('snowCanvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    const snowflakes = [];
    
    // Configuration
    const TOTAL_FLAKES = 200;
    const WIND_FORCE = 0.5;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    class Snowflake {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * -height; // Start above screen
            
            // Z-index simulation (0 = far, 1 = near)
            this.z = Math.random(); 
            
            // Size depends on Z (Near is bigger)
            this.size = (this.z * 3) + 1; 
            
            // Speed depends on Z (Near is faster)
            this.speedY = (this.z * 2) + 1;
            this.speedX = (Math.random() - 0.5) * 0.5; // Natural drift
            
            // Opacity depends on Z
            this.opacity = (this.z * 0.5) + 0.3;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX + (this.z * WIND_FORCE); // Parallax wind

            // Reset if out of view
            if (this.y > height) {
                this.reset();
                this.y = -10; // Just above top
            }
            if (this.x > width) {
                this.x = -10;
            } else if (this.x < -10) {
                this.x = width;
            }
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize flakes
    for (let i = 0; i < TOTAL_FLAKES; i++) {
        snowflakes.push(new Snowflake());
        // Randomize initial Y so they don't all fall at once
        snowflakes[i].y = Math.random() * height;
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw all flakes
        snowflakes.forEach(flake => {
            flake.update();
            flake.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
});
