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
     */
    constructor(x, y, img, speed, alive){
        this.x = x;
        this.y = y;
        this.img = img;
        this.speed = speed;
        this.alive = alive;
    }
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y);
    }


 }
 



