// Classes.js
class SVGElement {
    
    // Create an SVG element.
    constructor(xmlns, width, height) {
        this.xmlns = xmlns;
        this.width = width;
        this.height = height;  
        this.instance = undefined;
        
        // Check if the object has an instance.
        this.hasInstance = function() {
            return (this.instance != null);
        }
    
        // Get the SVGElement node from the page.
        this.create = function() {
            let svg = document.createElementNS(this.xmlns, 'svg');
            svg.setAttribute('width', this.width);
            svg.setAttribute('height', this.height);     
            return svg;
        };
    }
    
    // Return SVGElement info as a string.
    toString() {
        return `SVGElement container [${this.xmlns}] at px ${this.width} wide, ${this.height} px high.`;
    }
    
    getInstance() {
        if(!this.hasInstance())
        {
            this.instance = document.querySelector('svg');
        }        
        if(!this.hasInstance())
        {
            this.instance = this.create();
        }        
        return this.instance;
    }   
    
    addElement(element) {
        if(element != null) {
            this.getInstance().appendChild(element);
        }
    }
    
}

// Create a mathematical vector.
class Vector {
    
    // Container for coordinates.
    constructor(x = 0, y = 0) {        
        // new Vector()
        if(!arguments.length)
        {
            this.x = 0;
            this.y = 0;
        }
        
        // new Vector(object)
        if(arguments.length === 1)
        {
            if(x.x != null) {
                this.x = x.x;
            }
            
            if(x.y != null) {
                this.y = x.y;
            }
        }
        
        // new Vector(x, y)
        if(arguments.length >= 2) {
            this.x = x;
            this.y = y;
        }
    }
        
    // Square of the magnitude.
    lengthSquared() {
        return (this.x * this.x) + (this.y * this.y);
    }
    
    // The vector magnitude.
    length() {
        return Math.sqrt(this.lengthSquared());   
    }
    
    // Check if zero.
    isZero() {
        return ((this.x == null) || (this.y == null) || ((this.x === 0) && (this.y === 0)));
    }
        
    // Normalize the current vector.
    normalize() {
        let magnitude = this.length();
        
        if(Math.abs(magnitude) === 0) 
        {
            magnitude = 0.001;
        }
        
        // Make this a unit vector.
        this.divide(magnitude);        
        return this;
    }
    
    // Returns a new unit vector in the same direction as this one.
    normalized() {
        let magnitude = this.length();
        
        if(Math.abs(magnitude) === 0) 
        {
            magnitude = 0.001;
        }
        
        return this.clone().normalize();
    }
    
    // Add two vectors together.
    add(vector) {
        if(vector != null) {
            this.x = this.x + vector.x;
            this.y = this.y + vector.y;
        }
        return this;
    }
    
    subtract(vector) 
    {
        if(vector != null) {
            this.x = this.x - vector.x;
            this.y = this.y - vector.y;
        }
        return this;
    }
    
    multiply(scale)
    {
        if(scale != null)
        {
            this.x = this.x * scale;
            this.y = this.y * scale;
        }
        return this;
    }
    
    divide(scale) 
    {
        return this.multiply(Number(1 / scale));
    }
    
    dot(vector) 
    {
        let dot = 0;
        if(vector != null)
        {
            dot = (this.x * vector.x) + (this.y * vector.y);
        }
        return dot;
    }
    
    setX(value) 
    {
        this.x = value;
        return this;
    }
    
    setY(value)
    {
        this.y = value;
        return this;
    }
    
    copy(vector)
    {
        this.x = vector.x;
        this.y = vector.y;
        return this;
    }
    
    clone()
    {
        let cloneVector = new Vector(this.x, this.y);
        return cloneVector;
    }
    
    // Increase the length of the vector.
    extend(value) 
    {
        if(value != null)
        {        
            let magnitude = this.length() + value;
            if(Math.abs(magnitude) === 0) {
                magnitude = 0.001;
            }   
            this.normalize().multiply(magnitude); 
        }       
        return this;
    }    
    
    // Print vector string.
    toString() {
        return `Vector <${this.x}, ${this.y}> [${this.length()} units]`;
    }
    
    // Clamp the vector based on input length.
    clamp(value) 
    {
        if(value != null)
        {
            if(Math.abs(Number(value)) !== 0 && this.length() > value) {
                this.normalize().multiply(value);
            }
        }
        return this;
    }
    
    // Get a random unit vector.
    random() {
        let x = Math.random();
        let y = Math.random();
        return new Vector(x, y).normalize();
    }
}

class SVGCircle {
    
    // Create a circle.
    constructor(xmlns, x = 0, y = 0, radius = 1, fill = 0xFF0000, stroke = 0x000000){        
        // Data members.
        this.xmlns = xmlns;
        
        // A circle object.
        this.circle = { 
            position: new Vector(x, y),
            radius: radius,
            element: undefined
        };
                
        // A color object.
        this.color = { 
            fill: fill,
            stroke: stroke
        };        
        
        this.create = function () {
            let svg = document.createElementNS(this.xmlns, 'circle');
            // update the circle element.
            svg.setAttribute('cx', this.circle.position.x);
            svg.setAttribute('cy', this.circle.position.y);
            svg.setAttribute('r', this.circle.radius);
            svg.style.fill = this.color.fill;
            svg.style.stroke = this.color.stroke;
            return svg;
        }
    }
    
    copy(svg) 
    {
        if(svg != null && this != svg) {
            this.circle.position = svg.getPosition();
            this.circle.radius = svg.getRadius();
            this.color = svg.color;
            this.element = this.create();
        }
        return this;
    }
    
    clone() {
        let cloneSVG = new SVGCircle();
        return cloneSVG.copy(this);
    }
    
    getPosition()
    {
        return this.circle.position;
    }
    
    getRadius() 
    {
        return this.circle.radius;
    }
    
    // Get circle as a SVG element.
    getShape() {
        if(this.circle.element == null)
        {
            this.circle.element = this.create();
        }
        return this.circle.element;
    }    
        
    setPosition(x, y)
    {
        this.circle.position.copy({x: x, y: y});
        return this;
    }
    
    // Return info about this circle as a string.
    toString(){
        return `Circle at ${this.getPosition().toString()} [${this.circle.radius} radius] [${this.color.fill} fill with ${this.color.stroke} stroke].`;
    }    
}

class SVGParticle extends SVGCircle {
    // Create a circle.
    constructor(xmlns, x = 0, y = 0, radius = 1, fill = 0xFF0000, stroke = 0x000000){
        
        // Call the super constructor.
        super(xmlns, x, y, radius, fill, stroke);
                
        // Add the particle object to the circle.
        this.particle = {   
            velocity: { 
                value: new Vector(0, 0),
                max: 100
            },
            acceleration: {
                value: new Vector(0, 0),
                max: 100,
            },
            forces: {
                value: [],
                max: 100,
            }
        };
    }
    
    // Update the particle.
    update(delta) {
        if(delta == null) {
            delta = 0.1;
        }
        
        let friction = this.getVelocity().clone().multiply(-0.56);
        this.addForce(friction);
                        
        // Update acceleration.
        this.applyForces();
        let acc = this.getAcceleration().clone();
        
        // Update velocity.
        let vel = this.getVelocity().clone();
        if(!acc.isZero())
        {
            vel.add(acc.multiply(delta));
        }
        this.setVelocity(vel.x, vel.y); 
                
        // Update position.
        let pos = this.getPosition().clone().add(vel.multiply(delta));
        this.setPosition(pos.x, pos.y);
        
        let circle = super.getShape();
        circle.setAttribute('cx', this.getPosition().x);
        circle.setAttribute('cy', this.getPosition().y);
        
        this.setAcceleration(0, 0);
    }
    
    getAcceleration()
    {
        return this.particle.acceleration.value;
    }
    
    getVelocity()
    {
        return this.particle.velocity.value;
    }
    
    getForces() 
    {
        return this.particle.forces.value;
    }
    
    setAcceleration(x, y)
    {
        this.getAcceleration().copy({x: x, y: y});
        this.getAcceleration().clamp(this.particle.acceleration.max);
        return this;
    }
    
    setVelocity(x, y) 
    {
        this.getVelocity().copy({x: x, y: y});
        this.getVelocity().clamp(this.particle.velocity.max);
        return this;
    }
    
    // Add a force to the vector.
    addForce(vector) 
    {
        if(vector != null && !vector.isZero()) {
            this.getForces().push(vector);
        }
        return this;
    }
    
    applyForces()
    {
        // Get the sum of all forces.
        let sumOfForces = new Vector(0, 0);
        let forces = this.getForces();
        for(let i = 0; i < forces.length; i++)
        {
            sumOfForces.add(forces[i].clone());
        }
        
        // Clamp the sum.
        sumOfForces.clamp(this.particle.forces.max);
        
        // Add it to the acceleration.
        this.setAcceleration(sumOfForces.x, sumOfForces.y);
        
        // Empty out the forces array.
        this.particle.forces.value = [];        
        return this;
    }
    
    // Return info about this circle as a string.
    toString(){
        return `Particle at ${this.getPosition().toString()} [${this.circle.radius} radius] [${this.color.fill} fill with ${this.color.stroke} stroke] with velocity ${this.getVelocity().toString()} and acceleration ${this.getAcceleration().toString()}.`;
    }    
}
