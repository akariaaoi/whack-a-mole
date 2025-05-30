let currMoleTile;
let currPlantTile;
let score = 0;
let timeLeft = 40;
let gameOver = false;
let moleInterval;
let plantInterval;
let countdownInterval;

document.getElementById("startBtn").addEventListener("click", () => {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("info").style.display = "flex";
    document.getElementById("board").style.display = "flex";
    setGame();
});

document.getElementById("restartBtn").addEventListener("click", () => {
    restartGame();
});

function setGame() {
    document.getElementById("board").innerHTML = "";

    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    moleInterval = setInterval(setMole, 1000);
    plantInterval = setInterval(setPlant, 2000);
    countdownInterval = setInterval(updateTimer, 1000);

    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("timer").innerText = `Time: ${timeLeft}s`;
}

function updateTimer() {
    timeLeft--;
    document.getElementById("timer").innerText = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) endGame();
}

function endGame() {
    gameOver = true;
    clearInterval(moleInterval);
    clearInterval(plantInterval);
    clearInterval(countdownInterval);
    document.getElementById("gameover-sound").play();

    if (currMoleTile) currMoleTile.innerHTML = "";
    if (currPlantTile) currPlantTile.innerHTML = "";

    document.getElementById("finalScore").innerText = `Final Score: ${score}`;
    document.getElementById("end-screen").style.display = "block";
}

function restartGame() {
    score = 0;
    timeLeft = 60;
    gameOver = false;
    currMoleTile = null;
    currPlantTile = null;

    document.getElementById("end-screen").style.display = "none";
    document.getElementById("score").innerText = `Score: ${score}`;
    document.getElementById("timer").innerText = `Time: ${timeLeft}s`;

    setGame();
}

function getRandomTile() {
    return Math.floor(Math.random() * 9).toString();
}

function setMole() {
    if (gameOver) return;
    if (currMoleTile) currMoleTile.innerHTML = "";

    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id === num) return;

    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) return;
    if (currPlantTile) currPlantTile.innerHTML = "";

    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id === num) return;

    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) return;

    if (this === currMoleTile) {
        score += 10;
        document.getElementById("hit-sound").play();
    } else if (this === currPlantTile) {
        score -= 5;
        if (score < 0) score = 0;
        document.getElementById("miss-sound").play();
    }

    document.getElementById("score").innerText = `Score: ${score}`;
}
