import Fuse from "https://cdn.jsdelivr.net/npm/fuse.js@6.6.2/dist/fuse.esm.js";
import answers from "./answers_json.json" assert { type: "json" };

const fuseOptions = {
  // isCaseSensitive: false,
  includeScore: true,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  ignoreLocation: true,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: ["question"],
};

const botToken = "6909685926:AAGBa6xWtW0ezc7tD3ZFCPtg1srdi2BxKKQ";
const chatId = -4022147746;

function sendMessage(message) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const data = {
    chat_id: chatId,
    text: message,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  fetch(url, options);
}

const fuse = new Fuse(answers, fuseOptions);
const userQuestion = document.getElementById("userQuestion");
const list = document.getElementsByClassName("answers")[0];
const asnwerItems = document.getElementsByClassName("answers__item");

userQuestion.addEventListener("input", () => {
  list.replaceChildren();
  const results = fuse.search(userQuestion.value);
  results.length = 5;
  results.forEach((element) => {
    list.insertAdjacentHTML(
      "beforeend",
      `
      <li class = 'answers__item'>
        <h2>${element.item.question_number} ${element.item.question}</h2>
        
        <span>${element.item.answer.replaceAll("\n", "<br/>")}</span>
      </li>`
    );
  });
});

list.addEventListener("click", (event) => {
  const answer = `${
    event.target.parentElement.querySelector("h2").textContent
  }\n${event.target.parentElement
    .querySelector("span")
    .innerHTML.replaceAll("<br>", "\n")}`;

  navigator.clipboard.writeText(answer);
});

list.addEventListener("contextmenu", (event) => {
  const answer = `${
    event.target.parentElement.querySelector("h2").textContent
  }\n${event.target.parentElement
    .querySelector("span")
    .innerHTML.replaceAll("<br>", "\n")}`;
  sendMessage(answer);
});
