class ScoreManager {
    constructor() {
        this.keys = {
            score: '_score',
            name: '_name'
        }
        this.keys[0] = 'first';
        this.keys[1] = 'second';
        this.keys[2] = 'third';
        this.loadHighScores();
    }
    
    addNewScore(score)
    {
        if(score != null) 
        {
            this.highscores.push(score);
            this.sortScores();
            this.addHighScores();
        }        
    }
    
    sortScores() {
        let i = 1;
        while(i < this.highscores.length)
        {
            let j = i;
            while(j > 0 && this.highscores[j - 1] > this.highscores[j]){
                let temp = this.highscore[j];
                this.highscore[j] = this.highscore[j-1];
                this.highscore[j-1] = temp;                
                j--;
            }
            i++;
        }        
    }
    
    loadHighScores()
    {
        this.highscores = [];    
        
        for(let i = 0; i < 3; i++)
        {
            let temp = this.getHighScore(i);
            if(temp != null) {
                this.highscores.push(this.getHighScore(i));
            }
        }
        
        return this.highscores;
    }
    
    addHighScores() 
    {
        for(let i = 0; i < 3; i++)
        {
            this.addHighScore(i, this.highscores[i]);
        }
    }
    
    addHighScore(index, score) 
    {
        if(index >= 0 && index < 3 && score != null){
            localStorage.setItem(this.getRequest(index) + this.keys.name, score.name);
            localStorage.setItem(this.getRequest(index) + this.keys.score, score.value);
        }
    }
    
    getRequest(index) 
    {
        if(index >= 0 && index < 3) {
            return this.keys[index];
        } 
        return '';
    }
    
    getHighScore(index) {
        if(index >= 0 && index < 3){
            let highscore = {
                name: localStorage.getItem(this.getRequest(index) + this.keys.score),
                value: localStorage.getItem(this.getRequest(index) + this.keys.name),
            };
            
            if(highscore.name == null || highscore.value == null)
            {
                return null;
            }
                                            
            return new Score(highscore.name, highscore.value);
        }
        
        // Out of bounds.
        return null;
    }
    
    hasHighScore(index) {
        if(index >= 0 && index < 3){
            let temp = this.getHighScore(index);
            return (temp != null);
        }
        
        // Out of bounds.
        return false;        
    }
    
    
}