const typingText = document.querySelector(".TypingArea p"),
inputArea = document.querySelector(".Main .InputLeLo"),
mistakeArea = document.querySelector(".Mistake span"),
timeArea = document.querySelector(".Time span b"),
wpmArea = document.querySelector(".WPM span"),
cpmArea = document.querySelector(".CPM span"),
tryAgain = document.querySelector(".Content button")

let timer,
maxTime = 30,
timeLeft = maxTime,
isTyping = 0;

let charIdx = 0, mistakes = 0;

function randomPara(){
    typingText.innerHTML = "";
    let randIdx = Math.floor(Math.random() * paras.length);
    paras[randIdx].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    // console.log(paras[0]);
    // console.log("Hii Jaanu");
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", ()=>inputArea.focus());
    typingText.addEventListener("click", ()=>inputArea.focus());
}

function initTyping(){
    const chars = typingText.querySelectorAll("span");
    // console.log("kaise ho");
    // console.log(chars);

    let typedChar = inputArea.value.split("")[charIdx];

    if(charIdx < chars.length -1 && timeLeft > 0){

        if(!isTyping){
            timer = setInterval(initTimer,1000);
            isTyping = 1;
        }
    
        
        if(typedChar == null){
            charIdx--; 
            if(chars[charIdx].classList.contains("incorrect")){
                mistakes--;
            }
            chars[charIdx].classList.remove("correct", "incorrect");
            
        }
        else{
            
            if((chars[charIdx]).innerText === typedChar){
                // console.log("correct");
                chars[charIdx].classList.add("correct");
            }
            else{
                // console.log("incorrect");
                chars[charIdx].classList.add("incorrect");
                mistakes++;
                
            }
            
            charIdx++;
        }
        chars.forEach(span => span.classList.remove("active"));
        chars[charIdx].classList.add("active");
        // console.log(typedChar);

        mistakeArea.innerText = mistakes;
        cpmArea.innerText = charIdx - mistakes;
        let wpm = Math.round(((charIdx - mistakes)/5) / (maxTime - timeLeft)*60 );
        wpm =( wpm < 0 || !wpm || wpm === Infinity )? 0 : wpm;
        wpmArea.innerText = wpm;
    }
    else{
        inputArea.value = "";
        clearInterval(timer);
    }
}


function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        timeArea.innerText = timeLeft;
    }
    else{
        clearInterval(timer);
    }
}

function reset(){
    randomPara();
    timeLeft = maxTime;
    charIdx = mistakes = isTyping = 0;
    timeArea.innerText = timeLeft;
    mistakeArea.innerText = 0;
    wpmArea.innerText = 0;
    cpmArea.innerText = 0;
    inputArea.value = "";
    clearInterval(timer);

}

randomPara();
inputArea.addEventListener("input", initTyping);
tryAgain.addEventListener("click", reset);
