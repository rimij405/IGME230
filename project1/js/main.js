"use strict;"

// https://opengameart.org/content/spaceship-13

// http://proclive.io/tag/pixi/
// http://proclive.io/pixi-js-drag-drop/
// http://proclive.io/shooting-tutorial/
// https://github.com/kittykatattack/learningPixi#tileset
// http://pixijs.io/examples/#/basics/basic.js
// http://www.goodboydigital.com/pixi-js-v2-fastest-2d-webgl-renderer/
// https://github.com/kittykatattack/learningPixi#introduction
// https://github.com/kittykatattack/learningPixi
// https://github.com/pixijs/pixi.js
// http://www.goodboydigital.com/pixi-js-text/
// http://pixijs.io/examples/#/basics/basic.js
// https://codepen.io/ulx/pen/NpqmWq
// http://www.html5gamedevs.com/topic/2834-set-cursor-style/

window.addEventListener('load', init);

function init() {
    let app = new PIXI.Application(600, 480, {backgroundColor: 0x1099bb});
    let container = document.querySelector("#project > .content");
    let isLoaded = false;
    let ship = undefined;
    
    // Add the application view to the content area.
    container.appendChild(app.view);
    PIXI.loader
        .add('media/sprites/ship00.png')
        .add('media/sprites/ship01.png')
        .add('media/sprites/ship02.png')
        .add('media/sprites/ship03.png')
        .load(loadAssets);
    
    function loadAssets() {
        let frames = []; // Array to store textures.
        
        // Make the sprite textures.
        for(let i = 0; i < 4; i++) {
            let textureURL = `media/sprites/ship0${i}.png`;            
            console.log(`Loading '${textureURL}'...`);
            let texture = PIXI.Texture.fromImage(textureURL);
            frames.push(texture);
        }
        
        // Create the animation from the frames.
        let anim = new PIXI.extras.AnimatedSprite(frames);
        
        // Place the animation just as if it were a normal sprite.
        ship = anim;       
        
        // Center the anchor point.
        ship.anchor.set(0.5);

        // Move to center of the screen.
        ship.x = app.renderer.width / 2;
        ship.y = app.renderer.height / 2;
        ship.animationSpeed = 0.05;
        ship.play();

        // Set loaded flag.
        isLoaded = true;
        
        // Add it to the stage.
        app.stage.addChild(ship);
    }
        
    // Rotate.
    app.ticker.add(function(delta){
        if(isLoaded){
            // ship.rotation += 0.01 * delta;
        }
    });    
}

/*
function setup() {
    
    // Create a texture from the tileset.
    let texture = TextureCache["media/sprites/spritesheet.png"];
    
    // Create the rectangle object that defines size and sub-image of the extraction area.
    let rectangle = new Rectangle(0, 0, 192, 126);
    
    // Tell the texture to use that rectangular section.
    texture.frame = rectangle;
    
    // Create a sprite from the texture.
    let ship = new Sprite(texture);
    
    // Position the ship on the canvas.
    ship.x = 32;
    ship.y = 32;
    
    // Add the rocket to the stage.
    app.stage.addChild(ship);
    
    // Render the stage.
    
    
}
*/