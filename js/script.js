let opp1 = null;
let opp2 = null;
let sign = null;

let stringCalc = ""
const DIV_ZERO_STRING="can't divide by 0"

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
    return (Math.round(num * 10) / 10);
}

function operationAllowed(){
    return !(opp1 === null || opp2 === null || sign === null);
}

function add(opp1,opp2){
    return (opp1+opp2).toFixed(1);
}

function subtract(opp1,opp2){
    return (opp1-opp2).toFixed(1);
}

function multiply(opp1,opp2){
    return (rounded(opp1*opp2)).toFixed(1);
}

function divide(opp1,opp2){
    if (opp2 === 0){
        return DIV_ZERO_STRING
    }
    return (rounded(opp1/opp2)).toFixed(1);
}

function updateDisplay(){
    const display = document.querySelector(".calcScreen");
    display.value = stringCalc;
}

function operate(opp, num1, num2){
    switch(opp){
        case "+":
            stringCalc = add(num1, num2);
            break;
        case "-":
            stringCalc = subtract(num1, num2);
            break;
        case "*":
            stringCalc = multiply(num1, num2);
            break;
        case "/":
            stringCalc = divide(num1, num2);
            break;
    }
    if (stringCalc.endsWith(".0")){
        stringCalc = stringCalc.slice(0,-2);
        console.log(stringCalc)
    }
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
            parseString();
            if(operationAllowed()){
                operate(sign,opp1,opp2);
            }else{
                resetValues()
            }
            if(stringCalc === "" || stringCalc === DIV_ZERO_STRING){
                stringCalc = "0"
            }
            stringCalc = stringCalc + " " + btn.textContent + " ";
            updateDisplay()
        })
    }

    const equBtn = document.querySelector(".equal")
    equBtn.addEventListener("click",()=>{
        parseString();
        if (operationAllowed()){
            operate(sign,opp1,opp2)
        }else{
            resetValues();
        }
        updateDisplay()
    })

    const clearBtn = document.querySelector("#clear")
    clearBtn.addEventListener("click", () => {
        resetValues();
        stringCalc = "";
        updateDisplay();
    })
}

setButtons();