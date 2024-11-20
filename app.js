let userScore = 0;
let compScore = 0;
const userOption = [];
const compOption = [];

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const tableBody = document.getElementById('usersTable').getElementsByTagName('tbody');

const genCompChoice = () => {
    //rock, paper, scissors
    const options = ["rock", "paper", "scissors"];
    const randomIdx = Math.floor(Math.random() * 3);
    return options[randomIdx];
    
    
}

const drawGame = () => {
    console.log("game was draw.");
    msg.innerText = "Game was Draw. Play again.";
    msg.style.backgroundColor = "#081b31";

}

const showWinner = (userWin, userChoice, compChoice, options) => {
    if(userWin) {
        userScore ++;
        userScorePara.innerText = userScore;
        console.log("You win!");
        msg.innerText = `You win!  Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";


    } else {
        compScore ++;
        compScorePara.innerText = compScore;
        console.log("You lose.");
        msg.innerText = "You lose.";
        msg.innerText = `You lose! Your ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";
    }

        userOption.push(userChoice);
        compOption.push(compChoice);

        let row = tableBody[0].insertRow();
        row.insertCell(0).textContent = userChoice;
        row.insertCell(1).textContent = compChoice;
        row.insertCell(2).textContent = userWin ? "Me"  : "Comp";

        if (row.cells[2].textContent === "Comp") {
            row.cells[1].style.backgroundColor = "green";
            row.cells[0].style.backgroundColor = "red";
        } else if (row.cells[2].textContent === "Me") {
            row.cells[0].style.backgroundColor = "green";
            row.cells[1].style.backgroundColor = "red";
        }


}

const playGame = (userChoice) => {
    console.log("user choice = ", userChoice);
    //generate computer choice -> modular
    const compChoice = genCompChoice();
    console.log("comp choice =", compChoice);

    if (userChoice === compChoice) {   
        //Draw Game
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            //scissors, paper
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            //scissor, rock
            userWin = compChoice === "scissors" ? false : true;
        } else {
            //rock, paper
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin , userChoice, compChoice);
    }
    };

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});