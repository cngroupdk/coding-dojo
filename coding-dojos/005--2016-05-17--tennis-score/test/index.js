const chai = require('chai');
const mocha = require('mocha');
const expect = chai.expect;

var A = 1, B = 2;

function numberOfWonBalls(state, player) {
  return state.reduce((totalBallsWon, ballWinner) => {
    if (ballWinner === player) {
      return totalBallsWon + 1;
    }
    return totalBallsWon;
  }, 0);
}

function playerScore(numberOfWins) {
  return ['0', '15', '30', '40', '40A'][numberOfWins];
}

function score(state) {
  const aWins = numberOfWonBalls(state, A);
  const bWins = numberOfWonBalls(state, B);
  
  if (aWins >= 4 && bWins >= 4) {
    if (aWins == 5 && bWins == 4) {
      return '40A:40';
    }
    
    if (bWins - aWins > 2) {
      return 'Player B wins';
    }
    
    return '40:40'
  }
  
  if (bWins - aWins > 3) {
    return 'Player B wins';
  }
  
  if (bWins == 5) {
    return 'Player B wins';
  }
  
  return `${playerScore(aWins)}:${playerScore(bWins)}`;
}

describe('numberOfWonBalls', () => {
  it('return 0 wins of A for empty game', () => {
    expect(numberOfWonBalls([], A)).to.equal(0);
  });

  it('return 1 win of A for 15:0', () => {
    expect(numberOfWonBalls([A], A)).to.equal(1);
  });
  
  it('return 1 win for A for 15:15', () => {
    expect(numberOfWonBalls([A, B], A)).to.equal(1);
  });

  it('return 2 win for A for 30:15', () => {
    expect(numberOfWonBalls([A, B, A], A)).to.equal(2);
  });
});

describe('score', function() {
  it('returns 0:0 for empty game', () => {
    expect(score([])).to.equal('0:0');
  });

  it('player A win the ball', () => {
    expect(score([A])).to.equal('15:0');
  });

  it('player B win the ball', () => {
    expect(score([B])).to.equal('0:15');
  });
  
  it('Player A wins 2 times', () => {
    expect(score([A, A])).to.equal('30:0');
  });
  
  it('Player A wins 3 times', () => {
    expect(score([A, A, A])).to.equal('40:0');
  });

  it('Player B wins 2 times', () => {
    expect(score([B, B])).to.equal('0:30');
  });

  it('Player B wins 3 times', () => {
    expect(score([B, B, B])).to.equal('0:40');
  });
  
  it('Playes A wins and then player B wins', () => {
    expect(score([A, B])).to.equal('15:15');
  });
  
  it('return "40:40A" for advantage player B', () => {
    expect(score([A, A, A, B, B, B, B])).to.equal('40:40A');
  });
  
  it('return "40:40" for back from advantage player B', () => {
    expect(score([A, A, A, B, B, B, B, A])).to.equal('40:40');
  });
  
  it('return "40A:40" for back from advantage player B', () => {
    expect(score([A, A, A, B, B, B, B, A, A])).to.equal('40A:40');
  });
  
  it('B wins after deuce', () => {
    expect(score([A, A, A, B, B, B, B, B])).to.equal('Player B wins');
  });

  it('Player B wins without deuce', () => {
    expect(score([B, B, B, B])).to.equal('Player B wins');
  });
});