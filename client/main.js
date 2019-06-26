const tetrisManager = new TetrisManager(document);
const localTetris = tetrisManager.createPlayer();
localTetris.element.classList.add('local');
localTetris.run();

const connectionManager = new ConnectionManager(tetrisManager);

connectionManager.connect('wss://mp-tetris.herokuapp.com/');


const keyListener = (e) => {
    [
        [37, 39, 38, 69, 40],
        [72, 75, 89, 73, 74],
    ].forEach((key, index) => {
        const player = localTetris.player;
        if (e.type === 'keydown') {
            if (e.keyCode === key[0]) {
                player.move(-1);
            } else if (e.keyCode === key[1]) {
                player.move(1);
            }  else if (e.keyCode === key[2]) {
                player.rotate(-1);
            } else if (e.keyCode === key[3]) {
                player.rotate(1);
            }
    }

        if (e.keyCode === key[4]) {
            if (e.type === 'keydown') {
                if (player.dropInterval !== player.DROP_FAST) {
                    player.drop();
                    player.dropInterval = player.DROP_FAST;
            }
            } else {
                player.dropInterval = player.DROP_SLOW;
            }
        }
    });
};

document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);
