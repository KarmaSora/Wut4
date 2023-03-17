// Laddar in bilder till spelet
let birdImg = new Image();
birdImg.src = "images/bird.png";

let catImage = new Image();
catImage.src = "images/cat.png";

// Position
let xPos = 60, yPos = 120, speed = 50;
let birdDx = 0,birdDy = 0;
let catDx = 0,catDy = 0;

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
hitSound.load();


/** Körs då sidan är laddad */
function init() {

    then = Date.now();
    birdEntity = new Sprite(xPos, yPos + 200, birdImg, speed, birdDx,birdDy,  true);


    arrayOfCats = new Array();
    for (let j = 0; j < 6; j++) {
        catEntity = new Sprite(xPos + 100 * j, yPos, catImage, speed,catDx,catDy, true);
        arrayOfCats.push(catEntity);
    }



    console.log("Bird Life status: " + birdEntity.alive);

    console.log("Cat Life status: " + catEntity.alive);



    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    //kan byta document till windows
    document.addEventListener("keydown", keyDown, false);
    document.addEventListener("keyup", keyUp, false);
    //birdEntity = new Sprite(xPos, yPos, birdImg, 20);

    // birdEntity = new Sprite
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

    
    update(deltaTime/1000);
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
            ctx.drawImage(arrayOfCats[i].img, arrayOfCats[i].x, arrayOfCats[i].y);
        }
    }

    ctx.restore();
}

/** Uppdaterar läget på fågeln */
function update(deltaTime) {
    //birdEntity move


    birdEntity.move(deltaTime);


    if (birdEntity.alive === true) {
        if (birdEntity.x > 0) {
            if ('ArrowLeft' in keysDown) { // Vänster     
                birdEntity.x -= birdEntity.speed*deltaTime;

            }
        }
        if (birdEntity.x < canvas.width - birdEntity.img.width) {
            if ('ArrowRight' in keysDown) { // Höger
                birdEntity.x += birdEntity.speed*deltaTime;
            }
        }
        if (birdEntity.y > 0) {
            if ('ArrowUp' in keysDown) { // Upp
                
                birdEntity.y -= birdEntity.speed*deltaTime;
            }
        }
        if (birdEntity.y < canvas.height - birdEntity.img.height) {
            if ('ArrowDown' in keysDown) { // Ner
                birdEntity.y += birdEntity.speed*deltaTime;
            }
        }
        if ('k' in keysDown) { // Ner
            console.log("clear");
        }
    }



    for(let m = 0; m<arrayOfCats; m++){    
    //catEntity Move 
    if (arrayOfCats[m].alive === true) {
        if (arrayOfCats[m].alive.x > 0) {
            if ('a' in keysDown) { // Vänster     
                arrayOfCats[m].alive.x -= 5;
            }
        }

        if (arrayOfCats[m].alive.x < canvas.width - arrayOfCats[m].alive.img.width) {
            if ('d' in keysDown) { // Höger
                arrayOfCats[m].alive.x += 5;
            }
        }

        if (arrayOfCats[m].alive.y > 0) {
            if ('w' in keysDown) { // Upp
                arrayOfCats[m].alive.y -= 5;
            }
        }

        if (arrayOfCats[m].alive.y < canvas.height - arrayOfCats[m].alive.img.height) {
            if ('s' in keysDown) { // Ner
                arrayOfCats[m].alive.y += 5;
            }
        }

        if ('k' in keysDown) { // test
            console.log("clear");
        }

        }
    }
    for (let i = 0; i < 5; i++) { //NY
        if (arrayOfCats[i].alive) {
            if (checkHit(birdEntity, arrayOfCats[i])) {
                arrayOfCats[i].alive = false;

				hitSound.play();
            }
            arrayOfCats[i].y +=  arrayOfCats[i].speed*deltaTime;
        }
    }


   if (birdEntity.alive === false) {
        delete birdEntity;
        //ändra så att Entitiys sparas i en array och deletas/ tas bort, om alive == false;
        //   console.log("dead");
    }
    if (catEntity.alive === false) {
        delete catEntity;
        //ändra så att Entitiys sparas i en array och deletas/ tas bort, om alive == false;
        //   console.log("dead");
    }
 

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
            spriteTwo.alive = false;
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

