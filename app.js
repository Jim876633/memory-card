const cards = document.querySelector(".cards");
const scoreText = document.querySelector(".score");
const resetBtn = document.querySelector(".reset");
const resultText = document.querySelector(".alert");
const cardMatchIdArg = [];
const initialTimes = 10;
let times = 0;
let roundStart = true;

const personCardArg = [
    { id: 1, image: "/image/person/person-1.svg" },
    { id: 2, image: "/image/person/person-2.svg" },
    { id: 3, image: "/image/person/person-3.svg" },
    { id: 4, image: "/image/person/person-4.svg" },
    { id: 5, image: "/image/person/person-5.svg" },
    { id: 6, image: "/image/person/person-6.svg" },
    { id: 7, image: "/image/person/person-7.svg" },
    { id: 8, image: "/image/person/person-8.svg" },
];
const robotCardArg = [
    { id: 1, image: "/image/robot/robot-1.svg" },
    { id: 2, image: "image/robot/robot-2.svg" },
    { id: 3, image: "image/robot/robot-3.svg" },
    { id: 4, image: "image/robot/robot-4.svg" },
];

const doubleItem = robotCardArg.reduce((double, robotCard) => {
    double.push(robotCard, robotCard);
    return double;
}, []);

const createCard = () => {
    doubleItem.sort(() => 0.5 - Math.random());
    for (const item of doubleItem) {
        const card = document.createElement("div");
        const img = document.createElement("img");
        const back = document.createElement("div");
        card.setAttribute("class", "card");
        img.setAttribute("src", `${item.image}`);
        img.setAttribute("class", "font");
        img.setAttribute("data-id", `${item.id}`);
        back.setAttribute("class", "back");
        back.setAttribute("data-id", `${item.id}`);
        back.innerText = "card";
        cards.appendChild(card);
        card.appendChild(img);
        card.appendChild(back);
    }
    scoreText.innerHTML = `times : ${initialTimes - times}`;
};

const matchCardId = () => {
    times += 1;
    setTimeout(() => {
        const card1 = cardMatchIdArg[0];
        const card2 = cardMatchIdArg[1];
        if (card1.id === card2.id) {
            card1.card.classList.add("match");
            card2.card.classList.add("match");
        } else {
            card1.card.classList.remove("show");
            card2.card.classList.remove("show");
        }
        const clearAll = () => {
            card1.card.removeEventListener("transitionend", clearAll);
            const allCards = cards.querySelectorAll(".card");
            let matchTime = 0;
            cardMatchIdArg.splice(0, 2);
            allCards.forEach((card) => {
                if (card.classList.contains("match")) {
                    matchTime++;
                }
            });
            if (initialTimes - times === 0 || matchTime == doubleItem.length) {
                roundStart = false;
                resultText.classList.add("show");
                resultText.textContent =
                    matchTime === doubleItem.length
                        ? `you win ! you use ${times} times `
                        : `you lose ! you has ${
                              (allCards.length - matchTime) / 2
                          } image not match`;
            } else {
                roundStart = true;
            }
            scoreText.innerHTML = `times : ${initialTimes - times}`;
        };
        card1.card.addEventListener("transitionend", clearAll);
    }, 1000);
};

const addCardId = (e) => {
    if (e.target.matches(".cards") || e.target.matches(".show")) return;
    const id = e.target.dataset.id;
    const targetCard = e.target.parentElement;
    if (roundStart && targetCard !== cardMatchIdArg[0]?.card) {
        cardMatchIdArg.push({ id: id, card: targetCard });
        targetCard.classList.add("show");
        if (cardMatchIdArg.length === 2) {
            roundStart = false;
            matchCardId();
        }
    }
};

const reset = () => {
    const allCard = cards.querySelectorAll(".card");
    allCard.forEach((card) => {
        card.classList.remove("show");
        card.classList.remove("match");
    });
    cardMatchIdArg.splice(0, 2);
    resultText.classList.remove("show");
    roundStart = true;
    times = 0;
    cards.innerHTML = "";
    createCard();
};

document.addEventListener("DOMContentLoaded", createCard);
cards.addEventListener("click", addCardId);
resetBtn.addEventListener("click", reset);
