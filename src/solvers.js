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

window.getSolutions = function(type, n, maxSolutions = Infinity) {
  var solutions = [];
  var startingBoard = new Board({n:n});

  var rFindSolution = function(remainingN, currentBoard, rowIndex = 0, colIndex = 0) {
    // Inner recursive function
    // Purpose: add viable solutions to solutions array
    // Inputs: remaining pieces to place, current board piece placement
    // Output: none

    // Base case:
    //  Check solutions array length, if >= maxSolutions, return
    //  Else push board with solution into solutions array, or just return
    // Recursive case: rFindSolution(...);

    // Base case (solution found): no remaining n, but passed all previous checks
    if (remainingN === 0) {
      solutions.push(currentBoard.rows());
      return;
    }

    // Recursive case:
    for (var i = rowIndex; i < n; i++) {
      for (var j = colIndex; j < n; j++) {
        if (solutions.length >= maxSolutions) {
          return;
        }
        var workingBoard = new Board(currentBoard.rows().map(function(row) {
          return row.slice(0);
        }));

        // if (workingBoard.get(i)[j] !== 1) {
          workingBoard.togglePiece(i, j);
        // } else {
        //   return;
        // }

        // Check helper functions if valid placement
        if (type === 'rooks') {
          if (workingBoard.hasAnyRooksConflicts()) {
            continue;
          }
        } else if (type === 'queens') {
          if (workingBoard.hasAnyQueensConflicts()) {
            continue;
          }
        } else {
          return;
        }

        // Logic to increment
        var newColIndex = j + 1;
        if (newColIndex >= n) {
          newColIndex = 0;
          var newRowIndex = i + 1;
        }
        if (newRowIndex > n) {
          return;
        }

        // Recursing
        //debugger;
        rFindSolution(remainingN - 1, workingBoard, newRowIndex, newColIndex);
        // rFindSolution(remainingN - 1, workingBoard, i, j);
      }
    }
  };
  rFindSolution(n, startingBoard);

  // if (solutions.length === 0) {
  //   solutions.push(new Board({n:n}));
  // }
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
