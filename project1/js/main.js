"use strict;"

// Tutorials used.
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

const References = {
    canvas: undefined,
    app: undefined,
    ticker: undefined,
    game: undefined,
    states: {
        currentState: undefined,
        main: undefined,
        game: undefined,
        gameover: undefined,
        controls: undefined
    }
}

const Flags = {
    isInitialized: false,
    isRunning: false
};

function log(message, title) {
    if(title != null) { message = title + ": " + message; }
    console.log(message);
}

function init() {
    
    log("Initializing PIXI.js", "init()");
    
    // Canvas reference and dimensions.
    References.canvas = document.querySelector("#project > .content");
    let height = 480;
    let width = 600;
    
    // Create the PIXI renderer.
    References.app = new PIXI.Application(
        width,
        height,
        {
            backgroundColor: 0x1099bb
        }
    );
    
    // Add the view to the canvas.
    References.canvas.appendChild(References.app.view);
    
    // Create the game data object.
    // References.game = new GameData(3);
    
    // Initialize flag set.
    Flags.isInitialized = true;
    
    // Run the main game loop.
    run();
}

function run() {
    if(!Flags.isInitialized) {
        init();        
    }
    
    log("Setting up to run.", "run()");
    
    Flags.isRunning = true;
    References.ticker = new PIXI.ticker.Ticker();
    References.ticker.add(update);
    References.ticker.start();
}

function update(delta){
    if(Flags.isRunning) {
        
        // Determine the current state.
        if(References.states.currentState == null) 
        {
            // If null/undefined, set to main menu.
            References.states.currentState = getMainMenu();
        }
        
        let currState = References.states.currentState;
        currState.update(delta);
                
        if(currState.isActive) 
        {
            References.app.stage.addChild(currState);    
        } 
        else
        {
            References.app.stage.removeChild(currState);
            References.states.currentState = getNextState(currState.nextState);
        }
        
        
        /* console.log(`Running. Best of [${References.game.rounds}] rounds. Round [${References.game.round}]`);
        
        // Choice variable.
        let choice = undefined;
        
        while(choice == null)
        {
            choice = prompt("Rock, paper, or scissors?");  
            if(choice !== 'rock' && choice !== 'paper' && choice !== 'scissors'){
                choice = undefined;
            }            
            if(choice == null) { console.log("Please enter a valid answer."); }
        }
        
        // Play a round of RPS.
        console.log(References.game.playRound(choice));
        
        // If best-of value has been reached, end the game.
        if(References.game.resolvedGame()){    
            // Determine winner.
            console.log("The winner is " + References.game.getWinner() + ".");
            
            // Play again?
            let repeat = prompt("Would you like to play again? [y/n]").toLowerCase();
            
            // Pre-emptively set flag to false.
            Flags.isRunning = false;
            if(repeat === 'y') {
                Flags.isRunning = true;
                References.game.reset();
            }                        
        } */
    }
    else {
        console.log("Is stopping");
        References.ticker.stop();
    }
}

function getNextState(state) {
    if(state === States.main) {
        return getMainMenu();
    } 
    else if(state === States.game) 
    {
        return getGame();    
    } 
    else if(state === States.scores)
    {
        return getGameOver();    
    }
    else if(state === States.controls)
    {
        return null;
    }
}

function getMainMenu() {
    if(References.states.main == null || !References.states.main.isActive) 
    {
        References.states.main = new MainMenu(References.app.renderer);
        References.states.main.create();
        References.states.main.makeActive();
        References.app.stage.addChild(References.states.main);
    }
    return References.states.main;
}


function getGame() {
    if(References.states.game == null  || !References.states.game.isActive) 
    {
        References.states.game = new Game(References.app.renderer);
        References.states.game.create();
        References.states.game.makeActive();
        References.app.stage.addChild(References.states.game);
    }
    return References.states.game;
}

function getGameOver() {
    if(References.states.gameover == null || !References.states.gameover.isActive) 
    {
        References.states.gameover = new GameOver(References.app.renderer);
        References.states.gameover.create();
        References.states.gameover.makeActive();
        References.app.stage.addChild(References.states.gameover);
    }
    return References.states.gameover;
}

/*
function getControls() {
    if(References.states.controls == null) 
    {
        References.states.controls = new Instructions(References.app.renderer);
        References.states.controls.create();
    }
    return References.states.controls;
}*/

/*{ let app = new PIXI.Application(600, 480, {backgroundColor: 0x1099bb});
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
    });   }*/ 

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