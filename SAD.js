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
} // generates enemy random positions
function initEnemies() {
    enemies = []
    while 
}