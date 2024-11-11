const command = require('readline-sync')
const mapSize = 30 //Map size based on km
const mapDirections = [
    [-1, 0], [1, 0], [0, 1], [0, -1],
    [-1, -1], [1, -1], [-1, 1], [1, 1]
] //Map cardinal directions 
const enemySquads = 3
let enemies = []
function generateRandomPosition(){
    return {
        x: Math.floor(Math.random() * mapSize),
        y: Math.floor(Math.random() * mapSize)
    }
}