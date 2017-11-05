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

// Services refers to helper functions.
let Services = {
    nextDecimal: function()
    {
        return Math.random();
    },
    // Returns a random whole number.
    nextInt: function() 
    {
        return Math.floor(this.nextDecimal());
    },    
    // Return a value between a start and end range (inclusive).
    nextRange: function(start, end) 
    {
        let min = start;
        let max = end; 
        if (start === undefined) {
            min = 0;
        }        
        if (end === undefined) {
            max = 1;
        }        
        return Math.floor(this.nextDecimal() * (max - min + 1)) + min;
    },
    // Return the lesser of two numeric values.
    min: function(value, other) 
    {
        return Math.min(value, other);
    },
    // Return the greater of two numeric values.
    max: function(value, other) 
    {
        return Math.max(value, other);
    },
    // Clamp an input value between a minimum and a maximum value.
    clamp: function(value, start, end) 
    {
        let min = start;
        let max = end;
        
        // Swap min and max if necessary.
        if(start > end) {
            min = end;
            max = start;
        }
        
        let result = this.min(value, max);
        return this.max(result, min);
    },
    // Check if array is empty.
    isEmpty: function(array)
    {
        return (array === undefined || array.length === 0);
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

    // Set reference to the containing panel.
    const panel = getElement(Keys.container);
    const minesRemaining = getElement(Keys.minesLeft);
    const timeSinceStart = getElement(Keys.timeStart);
    let cellCount = 0;
    
    // Minesweeper.
    const Minesweeper = {
        mineCount: 0,
        totalMineCount: 0,
        foundMines: 0,
        score: 0
    }
    
    // Add event handler to the panel.
    panel.addEventListener("click", function(e){
        let rect = panel.getBoundingClientRect();
        let mouseX = e.clientX - rect.left;
        let mouseY = e.clientY - rect.top;
        let width = getCellWidth(panel.clientWidth, Easel.cols, Easel.padding) + Easel.padding;
        let c = Math.floor(mouseX / width);
        let r = Math.floor(mouseY / width);        
        handleCell(Easel.cells[r][c]);
        print(`Clicked: ${toString(getCell(r, c))}.`);
    });
        
    // Creates a span object.
    const span = document.createElement(Keys.span);
    span.className = "cell";
    
    // Creates a span object for text.
    const textSpan = document.createElement(Keys.span);
    textSpan.className = "text";

    // The easel object literal keeps track of the cell information.
    let Easel = {
        cols: 8,
        rows: 8,
        width: 0,
        padding: 1,
        cells: []
    };
    
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
    
    // Returns true if any thing is null or undefined.
    function isNull() {
        return (Easel === undefined || Easel.cells === undefined || Easel.cells.length === 0);
    }
    
    // If has cells, and count is greater than zero, return true.
    function hasCells() 
    {
        if (!isNull()) {
            return (Easel.cells.length > 0);
        }        
        return false;
    }
    
    // Get a cell.
    function getCell(row, col) 
    {
        // Return if easel is undefined or cells is undefined.
        if (!hasCells()) {
           return undefined;    
        }
                
        // Check if row and col are greater than count.
        let r = Services.clamp(row, 0, Easel.rows);
        let c = Services.clamp(col, 0, Easel.cols);
        
        // Return the cell reference.
        return Easel.cells[r][c];        
    }
    
    // Get a random cell.
    function randomCell() 
    {                    
        // Return if easel is undefined or cells is undefined.
        if (!hasCells()) {
           return undefined;    
        }
        
        // Get a cell from a range of rows and columns.
        let row = Services.nextRange(0, Easel.rows - 1);
        let col = Services.nextRange(0, Easel.cols - 1);
        
        // Return the selected cell.
        return getCell(row, col);
    }
    
    // Get a list of 'size' amount of unique random cells.
    function randomCells(size) 
    {
        // The amount to get.
        let amount = size;
        let cells = [];
        
        // Return empty array.
        if(size === undefined)
        {
            // When undefined, get 10 percent of all cells.
            amount = Math.round(cellCount * 0.10); // Get ten percent of the total cell count.
        }
        else if(size <= 0)
        {
            // When size is negative or equal to zero, simply return an empty array.
            return cells;
        }
                        
        while(cells.length < amount)
        {
            let cell = randomCell();
            if(!contains(cells, cell))
            {
                print(`${toString(cell)} not contained within list.`);
                cells.push(cell);
            } 
            else
            {
                print(`${toString(cell)} is contained within list.`);
            }
        }
        
        return cells;
    }
    
    // Check if collection already contains the cell.
    function contains(array, cell)
    {
        // Check array length.
        if(array === undefined || array.length <= 0 || cell === undefined)
        {
            return false;
        }
        
        // Check if array already contains the element.
        for(let x = 0; x < array.length; x++)
        {
            if(getName(array[x]) === getName(cell))
            {
                return true;
            }      
        }
        return false;
    }
    
    // Handles the selected cell.
    function handleCell(cell)
    {
        if(isHidden(cell)) {
            
            // Reveal the cell.
            revealCell(cell);  
            
            // If it is a mine adjust mine count.
            if(isMine(cell))
            {
                Minesweeper.foundMines++;
                Minesweeper.mineCount--;
                updateMinesRemaining(Minesweeper.mineCount);
            }
            else
            {
                let text = textSpan.cloneNode();                
                let value = document.createTextNode(getNeighborMineCount(cell));
                text.appendChild(value);
                cell.appendChild(text);
            }  
        }   
    }    
    
    // Creates a debug message containing the input cell's information.
    function toString(cell)
    {
        if(cell === undefined || cell === 0) {
            return "This cell is undefined.";
        }              
        
        let location = getLocation(cell);
        
        let message = `${getName(cell)} ${cell.dataset.mine} at (${location[0]}, ${location[1]}). This cell has ${getNeighborMineCount(cell)} neighboring mines.`;
        return message;        
    }
    
    // Send a debug message containing the input cell's information.
    function printCell(cell)
    {
        print(`${toString(cell)}`);
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
    
    // Set ID of the cell.
    function setName(cell)
    {
        if(cell !== undefined)
        {
            cell.dataset.name = `Cell (${cellCount})`;
        }        
    }
    
    // Get ID of the cell.
    function getName(cell)
    {        
        if(cell !== undefined)
        {
            return cell.dataset.name;
        }    
        return "Undefined cell.";
    }
        
    // Set location value on the cell.
    function setLocation(cell, x, y)
    {   
        if(cell !== undefined)
        {
            if(!isNull()){
                let r = Services.clamp(x, 0, Easel.rows - 1);
                let c = Services.clamp(y, 0, Easel.cols - 1);

                cell.dataset.row = Services.clamp(x, 0, Easel.rows - 1);
                cell.dataset.column = Services.clamp(y, 0, Easel.cols - 1);
            }
        }
    }
    
    // Returns an array containing the numeric value for the row and column location.
    function getLocation(cell) 
    {
        let result = [];        
        if(cell !== undefined) 
        {
            result.push(Number(getColumn(cell)));
            result.push(Number(getRow(cell)));
        }        
        return result;
    }
    
    // Returns the row number of the input cell.
    function getRow(cell)
    {
        let result = -1;
        if(cell !== undefined)
        {
            result = cell.dataset.row;
        }
        return result;
    }
    
    // Returns the column number of the input cell.
    function getColumn(cell)
    {        
        let result = -1;
        if(cell !== undefined)
        {
            result = cell.dataset.column;
        }
        return result;
    }
        
    // Calculate a total width's segmented values given the number of cells taking up that width.
    function getCellWidth(totalWidth, numberOfCells, padding)
    { 
        if(totalWidth === undefined) { print("Total width is undefined."); totalWidth = 400; }
        if(numberOfCells === undefined) { print("Number of cells is undefined."); return totalWidth; }
        return (totalWidth / numberOfCells) - padding; 
    }
    
    // Create a new cell object at the specified location.
    function createCell(x, y) 
    {
        let cell = span.cloneNode();
        
        // Increase the cell count.
        cellCount++;
        
        // Set up the dataset attributes.
        hideCell(cell);
        setLocation(cell, x, y);
        setName(cell);
        disarmMine(cell);
        
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
        
    // Get neighboring cells to input cell..
    function getNeighboringCells(cell)
    {
        // Check if cell is undefined.
        if(cell === undefined)
        {
            print("No neighbors for undefined cell.");
        }
        
        let location = getLocation(cell);
        let neighbors = [];
        
        if(Services.isEmpty(location))
        {
            // return empty array.
            print("No neighbors for undefined cell location.");
            return neighbors;
        }
        
        neighbors = getNeighboringCellsByLocation(location[0], location[1]);
        
        if(Services.isEmpty(neighbors))
        {
            print(`No neighbors for ${toString(cell)}.`);
        }
        
        return neighbors;
    }
    
    // Get neighboring cells via row and col.
    function getNeighboringCellsByLocation(x, y)
    {
        let neighbors = [];
        
        if(x === undefined || y === undefined)
        {
            // Return empty array.
            print("Cannot find neighbors of undefined location.");
            return neighbors;
        }
        
        x = Number(x);
        y = Number(y);
        
        if(x < 0 || x >= Easel.rows)
        {
            // Return empty array.
            return neighbors;
        }
        
        if(y < 0 || y >= Easel.cols)
        {
            // Return empty array.
            return neighbors;
        }
        
        let minX = x - 1;
        let maxX = x + 1;
        let minY = y - 1;
        let maxY = y + 1;
        
        for(let row = minX; row <= maxX; row++)
        {
            for(let col = minY; col <= maxY; col++)
            {
                if(row != x || col != y)
                {
                    if((row >= 0 && row < Easel.rows) && (col >= 0 && col < Easel.cols))
                    {
                        neighbors.push(getCell(row, col));
                    }
                }
            }
        }
                            
        return neighbors;
    }
    
    // Get mine count from neighbors.
    function getNeighborMineCount(cell) 
    {
        let neighbors = getNeighboringCells(cell);
        let count = 0;
        
        if(Services.isEmpty(neighbors))
        {
            // No neighbors, no mines.
            return count;
        }
        
        for(let neighbor of neighbors)
        {
            // Check if it is armed.
            if(isMine(neighbor)) { count++; }
        }        
        
        return count;
    }
    
    // Lay mines.
    function layMines()
    {
        // Create a random number of mines to lay.
        Minesweeper.mineCount = 0;
        Minesweeper.foundMines = 0;
                
        // Get a random number of mines between zero and ten percent of the total amount of cells.
        Minesweeper.totalMineCount = Services.nextRange(1, Math.floor(cellCount * 0.10));
        Minesweeper.mineCount = Minesweeper.totalMineCount;
        
        // Get a random amount of cells 
        let mines = randomCells(Minesweeper.totalMineCount);    
        
        for(let mine of mines)
        {
            armMine(mine);
        }
        
        updateMinesRemaining(Minesweeper.mineCount);
    }
    
    // Check if a cell is a mine.
    function isMine(cell)
    {
        if(cell !== undefined)
        {
            return (cell.dataset.mine === "armed");
        }
    }
    
    // Disarm a mine.
    function disarmMine(cell)
    {
        if(cell !== undefined)
        {
            cell.dataset.mine = "disarmed";
        }
    }
    
    // Arm a mine.
    function armMine(cell)
    {
        if(cell !== undefined)
        {
            cell.dataset.mine = "armed";
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
        MaxFPS: 15,
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
                    layMines();
                    Minesweeper.score = 100;
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
        let difference = delta;
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
    
    // Update the score count.
    function updateScore()
    {
        Minesweeper.score = 100 - Controller.SinceStart; 
        Minesweeper.score -= (Minesweeper.foundMines * 10);
    }
    
    // The update method will update what needs to be updated for this game loop.
    function update(delta) 
    {
        let timeDelta = Date.now() - Controller.StartDate;
        updateTime(timeDelta);
        updateScore();
    }
    
    // The draw function will update anything that needs to be moved on screen.
    function draw()
    {
        print("Draw at " + Math.round(Controller.FPS) + " FPS.");
        
        print("Score: " + Minesweeper.score);
        
        let cell = randomCell();
        print(`Random cell: ${toString(cell)}`);  
        
        let neighbors = getNeighboringCells(cell);
        for(let neighbor of neighbors)
        {
            print(`Found neighbor of ${getName(cell)}: ${toString(neighbor)}.`);
        }
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
