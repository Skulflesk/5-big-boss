let shots = [];
let overheated = false;
let resetTimer;

document.getElementById("shootButton").addEventListener("click", shoot);

function shoot() {
    if (overheated) {
        return;
    }

    clearTimeout(resetTimer);

    let now = Date.now();

    shots = shots.filter(time => now - time < 5000);

    shots.push(now);

    document.getElementById("shots").innerText =
        "Shots: " + shots.length + " / 10";

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

        document.getElementById("shootButton").disabled = false;
        document.getElementById("status").innerText = "Weapon Ready";
        document.getElementById("shots").innerText = "Shots: 0 / 10";

    }, 5000);
}