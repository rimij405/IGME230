/*
    Button.js
    Button class.
*/

// Reference: https://sprite-storm.com/tutorial/pixi-tutorial/dynamic-button-class-pixi-js/
class Button extends PIXI.Sprite {
    constructor(x, y, width, height){
        super();
        
        this.texture = undefined;
        this.onClickFunction = undefined;
        
        this.createButton(x, y, width, height);
    }
    
    createButton(x, y, width, height){
        // Create the texture.
        let graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF, 1);
        graphics.drawRoundedRect(0, 0, width, height, height / 5);
        graphics.endFill();
        this.texture = graphics.generateCanvasTexture();
        
        // Position (and anchor) the button.
        this.x = x;
        this.y = y;
        this.anchor.set(0.5);
        
        // Create the text for the object.
        this.text = new PIXI.Text("", 'arial');
        this.text.anchor = new PIXI.Point(0.5, 0.5);
        this.addChild(this.text);
        
        // Set interactivity to true.
        this.interactive = true;
        this.buttonMode = true;
        
        // Set up pointer events.
        this.on("pointerdown", () => {
            this.onDown();
        }, this);

        this.on("pointerup", () => {
            this.onUp();
        }, this);

        this.on("pointerover", () => {
            this.onHover();
        }, this);

        this.on("pointerout", () => {
            this.onOut();
        }, this);
    }
    
    setText(message, textStyle){
        this.text.text = message;
        this.text.style = textStyle;
    }
    
    onDown() {
        // console.log('Clicked');
        this.y += 5;
        this.tint = 0xffffff;
    }

    onUp() {
        // console.log('onup');
        if(this.onClickFunction != null) { this.onClicked(); }
        this.y -= 5;
        this.tint = 0xF8A9F9;
    }

    onHover() {
        // console.log('On Hover');
        this.tint = 0xF8A9F9;
        this.scale.x = 1.2;
        this.scale.y = 1.2;
    }

    onOut() {
        // console.log('On Out');
        this.tint = 0xffffff;
        this.scale.x = 1;
        this.scale.y = 1;
    }
    
    onClicked(func){
        if(func == null)
        {
            this.onClickFunction();
        }
        else 
        {
            this.onClickFunction = func;
        }
    }
    
}