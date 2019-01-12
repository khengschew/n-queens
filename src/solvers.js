/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

window.timer = function(cb, ...args) {
  var startTime = Date.now();
  cb(...args);
  var endTime = Date.now();
  console.log(`Function took ${endTime - startTime}ms to run!`);
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.timer = function(cb, ...args) {
  var startTime = Date.now();
  cb(...args);
  var endTime = Date.now();
  console.log(`Function took ${endTime - startTime}ms to run!`);
};

window.getSolutions = function(type, n, maxSolutions = Infinity) {
  var solutions = [];
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
    console.log(`piecesPlaced = ${piecesPlaced}, startingIndex = ${startIndex}, coord = ${coord}`);
    // Base case (solution found): no remaining n, but passed all previous checks
    if (piecesPlaced === n) {
      console.log(`solution push`);
      solutions.push(currentBoard.rows().map(function(row) {
        return row.slice(0);
      }));

      // Backtrack
      currentBoard.togglePiece(...convertIndexToCoord(startIndex - 1));
      return;
    }

    // for (var i = startIndex; i < Math.min(((Math.floor(startIndex) + 1) * n), n * n); i++) {
    for (var i = startIndex; i < n * n; i++) {
      var [x, y] = convertIndexToCoord(i);
      console.log(`x = ${x}, y = ${y}`);
      if (solutions.length >= maxSolutions) {
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
      rFindSolution(piecesPlaced + 1, currentBoard, i + 1);
      // rFindSolution(piecesPlaced + 1, currentBoard, convertCoordToIndex(x + 1, 0));

      // Backtrack
      currentBoard.togglePiece(x, y);
    }
  };

  if (n <= 0) {
    solutions.push((new Board({n: n})).rows());
    return solutions;
  }

  rFindSolution(0, startingBoard);

  if (solutions.length === 0) {
    solutions.push((new Board({n: n})).rows());
  }
  return solutions;
};

window.findNRooksSolution = function(n) {
  var solution = getSolutions('rooks', n, 1)[0];

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = getSolutions('rooks', n).length;

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = getSolutions('queens', n, 1)[0];

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
