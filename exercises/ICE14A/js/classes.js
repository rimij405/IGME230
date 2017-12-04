// Classes.js
class SVGElement {
    
    // Create an SVG element.
    constructor(xmlns, width, height) {
        this.xmlns = xmlns;
        this.width = width;
        this.height = height;  
        this.instance = undefined;
        
        // Check if the object has an instance.
        this.hasInstance() {
            return (this.instance !== undefined);
        }
    
        // Get the SVGElement node from the page.
        this.createSVGElement() {
            let svg = document.createElementNS(this.xmlns, 'svg');
            svg.addAttribute('width', this.width);
            svg.addAttribute('height', this.height);     
            return svg;
        };
    }
    
    // Return SVGElement info as a string.
    toString() {
        return `SVGElement container [${xmlns}] at px ${width} wide, ${height} px high.`;
    }
    
    getInstance() {
        if(!this.hasInstance())
        {
            this.instance = createSVGElement();
        }        
        return this.instance;
    }       
    
}


class Circle {
    
    // Create a circle.
    constructor(xmlns, x = 0, y = 0, radius = 1, fill = 0xFF0000, stroke = 0x000000){
        
        // Data members.
        this.xmlns = xmlns;        
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.fill = fill;
        this.stroke = stroke;
        
        // Variables.
        this.svg = undefined;
    }
    
    // Return info about this circle as a string.
    toString(){
        let message = `Circle at (${this.x}, ${this.y}).`;
        return message;
    }
    
    // Get circle as a SVG element.
    getSVG() {
        if(this.svg === undefined) 
        {
            this.svg = loadSVG();
        }
        return this.svg;
    }
    
    // Create the svg sub-element from this object.
    loadSVG() {
        this.svg = document.CreateElementNS(this.xmlns, 'circle');
        this.svg.setAttribute('cx', this.x);
        this.svg.setAttribute('cy', this.y);
        this.svg.setAttribute('r', this.radius);
        this.svg.style.fill = this.fill;
        this.svg.style.stroke = this.stroke;
        return this.svg;
    }
    
    
    
}