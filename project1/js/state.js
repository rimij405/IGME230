/*
    State.js
    A state managing class.
*/
class State extends PIXI.Container{
    constructor(renderer, stateName) {
        super();
        this.renderer = renderer;
        this.stateName = stateName;
        if(this.stateName === undefined) { this.stateName = "State"; }
        this.isActive = false;
        this.nextState = undefined;
        
        this.update = function(delta) {
            if(this.debug) {
                console.log(`Updating ${this.stateName} state. [${delta}]`);
            }
        }
        
        this.setActive = function(value) {
            this.isActive = value;
        }
        
        this.setNextState = function(value) {
            this.nextState = value;
        }
     
        // Calculate the center position.
        this.center = {
            x: this.renderer.width * 0.5,
            y: this.renderer.height * 0.5
        }
        
        this.debug = true;
    }    
    
    makeActive(){
        this.setActive(true);
    }
    
    makeInactive() {
        this.setActive(false);
    }
    
    toggleActiveState() {
        this.setActive(!this.isActive);
    }
    
    isState(value)
    {
        return (this.nextState === value)
    }
    
    switchToMainMenu()
    {
        this.setNextState(States.main);
    }
    
    switchToGameOver()
    {
        this.setNextState(States.scores);
    }

    switchToControls()
    {
        this.setNextState(States.controls);
    }
    
    switchToGame()
    {
        this.setNextState(States.game);
    }
}
                

const Styles = {
    title: undefined,
    button: undefined,
    label: undefined
}

const States = {
    main: 'Main Menu',
    scores: 'Game Over',
    controls: 'Controls',
    game: 'Game'
}