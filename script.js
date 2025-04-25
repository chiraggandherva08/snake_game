const main = document.getElementById('main-container');

const cols = 15;
const rows = 10;

const getPos = (row, col) => {
    if ((row < 0 || row >= rows) && (col < 0 || col >= cols)) {
        return rows * cols / 2;
    }
    return parseInt(row * cols + col);
}

for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
        const div = document.createElement('div');
        div.classList.add('grid-item');
        main.appendChild(div);
    }
}

/* 
 . . . . . . . . . . 
 . . . . . X . . . . [1, 5] = row * cols + col
 . . . . . . . . . . 
 . . . . . . . . . . 
 . . . . . . . . . . 
 . . . . . . . . . . 
*/

const grid = [];

for (let row = 0; row < rows; row++) {
    const temp = [];
    for (let col = 0; col < cols; col++) {
        temp.push(false);
    }
    grid.push(temp);
}

const position = [parseInt(rows / 2), parseInt(cols / 2)];

function delay(d) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res();
        }, d);
    })
}

function get_randon_x_y() {
    return [
        Math.floor(Math.random() * rows), Math.floor(Math.random() * cols)
    ]
}

async function game(grid) {
    const grids = document.querySelectorAll('.grid-item');

    let direction = 'R'; // 'U', 'L', 'D'
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp' && direction !== 'D') {
            console.log('U');
            direction = 'U';
        }
        else if (e.key === 'ArrowDown' && direction !== 'U') {
            console.log('D');
            direction = 'D';
        }
        else if (e.key === 'ArrowLeft' && direction !== 'R') {
            console.log('L');
            direction = 'L';

        }
        else if (e.key === 'ArrowRight' && direction !== 'L') {
            console.log('R');
            direction = 'R';

        }
    })

    let iter_count = 0;

    const active_food_pos = [parseInt(rows / 2), parseInt(cols / 2)];

    while (true) {
        await delay(200); 

        if (position[0] === active_food_pos[0] && position[1] === active_food_pos[1]) {
            const [row, col] = get_randon_x_y();
            if (active_food_pos[0] && active_food_pos[1]) {
                grids[
                    getPos(
                        active_food_pos[0],
                        active_food_pos[1],
                    )
                ].classList.remove('food');
            }
            active_food_pos[0] = row;
            active_food_pos[1] = col;

            grids[
                getPos(
                    active_food_pos[0],
                    active_food_pos[1],
                )
            ].classList.add('food');
        }

        grid[position[0]][position[1]] = true;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const item = grid[row][col];
                if (item) {
                    grids[getPos(row, col)].classList.add('active');
                } else {
                    grids[getPos(row, col)].classList.remove('active');
                }
            }
        }

        grid[position[0]][position[1]] = false;

        if (direction === 'R') {
            position[1] += 1;
        } else if (direction === 'L') {
            position[1] -= 1;
        } else if (direction === 'U') {
            position[0] -= 1;
        } else if (direction === 'D') {
            position[0] += 1;
        } else {
            position[1] += 1;
        }

        if (position[1] >= cols) {
            position[1] = 0;
        }
        if (position[1] < 0) {
            position[1] = cols - 1;
        }
        if (position[0] >= rows) {
            position[0] = 0;
        }
        if (position[0] < 0) {
            position[0] = rows - 1;
        }

        iter_count += 1;
    }
}

game(grid);
