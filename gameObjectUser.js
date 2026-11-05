let shots = [];
let overheated = false;
let resetTimer;
let counter = 0;
let enemies = 0;

document.getElementById("shootButton").addEventListener("click", shoot);

function shoot() {
    if (overheated) {
        return;
    }

    clearTimeout(resetTimer);

    let now = Date.now();

    shots = shots.filter(time => now - time < 5000);

    shots.push(now);

    counter++;

    if (counter == 3) {
        counter = 0;
        enemies++;
    }

    document.getElementById("shots").innerText =
        "Shots: " + shots.length + " / 10";

    document.getElementById("status").innerText =
        "Enemies: " + enemies;

    if (shots.length >= 10) {
        overheat();
        return;
    }

    resetTimer = setTimeout(function() {
        shots = [];
        document.getElementById("shots").innerText = "Shots: 0 / 10";
    }, 3000);
}

function overheat() {
    overheated = true;

    clearTimeout(resetTimer);

    document.getElementById("shootButton").disabled = true;
    document.getElementById("status").innerText = "OVERHEATED!";

    setTimeout(function() {
        overheated = false;
        shots = [];
        counter = 0;

        document.getElementById("shootButton").disabled = false;
        document.getElementById("status").innerText = "Enemies: " + enemies;
        document.getElementById("shots").innerText = "Shots: 0 / 10";

    }, 5000);
}