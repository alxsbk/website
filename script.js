document.addEventListener('DOMContentLoaded', () => {
    const maze = document.getElementById('maze');
    const player = document.getElementById('player');

    let isDragging = false;

    player.addEventListener('mousedown', () => {
        isDragging = true;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
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
        const mazeRect = maze.getBoundingClientRect();

        if (x <= 0 || y <= 0 || x >= mazeRect.width || y >= mazeRect.height) {
            // Reset to starting position
            player.style.left = '10px';
            player.style.top = '10px';
        }
    }
});
