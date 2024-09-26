let opp1 = null;
let opp2 = null;
let sign = null;

let stringCalc = ""

/* obtener los operandos y el signo a partir del string*/
function parseString(){
    const components = stringCalc.split(" ");
    if(components.length === 3){
        opp1 = components[0]*1;
        opp2 = components[2]*1;
        sign = components[1];
    }
}

function resetValues(){
    opp1 = null;
    opp2 = null;
    sign = null;
}

function rounded(num){
    return Math.round(num * 10) / 10;
}

function operationAllowed(){
    return !(opp1 === null || opp2 === null || sign === null);
}

function add(){
    return String(opp1+opp2);
}

function subtract(){
    return String(opp1-opp2);
}

function multiply(){
    return String(rounded(opp1*opp2));
}

function divide(){
    return String(rounded(opp1/opp2));
}

function updateDisplay(){
    const display = document.querySelector(".calcScreen");
    display.value = stringCalc;
}

function setButtons(){
    const numButtons = document.querySelectorAll(".numRow .opp");
    for (let btn of Array.from(numButtons)){
        btn.addEventListener("click",()=>{
            stringCalc = stringCalc + btn.textContent;
            updateDisplay()
        })
    }


    const oppButtons = document.querySelectorAll(".operatorPad .opp");
    for (let btn of Array.from(oppButtons)){
        btn.addEventListener("click",()=>{
            stringCalc = stringCalc + " " + btn.textContent + " ";
            updateDisplay()
        })
    }

    const equBtn = document.querySelector(".equal")
    equBtn.addEventListener("click",()=>{
        parseString();
        console.log(operationAllowed());
        if (operationAllowed()){
            switch(sign){
                case "+":
                    stringCalc = add();
                    break;
                case "-":
                    stringCalc = subtract();
                    break;
                case "*":
                    stringCalc = multiply();
                    break;
                case "/":
                    stringCalc = divide();
                    break;
            }
        }else{
            resetValues();
        }
        updateDisplay()
    })
}

setButtons();