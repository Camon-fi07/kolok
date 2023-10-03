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

const fuse = new Fuse(answers, fuseOptions);
const userQuestion = document.getElementById("userQuestion");
const list = document.getElementsByClassName("answers")[0];
const asnwerItems = document.getElementsByClassName("answers__item");

userQuestion.addEventListener("input", (event) => {
  list.replaceChildren();
  const results = fuse.search(userQuestion.value);
  results.length = 5;
  results.forEach((element) => {
    list.insertAdjacentHTML(
      "beforeend",
      `<li class = 'answers__item'><h2>${element.item.question}</h2><span>${element.item.answer}</span></li>`
    );
  });
});

list.addEventListener("click", (event) => {
  navigator.clipboard.writeText(event.target.textContent);
});
