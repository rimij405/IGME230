/*
    Game.js
    Contains game data for the rock, paper, scissors game.
*/
class Game extends State{
    constructor(renderer) {
        super(renderer, States.game);
        this.debug = false;
    }
            
    create(){               
        
        // Create the title.
        this.title = new Label(this.center.x - (this.center.x * 0.8), 75, 'Make a choice, to beat your opponent!', Styles.title);
        this.addChild(this.title);
        
        this.scoreLabel = new Label(100, this.renderer.height - 75, 'Score: 0 to 0', Styles.title);
        this.addChild(this.scoreLabel);
        
        this.buttons = {
            quit: undefined
        }
        
        // Add the buttons.
        this.buttons.quit = new Button(this.renderer.width - 150, this.renderer.height - 70, 150, 55);
        this.buttons.quit.setText("Quit", Styles.button);
        this.addChild(this.buttons.quit);
        
        // Add behavior.
        this.buttons.quit.onClicked(() => {
            this.makeInactive();
            this.setNextState(States.main);
        });
        
        this.scenes = {
            round: undefined,
            results: {
                gamesWon: 0,
                bestOfLevel: 3
            }
        }
        this.score = undefined;
        
        this.update = function(delta) {
            
            if(this.scenes.round.data.text.current === undefined) {
                this.scenes.round.update(delta);
                this.buttons.quit.setText("Quit", Styles.title);
                this.scoreLabel.setText(`Score: ${this.scenes.round.player.score} to ${this.scenes.round.computer.score}`);
            } 
            else
            {
                this.scoreLabel.setText(this.scenes.round.data.text.current);
                
                if(this.score == undefined) {
                    if(this.scenes.round.data.text.current == this.scenes.round.data.text.player){

                        // Save in local storage.
                        let name = undefined;
                        while(name == null) 
                        {
                            name = prompt("Highscore initials?");
                            if(name === undefined) { alert("Please enter a valid name."); }
                        }

                        let scoreManager = new ScoreManager();
                        let score = new Score(name, this.scenes.round.player.score);
                        scoreManager.addNewScore(score);
                    }
                    this.score = true;
                }
                
                this.buttons.quit.setText("Menu", Styles.title);                
            }
        }
        
        this.addChild(this.getRound());   
    }   
    
    getRound() 
    {
        if(this.scenes.round == null || !this.scenes.round.isActive){
            this.scenes.round = new Round(this.renderer, this.scenes.results.bestOfLevel);
            this.scenes.round.isActive = true;
            this.scenes.round.create();
        }
        return this.scenes.round;
    }
}
