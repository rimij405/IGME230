/*
    Label.js
    Useful for displaying text on the screen.
*/
class Label extends PIXI.Text {
    constructor(x, y, message, style){
        super(message, style);        
        this.x = x;
        this.y = y;
    }
    
    // Set the display text for this label.
    setText(message){
        this.text = message;
    }
    
    // Rotation is set in radians.
    setRotation(value) {
        this.rotation = value;
    }
}