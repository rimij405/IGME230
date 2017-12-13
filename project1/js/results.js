class Results extends State {
    constructor(renderer){
        super(renderer, States.game + " Results");
    }
    
    create(index0, index1, message) {
        
        this.labels = {
            left: undefined,
            right: undefined,
            caption: undefined,
            add: function(func) { 
                func(this.left);
                func(this.right);
                func(this.caption);
            }
        }
        
        // Add the buttons.
        this.labels.left = new PIXI.Sprite.fromImage(`media/sprites/${choices.get(index0)}.png`);
        this.labels.right = new PIXI.Sprite.fromImage(`media/sprites/${choices.get(index1)}.png`);
        this.labels.caption = new Label(this.center.x, this.renderer.height - 10, message, Styles.label);        
        this.labels.add(this.addChild);
        
        // Add the buttons.
        this.buttons.quit = new Button(this.renderer.width - 150, this.renderer.height - 70, 150, 55);
        this.buttons.quit.setText("Quit", Styles.button);
        this.addChild(this.buttons.quit);
        
        // Add behavior.
        this.buttons.quit.onClicked(() => {
            this.makeInactive();
            this.setNextState(States.game);
        });        
        
    }
    
}