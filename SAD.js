const command = require('readline-sync');
const mapSize = 30; // Map size based on km
const mapDirections = [
    [-1, 0], [1, 0], [0, 1], [0, -1],
    [-1, -1], [1, -1], [-1, 1], [1, 1]
]; // Map cardinal directions 

// Enemy stats
const enemySquads = 3;
let enemies = [];

// Player stats
let ammo = 12;
let turns = 0;
let gameWon = false;
let gameOver = false; // Declare gameOver variable

// Generates enemy random positions
function generateRandomPosition() {
    return {
        x: Math.floor(Math.random() * mapSize),
        y: Math.floor(Math.random() * mapSize)
    };
}

// Initializes enemies ensuring no overlap
function initEnemies() {
    enemies = [];
    while (enemies.length < enemySquads) {
        const newPosition = generateRandomPosition();
        // Ensure that enemies do not overlap
        if (!enemies.some(enemy => enemy.x === newPosition.x && enemy.y === newPosition.y))
            enemies.push(newPosition);
    }
}

// Emits a radio wave to detect nearby enemies
function emitRadioWave(enemyPosition) {
    const signals = [];
    // Checks each direction for enemies within 3 km
    mapDirections.forEach(([dx, dy]) => {
        const wavePosition = {
            x: enemyPosition.x + dx * 3,
            y: enemyPosition.y + dy * 3
        };

        // Make sure the wave position is within bounds
        if (wavePosition.x >= 0 && wavePosition.x < mapSize && wavePosition.y >= 0 && wavePosition.y < mapSize) {
            signals.push(wavePosition);
        }
    });
    return signals;
}

// Aggregate signals from all enemies
function getAllSignals() {
    const allSignals = [];
    enemies.forEach(enemy => {
        const signals = emitRadioWave(enemy);
        signals.forEach(signal => {
            // Avoid duplicate signals
            if (!allSignals.some(s => s.x === signal.x && s.y === signal.y)) {
                allSignals.push(signal);
            }
        });
    });
    return allSignals;
}

// Checks if the player’s guess hits any enemies
function guessEnemyPosition(playerGuessPositionX, playerGuessPositionY) {
    let hits = 0;
    // Iterate backwards to safely remove elements while iterating
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        if (playerGuessPositionX === enemy.x && playerGuessPositionY === enemy.y) {
            hits++;
            // Remove the enemy from the map after a hit
            enemies.splice(i, 1);
        }
    }
    return hits;
}

// Display game status
function gameStatus() {
    console.log(`\nTurn ${turns}:`);
    console.log(`Katyusha barrages remaining: ${ammo}`);
    console.log("Nazis remaining:", enemies.length);
    if (enemies.length === 0) {
        console.log("You've destroyed all enemies of the Motherland, we won! For now...");
        gameWon = true;
    }
}

// Display detected radio wave signals
function displaySignals(signals) {
    if (signals.length === 0) {
        console.log("No radio wave signals detected.");
        return;
    }
    console.log("\nDetected Radio Wave Signals at the following coordinates:");
    signals.forEach((signal, index) => {
        console.log(`${index + 1}. X: ${signal.x}, Y: ${signal.y}`);
    });
}

// Initialize enemies at the start of the game
initEnemies();
console.log("Give us the order, comrade commander!");

// Main game loop
while (!gameOver && !gameWon) {
    // Display current game status
    gameStatus();

    // Display radio wave signals as hints
    const signals = getAllSignals();
    displaySignals(signals);

    // Prompt player for guess
    let playerGuessPositionX = command.questionInt('Enter X coordinate to fire at: ');
    let playerGuessPositionY = command.questionInt('Enter Y coordinate to fire at: ');
    console.log(`\nFiring HE at X: ${playerGuessPositionX} Y: ${playerGuessPositionY}`);

    // Check if the player guessed correctly
    const hits = guessEnemyPosition(playerGuessPositionX, playerGuessPositionY);
    if (hits > 0) {
        console.log(`We destroyed the fascist scum!`);
    } else {
        console.log("We missed. Let us try again, for the Motherland!");
    }

    ammo--; // Decrease ammo after each guess
    turns++; // Increment turn count

    // Update game status and check for win/loss conditions
    gameStatus();

    // Check for loss condition
    if (ammo <= 0 && enemies.length > 0) {
        console.log("\nThere are no more katyushas! The fascists are coming!");
        gameOver = true;
    }

    // Display endgame messages if applicable
    if (gameWon) {
        console.log("\nVictory is ours! Next time, we will strike Berlin!");
    } else if (gameOver) {
        console.log("\nWe must run, NOW!");
    }
}