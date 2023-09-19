window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1'); 
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    class Particle {
        constructor(effect, x, y, color) {
            this.effect = effect;
            this.x = Math.random() * this.effect.width;
            this.y = Math.random() * this.effect.height;
            this.originX = Math.floor(x);
            this.originY = Math.floor(y);
            this.color = color;
            this.size = this.effect.gap;
            this.vx = 0;
            this.vy = 0;
            this.ease = 0.5;
            this.friction = 0.6;
            this.dx = 0;
            this.dy = 0;
            this.distance = 0;
            this.angle = 0;
        }
        draw(context) {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.size, this.size);
        }
        update() {
            this.dx = this.effect.mouse.x - this.x;
            this.dy = this.effect.mouse.y - this.y;
            this.distance = this.dx * this.dx + this.dy * this.dy
            this.force = -this.effect.mouse.radius / this.distance + 1;

            if (this.distance < this.effect.mouse.radius) {
                this.angle = Math.atan2(this.dy, this.dx);
                this.vx += this.force * Math.cos(this.angle);
                this.vy += this.force * Math.sin(this.angle);
            }
            
            this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
            this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
        }
        warp() {
            this.x = Math.random() * this.effect.width;
            this.y = Math.random() * this.effect.height;
            this.ease = 0.2;
        }
    }

    class Effect {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.particlesArray = [];
            this.image = document.getElementById('image1');
            this.centerX = this.width * 0.5;
            this.centerY = this.height * 0.5;
            this.x = this.centerX - this.image.width * 0.5;
            this.y = this.centerY - this.image.height * 0.5;
            this.gap = 2;
            this.mouse = {
                radius: 5000,
                x: undefined,
                y: undefined
            }
            window.addEventListener('mousemove', event => {
                this.mouse.x = event.x;
                this.mouse.y = event.y;
            })
        }
        init(context) {
            context.drawImage(this.image, this.x, this.y);
            const pixels = context.getImageData(0, 0, this.width, this.height).data;
            for (let y = 0; y < this.height; y += this.gap) {
                for (let x = 0; x < this.width; x += this.gap) {
                    const index = (y * this. width + x) * 4;
                    const red = pixels[index];
                    const green = pixels[index + 1];
                    const blue = pixels[index + 2];
                    const alpha = pixels[index + 3]
                    const color = 'rgb(' + red + ',' + green + ',' + blue + ')';

                    if (alpha > 0) {
                        this.particlesArray.push(new Particle(this, x, y, color));
                    }
                }
            }
    }
        
        draw(context){
            this.particlesArray.forEach(particle => particle.draw(context));
           }
        update() {
            this.particlesArray.forEach(particle => particle.update());
        }
        warp() {
            this.particlesArray.forEach(particle => particle.warp());
        }
    }
    
    const effect = new Effect(canvas.width, canvas.height);
    effect.init(ctx);
    

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        effect.draw(ctx);
        effect.update();
        requestAnimationFrame(animate);
    }

    animate();

    // warp button
    const warpButton = document.getElementById('warpButton');
    warpButton.addEventListener('click', function() {
        effect.warp();
    });
});

/*window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1'); 
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const image = document.getElementById('image1');
    let colors = [[255, 0, 0], [0, 255, 0], [0, 0, 255]]; // Colores iniciales (rojo, verde, azul)
    let colorIndex = 0; // Índice del color actual

    function changeColors() {
        // Cargar la Imagen en el Canvas y Obtener los Píxeles
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Iterar sobre los Píxeles
        for (let i = 0; i < imageData.data.length; i += 4) {
            const red = imageData.data[i];
            const green = imageData.data[i + 1];
            const blue = imageData.data[i + 2];

            // Verificar si el píxel coincide con el color actual
            if (red === colors[colorIndex][0] && green === colors[colorIndex][1] && blue === colors[colorIndex][2]) {
                // Cambiar a otro color
                colorIndex = (colorIndex + 1) % colors.length; // Cambiar al siguiente color en la lista
                imageData.data[i] = colors[colorIndex][0]; // Rojo
                imageData.data[i + 1] = colors[colorIndex][1]; // Verde
                imageData.data[i + 2] = colors[colorIndex][2]; // Azul
            }
        }

        // Dibujar la Imagen Modificada
        ctx.putImageData(imageData, 0, 0);

        // Llamar a esta función de nuevo para animar de manera continua
        requestAnimationFrame(changeColors);
    }

    // Iniciar la animación después de cargar la imagen
    image.onload = function() {
        changeColors();
    }
    changeColors();
});*/
