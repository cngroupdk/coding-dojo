import assert from 'assert';

// 1) Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// 2) Any live cell with two or three live neighbours lives on to the next generation.
// 3) Any live cell with more than three live neighbours dies, as if by overcrowding.
// 4) Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.


function isAliveInNextGeneration(isAlive, neighbours) {
    return (isAlive && neighbours == 2) || neighbours == 3;
}

function getNeighbours(x,y) {
    return [
        [0,1],
        [1,1],
        [1,0],
        [1,-1],
        [0,-1],
        [-1,-1],
        [-1,0],
        [-1,1]].map(function(relative) {
        return [relative[0] + x, relative[1] + y]
    });
}

var cellsAlive = [];

function getAliveCellIndex(x,y) {
    return cellsAlive.findIndex( function(cellAlive){
        if(cellAlive[0] == x && cellAlive[1] == y) return true;
    });
}

function isAlive(x,y){
    if (getAliveCellIndex(x, y) != -1){
        return true;
    }

    return false;
}

function setStatus(x,y, status){
    if (status) {
        cellsAlive.push([x, y]);
    }
    else if (isAlive(x, y)) {
        cellsAlive.splice(getAliveCellIndex(x, y));
    }
}

assert.equal(isAlive(0,0), false);
setStatus(0,0,true);
assert.equal(isAlive(0,0),true);
assert.equal(isAlive(0,1),false);
assert.equal(isAlive(0,0),true);
setStatus(0,1, true);
assert.equal(isAlive(0,0), true);
assert.equal(isAlive(0,1), true);
setStatus(0,1, false);
assert.equal(isAlive(0,1), false);
setStatus(1,0, true);
setStatus(1,1, true);

function liveNeighboursCount(x, y) {
    var neighbours = getNeighbours(x, y)
    var count = 0
    neighbours.forEach(function(cell){
        if(isAlive(cell[0],cell[1])){
            count++
        }
    });
    return count;
}

assert.equal(liveNeighboursCount(0,1), 3);
assert.equal(liveNeighboursCount(0,0), 2);
assert.equal(liveNeighboursCount(-1,-1), 1);
//assert.equal(liveNeighboursCount(0,0), 2);
//assert.equal(liveNeighboursCount(0,0), 2);


assert.equal(isAliveInNextGeneration(true, 1), false);  //rule 1

assert.equal(isAliveInNextGeneration(true, 3), true);   //rule 2
assert.equal(isAliveInNextGeneration(true, 2), true);   //rule 2

assert.equal(isAliveInNextGeneration(true, 4), false);  //rule 3

assert.equal(isAliveInNextGeneration(false, 4), false); //rule 4
assert.equal(isAliveInNextGeneration(false, 3), true);  //rule 4
assert.equal(isAliveInNextGeneration(false, 2), false); //rule 4
assert.equal(isAliveInNextGeneration(false, 1), false); //rule 4
assert.equal(isAliveInNextGeneration(false, 5), false); //rule 4
assert.deepEqual(getNeighbours(0,0),[
    [0,1],
    [1,1],
    [1,0],
    [1,-1],
    [0,-1],
    [-1,-1],
    [-1,0],
    [-1,1]]);
assert.deepEqual(getNeighbours(0,1),[
    [0,2],
    [1,2],
    [1,1],
    [1,0],
    [0,0],
    [-1,0],
    [-1,1],
    [-1,2]]);
assert.deepEqual(getNeighbours(1,1),[
    [1,2],
    [2,2],
    [2,1],
    [2,0],
    [1,0],
    [0,0],
    [0,1],
    [0,2]]);



console.log('all ok');
