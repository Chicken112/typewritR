//======================================================\\
//  ________                             _     _____    \\
//  |__   __|                           (_) | |  __ \   \\
//     | |_   _ _ __   _____      ___ __ _| |_| |__) |  \\
//     | | | | | '_ \ / _ \ \ /\ / / '__| | __|  _  /   \\
//     | | |_| | |_) |  __/\ V  V /| |  | | |_| | \ \   \\
//     |_|\__, | .__/ \___| \_/\_/ |_|  |_|\__|_|  \_\  \\
//         __/ | |                                      \\
//        |___/|_|                                      \\
//======================================================\\
//            Javascript typewriter effect              \\
//            Made with <3 by Peter Ferencz             \\
//======================================================\\


//Modify theese values
const parent = document.querySelector('.typewrite')
const timeBetweenCharacters = 25;


//Start of script
var typing = false
let consoleStack = []
let currentInnerHTML = ""

function addToConsoleLine(text){
    return new Promise((resolve, reject) => {
        currentInnerHTML += `<p">`
        let i = 0
        let inhtmlTag = false
        addToConsoleChar()
        function addToConsoleChar(){
            if(i < text.length){
                const char = text.charAt(i)
                currentInnerHTML += char
                i++

                if(inhtmlTag){
                    if(char == ">"){
                        inhtmlTag = false
                        addToConsoleChar()
                    }else{
                        addToConsoleChar()
                    }
                }else if(char == "<"){
                    inhtmlTag = true
                    addToConsoleChar()
                }else{
                    parent.innerHTML = currentInnerHTML
                    setTimeout(addToConsoleChar, timeBetweenCharacters)
                }
            }else{
                currentInnerHTML += `</p>`
                parent.innerHTML = currentInnerHTML
                resolve()
                return;
            }

        }
    })
}


function addLine(text){
    consoleStack.push(text)
    if(!typing){
        displayStack()
    }
}

function displayStack(){
    typing = true;

    addToConsoleLine(consoleStack.shift())
    .then(()=> {
        if(consoleStack.length > 0){
            displayStack()
        }else{
            typing = false
        }
    }, (err) => {console.log('error: ' + err)})
}