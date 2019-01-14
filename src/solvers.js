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
  this.rows = _(_.range(n)).map(function() {
    return -1;
  });
};

newBoard.prototype.togglePiece = function (rowIndex, colIndex) {
  // Shouldn't use this method. Instead, set the value directly
  this.rows[rowIndex] = this.rows[rowIndex] > -1 ? -1 : colIndex;
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
    if (this.rows[i] === colIndex) {
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
    if (this.rows.indexOf(this.rows[i], i + 1) > -1) {
      return true;
    }
  }

  return false;
};

newBoard.prototype.hasMajorDiagonalConflictAt = function (majorDiagonalColumnIndexAtFirstRow) {

};

newBoard.prototype.hasAnyMajorDiagonalConflicts = function () {

};

newBoard.prototype.hasMinorDiagonalConflictAt = function () {

};

newBoard.prototype.hasAnyMinorDiagonalConflicts = function () {

};

newBoard.prototype.expandBoard = function () {
  return this.rows.map(function(colIndex, rowIndex) {
    return _(_.range(n)).map(function(currCol) {
      return currCol === colIndex ? 1 : 0;
    });
  });
};

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
  var startingBoard = new Board({n: n});

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
    // console.log(`piecesPlaced = ${piecesPlaced}, startingIndex = ${startIndex}, coord = ${coord}`);
    // Base case (solution found): no remaining n, but passed all previous checks
    if (piecesPlaced === n) {
      // console.log(`solution push`);
      if (!countsOnly) {
        solutions.push(currentBoard.rows().map(function(row) {
          return row.slice(0);
        }));
      }
      count++;

      // Backtrack
      return;
    }

    for (var i = startIndex; i < Math.min(((Math.floor(startIndex / n) + 1) * n), n * n); i++) {
    // for (var i = startIndex; i < n * n; i++) {
      var [x, y] = convertIndexToCoord(i);
      // console.log(`x = ${x}, y = ${y}`);
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
      // rFindSolution(piecesPlaced + 1, currentBoard, i + 1);
      rFindSolution(piecesPlaced + 1, currentBoard, convertCoordToIndex(x + 1, 0));

      // Backtrack
      currentBoard.togglePiece(x, y);
    }
  };

  if (n <= 0) {
    solutions.push((new Board({n: n})).rows());
    return {solutions: solutions, count: 1};
  }

  rFindSolution(0, startingBoard);

  if (solutions.length === 0) {
    solutions.push((new Board({n: n})).rows());
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
