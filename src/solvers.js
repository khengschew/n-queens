/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// Define new board class
var newBoard = function(obj) {
  this.n = obj.n;
  this.grid = _(_.range(this.n)).map(function() {
    return undefined;
  });
};

newBoard.prototype.rows = function () {
  return this.grid;
};

newBoard.prototype.togglePiece = function (rowIndex, colIndex) {
  // Shouldn't use this method. Instead, set the value directly
  // Bug: toggle will replace the value with undefined,
  // even if we want to replace with value
  var newValue = this.grid[rowIndex] === undefined || this.grid[rowIndex] !== colIndex ? colIndex : undefined;
  this.grid[rowIndex] = newValue;
};

newBoard.prototype.hasAnyRooksConflicts = function () {
  return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
};

newBoard.prototype.hasAnyQueensConflicts = function () {
  return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
};

newBoard.prototype.hasRowConflictAt = function (rowIndex) {
  // Implementation will never have row conflicts
  // This is because each rowIndex can only hold 1 value:
  // The colIndex of the occupied space
  return false;
};

newBoard.prototype.hasAnyRowConflicts = function () {
  // Since each row has no conflicts, board will not have conflicts
  return false;
};

newBoard.prototype.hasColConflictAt = function (colIndex) {
  var counter = 0;
  for (var i = 0; i < this.n; i++) {
    if (this.grid[i] === colIndex) {
      counter++;
    }
    if (counter > 1) {
      return true;
    }
  }

  return false;
};

newBoard.prototype.hasAnyColConflicts = function () {
  for (var i = 0; i < this.n; i++) {
    if (this.grid[i] !== undefined && this.grid.indexOf(this.grid[i], i + 1) > -1) {
      return true;
    }
  }

  return false;
};

newBoard.prototype.hasMajorDiagonalConflictAt = function (majorDiagonalColumnIndexAtFirstRow) {
  var counter = 0;
  for (var i = 0; i < this.n; i++) {
    if (this.grid[i] === i + majorDiagonalColumnIndexAtFirstRow) {
      counter++;
    }
    if (counter > 1) {
      return true;
    }
  }
  return false;
};

newBoard.prototype.hasAnyMajorDiagonalConflicts = function () {
  var i = -this.n + 1;
  var hasConflicts = false;
  while (!hasConflicts && i < this.n) {
    hasConflicts = this.hasMajorDiagonalConflictAt(i);

    i++;
  }

  return hasConflicts;
};

newBoard.prototype.hasMinorDiagonalConflictAt = function (minorDiagonalColumnIndexAtFirstRow) {
  var counter = 0;
  for (var i = 0; i < this.n; i++) {
    if (this.grid[i] === minorDiagonalColumnIndexAtFirstRow - i) {
      counter++;
    }
    if (counter > 1) {
      return true;
    }
  }
  return false;
};

newBoard.prototype.hasAnyMinorDiagonalConflicts = function () {
  var i = 0;
  var hasConflicts = false;
  while (!hasConflicts && i < (this.n * 2) - 1) {
    hasConflicts = this.hasMinorDiagonalConflictAt(i);

    i++;
  }

  return hasConflicts;
};

newBoard.prototype.expandBoard = function () {
  // return this.grid.map(function(colIndex, rowIndex) {
  //   return _(_.range(this.n)).map(function(currCol) {
  //     return currCol === colIndex ? 1 : 0;
  //   });
  // });
  var retBoard = [];

  for (var i = 0; i < this.n; i++) {
    var retRow = [];
    for (var j = 0; j < this.n; j++) {
      retRow.push(this.grid[i] === j ? 1 : 0);
    }

    retBoard.push(retRow);
  }

  return retBoard;
};

/*
board tests:

var test = newBoard({n:5});
console.log(test.hasRowConflictAt(0)); // false
console.log(test.hasRowConflictAt(1)); // false
console.log(test.hasAnyRowConflicts()); // false
console.log(test.hasColConflictAt(0)); // false
console.log(test.hasColConflictAt(1)); // false
console.log(test.hasAnyColConflicts()); // false
console.log(test.hasMajorDiagonalConflictAt(-1)); // false
console.log(test.hasMajorDiagonalConflictAt(1)); // false
console.log(test.hasAnyMajorDiagonalConflicts()); // false
console.log(test.hasMinorDiagonalConflictAt(6)); // false
console.log(test.hasMinorDiagonalConflictAt(1)); // false
console.log(test.hasAnyMinorDiagonalConflicts()); // false

test.togglePiece(0, 1);
console.log(test.hasRowConflictAt(0)); // false
console.log(test.hasRowConflictAt(1)); // false
console.log(test.hasAnyRowConflicts()); // false
console.log(test.hasColConflictAt(0)); // false
console.log(test.hasColConflictAt(1)); // false
console.log(test.hasAnyColConflicts()); // false
console.log(test.hasMajorDiagonalConflictAt(-1)); // false
console.log(test.hasMajorDiagonalConflictAt(1)); // false
console.log(test.hasAnyMajorDiagonalConflicts()); // false
console.log(test.hasMinorDiagonalConflictAt(6)); // false
console.log(test.hasMinorDiagonalConflictAt(1)); // false
console.log(test.hasAnyMinorDiagonalConflicts()); // false

// Test row conflict
test.togglePiece(0, 2);
console.log(test.hasRowConflictAt(0)); // false
console.log(test.hasRowConflictAt(1)); // false
console.log(test.hasAnyRowConflicts()); // false
console.log(test.hasColConflictAt(0)); // false
console.log(test.hasColConflictAt(1)); // false
console.log(test.hasAnyColConflicts()); // false
console.log(test.hasMajorDiagonalConflictAt(-1)); // false
console.log(test.hasMajorDiagonalConflictAt(1)); // false
console.log(test.hasAnyMajorDiagonalConflicts()); // false
console.log(test.hasMinorDiagonalConflictAt(6)); // false
console.log(test.hasMinorDiagonalConflictAt(1)); // false
console.log(test.hasAnyMinorDiagonalConflicts()); // false

// Test col conflict
test.togglePiece(0, 1);
test.togglePiece(2, 1);
console.log(test.hasRowConflictAt(0)); // false
console.log(test.hasRowConflictAt(1)); // false
console.log(test.hasAnyRowConflicts()); // false
console.log(test.hasColConflictAt(0)); // false
console.log(test.hasColConflictAt(1)); // true
console.log(test.hasAnyColConflicts()); // true
console.log(test.hasMajorDiagonalConflictAt(-1)); // false
console.log(test.hasMajorDiagonalConflictAt(1)); // false
console.log(test.hasAnyMajorDiagonalConflicts()); // false
console.log(test.hasMinorDiagonalConflictAt(6)); // false
console.log(test.hasMinorDiagonalConflictAt(1)); // false
console.log(test.hasAnyMinorDiagonalConflicts()); // false

// Test major diag conflict
test.togglePiece(1, 2);
console.log(test.hasRowConflictAt(0)); // false
console.log(test.hasRowConflictAt(1)); // false
console.log(test.hasAnyRowConflicts()); // false
console.log(test.hasColConflictAt(0)); // false
console.log(test.hasColConflictAt(1)); // false
console.log(test.hasAnyColConflicts()); // false
console.log(test.hasMajorDiagonalConflictAt(-1)); // false
console.log(test.hasMajorDiagonalConflictAt(1)); // true
console.log(test.hasAnyMajorDiagonalConflicts()); // true
console.log(test.hasMinorDiagonalConflictAt(6)); // false
console.log(test.hasMinorDiagonalConflictAt(1)); // false
console.log(test.hasAnyMinorDiagonalConflicts()); // false

// Test minor diag conflict
test.togglePiece(1, 0);
console.log(test.hasRowConflictAt(0)); // false
console.log(test.hasRowConflictAt(1)); // false
console.log(test.hasAnyRowConflicts()); // false
console.log(test.hasColConflictAt(0)); // false
console.log(test.hasColConflictAt(1)); // false
console.log(test.hasAnyColConflicts()); // false
console.log(test.hasMajorDiagonalConflictAt(-1)); // false
console.log(test.hasMajorDiagonalConflictAt(1)); // false
console.log(test.hasAnyMajorDiagonalConflicts()); // false
console.log(test.hasMinorDiagonalConflictAt(6)); // false
console.log(test.hasMinorDiagonalConflictAt(1)); // true
console.log(test.hasAnyMinorDiagonalConflicts()); // true

var test = new newBoard({n:3});
test.togglePiece(0,2);
test.togglePiece(1,0);
test.togglePiece(2,1);
console.log(test.hasAnyMajorDiagonalConflicts()); // true
console.log(test.hasMajorDiagonalConflictAt(-1)); // true
*/

// Define timer function
window.timer = function(cb, ...args) {
  var startTime = Date.now();
  cb(...args);
  var endTime = Date.now();
  console.log(`Function took ${endTime - startTime}ms to run!`);
};

// Define solutions functions
window.getSolutions = function(type, n, countsOnly = true, maxSolutions = Infinity) {
  var solutions = [];
  var count = 0;
  // var startingBoard = new Board({n: n});
  var startingBoard = new newBoard({n: n});


  var convertIndexToCoord = function(index) {
    return [Math.floor(index / n), index % n];
  };

  var convertCoordToIndex = function (x, y) {
    return (x * n) + y;
  };

  var incrementCoord = function (x, y) {
    return convertIndexToCoord(convertCoordToIndex(x, y) + 1);
  };

  var rFindSolution = function(piecesPlaced, currentBoard, startIndex = 0) {
    // Inner recursive function
    // Purpose: add viable solutions to solutions array
    // Inputs: remaining pieces to place, current board piece placement
    // Output: none

    // Base case:
    //  Check solutions array length, if >= maxSolutions, return
    //  Else push board with solution into solutions array, or just return
    // Recursive case: rFindSolution(...);
    var coord = convertIndexToCoord(startIndex);
    // console.log(`n = ${this.n}, piecesPlaced = ${piecesPlaced}, startingIndex = ${startIndex}, coord = ${coord}`);
    // Base case (solution found): no remaining n, but passed all previous checks
    if (piecesPlaced === n) {
      // console.log(`solution push: ${currentBoard.rows()}`);
      if (!countsOnly) {
        // Original board solution
        // solutions.push(currentBoard.rows().map(function(row) {
        //   return row.slice(0);
        // }));

        // New board solution
        solutions.push(currentBoard.expandBoard());
      }
      count++;

      // Backtrack
      return;
    }

    for (var i = startIndex; i < Math.min(((Math.floor(startIndex / n) + 1) * n), n * n); i++) {
    // for (var i = startIndex; i < n * n; i++) {
      var [x, y] = convertIndexToCoord(i);
      // console.log(`x = ${x}, y = ${y}, board = ${JSON.stringify(currentBoard.rows())}`);
      if (count >= maxSolutions) {
        return;
      }

      // Toggle piece
      currentBoard.togglePiece(x, y);

      // Check helper functions if valid placement
      if (type === 'rooks') {
        if (currentBoard.hasAnyRooksConflicts()) {
          // Backtrack
          currentBoard.togglePiece(x, y);
          continue;
        }
      } else if (type === 'queens') {
        if (currentBoard.hasAnyQueensConflicts()) {
          // Backtrack
          currentBoard.togglePiece(x, y);
          continue;
        }
      } else {
        return;
      }

      // Recursing
      // console.log(`passed check, recursing to ${convertCoordToIndex(x + 1, 0)}`);
      rFindSolution(piecesPlaced + 1, currentBoard, convertCoordToIndex(x + 1, 0));

      // Backtrack
      currentBoard.togglePiece(x, y);
    }
  };

  if (n <= 0) {
    // Original board solution
    // solutions.push((new Board({n: n})).rows());

    // New board solution
    solutions.push((new newBoard({n: n})).expandBoard());

    return {solutions: solutions, count: 1};
  }

  rFindSolution(0, startingBoard);

  if (solutions.length === 0) {
    // Original board solution
    // solutions.push((new Board({n: n})).rows());

    // New board solution
    solutions.push((new newBoard({n: n})).expandBoard());
  }
  return {solutions: solutions, count: count};
};

window.findNRooksSolution = function(n) {
  var solution = getSolutions('rooks', n, false, 1).solutions[0];

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = getSolutions('rooks', n).count;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = getSolutions('queens', n, false, 1).solutions[0];

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = getSolutions('queens', n).count;

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
