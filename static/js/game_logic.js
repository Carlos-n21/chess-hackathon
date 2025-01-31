let legalSquares=[];
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
        pieces[i].id=pieces[i].className.split(' ')[1]+pieces[i].parentElement.id;
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
    ev.dataTransfer.setData('text',piece.id)
}

const drop = (ev) => {
    ev.preventDefault();
    //retrieves current drag data of the piece
    let data = ev.dataTransfer.getData('text');
    //gets the piece div and append to target square
    const piece=document.getElementById(data);
    const destinationSquare=ev.currentTarget;
    let destinationSquareId=destinationSquare.id;
    destinationSquare.appendChild(piece);
}