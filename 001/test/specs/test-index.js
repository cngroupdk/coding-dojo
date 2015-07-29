'use strict';

// 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// 2. Any live cell with two or three live neighbours lives on to the next generation.
// 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
// 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.


/*
- 4 rules of simple design
- editor
- windows
- faster tests
- svetly text/select (kontrastni theme pro editor)
*/

var Game = {
  init: function() {
    return Game;
  },
  cells: [],
  coordinates: []
};

class Cell {
  constructor (isLiving, x, y) {
    this.isLiving = isLiving;
    this.coordinate = {
      x: x,
      y: y
    };
  }

  isCellLivingInNextIteration(livingNeighbours) {
    return (livingNeighbours>1 && livingNeighbours < 4 && this.isLiving)
    || (!this.isLiving && livingNeighbours === 3) ;
  }
}

describe('Game', function() {
    var game = Game.init();

    it('should init', function() {
        expect(game).toBeDefined();
    });
    it('should have cells',function(){

      expect(game.cells).toBeDefined();
      expect(game.cells.length).toBeDefined();
    })

    describe('should have coordinates', function() {
      it('', function() {
        expect(game.coordinates).toBeDefined();
        expect(game.coordinates.length).toBeDefined();


      })

    });
  });

  describe('Cell', function() {

    var liveCell = new Cell(true, 1, 1),
        deadCell = new Cell(false, 2, 2);

    it('has coordinates',function(){
      expect(liveCell.coordinate.x).toBeDefined();
      expect(liveCell.coordinate.y).toBeDefined();
    })

    it('is correctly created', function() {
      var testCell = new Cell(true, 1, 2);
      expect(testCell.isLiving).toBeTruthy();
      expect(testCell.coordinate.x).toBe(1);
      expect(testCell.coordinate.y).toBe(2);
    });

    describe('should return if cell is living in next step', function() {
      it('1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.', function() {
        var isLiving = liveCell.isCellLivingInNextIteration(0);
        expect(isLiving).toBeFalsy();
        isLiving = liveCell.isCellLivingInNextIteration(1);
        expect(isLiving).toBeFalsy();
      })
      it('2. Any live cell with two or three live neighbours lives on to the next generation.', function() {
        var isLiving = liveCell.isCellLivingInNextIteration(2);
        expect(isLiving).toBeTruthy();
      })
      it('3. Any live cell with more than three live neighbours dies, as if by overcrowding.', function() {
        var isLiving = liveCell.isCellLivingInNextIteration(4);
        expect(isLiving).toBeFalsy();
      })
      it('4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.', function() {
        var isLiving = deadCell.isCellLivingInNextIteration(2);
        expect(isLiving).toBeFalsy();
        isLiving = deadCell.isCellLivingInNextIteration(3);
        expect(isLiving).toBeTruthy();
      })

    });


});
