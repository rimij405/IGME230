'use strict';
/*
    Main.js
    Contains the main game loop.
    (Ian Effendi)
*/
// Set up constants and global references.
const debugmode = true; // Debug mode flag.

// Print message if debug mode is on.
function print(message)
{
    if(debugmode) 
    {
        console.log(message);
    } 
}

// Entry point for the program.
function init() 
{    
    // Contains keys for elements that may need to be retrieved during runtime.
    const Keys = {
        project: "#project",
        container: "#container",
        console: ".console",
        minesLeft: "#minesLeft",
        timeStart: "#timeStart",
        span: "span"
    };

    // Creates a span object.
    const span = document.createElement(Keys.span);
    span.className = "cell";

    // Returns an element from the given input selector.
    function getElement(key)
    {
        return document.querySelector(key);
    }

    // Returns collection of elements that match the input selector.
    function getElements(key)
    {
        return document.querySelectorAll(key);
    }
    
    // Set reference to the containing panel.
    const panel = getElement(Keys.container);
    const minesRemaining = getElement(Keys.minesLeft);
    const timeSinceStart = getElement(Keys.timeStart);
    
    // Add event handler to the panel.
    panel.addEventListener("click", function(e){
        let rect = panel.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;
        let width = getCellWidth(panel.clientWidth, Easel.cols, Easel.padding) + Easel.padding;
        let c = Math.floor(mouseX / width);
        let r = Math.floor(mouseY / width);
        handleCell(Easel.cells[r][c]);
        print("Clicked Cell: (" + `${c},${r}` + ").");
    });
    
    // Handles the selected cell.
    function handleCell(cell)
    {
        if(isHidden(cell)) {
            revealCell(cell);
        } 
        else if(isRevealed(cell)) {
            hideCell(cell);
        }
    }    
    
    // Determines if the cell has been hidden.    
    function isHidden(cell)
    {
        return (cell.dataset.state === "hidden");
    }
    
    // Determines if the cell has been revealed.
    function isRevealed(cell)
    {
        return (cell.dataset.state === "revealed");
    }
    
    // Hides the input cell.
    function hideCell(cell)
    {
        print("Hiding cell.");
        cell.dataset.state = "hidden";
    }    
    
    // Reveals the input cell.
    function revealCell(cell)
    {
        print("Revealing cell.");
        cell.dataset.state = "revealed";
    }    
    
    // The easel object literal keeps track of the cell information.
    let Easel = {
        cols: 8,
        rows: 8,
        width: 0,
        padding: 1,
        cells: []
    };
    
    // Calculate a total width's segmented values given the number of cells taking up that width.
    function getCellWidth(totalWidth, numberOfCells, padding)
    { 
        if(totalWidth === undefined) { print("Total width is undefined."); totalWidth = 400; }
        if(numberOfCells === undefined) { print("Number of cells is undefined."); return totalWidth; }
        return (totalWidth / numberOfCells) - padding; 
    }
    
    // Create a new cell object.
    function createCell(x, y) 
    {
        let cell = span.cloneNode();
        
        // Set up the dataset attributes.
        cell.dataset.state = "hidden";        
        
        // Set up the styling.
        cell.style.left = `${x * (Easel.width + Easel.padding)}px`;
        cell.style.top = `${y * (Easel.width + Easel.padding)}px`;
        cell.style.width = Easel.width + "px";
        cell.style.height = Easel.width + "px";
        cell.style.margin = "0px";
        cell.style.padding = "0px";
        return cell;
    }
    
    // Build each of the cells.
    function buildCells()
    {   
        // Set the cell width.
        Easel.width = getCellWidth(panel.clientWidth, Easel.cols, Easel.padding);
        
        // Fill the easel with cells.
        for (let r = 0; r < Easel.rows; r++) 
        {
            // Push a new cell matrix for the next column.
            Easel.cells.push([]);
            for (let c = 0; c < Easel.cols; c++)
            {
                let cell = createCell(c, r);
                panel.appendChild(cell);
                Easel.cells[r][c] = cell;
            }
        }
    }
    
    // Update cell sizes.
    function resizeCells()
    {        
        if(Easel.cells !== undefined) {
            Easel.width = getCellWidth(panel.clientWidth, Easel.cols, Easel.padding);
            for (let r = 0; r < Easel.rows; r++)
            {
                for (let c = 0; c < Easel.cols; c++)
                {
                    let cell = Easel.cells[r][c];
                    cell.style.left = `${c * (Easel.width + Easel.padding)}px`;
                    cell.style.top = `${r * (Easel.width + Easel.padding)}px`;
                    cell.style.width = Easel.width + "px";
                    cell.style.height = Easel.width + "px";
                }
            }
        }
    }
    
    // Update the count for remaining mines.
    function updateMinesRemaining(number)
    {
        minesRemaining.innerHTML = number;
    }
    
    // Update the count since start.
    function updateTimeSinceStart(number)
    {
        timeSinceStart.innerHTML = number;
    }
    
    // Reference to properties.
    const Controller = {
        // Last frame in milliseconds.
        LastFrame: 0,
        // Change in time.
        DeltaTime: 0, 
        // Frames per second.
        FPS: 60,
        // Frames this second.
        FTS: 0,
        // Last FPS update.
        LastFPSUpdate: 0,
        // Seconds since the start.
        SinceStart: 0,
        // Starting date.
        StartDate: undefined,
        // Timestep.
        Timestep: (1000 / 60),
        // Maximum FPS (throttling behaviour).
        MaxFPS: 144,
        // Flag tracking status.
        UpdateCount: 0,
        IsRunning: false,
        IsStarted: false,
        FrameID: undefined
    };
    
    // The start method.
    function start() 
    {
        if(!Controller.IsStarted) 
        {
            Controller.IsStarted = true;
            Controller.FrameID = requestAnimationFrame(
                function(timestamp) {
                    buildCells();
                    draw(1);
                    Controller.IsRunning = true;
                    Controller.LastFrame = timestamp;
                    Controller.LastFPSUpdate = timestamp;
                    Controller.FTS = 0;
                    Controller.SinceStart = 0;
                    Controller.StartDate = Date.now();
                    Controller.FrameID = requestAnimationFrame(cycle);
                }
            );
        } 
    }
    
    // The main loop of the game.
    function cycle(timestamp) 
    {
        
        // Start, if not already started.
        if(!Controller.IsStarted)
        {
            start();
            return;
        }
        
        // Throttle frame rate based on imposed restrictions.
        if (timestamp < Controller.LastFrame + (1000 / Controller.MaxFPS))
        {
            Controller.FrameID = requestAnimationFrame(cycle);
            return;
        }
        
        // Update the FPS count.
        if (timestamp > Controller.LastFPSUpdate + 1000) 
        {
            // Calculate the new FPS.
            Controller.FPS = 0.25 * Controller.FTS + (1 - 0.25) * Controller.FPS
            Controller.LastFPSUpdate = timestamp;
            Controller.FTS = 0; 
        }
        Controller.FTS++;
     
        // Track delta time.
        Controller.DeltaTime += timestamp - Controller.LastFrame;
        Controller.LastFrame = timestamp;
        
        // Keep track of how many simulated timesteps have passed (and ensure it won't freeze up our program).
        Controller.UpdateCount = 0;
        while(Controller.DeltaTime >= Controller.Timestep) {
            update(Controller.Timestep);
            Controller.DeltaTime -= Controller.Timestep;
            if(++Controller.UpdateCount >= 240)
            {
                panic();
                break;
            }
        }
        
        // Render any changes that need to be made, since the updates.
        draw();
        
        if(Controller.SinceStart >= 10) 
        {
            stop();
        } 
        else 
        {
            Controller.FrameID = requestAnimationFrame(cycle);
        }
    }
    
    // Update the time since start.
    function updateTime(delta) 
    {        
        // Update the time since start.
        let difference = Date.now() - Controller.StartDate;
        let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((difference % (1000 * 60)) / 1000);
        Controller.SinceStart = Math.floor(difference / 1000); // Divide the milliseconds by 1000 to get the total amount of seconds.
        print("Seconds since start: " + Controller.SinceStart);
        
        let minutesString = "" + minutes;
        let secondsString = "" + seconds;

        if(minutesString.length < 2)
        {
            minutesString = "0" + minutesString;
        }

        if(secondsString.length < 2)
        {
            secondsString = "0" + secondsString;
        }

        updateTimeSinceStart("" + minutesString + ":" + secondsString);
    }
    
    // The update method will update what needs to be updated for this game loop.
    function update(delta) 
    {
        updateTime(delta);
    }
    
    // The draw function will update anything that needs to be moved on screen.
    function draw()
    {
        print("Draw at " + Math.round(Controller.FPS) + " FPS.");
    }

    // This is called when the frame rate gets so out of whack that we need to reset our delta.
    function panic() 
    {
        Controller.DeltaTime = 0;
    }

    // Stop calling function.
    function stop()
    {
        Controller.IsRunning = false;
        Controller.IsStarted = false;
        cancelAnimationFrame(Controller.FrameID);
    }
            
    // Set callback function for window.resize.
    window.onresize = resizeCells;
    
    // Call the initial run.
    Controller.FrameID = requestAnimationFrame(cycle);
}

// Run this on window load.
window.onload = function() {
    print("Window loaded.");
    init();
};
