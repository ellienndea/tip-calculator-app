    let chosenTipPercent = 10;

    /* update tip % chosen */
    function updateTipPercent(){
        if(tipChoice() === undefined || isNaN(tipChoice())){/* prevents results with NaN */
            chosenTipPercent = 10;
        } else {
        chosenTipPercent = tipChoice();/* changes chosenTipPercent */
    }}
    
    /* get value from radio group */
let selectTip = document.getElementById("select-tip");
function tipChoice(){ 
    let radios = document.getElementsByName("tipChoice");/* radio group */
    for(let i=0; i<radios.length;i++){
            if(radios[i].checked){/* checked radio btn -> value tip percent */
                if(radios[i].id == "custom"){/* if custom value should be put in */
                    let customInput = document.getElementById("customInput");
                    customInput.focus();/* moves focus to number input */
                    tipValue = parseFloat(customInput.value);
                    return tipValue;
                    
                } else{ 
                    customInput.removeAttribute("focus");/* removes focus if custom was checked before */
                    let tipValue = parseFloat(radios[i].value);/* if radio btn with % is checked -> direct value tip percent */
                    return tipValue;
            }}
    }}
selectTip.addEventListener("click", ()=> tipChoice());/* if tip percent btn is clicked tip % value gets (re-)calculated */
    
    /*  */
    document.addEventListener("change",function(){
        updateTipPercent();/* if anything changes,tip % value gets (re-)calculated  */
        let billVal = document.getElementById("bill").value;
        let bill = parseInt(billVal,10);
        
        let people = document.getElementById("number-people").value;
        let tipPerson = document.getElementById("tipSum");
        let tipPersonCalc;
        let totalPerson = document.getElementById("totalSum");
        let totalPersonCalc;
        let reset = document.getElementById("reset");
        let tipAmount = bill/100*chosenTipPercent;
        console.log(isNaN(tipAmount))
        tipPersonCalc = tipAmount/people;
        totalPersonCalc = (bill+tipAmount)/people;
        if(tipPersonCalc == Infinity || isNaN(tipPersonCalc)){
            tipPerson.innerText="$" + "0.00"
        } else {
            tipPerson.innerText="$" + tipPersonCalc.toFixed(2);
        };
        if(totalPersonCalc == Infinity || isNaN(totalPersonCalc)){
            totalPerson.innerText="$" + "0.00"
        } else {
            totalPerson.innerText="$" + totalPersonCalc.toFixed(2);
        }/* listening for zero people and toggle classes for warning */
        let peopleNumber = document.getElementById("number-people");
        let warning = document.getElementById("warning");
        if(people == 0){
            peopleNumber.classList.add("red-border");
            warning.classList.remove("no-warning");
        } else {
            peopleNumber.classList.remove("red-border");
            warning.classList.add("no-warning");
        }
        reset.classList.remove("empty");
        /* set warning, tip-person, total-person to zero */
        reset.addEventListener("click", ()=>{
            peopleNumber.classList.remove("red-border");
            warning.classList.add("no-warning");
            tipPerson.innerText="$" + "0.00";
            totalPerson.innerText="$" + "0.00";
            reset.classList.add("empty");
        })
    })
    