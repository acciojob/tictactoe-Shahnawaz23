//your JS code here. If required.
let currentPlayer = 1;
let player1Name = '';
let player2Name = '';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

document.getElementById('submit').addEventListener('click', function () {
    player1Name = document.getElementById('player-1').value;
    player2Name = document.getElementById('player-2').value;
    
    if (player1Name && player2Name) {
        document.querySelector('.setup').style.display = 'none';
        document.querySelector('.game-board').style.display = 'block';
        updateMessage();
    }
});

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', function () {
        if (!gameActive) return;

        let cellIndex = parseInt(cell.id) - 1;
        
        if (board[cellIndex] !== '') return;

        board[cellIndex] = currentPlayer === 1 ? 'X' : 'O';
        cell.textContent = board[cellIndex];

        if (checkWinner()) {
            document.querySelector('.message').textContent = `${currentPlayer === 1 ? player1Name : player2Name} congratulations you won!`;
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            updateMessage();
        }
    });
});

function updateMessage() {
    document.querySelector('.message').textContent = `${currentPlayer === 1 ? player1Name : player2Name}, you're up`;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
        [0, 4, 8], [2, 4, 6]             // diagonal
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }

    return false;
}
