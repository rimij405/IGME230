class Round extends State {
    constructor(renderer, bestOf){
        super(renderer, States.game + " Round");
        
        this.player = new Player();
        this.computer = new CPU();
        
        this.displayResults = false;
        
        this.data = {
            text: {
                current: undefined,
                player: "You win!",
                computer: "You lost!",
                tie: "It's a tie!"
            },
            rounds: {
                current: 0,
                maximum: bestOf,
                end: function() { return (this.current >= this.maximum); },
                increment: function() { 
                    this.current++;
                }
            }            
        };
        
        this.results = {
            victor: undefined, // Will contain winning competitor.
        };
        
        this.selected = undefined;
        
        this.update = function(delta) {
            
            
            this.displayResults = (this.selected !== undefined);
            
            console.log("Display Results: " + this.displayResults);
            
            if(this.displayResults) {
                if(this.once === undefined){
                    this.once = false;
                }
                
                // Log selection.
                this.player.choice = new Choice(this.selected);
                this.nextRound();
                
                // Check if game is over.
                if(this.isEnd()) 
                {   
                    if(this.player.score === this.computer.score) {
                        this.data.text.current = this.data.text.tie;
                    }else {
                        if(this.getWinner().id === 0){
                            this.data.text.current = this.data.text.player;
                        } else if(this.getWinner().id === 1) 
                        {
                            this.data.text.current = this.data.text.computer;
                        }      
                    }
                }
            } 
            else
            {
                this.removeChild(this.resultButtons.player);
                this.removeChild(this.resultButtons.computer);
                this.removeChild(this.resultButtons.continue);
                
                // Check buttons for a selection.
                for(let i = 0; i < this.buttons.length; i++){
                    this.buttons[i].isActive = true && this.isActive;
                    this.addChild(this.buttons[i]);
                    if(this.buttons[i].selected){
                        this.selected = this.buttons[i].name;
                    }                    
                    this.buttons[i].selected = false;
                }
                this.once = undefined;
            }         
            
        }
    }
    
    // 
    
    // Get the winner from the round.
    nextRound() {
        
        if(!this.once){
            this.once = true;

            // Remove selection from all buttons.
            for(let i = 0; i < this.buttons.length; i++){
                this.buttons[i].isActive = false;
                this.removeChild(this.buttons[i]);
                this.buttons[i].selected = false;
            }                

            // Increment the round counter.
            this.data.rounds.increment();

            // Get the choice from the computer.
            this.computer.generateRandomChoice();

            console.log("Your opponent played: " + this.computer.choice.name);
            if(this.player.choice.greaterThan(this.computer.choice)){
                this.player.incrementScore();
            } 
            else
            {
                this.computer.incrementScore();
            }    
                                
            // Add the buttons.    
            this.resultButtons.continue = new Button(this.renderer.width - 150, this.renderer.height - 70, 150, 55);
            this.resultButtons.continue.setText("Continue", Styles.button);

            // Add behavior.
            this.resultButtons.continue.onClicked(() => {
                this.displayResults = false;
                this.selected = undefined;
                this.once = undefined;
                
                this.removeChild(this.resultButtons.player);
                this.removeChild(this.resultButtons.computer);
                this.removeChild(this.resultButtons.continue);
            });

            // Set up the buttons.
            this.resultButtons.player = PIXI.Sprite.fromImage(`media/sprites/${this.player.choice.name}.png`);
            this.resultButtons.computer = PIXI.Sprite.fromImage(`media/sprites/${this.computer.choice.name}.png`);
           
            this.resultButtons.player.rotation = 0.2 * Math.PI;
            this.resultButtons.player.scale.x *= 0.25;
            this.resultButtons.player.scale.y *= 0.25;
                        
            this.resultButtons.computer.rotation = 0.2 * Math.PI;
            this.resultButtons.computer.scale.x *= 0.25;
            this.resultButtons.computer.scale.y *= 0.25;
            
            this.resultButtons.player.x = 100;
            this.resultButtons.computer.x = 100 + (1 * this.renderer.width / 2);
            
            let tints = {
                win: 0x21FF00,
                lose: 0xFF0021,
                draw: 0xCCCC00
            };
            
            console.log(`${this.player.choice.name} || ${this.computer.choice.name}`);
            
            if(this.player.choice.greaterThan(this.computer.choice)){
                this.resultButtons.player.tint = tints.win;
                this.resultButtons.computer.tint = tints.lose;
            }
            else if(this.player.choice.sameAs(this.computer.choice))
            {                
                this.resultButtons.player.tint = tints.draw;
                this.resultButtons.computer.tint = tints.draw;
            }
            else
            {
                this.resultButtons.player.tint = tints.lose;
                this.resultButtons.computer.tint = tints.win;
            }
                        
            this.resultButtons.player.y = this.center.y - 100;
            this.resultButtons.computer.y = this.center.y - 100;
            
            this.addChild(this.resultButtons.player);
            this.addChild(this.resultButtons.computer);
            this.addChild(this.resultButtons.continue);
            
            
        }
    }
    
    // Get the winner from the game.
    getWinner() 
    {
        let winner = this.player;
        if(winner.score < this.computer.score) {
            winner = this.computer;
        }
        this.results.victor = winner;
        return this.results.victor;
    }
    
    // Check if the game is over.
    isEnd() {
        return this.data.rounds.end();   
    }
    
    // Resets the entire game.
    reset() {
        this.data = {
            text: {
                player: "You win!",
                computer: "You lost!",
                tie: "It's a tie!"
            },
            rounds: {
                current: 0,
            }            
        };
        
        this.player = new Player();
        this.computer = new Computer();
        
        this.results = {
            victor: undefined, // Will contain winning competitor.
        };
    }
    
    // Creates the buttons to click.
    create(){
        
        this.buttons = [];
        this.resultButtons = {
            player: undefined,
            computer: undefined
        }
        
        for(let i = 0; i < 3; i++){        
            let button = PIXI.Sprite.fromImage(`media/sprites/${choices.get(i)}.png`);
            
            button.x = 100 + (i * this.renderer.width / 3);
            button.y = this.center.y;
            button.rotation = 0.2 * Math.PI;
            button.scale.x *= 0.25;
            button.scale.y *= 0.25;
            
            button.name = choices.get(i);
            button.status = undefined;
            
            button.anchor.set(0.5);
            button.interactive = true;
            button.buttonMode = true;
            button.selected = false;
            button.on('pointerup', (e) => {
                console.log(`Clicked ${e.target.name}.`);
                e.target.selected = true; 
            });
            button.on('pointerover', (e) => {
                e.target.tint = Math.random() * 0xFFFFFF;
                e.target.scale.x *= 1.10;
                e.target.scale.y *= 1.10;
            });
            button.on('pointerout', (e) => {
                e.currentTarget.tint = 0xFFFFFF;
                e.currentTarget.scale.x *= 0.90;
                e.currentTarget.scale.y *= 0.90;
            });
            this.buttons.push(button);
            this.addChild(button);
        }
    }
    
}

/*
class GameData {
    constructor(rounds){
        // Current round number.
        this.round = 1
        
        // Best of this many rounds.
        this.rounds = rounds;
        
        // Player scores.
        this.scores = {
            player: 0,
            computer: 0
        }
                
        // Possible choices.
        this.allChoices = {
            list: Choices.collection(),
            player: undefined,
            computer: undefined
        }
    }
    
    // Generates the computer's decision.
    generateDecision() {
        let randomValue = Math.floor(Math.random() * this.allChoices.list.length);
        return this.allChoices.list[randomValue];
    }
    
    playRound(playerDecision) {
        // Get the CPU's decision.
        this.allChoices.player = playerDecision.toLowerCase();
        this.allChoices.computer = this.generateDecision();
        
        let p = this.allChoices.player;
        let c = this.allChoices.computer;
        
        let result = undefined;
        
        // Decide the winner.
        // Check if there is a tie.
        if(p === c) {
            result = Messages.tie;            
        } 
        else {
            if(p === Choices.rock)
            {
                if(c === Choices.paper)
                {
                    result = Messages.computerWins;
                    this.scores.computer++;
                }
                else if(c === Choices.scissors)
                {
                    result = Messages.playerWins;
                    this.scores.player++;
                }            
            }
            else if(p === Choices.paper)
            {
                if(c === Choices.rock)
                {
                    result = Messages.playerWins;
                    this.scores.player++;
                }
                else if(c === Choices.scissors)
                {
                    result = Messages.computerWins;
                    this.scores.computer++;
                } 
            }
            else if(p === Choices.scissors)
            {
                if(c === Choices.paper)
                {
                    result = Messages.playerWins;
                    this.scores.player++;
                }
                else if(c === Choices.rock)
                {
                    result = Messages.computerWins;
                    this.scores.computer++;
                } 
            }
            
            // Increment the round counter, when not a tie.
            this.round++;
        }
        
        // Return the result of the round.
        return result;
    }
    
    getWinner() {
        if(this.scores.player > this.scores.computer) 
        {
            return 'Player';            
        }
        else 
        {
            return 'Computer';
        }
    }
    
    resolvedGame() {
        // Check number of rounds that have been played.
        return (this.round > this.rounds);   
    }
    
    reset() {
        this.round = 1;
        this.scores.player = 0;
        this.scores.computer = 0;
    }
    
}()*/