"use strict";
var value;
const btn = document.querySelector(".btn");
const p = document.querySelector(".p1");
const countriesContainer = document.querySelector(".countries");
const card = document.querySelector(".card");
function getvalue() {
  value = document.getElementById("val").value;
  if (value === "") {
    alert("please enter name");
    return;
  }
  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.eu/rest/v2/name/${value}`);
  request.send();
  request.addEventListener("load", function () {
    const [data] = JSON.parse(this.responseText);
    rendercountry(data);
    //get nb country
    const [neighbour] = data.borders;
    if (!neighbour) return;
    //ajax call 2
    const request2 = new XMLHttpRequest();
    request2.open("GET", `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener("load", function () {
      const data2 = JSON.parse(this.responseText);
      rendercountry(data2, "neighbour");
    });
  });
  card.style.opacity = 0;
  p.style.display = "block";
}

const rendercountry = function (data, classname = "") {
  const html = `<article class="country ${classname}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = 1;
};
