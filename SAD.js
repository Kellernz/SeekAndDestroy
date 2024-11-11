const command = require('readline-sync')
const mapSize = 30 //Map size based on km
const mapDirections = [
    [-1, 0], [1, 0], [0, 1], [0, -1],
    [-1, -1], [1, -1], [-1, 1], [1, 1]
] //Map cardinal directions 
//Enemy stats
const enemySquads = 3
let enemies = []
//Player stats
let ammo = 12
let turns = 0
let gameWon = false
let gameLost = false

function generateRandomPosition() {
    return {
        x: Math.floor(Math.random() * mapSize),
        y: Math.floor(Math.random() * mapSize)
    }
} // Generates enemy random positions
function initEnemies() {
    enemies = []
    while (enemies.length < enemySquads) {
        const newPosition = generateRandomPosition()
        //To ensure that enemies do not overlap
        if (!enemies.some(enemy => enemy.x === newPosition.x && enemy.y === newPosition.y))
            enemies.push(newPosition)
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

        // Makes sure the wave position is within bounds
        if (wavePosition.x >= 0 && wavePosition.x < mapSize && wavePosition.y >= 0 && wavePosition.y < mapSize) {
            signals.push(wavePosition);
        }
    });
    return signals;
}