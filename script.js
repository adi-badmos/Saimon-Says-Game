let game = [];
let user = [];

let btns = ["red", "green", "yellow", "blue"];

let level = 0, maxi = 0;
let start = false;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if(!start) {
        console.log("Game Start.");
        start = true;
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function levelUp() {
    user = [];
    level++;
    maxi = Math.max(maxi, level);
    document.querySelector("h3").innerText = `High Score: ${maxi - 1}`;
    h2.innerText = `Level ${level}`;

    let idx = random();
    let color = btns[idx];
    let randBtn = document.querySelector(`.${color}`);

    console.log(idx, color, randBtn);
    game.push(color);

    btnFlash(randBtn);
}

function reset() {
    start = false;
    level = 0;
    game = [];
    user = [];
}

function check(idx) {
    if(game[idx] === user[idx]) {
        if(user.length === game.length) {
            setTimeout(levelUp, 1000);
        } else {
            
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level - 1}</b>. <br> Press any key to start.`
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    btnFlash(btn);

    color = btn.getAttribute("id");
    user.push(color);

    let idx = level - 1;
    check(user.length - 1);
}

let allBtns = document.querySelectorAll(".box");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function random() {
    return Math.floor(Math.random() * 4);
}