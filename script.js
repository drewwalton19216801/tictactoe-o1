document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const resetButton = document.getElementById('resetButton');
    const playerXScoreEl = document.getElementById('playerXScore');
    const playerOScoreEl = document.getElementById('playerOScore');

    let squares = Array(9).fill(null);
    let currentPlayer = 'X';
    let isGameActive = true;
    let playerXScore = 0;
    let playerOScore = 0;

    function createBoard(animated = false) {
        board.innerHTML = '';
        squares = Array(9).fill(null);
        isGameActive = true;
        currentPlayer = 'X';

        for (let i = 0; i < 9; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('data-index', i);
            square.addEventListener('click', handleSquareClick);

            if (animated) {
                square.style.opacity = '0';
                square.style.transform = 'scale(0)';
                setTimeout(() => {
                    square.style.opacity = '1';
                    square.style.transform = 'scale(1)';
                }, i * 50); // Staggered animation
            }

            board.appendChild(square);
        }
    }

    function handleSquareClick(e) {
        const squareEl = e.target.closest('.square');
        const index = squareEl.getAttribute('data-index');
        if (!squares[index] && isGameActive) {
            squares[index] = currentPlayer;
            squareEl.classList.add(currentPlayer.toLowerCase());
            squareEl.setAttribute('data-player', currentPlayer);
            if (checkWin()) {
                isGameActive = false;
                updateScore();
                setTimeout(() => {
                    alert(`Player ${currentPlayer} wins!`);
                    createBoard(true);
                }, 500);
            } else if (squares.every(square => square)) {
                isGameActive = false;
                setTimeout(() => {
                    alert('It\'s a tie!');
                    createBoard(true);
                }, 500);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function checkWin() {
        const winConditions = [
            [0,1,2],[3,4,5],[6,7,8], // rows
            [0,3,6],[1,4,7],[2,5,8], // columns
            [0,4,8],[2,4,6]          // diagonals
        ];
        return winConditions.some(condition => {
            return condition.every(index => squares[index] === currentPlayer);
        });
    }

    function updateScore() {
        if (currentPlayer === 'X') {
            playerXScore++;
            playerXScoreEl.textContent = playerXScore;
        } else {
            playerOScore++;
            playerOScoreEl.textContent = playerOScore;
        }
    }

    resetButton.addEventListener('click', () => {
        // Animate squares disappearing
        const squaresEls = document.querySelectorAll('.square');
        squaresEls.forEach((square, index) => {
            setTimeout(() => {
                square.style.opacity = '0';
                square.style.transform = 'scale(0)';
            }, index * 50);
        });
        // After animation, recreate the board
        setTimeout(() => {
            createBoard(true);
        }, 500);
    });

    createBoard();
});
