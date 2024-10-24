let cardsArray = [
  {
    name: "Apple",
    img: "./img/Apple.png",
  },
  {
    name: "Strawberry",
    img: "./img/Strawberry.png",
  },
  {
    name: "Pinapple",
    img: "./img/Pinapple.png",
  },
  {
    name: "Grapes",
    img: "./img/Grapes.png",
  },
  {
    name: "Mango",
    img: "./img/Mango.png",
  },
  {
    name: "Banana",
    img: "./img/Banana.png",
  },
];

const parentDiv = document.querySelector("#card-section");

// step 2 to duplicate each card
const gameCard = cardsArray.concat(cardsArray);
console.log(gameCard);

// steps 3
// Note that this method creates a new shuffled array instead of modifying the original one.
// const myNumbers = (array) => {
//     for (let i = array.length - 1; i > 0; i--) {
//         let j = Math.floor(Math.random() * (i + 1))
//         // console.log(i, j)
//         let temp = array[i]
//         array[i] = array[j]
//         array[j] = temp
//     }
//     return array
// }
//
// const shuffledChild = myNumbers(gameCard)
let shuffledChild = Array.from(gameCard).sort(() => 0.5 - Math.random());

let clickCount = 0;
let firstCard = "";
let secondCard = "";

// styling the match card
const card_matches = () => {
  let card_selected = document.querySelectorAll(".card_selected");

  card_selected.forEach((curElem) => {
    curElem.classList.add("card_match");
  });
};

// step 7

const resetGame = () => {
  firstCard = "";
  secondCard = "";
  clickCount = 0;

  let card_selected = document.querySelectorAll(".card_selected");

  card_selected.forEach((curElem) => {
    curElem.classList.remove("card_selected");
  });
};

// Timer setup
let timer = null;
const startTimer = () => {
  let minutes = 0;
  let seconds = 0;
  timer = setInterval(() => {
    seconds++;
    if (seconds === 30) {
      seconds = 0;
      minutes++;
      if (minutes === 1) {
        clearInterval(timer);
        location.reload();
      }
    }
    // Update timer display
    document.getElementById("timer").innerText = `${minutes
      .toString()
      .padStart(1, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, 1000);
};

// step 4 Event listener for card clicks
parentDiv.addEventListener("click", (event) => {
  let curCard = event.target;

  if (curCard.id === "card-section") {
    return false;
  }

  clickCount++;

  if (clickCount < 3) {
    if (clickCount === 1) {
      firstCard = curCard.parentNode.dataset.name;
      curCard.parentNode.classList.add("card_selected");
    } else {
      secondCard = curCard.parentNode.dataset.name;
      curCard.parentNode.classList.add("card_selected");
    }

    if (firstCard !== "" && secondCard !== "") {
      if (firstCard === secondCard) {
        // curCard.classList.add('card_match')
        setTimeout(() => {
          card_matches();
          resetGame();
        }, 1000);
      } else {
        setTimeout(() => {
          resetGame();
        }, 1000);
      }
    }
  }

  if (!timer && clickCount === 1) {
    startTimer();
  }
});

// step 1 to add the card
for (let i = 0; i < shuffledChild.length; i++) {
  const childDiv = document.createElement("div");
  childDiv.classList.add("card");
  childDiv.dataset.name = shuffledChild[i].name;
  // childDiv.style.backgroundImage = `url(${shuffledChild[i].img})`;

  const front_div = document.createElement("div");
  front_div.classList.add("front-card");

  const back_div = document.createElement("div");
  back_div.classList.add("back-card");

  back_div.style.backgroundImage = `url(${shuffledChild[i].img})`;

  parentDiv.appendChild(childDiv);

  childDiv.appendChild(front_div);
  childDiv.appendChild(back_div);
}
