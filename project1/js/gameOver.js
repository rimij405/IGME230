/*
    GameOver.js
    The game's score screen.
*/
class GameOver extends State {
    constructor(renderer) {
        super(renderer, States.scores);
        this.debug = false;
    }
    
    create() {        
        // Show the top three scores.
        this.labels = [];
                        
        // Create the title.
        this.title = new Label(this.center.x - (this.center.x * 0.55), 75, 'The Top Three', Styles.title);
        this.addChild(this.title);
        
        this.button = new Button(this.renderer.width - 150, this.renderer.height - 70, 150, 55);
        this.button.setText("Back", Styles.button);
        this.addChild(this.button);
        
        let size = 16;
        
        Styles.label = new PIXI.TextStyle({
            fontFamily: 'Verdana',
            fontSize: size,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#caab33'],
            stroke: '#212121',
            strokeThickness: 6,
            wordWrap: true,
            wordWrapWidth: 400,            
        });
        
        let scores = new ScoreManager();
        scores.loadHighScores();
        
        for(let i = 0; i < 3; i++) {
            let temp = new Label(this.center.x - 100, this.center.y - 50 + (size * 2 * i), '', Styles.label);
            if(scores.hasHighScore(i)){
                let score = scores.getHighScore(i);
                temp.setText(`[${score.name}]: ${score.value}`);
            } 
            else 
            {
                temp.setText(`[TBA]: ---`);
            }
            this.labels.push(temp);
            this.addChild(temp);
        }

        this.button.onClicked(() => {
            this.makeInactive();
            this.setNextState(States.main);
        });
        
    }
    
}