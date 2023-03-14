// Laddar in bilder till spelet
let birdImg = new Image();
birdImg.src = "images/bird.png";

let catImage = new Image();
catImage.src = "images/cat.png";

// Position
let xPos = 260, yPos = 220, speed = 20;

//importera filen, fixa felet  -Karam
let birdEntity, catEntity;

//Lagrar tangent-händelser
let keysDown = {};
let ctx;
let canvas;
let widthOfCanvas;

let arrayOfCats;
/** Körs då sidan är laddad */
function init() {
    birdEntity = new Sprite(xPos, yPos + 200, birdImg, speed, true);


    arrayOfCats = new Array();
    for (let j = 0; j < 6; j++) {
        catEntity = new Sprite(xPos + 100 * j, yPos, catImage, speed, true);
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
    update();
    render();

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
function update() {
    //birdEntity move

    if (birdEntity.alive === true) {
        if (birdEntity.x > 0) {
            if ('ArrowLeft' in keysDown) { // Vänster     
                birdEntity.x -= 5;
            }
        }
        if (birdEntity.x < canvas.width - birdEntity.img.width) {
            if ('ArrowRight' in keysDown) { // Höger
                birdEntity.x += 5;
            }
        }
        if (birdEntity.y > 0) {
            if ('ArrowUp' in keysDown) { // Upp
                birdEntity.y -= 5;
            }
        }
        if (birdEntity.y < canvas.height - birdEntity.img.height) {
            if ('ArrowDown' in keysDown) { // Ner
                birdEntity.y += 5;
            }
        }
        if ('k' in keysDown) { // Ner
            console.log("clear");
        }
    }


    
    //catEntity Move 
    if (catEntity.alive === true) {
        if (catEntity.x > 0) {
            if ('a' in keysDown) { // Vänster     
                catEntity.x -= 5;
            }
        }

        if (catEntity.x < canvas.width - catEntity.img.width) {
            if ('d' in keysDown) { // Höger
                catEntity.x += 5;
            }
        }

        if (catEntity.y > 0) {
            if ('w' in keysDown) { // Upp
                catEntity.y -= 5;
            }
        }

        if (catEntity.y < canvas.height - catEntity.img.height) {
            if ('s' in keysDown) { // Ner
                catEntity.y += 5;
            }
        }



        if ('k' in keysDown) { // test
            console.log("clear");
        }


    }



    //checkHit(birdEntity, catEntity);


    for (let i = 0; i < 5; i++) { //NY
        if (arrayOfCats[i].alive) {
            if (checkHit(birdEntity, arrayOfCats[i])) {
                arrayOfCats[i].alive = false;
            }

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
            spriteOne.alive = false;
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

