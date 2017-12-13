/*
    Scores.js
    Get the top three high scores from the local storage.
*/
class Score {
    constructor(name, value){
        this.name = name.toUpperCase().substr(0, 3); // Truncate the name.
        this.value = value; // Get the score value.
    }
    
    greaterThan(other) {
        if(this.value >= other.value)
        {
            return true;
        }
        
        // If less than other.
        return false;
    }
}
