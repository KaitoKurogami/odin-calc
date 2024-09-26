let opp1 = null;
let opp2 = null;
let sign = null;

let stringCalc = ""
const DIV_ZERO_STRING="can't divide by 0"

/* obtener los operandos y el signo a partir del string*/
function parseString(){
    const components = stringCalc.split(" ");
    for (let i = 0; i < components.length; i++){
        if (components[i].endsWith(".")){
            components[i] += "0";
        }
    }
    if(components.length === 3 && (components[2] !== "")){
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
    }
}

function setButtons(){
    const numButtons = document.querySelectorAll(".numRow .opp");
    for (let btn of Array.from(numButtons)){
        btn.addEventListener("click",()=>{
            let boolDelete = false
            if (btn.id==="dot"){
                let spcIndex = stringCalc.indexOf(" ");
                if( spcIndex === -1){
                    if(stringCalc.indexOf(".") !== -1){
                        boolDelete = true;
                    }
                }else{
                    if(stringCalc.indexOf(".",spcIndex) !== -1){
                        boolDelete = true;
                    }
                }
                if (stringCalc.endsWith(" ") || stringCalc === ""){
                    stringCalc += "0"
                }
            }
            stringCalc = stringCalc + btn.textContent;
            if (boolDelete){
                stringCalc = stringCalc.slice(0,-1);
                boolDelete = false;
            }
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
            if (stringCalc.endsWith(" ")) {
                stringCalc = stringCalc.slice(0,-3)
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

    const backBtn = document.querySelector("#back")
    backBtn.addEventListener("click", () => {
        if(stringCalc.endsWith(" ")){
            stringCalc = stringCalc.slice(0,-3);
        }else{
            stringCalc = stringCalc.slice(0,-1);
        }
        updateDisplay();
    })
}

setButtons();