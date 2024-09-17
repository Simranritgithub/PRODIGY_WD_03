let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;
let mode = ''; // to store the game mode ('two-player' or 'ai')

function startGame(selectedMode) {
    mode = selectedMode;
    document.getElementById('game-board').classList.remove('hidden');
    document.getElementById('mode-selection').classList.add('hidden');
    document.getElementById('reset-btn').classList.remove('hidden');
    document.getElementById('statusArea').innerText = `${currentPlayer}'s turn`;
}

function makeMove(cell, index) {
    if (board[index] || !gameActive) return;

    // Player makes their move
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        document.getElementById('statusArea').innerText = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    } else if (board.every(cell => cell !== null)) {
        document.getElementById('statusArea').innerText = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('statusArea').innerText = `${currentPlayer}'s turn`;

    if (mode === 'ai' && currentPlayer === 'O') {
        setTimeout(makeAIMove, 500); // AI takes some time to "think"
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]  // Diagonals
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === currentPlayer);
    });
}

function makeAIMove() {
    // Simple AI: Pick the first empty cell (can be improved to be smarter)
    const emptyIndices = board.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

    board[randomIndex] = currentPlayer;
    document.querySelectorAll('.cell')[randomIndex].textContent = currentPlayer;

    if (checkWin()) {
        document.getElementById('statusArea').innerText = `AI wins!`;
        gameActive = false;
        return;
    } else if (board.every(cell => cell !== null)) {
        document.getElementById('statusArea').innerText = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = 'X';
    document.getElementById('statusArea').innerText = `${currentPlayer}'s turn`;
}

function resetGame() {
    board.fill(null);
    currentPlayer = 'X';
    gameActive = true;
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    document.getElementById('statusArea').innerText = `${currentPlayer}'s turn`;
}
