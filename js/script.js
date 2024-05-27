const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
modal = document.getElementById("result-modal"),
closeBtn = document.querySelector(".close-btn"),
resultTryAgainBtn = document.getElementById("result-try-again"),
resultWpm = document.getElementById("result-wpm"),
resultCpm = document.getElementById("result-cpm"),
resultMistakes = document.getElementById("result-mistakes");


let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;
let results = [];

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    let newInnerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`;
        newInnerHTML += span;
    });
    typingText.innerHTML = newInnerHTML;
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
} 

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value;
    
    
    
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } 
        else {
            if (characters[charIndex].innerText == typedChar[typedChar.length - 1]) {
                characters[charIndex].classList.add("correct");
            } else {
                if (!characters[charIndex].classList.contains("incorrect")) {
                    mistakes++;
                    characters[charIndex].classList.add("incorrect");
                }
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        if (charIndex < characters.length) {
            characters[charIndex].classList.add("active");
        } else {
            loadParagraph();
            charIndex = 0;
        }

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }

    results.push({ wpm: Math.round(wpm), cpm: Math.round(cpm), mistakes: mistakes });

    // Show the results dialog when the timer hits 0
    if (timeLeft === 0) {
        showResults();
    }
}





function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.textContent = timeLeft;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }if (timeLeft === 0) {
        clearInterval(timer);
        showResults();
    }
}

function showResults() {
    resultWpm.innerText = `WPM: ${wpmTag.innerText}`;
    resultCpm.innerText = `CPM: ${cpmTag.innerText}`;
    resultMistakes.innerText = `Mistakes: ${mistakeTag.innerText}`;
    modal.style.display = "block";
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
    modal.style.display = "none";
}

tryAgainBtn.addEventListener("click", resetGame);
resultTryAgainBtn.addEventListener("click", resetGame);
closeBtn.addEventListener("click", () => modal.style.display = "none");

loadParagraph();
inpField.addEventListener("input", initTyping);


loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);


///////////////////////////////////////////



function changeFont(font) {
    const body = document.body;
    body.style.fontFamily = font;
  }

  // Event listener for font selector dropdown
  const fontSelector = document.getElementById('font-selector');
  fontSelector.addEventListener('change', function() {
    const selectedFont = fontSelector.value;
    changeFont(selectedFont);
  });

/////////////////////////////////////////////////////
// JavaScript
document.addEventListener("DOMContentLoaded", function() {
    const themeSelector = document.getElementById("theme-selector");
  
    themeSelector.addEventListener("change", function() {
      const theme = this.value;
      if (theme === "dark") {
        document.getElementById("theme-stylesheet").href = "themes/theme-dark.css";
      } else {
        document.getElementById("theme-stylesheet").href = ""; // Change to your light theme CSS file
      }
    });
  });
  