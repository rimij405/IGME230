// External JS
"use strict";

const Prefs = {
    state: {
        name: "Tadpole", 
        update: undefined,
        choices: ["Tadpole", "Jitter"],
        updates: [],
        elements: []
    },
    debug: {
        framesSinceStart: 0,
        timeSinceStart: 0,
        timeStart: Date.now,
        element: {
            id: "#debug",
            data: undefined,
            label: function() {
                if(this.data === undefined)
                {
                    this.data = document.querySelector(this.id);
                }
                return this.data;
            }
        }
    },
    svg: {
        xmlns: 'http://www.w3.org/2000/svg',
        root: undefined
    }
}

let framesSinceStart = 0;

window.addEventListener('load', function(){
    init();
    main();
}, false);

// Initialize the page.
function init() {
    // Initialize the debug values.
    Prefs.debug.framesSinceStart = 0;
    Prefs.debug.timeSinceStart = 0;
    
    // Initialize the SVG root.
    Prefs.svg.root = new SVGElement(Prefs.svg.xmlns, '100%', '800px');
    
    // Create a circle.
    // Prefs.svg.circle = new SVGParticle(Prefs.svg.xmlns, 50, 50, 4, 'red', 'blue');
    // Prefs.svg.elements.push(Prefs.svg.circle.getShape());
    // Prefs.svg.root.addElement(Prefs.svg.circle.getShape());
    // console.log(Prefs.svg.circle.toString());
    
    // Set up state events.
    Prefs.state.updates.push(update__tadpole);
    Prefs.state.updates.push(update__orbit);
    Prefs.state.name = Prefs.state.choices[0];
    Prefs.state.update = Prefs.state.updates[0];
        
    // Next state buttone events.
    let button = document.querySelector("#nextState");
    button.addEventListener('click', changeState);
    
    // Insert the svg element.
    let dl = Prefs.debug.element.label(); // Create the label.
    if(dl != null) {
        document.body.insertBefore(Prefs.svg.root.getInstance(), document.body.childNodes[0]);
    } 
    else 
    {
        addElement(Prefs.svg.root.getInstance());
    }
}

// The main loop.
function main() {    
    Prefs.debug.timeStart = Date.now();
    requestAnimationFrame(update);
}

function changeState() {
    let index = 0;
    for(let i = 0; i < Prefs.state.choices.length; i++) {
        if(Prefs.state.name === Prefs.state.choices[i]) {
            index = i + 1;
            break;
        }
    }
    
    if(index >= Prefs.state.choices.length) 
    {
        index = 0;   
    }
    
    Prefs.state.name = Prefs.state.choices[index];
    Prefs.state.update = Prefs.state.updates[index];   
    
    Prefs.debug.framesSinceStart = 0;
    Prefs.debug.timeSinceStart = 0;
    Prefs.debug.timeStart = Date.now();

    for(let i = 0; i < Prefs.state.elements.length; i++) {
        Prefs.svg.root.getInstance().removeChild(Prefs.state.elements[i].getShape());
    }
        
    Prefs.state.elements = []; // Remove all shapes.
}

function update__tadpole() {        
    let els = Prefs.state.elements;
    let box = Prefs.svg.root.getInstance().getBoundingClientRect();
    
    if(els.length == null || els.length === 0)
    {
        for(let i = 0; i < 50; i++){
            let rad = 10;
            let x = Math.round((rad / 2) + ((box.width - (rad / 2)) * Math.random()));
            let y = Math.round((rad / 2) + ((box.height - (rad / 2)) * Math.random()));

            let particle = new SVGParticle(Prefs.svg.xmlns, x, y, rad, 'red', 'black');
            Prefs.svg.root.addElement(particle.getShape());
            els.push(particle);
        }
    }
    
    if(els.length != null && els.length !== 0) {
        for(let i = 0; i < els.length; i++) {
            let particle = els[i];
            if(particle.getVelocity().lengthSquared() < 1) {
                let sign = 1;
                if(Math.random() > 0.5){
                    sign = -1;
                }
                
                let speed = particle.getVelocity().random().multiply(particle.particle.velocity.max * sign);
                particle.addForce(speed.multiply(1000));
            }
            
            particle.update(undefined);            
        }
    }
}

function update__orbit  () {
    let els = Prefs.state.elements;
    let box = Prefs.svg.root.getInstance().getBoundingClientRect();
    let rad = 5;        
    let center = new Vector((box.width / 2) - (rad / 2), (box.height / 2) - (rad / 2));
        
    let maxDistance = 100;
    
    if(els.length == null || els.length === 0)
    {
        for(let i = 0; i < 105; i++) {
            let particle = new SVGParticle(Prefs.svg.xmlns, box.width * Math.random(), center.y, rad, 'red', 'black');
            Prefs.svg.root.addElement(particle.getShape());
            els.push(particle);
        }
    }
    
    let sign = 1;              
    if(els.length != null && els.length !== 0) {
        for(let i = 0; i < els.length; i++) {
            let particle = els[i];  
            let position = particle.getPosition().clone();
            
            let difference = 0;
            difference = center.clone().subtract(position).lengthSquared();
            
            if(difference != null && difference > 1000) 
            {
                sign = sign * -1;
                particle.setVelocity(0, 0);
            }            
            
            let speed = particle.getVelocity().random().multiply(particle.particle.velocity.max * sign);
            particle.addForce(speed.multiply(1));
            
            particle.update(undefined);            
        }
    }
}

// Update loop.
function update() {
    // Update values here.
    Prefs.debug.framesSinceStart++;
    Prefs.debug.timeSinceStart = Number(Date.now()) - Number(Prefs.debug.timeStart);
    
    Prefs.state.update();
    
    let label = Prefs.debug.element.label();
    label.innerHTML = `Test: ${Prefs.debug.framesSinceStart} frames passed || ${Math.round(Prefs.debug.timeSinceStart / 1000)} seconds passed since start. || State: ${Prefs.state.name}`;
        
    // Draw changes to screen.
    animate();
}

// One cycle of the animation loop.
function animate() {
    requestAnimationFrame(update);
}

// Add an element to the document.
function addElement(element) {
    if(element != null) {
        document.body.appendChild(element);
    }
}