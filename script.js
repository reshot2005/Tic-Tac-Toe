let turnO = true;
let btnBox = document.querySelectorAll('.btn-box')
let reset = document.querySelector('.reset')
let msg = document.querySelector('.msg')
btnBox.forEach((box) => {
    box.addEventListener('click', () => {
        if (box.innerHTML === "")
            if (turnO) {
                box.innerHTML = "O";
                turnO = false
            }
            else {
                box.innerHTML = "X";
                turnO = true
            }
        checkWinner();
    })
})
reset.addEventListener('click', () => {
    btnBox.forEach((box) => {
        box.innerHTML = ""
        box.disabled = false
        msg.innerHTML = ""
    })
}
)

let winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
const checkWinner = () => {
    for (i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i]
        const valA = btnBox[a].innerText;
        const valB = btnBox[b].innerText;
        const valC = btnBox[c].innerText;
        if (valA != "" && valB != "" && valC != "") {
            if (valA === valB && valB === valC) {
                msg.append("Winner is: ", valA)
                disableBox()
            }
            
        }
    }
    if ([...btnBox].every(box => box.innerText !== "")) {
        msg.append("It's a draw!");
    }
}
const disableBox = () => {
    btnBox.forEach((box) => {
        box.disabled = true
    })

}