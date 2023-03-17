/**
* Sprite-klass för spelfigurer
*/
 class Sprite {
    /**
     * Konstruktor
     * @param x       x-läget
     * @param y       y-läget
     * @param img     Bild som representerar spelfiguren
     * @param speed   Rörelsehastighet i px/s
     * @param alive   alive status, true or false
     * @param dx      direction x
     * @param dx      direction y
     */
    constructor(x, y, img, speed, dx, dy, alive){
        this.x = x;
        this.y = y;
        this.img = img;
        this.speed = speed;
        this.dx = dx;
        this.dy = dy;
        this.alive = alive;
    }
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y);
    }

    move(deltaTime){

        this.x += this.dx * (deltaTime / 1000000000.0) * speed;
		this.y += this.dy * (deltaTime / 1000000000.0) * speed;

    }
     getEntityDx(){
        return dx;
    }
    
     getEntityDy(){
        return dy;
    }
    
     setEntityDx(dx){
        this.dx = dx;
    }
     setEntityDy(dy){
        this.dy = dy;
    }


 }
 



