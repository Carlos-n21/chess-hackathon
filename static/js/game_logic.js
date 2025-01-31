let legalSquares = [];
let isWhiteTurn = true;
const boardSquares = document.querySelectorAll('.square');
const pieces = document.querySelectorAll('.piece');
const piecesImages = document.querySelectorAll('img');

//sets up squares' ids
const setupBoardSquares = () => {
    for (let i=0;i<boardSquares.length;i++){
        boardSquares[i].addEventListener('dragover',allowDrop);
        boardSquares[i].addEventListener('drop', drop);
        //sets row from 8 to 1
        let row = 8-Math.floor(i/8);
        //sets column from a to h(97 to 105)
        let column = String.fromCharCode(97+(i%8));
        let square = boardSquares[i];
        square.id = column+row;
    }
}

const setupPieces = () => {
    //makes the pieces draggable
    for(let i=0;i<pieces.length;i++){
        pieces[i].addEventListener('dragstart',drag);
        pieces[i].setAttribute('draggable',true);
        //sets the piece id to piece+square id
        pieces[i].id=pieces[i].className.split(' ')[1]+pieces[i].parentNode.id;
    }
    //prevents the pieces images from being dragged
    for(let i=0;i<piecesImages.length;i++){
        piecesImages[i].setAttribute('draggable',false);
    }
}

//allows an elent to be dropped on another element
const allowDrop = (ev) => {
    ev.preventDefault();
}

//sets drag data of piece
const drag = (ev) => {
    const piece = ev.target;
    const pieceColor = piece.getAttribute('color');
    //implements a turn system
    if((isWhiteTurn && pieceColor == 'white')||(!isWhiteTurn && pieceColor == 'black')){
        ev.dataTransfer.setData('text',piece.id);
        const startingSquareId = piece.parentNode.id;
        getPossibleMoves(startingSquareId,piece);
    }
}

const drop = (ev) => {
    ev.preventDefault();
    //retrieves current drag data of the piece
    let data = ev.dataTransfer.getData('text');
    //gets the piece div and append to target square
    const piece=document.getElementById(data);
    const destinationSquare=ev.currentTarget;
    let destinationSquareId=destinationSquare.id;

    //if square is blank, and the destination square is a legal square, append piece div to square
    if((isSquareOccupied(destinationSquare) == 'blank') && (legalSquares.includes(destinationSquareId))) {
        destinationSquare.appendChild(piece);
        //swaps turn
        isWhiteTurn=!isWhiteTurn;
        //resets legalSquares array 
        legalSquares.length=0;
        return;
    }
    //if square is occupied, and the destination square is a legal square, the new piece takes the old piece
    else if((isSquareOccupied(destinationSquare) != 'blank') && (legalSquares.includes(destinationSquareId))) {
        //removes the first child element
        while (destinationSquare.firstChild) {
            destinationSquare.removeChild(destinationSquare.firstChild);
        }
        //appends the dragged piece
        destinationSquare.appendChild(piece);
        //swaps turn
        isWhiteTurn=!isWhiteTurn;
        //resets legalSquares array 
        legalSquares.length=0;
        return;
    }
}

const getPossibleMoves = (startingSquareId,piece) => {
    const pieceColor = piece.getAttribute('color');
    if(piece.classList.contains('pawn')){
        getPawnMoves(startingSquareId,pieceColor)
    }
}

const isSquareOccupied = (square) => {
    //checks if square has piece 
    if(square.querySelector('.piece')) {
        const color = square.querySelector(".piece").getAttribute('color');
        return color;
    } else {
        return "blank";
    }
}

const getPawnMoves = (startingSquareId,pieceColor) => {
    checkPawnDiagonalCaptures(startingSquareId,pieceColor);
    checkPawnForwardMoves(startingSquareId,pieceColor);
}

const checkPawnDiagonalCaptures = (startingSquareId,pieceColor) => {
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
    if(pieceColor=='white'){
        direction = 1
    } else {
        direction = -1
    }
    //set new rank after move according to pieceColor
    currentRank += direction;
    //for left and right
    for (let i=-1;i<=1;i+=2){
        //sets new file after move
        currentFile=String.fromCharCode(file.charCodeAt(0)+i);
        //if the move is within the board
        if (currentFile >= 'a' && currentFile <= 'h'){
            //gets the new square after move
            currentSquareId = currentFile+currentRank;
            currentSquare = document.getElementById(currentSquareId);
            //checks if there is a piece of the other color, if yes, append the square id to the legalSquares array
            squareContent = isSquareOccupied(currentSquare);
            if(squareContent != 'blank' && squareContent !='pieceColor') {
                legalSquares.push(currentSquareId);
            }
        }
    }
}