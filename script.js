document.addEventListener('DOMContentLoaded', () => {
    const maze = document.getElementById('maze');
    const player = document.getElementById('player');

    let isDragging = false;
    let isTimerActive = false;

    maze.addEventListener('mousedown', () => {
        isDragging = true;
    });

    document.addEventListener('mouseup', (event) => {
        if (isDragging && !isTimerActive) {
            resetPlayer();
        }
        isDragging = false;
    });

    maze.addEventListener('mousemove', (event) => {
        if (isDragging && !isTimerActive) {
            movePlayer(event.clientX, event.clientY);
        }
    });

    function movePlayer(x, y) {
        const mazeRect = maze.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        const maxX = mazeRect.width - playerRect.width;
        const maxY = mazeRect.height - playerRect.height;

        let playerX = x - mazeRect.left - playerRect.width / 2;
        let playerY = y - mazeRect.top - playerRect.height / 2;

        // Ensure the player stays within the bounds of the maze
        playerX = Math.min(Math.max(playerX, 0), maxX);
        playerY = Math.min(Math.max(playerY, 0), maxY);

        player.style.left = playerX + 'px';
        player.style.top = playerY + 'px';

        checkCollision(playerX, playerY);
    }

    function checkCollision(x, y) {
        const walls = document.querySelectorAll('.wall');
        const playerRect = player.getBoundingClientRect();

        if (
            x < 0 ||
            y < 0 ||
            x + playerRect.width > maze.offsetWidth ||
            y + playerRect.height > maze.offsetHeight
        ) {
            // Start a timer to freeze the mouse for 1 second
            isTimerActive = true;
            setTimeout(() => {
                isTimerActive = false;
            }, 1000);
            resetPlayer();
            return;
        }

        // Check collision with the first image in the middle
        const centerImageRect = document.getElementById('centerImage').getBoundingClientRect();
        if (
            playerRect.left < centerImageRect.right &&
            playerRect.right > centerImageRect.left &&
            playerRect.top < centerImageRect.bottom &&
            playerRect.bottom > centerImageRect.top
        ) {
            // Open a new page with the second image and restart button
            openNewPage();
            return;
        }

        for (const wall of walls) {
            const wallRect = wall.getBoundingClientRect();

            if (
                playerRect.left < wallRect.right &&
                playerRect.right > wallRect.left &&
                playerRect.top < wallRect.bottom &&
                playerRect.bottom > wallRect.top
            ) {
                // Start a timer to freeze the mouse for 1 second
                isTimerActive = true;
                setTimeout(() => {
                    isTimerActive = false;
                }, 300);
                resetPlayer();
                return;
            }
        }
    }

    function resetPlayer() {
        // Reset to starting position
        player.style.left = '10px';
        player.style.top = '10px';
    }

    function openNewPage() {
        // Open a new page with the second image and restart button
        window.open('new_page.html', '_blank');
    }
});
