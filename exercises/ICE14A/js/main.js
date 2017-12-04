// External JS
"use strict";

const Prefs = {
    SVGElement: undefined,
    framesSinceStart: 0,
    debugElement: {
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
}

let framesSinceStart = 0;

window.addEventListener('load', function(){
    init();
    main();
}, false);

// Initialize the page.
function init() {
    Prefs.framesSinceStart = 0;
    Prefs.SVGElement = new SVGElement('http://www.w3.org/2000/svg', '100%', '800px');
    document.appendChild(Prefs.SVGElement.getInstance());
}

// The main loop.
function main() {    
    requestAnimationFrame(animate());
}

// One cycle of the animation loop.
function animate() {
    let label = Prefs.debugElement.label();
    label.innerHTML = `Testing ${Prefs.framesSinceStart}`;
    Prefs.framesSinceStart++;
    requestAnimationFrame(animate);
}