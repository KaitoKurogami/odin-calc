let opp1 = null;
let opp2 = null;
let sign = null;

let stringCalc = ""

function parseString(){
    const components = stringCalc.split(" ");
    if(components.length === 3){
        opp1 = components[0]*1;
        opp2 = components[2]*1;
        sign = components[1];
    }
}

function operationAllowed(){
    return !(opp1 === null || opp2 === null || sign === null)
}

function add(){
    return String(opp1+opp2)
}

function subtract(){
    return String(opp1-opp2)
}

function multiply(){
    return String(opp1*opp2)
}

function divide(){
    return String(opp1/opp2)
}