/*
    MainMenu.js
    The game's main menu.
*/
class MainMenu extends State{
    constructor(renderer) {
        super(renderer, States.main);
        this.debug = false;
    }
            
    create(){               
        
        // Create the title style.
        Styles.title = new PIXI.TextStyle({
            fontFamily: 'Verdana',
            fontSize: 30,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#caab33'],
            stroke: '#212121',
            strokeThickness: 6,
            wordWrap: true,
            wordWrapWidth: 400,            
        });
        
        // Create the button style.
        Styles.button = new PIXI.TextStyle({
            fontFamily: 'Verdana', // Font Family
            fontSize: 20, // Font Size
            fontStyle: 'italic',// Font Style
            fontWeight: 'bold', // Font Weight
            fill: ['#ffffff', '#F8A9F9'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440
        });
        
        // Create the title.
        this.title = new Label(this.center.x - (this.center.x * 0.6), 75, 'Rock-Paper-Scissors!', Styles.title);
        this.addChild(this.title);
        
        // Create the play game button.
        this.button = new Button(this.center.x, this.center.y + 10, 150, 75);
        this.button.setText("Play!", Styles.button);
        this.addChild(this.button);
        
        // Create the high scores screen button.
        this.scores = new Button(this.center.x, this.center.y + 150, 175, 75);
        this.scores.setText("Highscores!", Styles.button);
        this.addChild(this.scores);
        
        // Add behavior.
        this.button.onClicked(() => {
            console.log("Play game!");
            this.makeInactive();
            this.switchToGame();
        });
        
        this.scores.onClicked(() => {
            console.log("Highscores!");
            this.makeInactive();
            this.switchToGameOver();
        });
    }    
}