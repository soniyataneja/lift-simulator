let noOfFloors = document.getElementById("floorsInput")
let noOfLifts = document.getElementById("liftsInput")
let submitBtn = document.getElementById("submit-btn")


submitBtn.addEventListener("click", function (){
    if(noOfFloors.value  > 10){
        alert("Maximum no of floors can be 10!")
    }
    else if(noOfLifts.value>5){
        alert("Maximum no of lifts can be 5!")
    }
    else if(noOfFloors.value === "" || noOfLifts.value === "" || noOfFloors.value == 0 || noOfLifts.value == 0 ){
        alert("Enter valid input!")
    }
    else if(noOfFloors.value === 0 || noOfLifts.value === 0 ){
        alert("Values can't be zero")
    }
    else if (noOfFloors.value < 0 || noOfLifts.value < 0) {
        alert("No negative values are allowed");}
    else{
        createLifts(noOfFloors.value,noOfLifts.value);
        resetValues();
    }

}) 

function createLifts(noOfFloors,noOfLifts){
    let container = document.createElement("div")
    container.id = "container"
    document.body.appendChild(container)
    for (let index =  noOfFloors; index > 0; index--) {
        let floor = document.createElement("div")
        floor.className = "floor"
        floor.innerHTML = "Floor No. "+index
        floor.id = "floor"+index
        container.appendChild(floor)
        let hrelement = document.createElement("hr")
        container.appendChild(hrelement)
        let upButton = document.createElement("button")
        upButton.id = "upButton"+index
        upButton.className = "navButton"
        floor.appendChild(upButton)
        upButton.innerHTML = "Up"
        let downButton = document.createElement("button")
        downButton.id = "downButton"+index
        downButton.className="navButton"
        floor.appendChild(downButton)
        downButton.innerHTML = "Down"
        
    }
    let liftHolder = document.createElement("div")
    liftHolder.id = "liftHolder"
    let floor1 = document.getElementById("floor1")
    floor1.appendChild(liftHolder)
    for(let index = noOfLifts;index>0;index--){
        let lift = document.createElement("div")
        lift.id = "lift"+index
        lift.className = "lift"
        liftHolder.appendChild(lift)
    }
}

function resetValues(){
    noOfFloors.value = "";
    noOfLifts.value = "";
    submitBtn.disabled = true;
}

