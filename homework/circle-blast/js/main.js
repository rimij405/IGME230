// We will use `strict mode`, which helps us by having the browser catch many common JS mistakes
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
"use strict";
const app = new PIXI.Application(600,600);
document.body.appendChild(app.view);

// constants
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;	

// pre-load the images
PIXI.loader.
add(["images/Spaceship.png","images/explosions.png"]).
on("progress",e=>{console.log(`progress=${e.progress}`)}).
load(setup);

// aliases
let stage;

// game variables
let startScene;
let gameScene,ship,scoreLabel,lifeLabel,shootSound,hitSound,fireballSound,gameOverScoreLabel;
let gameOverScene;

let circles = [];
let bullets = [];
let aliens = [];
let explosions = [];
let explosionTextures;
let score = 0;
let life = 100;
let levelNum = 1;
let paused = true;

const Font = {
    name: 'Futura',
    color: 0xFFFFFF,
    stroke: 0xFF0000,
    strokeWeight: 6,
    italic: 'italic'
};

function startGame() {
    startScene.visible = false;
    gameOverScene.visible = false;
    gameScene.visible = true;
    
    levelNum = 1;
    score = 0;
    life = 100;
    increaseScoreBy(0);
    decreaseLifeBy(0);
    ship.x = 300;
    ship.y = 550;
    loadLevel();    
}

function createStartSceneUI() 
{
    // Collection for adding elements to scenes.
    const SceneUI = {
        title: undefined,
        subtitle: undefined,
        button: undefined,
        elements: function() {
            let allElements = [];
            allElements.push(this.title);
            allElements.push(this.subtitle);
            allElements.push(this.button);
            return allElements;
        }
    }
        
    // Label #1
    SceneUI.title = new PIXI.Text("Circle Blast!");
    SceneUI.title.style = new PIXI.TextStyle({
        fill: Font.color,
        fontSize: 96,
        fontFamily: Font.name,
        stroke: Font.stroke,
        strokeThickness: Font.strokeWeight
    });
    SceneUI.title.x = 50;
    SceneUI.title.y = 120;
    
    // Label #2
    SceneUI.subtitle = new PIXI.Text("R U worthy..?");
    SceneUI.subtitle.style = new PIXI.TextStyle({
        fill: Font.color,
        fontSize: 32,
        fontFamily: Font.name,
        fontStyle: Font.italic,
        stroke: Font.stroke,
        strokeThickness: Font.strokeWeight
    });
    SceneUI.subtitle.x = 185;
    SceneUI.subtitle.y = 300;
        
    // Create the button style.
    let buttonStyle = new PIXI.TextStyle({
        fill: 0xFF0000,
        fontSize: 48,
        fontFamily: Font.name
    });
    
    // Create the start button.
    SceneUI.button = new PIXI.Text("Enter, ... if you dare!");
    SceneUI.button.style = buttonStyle;
    SceneUI.button.interactive = true;
    SceneUI.button.buttonMode = true;
    SceneUI.button.on('pointerup', startGame);
    SceneUI.button.on('pointerover', e=>e.target.alpha = 0.7);
    SceneUI.button.on('pointerout', e=>e.currentTarget.alpha = 1.0);
    SceneUI.button.x = 80;
    SceneUI.button.y = sceneHeight - 100;
        
    // Add all elements to the start scene.
    let allElements = SceneUI.elements();
    for(let i = 0; i < allElements.length; i++)
    {
        startScene.addChild(allElements[i]);
    }
}

function createGameSceneUI() {
    
    // Collection for adding elements to scenes.
    const SceneUI = {
        score: undefined,
        life: undefined,
        elements: function() {
            let allElements = [];          
            scoreLabel = this.score;
            lifeLabel = this.life;    
            allElements.push(scoreLabel);
            allElements.push(lifeLabel);          
            return allElements;
        }
    }
        
    // Create the text style.
    let textStyle = new PIXI.TextStyle({
        fill: Font.color,
        fontSize: 18,
        fontFamily: Font.name,
        stroke: Font.stroke,
        strokeThickness: 4
    });
    
    // Label #1
    SceneUI.score = new PIXI.Text();
    SceneUI.score.style = textStyle;
    SceneUI.score.x = 5;
    SceneUI.score.y = 5;
    
    // Label #2
    SceneUI.life = new PIXI.Text();
    SceneUI.life.style = textStyle;
    SceneUI.life.x = 5;
    SceneUI.life.y = 26;
        
    // Add all elements to the scene.
    let allElements = SceneUI.elements();
    for(let i = 0; i < allElements.length; i++)
    {
        gameScene.addChild(allElements[i]);
    }
    
    increaseScoreBy(0);
    decreaseLifeBy(0);
}

function createGameOverUI() {    
    // Collection for adding elements to scenes.
    const SceneUI = {
        label: undefined,
        score: undefined,
        button: undefined,
        elements: function() {
            let allElements = [];       
            allElements.push(this.label);
            gameOverScoreLabel = this.score;
            allElements.push(gameOverScoreLabel);
            allElements.push(this.button);
            return allElements;
        }
    }
    
    // Create the text style.
    let textStyle = new PIXI.TextStyle({
        fill: Font.color,
        fontSize: 64,
        fontFamily: Font.name,
        stroke: Font.stroke,
        strokeThickness: Font.strokeWeight
    });
    
    // Create the label.
    SceneUI.label = new PIXI.Text("Game Over!\n     :-O");
    SceneUI.label.style = textStyle;
    SceneUI.label.x = 100;
    SceneUI.label.y = sceneHeight / 2 - 160;
    
    // Create the label.
    SceneUI.score = new PIXI.Text();
    SceneUI.score.style = textStyle;
    SceneUI.score.x = 50;
    SceneUI.score.y = sceneHeight / 2 + 20;
    
    // Create the button style.
    let buttonStyle = new PIXI.TextStyle({
        fill: 0xFF0000,
        fontSize: 48,
        fontFamily: Font.name
    });
    
    // Create the button.
    SceneUI.button = new PIXI.Text("Play Again?");
    SceneUI.button.style = buttonStyle;
    SceneUI.button.interactive = true;
    SceneUI.button.buttonMode = true;
    SceneUI.button.on('pointerup', startGame); // startGame is a function reference
    SceneUI.button.on('pointerover', e=>e.target.alpha = 0.7); // concise arrow function with no brackets
    SceneUI.button.on('pointerout', e=>e.currentTarget.alpha = 1.0); // ditto
    SceneUI.button.x = 150;
    SceneUI.button.y = sceneHeight - 100;
            
    // Add all elements to the scene.
    let allElements = SceneUI.elements();
    for(let i = 0; i < allElements.length; i++)
    {
        gameOverScene.addChild(allElements[i]);
    }    
}

function increaseScoreBy(value)
{
    if(value !== undefined) {
        score += value;
        score = parseInt(score);
        scoreLabel.text = `Score: ${score}`;        
    }
}

function decreaseLifeBy(value)
{
    if(value !== undefined) {
        life -= value;
        life = parseInt(life);
        lifeLabel.text = `Life: ${life}%`;        
    }
}

function createLabelsAndButtons() 
{    
    // Create the UI for the start scene.
    createStartSceneUI();
    
    // Create the UI for the game scene.
    createGameSceneUI();
    
    // Create the UI for the game over scene.
    createGameOverUI();
}

function loadSpriteSheet() {
    let spriteSheet = PIXI.BaseTexture.fromImage("images/explosions.png");
    let width = 64;
    let height = 64;
    let numFrames = 16;
    let textures = [];
    for (let i = 0; i < numFrames; i++)
    {
        let frame = new PIXI.Texture(spriteSheet, new PIXI.Rectangle(i * width, 64, width, height));
        textures.push(frame);
    }
    return textures;
}

function createCircles(numCircles) {
    for(let i = 0; i < numCircles; i++) {
        let c = new Circle(10, 0xFFFF00);
        c.x = Math.random() * (sceneWidth - 50) + 25;
        c.y = Math.random() * (sceneHeight - 400) + 25;
        circles.push(c);
        gameScene.addChild(c);
    }
}

function createExplosion(x, y, fw, fh)
{
    let halfW = fw / 2;
    let halfH = fh / 2;
    let expl = new PIXI.extras.AnimatedSprite(explosionTextures);
    expl.x = x - halfW;
    expl.y = y - halfH;
    
    expl.animationSpeed = 1/7;
    expl.loop = false;
    
    expl.onComplete = e=>gameScene.removeChild(expl);
    explosions.push(expl);
    gameScene.addChild(expl);
    expl.play();
}

function fireBullet(e)
{
    if(!gameScene.visible || paused) return;
    
    let generatedBullets = [];
    let b1, b2, b3;
    let spread = 10;
    b1 = new Bullet(0xFFFFFF, ship.x, ship.y);
    b2 = new Bullet(0xFFFFFF, ship.x + spread, ship.y);
    b3 = new Bullet(0xFFFFFF, ship.x - spread, ship.y);
    generatedBullets.push(b1);
    
    if(score >= 5){
        // Push the triple bullet.
        generatedBullets.push(b2);
        generatedBullets.push(b3);
    }
    
    for(let i = 0; i < generatedBullets.length; i++) {
        bullets.push(generatedBullets[i]);
        gameScene.addChild(generatedBullets[i]);
    }
    
    shootSound.play();
}

function loadLevel() {
    createCircles(levelNum * 5);
    paused = false;
}

function setup() {
	stage = app.stage;
    
	// #1 - Create the `start` scene
	startScene = new PIXI.Container();
    startScene.visible = true;
    stage.addChild(startScene);
    
	// #2 - Create the main `game` scene and make it invisible
    gameScene = new PIXI.Container();
    gameScene.visible = false;
    stage.addChild(gameScene);
    
	// #3 - Create the `gameOver` scene and make it invisible
	gameOverScene = new PIXI.Container();
    gameOverScene.visible = false;
    stage.addChild(gameOverScene);
    
	// #4 - Create labels for all 3 scenes
    createLabelsAndButtons();
    
	// #5 - Create ship
    ship = new Ship();
    gameScene.addChild(ship);
	
	// #6 - Load Sounds
	shootSound = new Howl({
        src: ['sounds/shoot.wav']
    });
        
    hitSound = new Howl({
        src: ['sounds/hit.mp3']
    });
        
    fireballSound = new Howl({
        src: ['sounds/fireball.mp3']
    });
    
	// #7 - Load sprite sheet
    explosionTextures = loadSpriteSheet();
    
	// #8 - Start update loop
    app.ticker.add(gameLoop);
	
	// #9 - Start listening for click events on the canvas
	app.view.onclick = fireBullet;
    
	// Now our `startScene` is visible
	// Clicking the button calls startGame()
}

function gameLoop(){
	if (paused) return; // keep this commented out for now
	
	// #1 - Calculate "delta time"
	let dt = 1/app.ticker.FPS;
    if(dt > 1/12) dt = 1/12;
	
	// #2 - Move Ship
	let mousePosition = app.renderer.plugins.interaction.mouse.global;
	let speed = 4.0 * dt;
    
    let dimensions = {
        halfWidth: ship.width / 2,
        halfHeight: ship.height / 2        
    }
    
    ship.position = {
        x: clamp(lerp(ship.x, mousePosition.x, speed), dimensions.halfWidth, sceneWidth - dimensions.halfWidth),
        y: clamp(lerp(ship.y, mousePosition.y, speed), dimensions.halfHeight, sceneHeight - dimensions.halfHeight)
    };      
    
	// #3 - Move Circles
	for (let c of circles)
    {
        c.move(dt);
        if (c.x <= c.radius || c.x >= sceneWidth - c.radius) 
        {
            c.reflectX();
            c.move(dt);
        }
        
        if (c.y <= c.radius || c.y >= sceneHeight - c.radius)
        {
            c.reflectY();
            c.move(dt);
        }
    }
	
	// #4 - Move Bullets
    for (let b of bullets) {
        b.move(dt);
    }
	
	// #5 - Check for Collisions
	for (let c of circles){
        for(let b of bullets)
        {
            if(rectsIntersect(c, b)) {
                fireballSound.play();
                createExplosion(c.x, c.y, 64, 64);
                gameScene.removeChild(c);
                c.isAlive = false;
                gameScene.removeChild(b);
                b.isAlive = false;
                increaseScoreBy(1);
            }  
            
            if (b.y < -10) {
                b.isAlive = false;
            }
        }
        
        if (c.isAlive && rectsIntersect(c, ship))
        {
            hitSound.play();
            gameScene.removeChild(c);
            c.isAlive = false;
            decreaseLifeBy(20);
        }        
    }
	
	// #6 - Now do some clean up
	// Garbage collection.
    bullets = bullets.filter(b=>b.isAlive);
    circles = circles.filter(c=>c.isAlive);
    explosions = explosions.filter(e=>e.playing);
	
	// #7 - Is game over?
	if (life <= 0){
        end();
        return;
    }
	
	// #8 - Load next level
    if (circles.length <= 0) {
        levelNum++;
        loadLevel();
    }
}

function end() {
    paused = true;
    
    // Clear level.
    circles.forEach(c=>gameScene.removeChild(c));
    circles = [];
    
    bullets.forEach(b=>gameScene.removeChild(b));
    bullets = [];
    
    explosions.forEach(e=>gameScene.removeChild(e));
    explosions = [];
    
    let finalScore = parseInt(score);
    gameOverScoreLabel.text = `Your final score: ${finalScore}`;  
    
    gameScene.visible = false;
    gameOverScene.visible = true;
}
