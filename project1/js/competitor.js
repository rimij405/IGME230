/*
    Competitor.js
    Represents a CPU or Player competitor.
*/
const choices = {
    list: ['rock', 'paper', 'scissors'],
    rock: 0,
    paper: 1,
    scissors: 2,
    matches: function(name, index) { 
        return (name.toLowerCase() === this.get(index));
    },
    get: function(index) {
        if(index >= 0 && index < 3) {
            return this.list[index];
        } else 
        {
            return 'undefined';
        }
    }
}

// Choices that can be chosen for RPS.
class Choice {
    constructor(name){
        this.name = name.toLowerCase();
    }
    
    getIndex() {
        if(choices.matches(this.name, 0)) { return 0; }
        if(choices.matches(this.name, 1)) { return 1; }
        if(choices.matches(this.name, 2)) { return 2; }
        return -1;        
    }
    
    // Compare to another choice.
    compare(other) {
        console.log(other.name + " " + this.name);
        if(other.name === this.name) { return 0; }
        else {
            if(choices.matches(other.name, choices.rock))
            {
                if(choices.matches(this.name, choices.paper)) {
                    return 1;
                }
                if(choices.matches(this.name, choices.scissors))
                {
                    return -1;
                }                
            } 
            else if(choices.matches(other.name, choices.paper))
            {
                if(choices.matches(this.name, choices.scissors)) {
                    return 1;
                }
                if(choices.matches(this.name, choices.rock))
                {
                    return -1;
                }                   
            }
            else if(choices.matches(other.name, choices.scissors))
            {
                if(choices.matches(this.name, choices.rock)) {
                    return 1;   
                }
                if(choices.matches(this.name, choices.paper))
                {
                    return -1;
                }                   
            }  
            return 0;
        }
    }
    
    // Is this choice the same as the other?
    sameAs(other) {
        return (this.compare(other) === 0);
    }
    
    // Is this choice greater than the other?
    greaterThan(other) 
    {
        return (this.compare(other) === 1);        
    }
    
    // Is this choice less than the other?
    lessThan(other) 
    {
        return (this.compare(other) === -1);
    }
}


// The class itself.
class Competitor {
    constructor(id){
        this.id = id;
        this.choice = undefined;
        this.isPlayer = false;
        this.score = 0;
    }
        
    // Has choice.
    hasChoice() 
    {
        return (this.choice != null);
    }
    
    // Set choice to index value.
    setChoice(index) {
        if(index >= 0 && index < 3){
            let value = choices.get(index);
            if(value != null) {
                this.choice = new Choice(choices.list[index]);
            } 
            else 
            {
                this.choice = undefined;
            }
        }
    }
    
    // Increment score.
    addScore(value) {
        this.score += value;
    }
    
    incrementScore()
    {
        this.addScore(1);
    }
}

class Player extends Competitor {
    constructor() {
        super(0);
        this.isPlayer = true;
    }
}

class CPU extends Competitor {
    constructor() {
        super(1);
    }
    
    // Randomly generate a choice.
    generateRandomChoice() {
        let randomValue = Math.floor(Math.random() * 3);
        this.choice = new Choice(choices.list[randomValue]);
    }
}