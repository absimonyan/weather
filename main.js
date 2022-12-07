const form = document.querySelector(".weather__top");
const input = document.querySelector(".weather__top input");
const msg = document.querySelector(".weather__top .msg");
const list = document.querySelector(".weather__result");

const apiKey = "60c22c62633c07b8ae0a7796b5e38610";

form.addEventListener("submit", e => {
    e.preventDefault();
    const inputVal = input.value;

    //ajax here
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { main, name, sys, weather } = data;
            const icon = `https://openweathermap.org/img/wn/${
        weather[0]["icon"]
      }@2x.png`;
            const markup = `
        <h2 class="weather__result__city" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="weather__result__celsius">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="weather__result__icon" src=${icon} alt=${weather[0]["main"]}>
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
            list.innerHTML = markup;
            weatherForecast(inputVal);
        })
        .catch(() => {
            msg.textContent = "Please search for a valid city 😩";
        });

    msg.textContent = "";
    form.reset();
    input.focus();
});


function weatherForecast(cityName) {

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const { main, name, sys, weather } = data;
            const icon = `https://openweathermap.org/img/wn/${
    weather[0]["icon"]
  }@2x.png`;
            const markup = `
    <h2 class="weather__result__city" data-name="${name},${sys.country}">
      <span>${name}</span>
      <sup>${sys.country}</sup>
    </h2>
    <div class="weather__result__celsius">${Math.round(main.temp)}<sup>°C</sup></div>
    <figure>
      <img class="weather__result__icon" src=${icon} alt=${weather[0]["main"]}>
      <figcaption>${weather[0]["description"]}</figcaption>
    </figure>
  `;
            // list.innerHTML = markup;
        })
        .catch(() => {
            msg.textContent = "Please search for a valid city 😩";
        });

    msg.textContent = "";
    form.reset();
    input.focus();
}