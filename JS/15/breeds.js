//요청
const apiRandomDogs = "https://dog.ceo/api/breeds/image/random/3";
const apiAllBreeds = "https://dog.ceo/api/breeds/list/all";
const request1 = new XMLHttpRequest();
const request2 = new XMLHttpRequest();

const header = document.getElementById("header");
const main = document.getElementById("main");
const input = document.getElementById("filter-text");
const button = document.getElementById("filter-button");
const select = document.getElementById("filter-select");

const currentDogs = [];

window.addEventListener("load", function () {
  // 강아지 사진 뿌리기
  request1.open("get", apiRandomDogs);
  request1.addEventListener("load", function () {
    const response = JSON.parse(request1.response);
    response.message.forEach(function (item) {
      currentDogs.push(item);
    });
  });
  request1.send();
});
