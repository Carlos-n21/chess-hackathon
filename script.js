 // Game state object
 const gameState = {
    board: null,
    currentPlayer: 'white',
    moveHistory: [],
    selectedPiece: null
};

// Initial board setup
const initialBoard = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜']
];

// Function to create the chess board
function createBoard() {
    const board = document.getElementById('chessBoard');
    board.innerHTML = '';
    
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.className = `square ${(row + col) % 2 === 0 ? 'white' : 'black'}`;
            square.dataset.row = row;
            square.dataset.col = col;

            // Add piece if exists
            const piece = initialBoard[row][col];
            if (piece) {
                const pieceSpan = document.createElement('span');
                pieceSpan.className = `piece ${row < 2 ? 'black-piece' : 'white-piece'}`;
                pieceSpan.textContent = piece;
                square.appendChild(pieceSpan);
            }

            board.appendChild(square);
        }
    }
}

// Save game state to localStorage
function saveGame() {
    const gameStateString = JSON.stringify(gameState);
    localStorage.setItem('chessGameState', gameStateString);
    alert('Game saved successfully!');
}

// Load game state from localStorage
function loadGame() {
    const savedState = localStorage.getItem('chessGameState');
    if (savedState) {
        Object.assign(gameState, JSON.parse(savedState));
        updateBoard();
        alert('Game loaded successfully!');
    } else {
        alert('No saved game found!');
    }
}

// Initialize the game
function initGame() {
    createBoard();
    document.getElementById('saveGame').addEventListener('click', saveGame);
    document.getElementById('loadGame').addEventListener('click', loadGame);
    document.getElementById('newGame').addEventListener('click', () => {
        if (confirm('Start a new game? Current progress will be lost.')) {
            localStorage.removeItem('chessGameState');
            createBoard();
        }
    });
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);