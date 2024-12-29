let noOfFloors = document.getElementById("floorsInput")
let noOfLifts = document.getElementById("liftsInput")
let submitBtn = document.getElementById("submit-btn")
let navButton = document.getElementsByName("navButton")
let liftPositions = []

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
    let existingContainer = document.getElementById("container");
    if (existingContainer) {
        existingContainer.remove(); 
    }
    let container = document.createElement("div")
    container.id = "container"
    container.style.setProperty("--total-floors",noOfFloors);
    document.body.appendChild(container)
    let liftHolder = document.createElement("div")
    liftHolder.id = "liftHolder"
    
    container.appendChild(liftHolder)
    for (let index =  noOfFloors; index > 0; index--) {
        let floor = document.createElement("div")
        floor.className = "floor"
        floor.innerHTML = "Floor No. " +index
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
    
    for(let index = 1;index<=noOfLifts;index++){
        let lift = document.createElement("div")
        lift.id = "lift"+index
        lift.className = "lift"
        lift.style.bottom = "0px"
        liftHolder.appendChild(lift)
        liftPositions.push(1);

    }
    document.querySelectorAll('.navButton').forEach(button =>{
    button.addEventListener("click",function(){
            let buttonId = this.id;
            let floorNumber = parseInt(buttonId.replace(/\D/g, ''))
            console.log(`floor no is ${floorNumber}`)
            let direction = this.innerHTML.toLowerCase();
            
            liftMove(floorNumber);
        }
    )
})

}


function resetValues(){
    noOfFloors.value = "";
    noOfLifts.value = "";
    submitBtn.disabled = false;
}


function liftMove(floorNumber) {
    let closestLiftIndex = -1;
    let minDistance = Infinity;

    
    for (let i = 0; i < liftPositions.length; i++) {
        let distance = Math.abs(liftPositions[i] - floorNumber);
        if (distance < minDistance) {
            closestLiftIndex = i;
            minDistance = distance;
        }
    }

    
    if (closestLiftIndex !== -1) {
        console.log(
            `Lift ${closestLiftIndex + 1} is moving from Floor ${liftPositions[closestLiftIndex]} to Floor ${floorNumber}`
        );
        animateLift(closestLiftIndex + 1, floorNumber);
    }
}




function animateLift(liftIndex, destinationFloor) {
    let lift = document.getElementById(`lift${liftIndex}`);
    let floorHeight = 210; 
    let currentLiftPosition = liftPositions[liftIndex - 1]; 
    let movementDistance = (destinationFloor - 1) * floorHeight;

    console.log(
        `Lift ${liftIndex} moving from Floor ${currentLiftPosition} to Floor ${destinationFloor}`
    );
    console.log(`Calculated movement distance: ${movementDistance}px`);

    
    lift.style.transform = `translateY(-${movementDistance}px)`;

    
    setTimeout(() => {
        liftPositions[liftIndex - 1] = destinationFloor; 
        console.log(`Lift ${liftIndex} has reached Floor ${destinationFloor}`);
    }, 500); 
}
