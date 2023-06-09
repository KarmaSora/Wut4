import { Sprite } from "./sprite.js";
// Laddar in bilder till spelet
let birdImg = new Image();
birdImg.src = "images/bird.png";

let catImage = new Image();
catImage.src = "images/cat.png";

let deadCatImage= new Image();
deadCatImage.src = "images/flyingCat.png";
// Position
let xPos = 60, yPos = 120, speed = 20;
let birdDx = 0, birdDy = 0;
let catDx = 0, catDy = 0;

//importera filen, fixa felet  -Karam
let birdEntity, catEntity;

//Lagrar tangent-händelser
let keysDown = {};
let ctx;
let canvas;
let widthOfCanvas;

let arrayOfCats;
let then;

let hitSound = new Audio('./fire.mp3');


/** Körs då sidan är laddad */
function init() {
    then = Date.now();
    birdEntity = new Sprite(xPos, yPos + 200, birdImg, speed*10, birdDx, birdDy, true);

    arrayOfCats = new Array();
    for (let j = 0; j < 6; j++) {
        catEntity = new Sprite(xPos + 100 * j, yPos, catImage, speed, catDx, catDy, true);
        arrayOfCats.push(catEntity);
    }

    console.log("Bird Life status: " + birdEntity.alive);
    console.log("Cat Life status: " + catEntity.alive);

    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    //kan byta document till windows
    document.addEventListener("keydown", keyDown, false);
    document.addEventListener("keyup", keyUp, false);
    gameLoop();
}

/** Sparar undan en tangentryckning för bearbetning  */
function keyDown(e) {
    keysDown[e.key] = true;
}

/**
* Tar bort händelsen när knappen släpps. Detta så inte händelsen 
* ligger kvar och återupprepas. 
* Fågeln skulle då flytta sig hela tiden efter ett tryck.
*/
function keyUp(e) {
    delete keysDown[e.key];
}

/** Spellopen */
function gameLoop() {

    let now = Date.now();
    let deltaTime = now - then;


    update(deltaTime / 1000);
    render();

    then = now;

    // Bytt till requestAnimFrame istället för setInterval
    requestAnimationFrame(function () {
        gameLoop();
    });
}
/** Renderar canvasen */
function render() {

    // Ser till att radera med vit bakgrund som det sedan skall ritas på
    ctx.save();
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    birdEntity.draw(ctx);

    for (let i = 0; i < 5; i++) {
        if (arrayOfCats[i].alive) {
            arrayOfCats[i].draw(ctx);
            //ctx.drawImage(arrayOfCats[i].img, arrayOfCats[i].x, arrayOfCats[i].y);
        }
    }

    ctx.restore();
}

/** Uppdaterar läget på fågeln */
function update(deltaTime) {
    //birdEntity move
    birdEntity.move(deltaTime);
    //reset dx,dy när ingen tangent trycks
    birdEntity.setDx(0);
    birdEntity.setDy(0);

    if (birdEntity.alive === true) {
        birdEntity.move(deltaTime);

        if (birdEntity.x > 0) {
            if ('ArrowLeft' in keysDown) { // Vänster    
                // birdEntity.birdDx = -10; 
                birdEntity.setDx(-1);


            }
        }
        if (birdEntity.x < canvas.width - birdEntity.img.width) {
            if ('ArrowRight' in keysDown) { // Höger
                birdEntity.setDx(1);

            }
        }
        if (birdEntity.y > 0) {
            if ('ArrowUp' in keysDown) { // Upp

                birdEntity.setDy(-1);

            }
        }
        if (birdEntity.y < canvas.height - birdEntity.img.height) {
            if ('ArrowDown' in keysDown) { // Ner
                birdEntity.setDy(1);
            }
        }
      
    }

    //karam: vet inte om detta behövs
    for (let m = 0; m < arrayOfCats; m++) {
        //catEntity Move 
        if (arrayOfCats[m].alive === true) {
            if (arrayOfCats[m].x > 0) {
                if ('a' in keysDown) { // Vänster     
                    arrayOfCats[m].x -= 5;
                }
            }

            if (arrayOfCats[m].x < canvas.width - arrayOfCats[m].img.width) {
                if ('d' in keysDown) { // Höger
                    arrayOfCats[m].x += 5;
                }
            }

            if (arrayOfCats[m].y > 0) {
                if ('w' in keysDown) { // Upp
                    arrayOfCats[m].y -= 5;
                }
            }

            if (arrayOfCats[m].y < canvas.height - arrayOfCats[m].img.height) {
                if ('s' in keysDown) { // Ner
                    arrayOfCats[m].y += 5;
                }
            }

           

        }

      

    }
    for (let i = 0; i < 5; i++) { //NY
        if (arrayOfCats[i].alive) {
            if (checkHit(birdEntity, arrayOfCats[i])) {
                arrayOfCats[i].alive == false;

                hitSound.load();
                hitSound.play();
                
            }
            arrayOfCats[i].y += arrayOfCats[i].speed * deltaTime;
        }
    }

    /*
     if (birdEntity.alive === false) {
        delete birdEntity;
        //ändra så att Entitiys sparas i en array och deletas/ tas bort, om alive == false;
        //   console.log("dead");
    }
    if (catEntity.alive === false) {
        delete catEntity;
        //ändra så att Entitiys sparas i en array och deletas/ tas bort, om alive == false;
        //   console.log("dead");
    }*/



    if ('r' in keysDown) { // test
        console.log("restarting games");
        gamePageRestart();
    }

}

function getXPos() {
    return xPos;
}
function getYPos() {
    return yPos;
}

function checkHit(spriteOne, spriteTwo) {
    if (spriteOne.alive == true && spriteTwo.alive == true) {
        if (spriteTwo.x <= (spriteOne.x + spriteOne.img.width) &&
            spriteOne.x <= (spriteTwo.x + spriteTwo.img.width)
            && spriteTwo.y <= (spriteOne.y + spriteOne.img.height) &&
            spriteOne.y <= (spriteTwo.y + spriteTwo.img.height)) {
            console.log("hit");
            //    spriteOne.alive = false;
         //   spriteTwo.alive = false;

             spriteTwo.setImage(deadCatImage);       //kan funka som exemepl på animation
                    

            console.log(spriteOne.alive);
            console.log(spriteTwo.alive);
            console.log("birdEntity and catEntity are dead and cant move")
            return true;
        } else
            return false;
    }
}

function gamePageRestart() {
    window.location.reload();
}



window.onload = init;

