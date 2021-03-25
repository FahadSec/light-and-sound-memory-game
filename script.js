// global constants
//const clueHoldTime = 1000; //how long to hold each clue's light/sound
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//Global Variables
var pattern = [2, 2, 4, 3, 2, 1, 2, 4];
var progress = 0; 
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;  //must be between 0.0 and 1.0
var guessCounter = 0;

var clueHoldTime = 1000;
var timeShaved = 70;
var mistakesCounter = 0;
var mistakesAllowed = 3;
var repeatButton = false;
var unlimitedMode = false;
var bestScore = 0;
var difficulityVar = 2;


// displays scores to the HTML page
function displayScores() {
  document.getElementById("score").innerHTML = progress;
  document.getElementById("bestScore").innerHTML = bestScore;
}

// resets the pattern to 8
function resetPattern() {
  pattern = [2, 2, 4, 3, 2, 1, 2, 4];
}

// takes an option 1,2, or 3 and changes variables based on the difficulity
function difficulty(option) {
  resetPattern(); // reset the pattern to 8 elements
  switch (option) {
    case 1: // easy
      difficulityVar = 1;
      mistakesAllowed = 5;
      timeShaved = 40;
      pattern.pop(); pattern.pop(); //decrease the pattern size by 2
      repeatButton = true;
      break; 
      
    case 2: // normal
      difficulityVar = 2;
      mistakesAllowed = 3;
      timeShaved = 70;
      repeatButton = false;
      break; 
      
    case 3: // hard
      difficulityVar = 3;
      mistakesAllowed = 1;
      timeShaved = 130;
      pattern.push(1,1); //increase the pattern size by 2
      repeatButton = false;
      break; 
  }
  
  displayStart();
}

// displays the start options
function displayStart() {
    document.getElementById("startBtn").classList.remove("hidden");
    document.getElementById("startUnlimitedBtn").classList.remove("hidden");
    document.getElementById("changeDiffBtn").classList.remove("hidden");
    document.getElementById("easyBtn").classList.add("hidden");
    document.getElementById("normalBtn").classList.add("hidden");
    document.getElementById("hardBtn").classList.add("hidden");
    document.getElementById("chooseDiffText").classList.add("hidden");
    document.getElementById("stopBtn").classList.add("hidden");
    document.getElementById("repeatBtn").classList.add("hidden");
}

// displays the difficulity options
function displayDiff() {
    document.getElementById("easyBtn").classList.remove("hidden");
    document.getElementById("normalBtn").classList.remove("hidden");
    document.getElementById("hardBtn").classList.remove("hidden");
    document.getElementById("chooseDiffText").classList.remove("hidden");
    document.getElementById("startBtn").classList.add("hidden");
    document.getElementById("startUnlimitedBtn").classList.add("hidden");
    document.getElementById("changeDiffBtn").classList.add("hidden");
}


// this function gnerates a random pattern
function generatePattern() {
  
  for (let i=0; i<pattern.length;i++)
    {
      pattern[i]=( Math.ceil(Math.random() * 4));
    }
  }

// takes 1 for classic mode and 2 for unlimited.
function startGame(mode){
    if (mode==2) 
      unlimitedMode=true;
  else
      unlimitedMode=false;
  
    //resetting difficulity settings
    difficulty(difficulityVar);
  
    // gnerating a new pattern
    generatePattern();
    //initialize game variables
    progress = 0;
    gamePlaying = true;
    clueHoldTime = 1000; // to reset holdtime
    mistakesCounter=0;

  // swap the Start and Stop buttons
    document.getElementById("startBtn").classList.add("hidden");
    document.getElementById("startUnlimitedBtn").classList.add("hidden");
      document.getElementById("changeDiffBtn").classList.add("hidden");
    document.getElementById("stopBtn").classList.remove("hidden");
    playClueSequence()
    if (repeatButton==true)
      document.getElementById("repeatBtn").classList.remove("hidden");
}

function stopGame(){
    gamePlaying = false;
    progress=0;
  
    displayStart();
    displayScores();
}


// Sound Synthesis Functions
const freqMap = {
  1: 466.164,
  2: 440.000,
  3: 415.305,
  4: 391.995
}

function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}

//Page Initialization
// Init Sound Synthesizer
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)


function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}

function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}

function playClueSequence(){
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
  }
    clueHoldTime-=timeShaved;
    if (clueHoldTime < 50) clueHoldTime=50;

}

function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
}

function winGame(){
  stopGame();
  alert("Game Over. You won!");
}


function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }

  if (!unlimitedMode) {
      if (btn == pattern[guessCounter]) // is guess correct?
          if (guessCounter == progress) // is turn over?
              if (progress== pattern.length-1 ) {// is this the last turn?
                progress++;
                if (progress>bestScore) bestScore=progress; 
                winGame();
              }
              else { 
                progress++;
                if (progress>bestScore) bestScore=progress; 
                displayScores();
                playClueSequence();
              }
          else 
            guessCounter++;
      else
        {
        mistakesCounter++;  

        if(mistakesCounter==mistakesAllowed) 
          loseGame();
          else {
        alert("You made a mistake. You have " + (mistakesAllowed-mistakesCounter) + " attempts remaining.");
          }

        }
  } 
  else // unlimited mode
    {
      if (btn == pattern[guessCounter]) // is guess correct?
          if (guessCounter == progress){  // is turn over?
                pattern.push(Math.ceil(Math.random() * 4)) // adds a random number 1-4 to the pattern array
                progress++;
                if (progress>bestScore) bestScore=progress;
                displayScores();
                playClueSequence();
          }
          else 
            guessCounter++;
      else
        {
        mistakesCounter++;  

        if(mistakesCounter==mistakesAllowed) {
        alert("Game Over. You score was " + progress +".");
        stopGame();
        }
          else {
        alert("You made a mistake. You have " + (mistakesAllowed-mistakesCounter) + " attempts remaining.");
          }

    }
  }
}

