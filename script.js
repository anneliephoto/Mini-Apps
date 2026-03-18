// API Dashboard Functions

async function getDogImage() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    const output = document.getElementById("dog-output");
    output.innerHTML = `<img src="${data.message}" alt="Random Dog" style="max-width: 100%; height: auto;">`;
  } catch (error) {
    document.getElementById("dog-output").innerHTML =
      "Error fetching dog image.";
  }
}

async function getCatImage() {
  try {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await response.json();
    const output = document.getElementById("cat-output");
    output.innerHTML = `<img src="${data[0].url}" alt="Random Cat" style="max-width: 100%; height: auto;">`;
  } catch (error) {
    document.getElementById("cat-output").innerHTML =
      "Error fetching cat image.";
  }
}

async function getWeather() {
  try {
    // Using a free weather API, e.g., OpenWeatherMap requires API key, so using a placeholder
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current_weather=true"
    );
    const data = await response.json();
    const tempC = data.current_weather.temperature;
    const tempF = (tempC * 9) / 5 + 32;
    const output = document.getElementById("weather-output");
    output.innerHTML = `Current temperature: ${tempC}°C / ${tempF.toFixed(
      1
    )}°F`;
  } catch (error) {
    document.getElementById("weather-output").innerHTML =
      "Error fetching weather data.";
  }
}

async function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("from-currency").value;
  const to = document.getElementById("to-currency").value;
  if (isNaN(amount) || amount <= 0) {
    document.getElementById("currency-output").innerHTML =
      "Please enter a valid amount.";
    return;
  }
  try {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD"
    );
    const data = await response.json();
    const rate = data.rates[to] / data.rates[from];
    const result = amount * rate;
    document.getElementById(
      "currency-output"
    ).innerHTML = `${amount} ${from} = ${result.toFixed(2)} ${to}`;
  } catch (error) {
    document.getElementById("currency-output").innerHTML =
      "Error converting currency.";
  }
}

async function getMovies() {
  const apiKey = document.getElementById("tmdb-api-key").value.trim();
  if (!apiKey) {
    document.getElementById("movies-output").innerHTML =
      "Please enter your TMDB API key.";
    return;
  }
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
    );
    const data = await response.json();
    const output = document.getElementById("movies-output");
    const movie = data.results[0];
    output.innerHTML = `<p>${movie.title}</p><img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">`;
  } catch (error) {
    document.getElementById("movies-output").innerHTML =
      "Error fetching movie data. Check your API key.";
  }
}

async function getGitHubUser() {
  const users = [
    "octocat",
    "torvalds",
    "gaearon",
    "tj",
    "sindresorhus",
    "addyosmani",
    "paulirish",
    "getify",
    "buckyroberts",
    "bradtraversy",
  ];
  const randomUser = users[Math.floor(Math.random() * users.length)];
  try {
    const response = await fetch(`https://api.github.com/users/${randomUser}`);
    const data = await response.json();
    const output = document.getElementById("github-output");
    output.innerHTML = `<p>${data.login}</p><img src="${data.avatar_url}" alt="GitHub Avatar" style="width: 100px;">`;
  } catch (error) {
    document.getElementById("github-output").innerHTML =
      "Error fetching GitHub user.";
  }
}

async function getJoke() {
  try {
    const response = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );
    const data = await response.json();
    const output = document.getElementById("joke-output");
    output.innerHTML = `<p>${data.setup}</p><p>${data.punchline}</p>`;
  } catch (error) {
    document.getElementById("joke-output").innerHTML = "Error fetching joke.";
  }
}

async function getDisneyCharacter() {
  const output = document.getElementById("disney-output");

  try {
    output.innerHTML = "Loading...";

    const response = await fetch("https://api.disneyapi.dev/character");
    const data = await response.json();

    // Get a random character from results
    const character = data.data[Math.floor(Math.random() * data.data.length)];

    output.innerHTML = `
      <p><strong>${character.name}</strong></p>
      <p>Films: ${character.films.length > 0 ? character.films.join(", ") : "N/A"}</p>
      <p>TV Shows: ${character.tvShows.length > 0 ? character.tvShows.join(", ") : "N/A"}</p>
      ${character.imageUrl ? `<img src="${character.imageUrl}" alt="${character.name}">` : ""}
    `;
  } catch (error) {
    output.innerHTML = "Error fetching Disney character.";
    console.error(error);
  }
}
