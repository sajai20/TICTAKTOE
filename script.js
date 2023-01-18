

const boxEl = document.querySelectorAll('.box');
const statusEl = document.getElementById('status');
const restartEl = document.getElementById('restart');

let x_image = "<img src='./images/x.png' alt='x image'>";
let o_image = "<img src='./images/o.png' alt='o image'>";


//posibility to win
const win_posibility = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

//we have 9 box so need to store nine possiblity check
let options = ["", "", "", "", "", "", "", "", ""];

let current_player = x_image;
let player = "x";
let is_rinning = false;

init();

function init() {
    boxEl.forEach((box) => box.addEventListener('click', box_click));
    is_rinning = true;
    restartEl.addEventListener('click', restart_game);
    statusEl.textContent = `${player} your turn`
}

function box_click() {
    //console.log(this.dataset.index); //this dataset is a default keyword index will print the index value  data-index="0"
    const index = this.dataset.index;
    if (options[index] != "" || !is_rinning) {
        return;
    }
    update_box(this, index);
    check_winner();
}

function update_box(box, index) {
    options[index] = player;
    box.innerHTML = current_player;
}

function check_winner() {
    let is_won = false;
    for (let i = 0; i < win_posibility.length; i++) {
        const condition = win_posibility[i];
        const box_1 = options[condition[0]];
        const box_2 = options[condition[1]];
        const box_3 = options[condition[2]];

        if (box_1 == "" || box_2 == "" || box_3 == "") {
            continue;
        }

        if (box_1 == box_2 && box_2 == box_3) {
            is_won = true;
            break;
        }
    }

    if (is_won) {
        statusEl.textContent = `${player} Won...`
        is_rinning = false;
    }
    else if (!options.includes("")) {
        statusEl.textContent = `Game Draw....`;
        is_rinning = false;
    }
    else {
        change_player();
    }
}

function change_player() {
    player = (player == 'x') ? 'o' : 'x';
    current_player = (current_player == x_image) ? o_image : x_image;
    statusEl.textContent = `${player} your turn`
}

function restart_game() {
    options = ["", "", "", "", "", "", "", "", ""];

    current_player = x_image;
    player = "x";
    is_rinning = false;
    boxEl.forEach((box) => box.innerHTML = "");
    init();
}