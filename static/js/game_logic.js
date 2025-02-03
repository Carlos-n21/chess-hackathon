let legalSquares = [];
let isWhiteTurn = true;
const boardSquares = document.querySelectorAll(".square");
const pieces = document.querySelectorAll(".piece");
const piecesImages = document.querySelectorAll("img");

//sets up squares' ids
const setupBoardSquares = () => {
  for (let i = 0; i < boardSquares.length; i++) {
    boardSquares[i].addEventListener("dragover", allowDrop);
    boardSquares[i].addEventListener("drop", drop);
    //sets row from 8 to 1
    let row = 8 - Math.floor(i / 8);
    //sets column from a to h(97 to 105)
    let column = String.fromCharCode(97 + (i % 8));
    let square = boardSquares[i];
    square.id = column + row;
  }
};

const setupPieces = () => {
  //makes the pieces draggable
  for (let i = 0; i < pieces.length; i++) {
    pieces[i].addEventListener("dragstart", drag);
    pieces[i].setAttribute("draggable", true);
    //sets the piece id to piece+square id
    pieces[i].id = pieces[i].className.split(" ")[1] + pieces[i].parentNode.id;
  }
  //prevents the pieces images from being dragged
  for (let i = 0; i < piecesImages.length; i++) {
    piecesImages[i].setAttribute("draggable", false);
  }
};

//allows an elent to be dropped on another element
const allowDrop = (ev) => {
  ev.preventDefault();
};

//sets drag data of piece
const drag = (ev) => {
  const piece = ev.target;
  const pieceColor = piece.getAttribute("color");
  //implements a turn system
  if (
    (isWhiteTurn && pieceColor == "white") ||
    (!isWhiteTurn && pieceColor == "black")
  ) {
    ev.dataTransfer.setData("text", piece.id);
    const startingSquareId = piece.parentNode.id;
    getPossibleMoves(startingSquareId, piece);
  }
};

const drop = (ev) => {
  ev.preventDefault();
  //retrieves current drag data of the piece
  let data = ev.dataTransfer.getData("text");
  //gets the piece div and append to target square
  const piece = document.getElementById(data);
  const destinationSquare = ev.currentTarget;
  let destinationSquareId = destinationSquare.id;

  //if square is blank, and the destination square is a legal square, append piece div to square
  if (
    isSquareOccupied(destinationSquare) == "blank" &&
    legalSquares.includes(destinationSquareId)
  ) {
    destinationSquare.appendChild(piece);
    //swaps turn
    isWhiteTurn = !isWhiteTurn;
    //resets legalSquares array
    legalSquares.length = 0;
    return;
  }
  //if square is occupied, and the destination square is a legal square, the new piece takes the old piece
  else if (
    isSquareOccupied(destinationSquare) != "blank" &&
    legalSquares.includes(destinationSquareId)
  ) {
    //removes the first child element
    while (destinationSquare.firstChild) {
      destinationSquare.removeChild(destinationSquare.firstChild);
    }
    //appends the dragged piece
    destinationSquare.appendChild(piece);
    //swaps turn
    isWhiteTurn = !isWhiteTurn;
    //resets legalSquares array
    legalSquares.length = 0;
    return;
  }
};

const getPossibleMoves = (startingSquareId, piece) => {
  const pieceColor = piece.getAttribute("color");
  if (piece.classList.contains("pawn")) {
    getPawnMoves(startingSquareId, pieceColor);
  } else if (piece.classList.contains("knight")) {
    getKnightMoves(startingSquareId, pieceColor);
  } else if (piece.classList.contains("rook")) {
    getRookMoves(startingSquareId, pieceColor);
  } else if (piece.classList.contains("bishop")) {
    getBishopMoves(startingSquareId, pieceColor);
  }
};

const isSquareOccupied = (square) => {
  //checks if square has piece
  if (square.querySelector(".piece")) {
    const color = square.querySelector(".piece").getAttribute("color");
    return color;
  } else {
    return "blank";
  }
};


/** pawn **/

const getPawnMoves = (startingSquareId, pieceColor) => {
  checkPawnDiagonalCaptures(startingSquareId, pieceColor);
  checkPawnForwardMoves(startingSquareId, pieceColor);
};

const checkPawnDiagonalCaptures = (startingSquareId, pieceColor) => {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentFile = file;
  let currentRank = rankNumber;
  let currentSquareId = currentFile + currentRank;
  let currentSquare = document.getElementById(currentSquareId);
  let squareContent = isSquareOccupied(currentSquare);

  //set direction for possible pawn moves
  let direction;
  if (pieceColor == "white") {
    direction = 1;
  } else {
    direction = -1;
  }

  //set new rank after move according to pieceColor
  currentRank += direction;
  //for left and right
  for (let i = -1; i <= 1; i += 2) {
    //sets new file after move
    currentFile = String.fromCharCode(file.charCodeAt(0) + i);
    //if the move is within the board
    if (currentFile >= "a" && currentFile <= "h") {
      //gets the new square after move
      currentSquareId = currentFile + currentRank;
      currentSquare = document.getElementById(currentSquareId);
      //checks if there is a piece of the other color, if yes, append the square id to the legalSquares array
      squareContent = isSquareOccupied(currentSquare);
      if (squareContent != "blank" && squareContent != pieceColor) {
        legalSquares.push(currentSquareId);
      }
    }
  }
};

const checkPawnForwardMoves = (startingSquareId, pieceColor) => {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentFile = file;
  let currentRank = rankNumber;
  let currentSquareId = currentFile + currentRank;
  let currentSquare = document.getElementById(currentSquareId);
  let squareContent = isSquareOccupied(currentSquare);

  //set direction for possible pawn moves
  let direction;
  if (pieceColor == "white") {
    direction = 1;
  } else {
    direction = -1;
  }

  //set new rank after move according to pieceColor
  currentRank += direction;
  currentSquareId = currentFile + currentRank;
  currentSquare = document.getElementById(currentSquareId);
  //checks if there is a piece, if not, append the square id to the legalSquares array
  squareContent = isSquareOccupied(currentSquare);
  if (squareContent != "blank") {
    return;
  } else {
    legalSquares.push(currentSquareId);
    //checks if the rank is 2 or 7
    if (rankNumber != 2 && rankNumber !=7) {
      return;
    } else {
      currentRank += direction;
      currentSquareId = currentFile + currentRank;
      currentSquare = document.getElementById(currentSquareId);
      //checks if there is a piece, if not, append the square id to the legalSquares array
      squareContent = isSquareOccupied(currentSquare);
      if (squareContent != "blank") {
        return;
      } else {
        legalSquares.push(currentSquareId);
      }
    }
  }
}

/** knight **/

const getKnightMoves = (startingSquareId, pieceColor) => {
  //gets the file char code and converts it to 0 bases
  const file = startingSquareId.charCodeAt(0)-97;
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentFile = file;
  let currentRank = rankNumber;

  //creates an array of possible knight moves
  const moves = [
    [-2,1], [-1,2], [1,2], [2,1], [2,-1], [1,-2], [-1,-2], [-2,-1]
  ]
  //checks each square according to moves array and append possible moves
  moves.forEach((move)=> {
    currentFile=file+move[0]
    currentRank=rankNumber+move[1]
    if (currentFile >= 0 && currentFile <= 7 && currentRank > 0 && currentRank <= 8) {
      let currentSquareId = String.fromCharCode(currentFile+97)+currentRank;
      let currentSquare = document.getElementById(currentSquareId);
      let squareContent = isSquareOccupied(currentSquare);
      if(squareContent != "blank" && squareContent == pieceColor) {
        return;
      } else {
        legalSquares.push(currentSquareId);
      }
    }
  }
  )
};

/** rook **/
const getRookMoves = (startingSquareId, pieceColor) => {
  moveToEighthRank(startingSquareId, pieceColor);
  moveToFirstRank(startingSquareId, pieceColor);
  moveToAFile(startingSquareId, pieceColor);
  moveToHFile(startingSquareId, pieceColor);
}

//check all square moving from current square to eighth rank
const moveToEighthRank = (startingSquareId, pieceColor) => {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentRank = rankNumber;
  //for every square until the 8th rank, check if its empty or a piece of opposite color, if yes, legal
  while(currentRank != 8) {
    currentRank++;
    let currentSquareId = file+currentRank;
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);
    if (squareContent != "blank") {
      if (squareContent == pieceColor) {
        return;
      } else {
        legalSquares.push(currentSquareId);
        return;
      }
    } else {
      legalSquares.push(currentSquareId);
    }
  }
}

const moveToFirstRank = (startingSquareId, pieceColor) => {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentRank = rankNumber;
  //for every square until the 1st rank, check if its empty or a piece of opposite color, if yes, legal
  while(currentRank != 1) {
    currentRank--;
    let currentSquareId = file+currentRank;
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);
    if (squareContent != "blank") {
      if (squareContent == pieceColor) {
        return;
      } else {
        legalSquares.push(currentSquareId);
        return;
      }
    } else {
      legalSquares.push(currentSquareId);
    }
  }
}

const moveToAFile = (startingSquareId, pieceColor) => {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  let currentFile = file;
  //for every square until the a file, check if its empty or a piece of opposite color, if yes, legal
  while(currentFile != "a") {
    currentFile=String.fromCharCode(currentFile.charCodeAt(0)-1);
    let currentSquareId = currentFile+rank;
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);
    if (squareContent != "blank") {
      if (squareContent == pieceColor) {
        return;
      } else {
        legalSquares.push(currentSquareId);
        return;
      }
    } else {
      legalSquares.push(currentSquareId);
    }
  }
}

const moveToHFile = (startingSquareId, pieceColor) => {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  let currentFile = file;
  //for every square until the h file, check if its empty or a piece of opposite color, if yes, legal
  while(currentFile != "h") {
    currentFile=String.fromCharCode(currentFile.charCodeAt(0)+1);
    let currentSquareId = currentFile+rank;
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);
    if (squareContent != "blank") {
      if (squareContent == pieceColor) {
        return;
      } else {
        legalSquares.push(currentSquareId);
        return;
      }
    } else {
      legalSquares.push(currentSquareId);
    }
  }
}


/** Bishop **/
const getBishopMoves = (startingSquareId, pieceColor) => {
  moveToEighthRankAFile(startingSquareId, pieceColor);
  moveToEighthRankHFile(startingSquareId, pieceColor);
  moveToFirstRankAFile(startingSquareId, pieceColor);
  moveToFirstRankHFile(startingSquareId, pieceColor);
}

const moveToEighthRankAFile = (startingSquareId, pieceColor) => {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentFile = file;
  let currentRank = rankNumber;
  //until the bishop hit a file or 8th rank
  while(!(currentFile=="a" || currentRank == 8)) {
    currentFile=String.fromCharCode(currentFile.charCodeAt(0)-1);
    currentRank++;
    let currentSquareId = currentFile+currentRank;
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);
    if (squareContent != "blank") {
      if (squareContent == pieceColor) {
        return;
      } else {
        legalSquares.push(currentSquareId);
        return;
      }
    } else {
      legalSquares.push(currentSquareId);
    }
  }
}

const moveToEighthRankHFile = (startingSquareId, pieceColor) => {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentFile = file;
  let currentRank = rankNumber;
  //until the bishop hit h file or 8th rank
  while(!(currentFile=="h" || currentRank == 8)) {
    currentFile=String.fromCharCode(currentFile.charCodeAt(0)+1);
    currentRank++;
    let currentSquareId = currentFile+currentRank;
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);
    if (squareContent != "blank") {
      if (squareContent == pieceColor) {
        return;
      } else {
        legalSquares.push(currentSquareId);
        return;
      }
    } else {
      legalSquares.push(currentSquareId);
    }
  }
}

const moveToFirstRankAFile = (startingSquareId, pieceColor) => {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentFile = file;
  let currentRank = rankNumber;
  //until the bishop hit a file or 8th rank
  while(!(currentFile=="a" || currentRank == 1)) {
    currentFile=String.fromCharCode(currentFile.charCodeAt(0)-1);
    currentRank--;
    let currentSquareId = currentFile+currentRank;
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);
    if (squareContent != "blank") {
      if (squareContent == pieceColor) {
        return;
      } else {
        legalSquares.push(currentSquareId);
        return;
      }
    } else {
      legalSquares.push(currentSquareId);
    }
  }
}

const moveToFirstRankHFile = (startingSquareId, pieceColor) => {
  const file = startingSquareId.charAt(0);
  const rank = startingSquareId.charAt(1);
  const rankNumber = parseInt(rank);
  let currentFile = file;
  let currentRank = rankNumber;
  //until the bishop hit h file or 8th rank
  while(!(currentFile=="h" || currentRank == 1)) {
    currentFile=String.fromCharCode(currentFile.charCodeAt(0)+1);
    currentRank--;
    let currentSquareId = currentFile+currentRank;
    let currentSquare = document.getElementById(currentSquareId);
    let squareContent = isSquareOccupied(currentSquare);
    if (squareContent != "blank") {
      if (squareContent == pieceColor) {
        return;
      } else {
        legalSquares.push(currentSquareId);
        return;
      }
    } else {
      legalSquares.push(currentSquareId);
    }
  }
}