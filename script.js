const apiKey = "c779804ec7c052edac7e057614607d1a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather img");
const tempElement = document.querySelector(".temp");
const cityElement = document.querySelector(".city");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    // Update DOM
    cityElement.innerText = data.name;
    tempElement.innerText = Math.round(data.main.temp) + "°C";
    humidityElement.innerText = data.main.humidity + "%";
    windElement.innerText = data.wind.speed + " km/h";

    // Weather icon logic
    const weatherCondition = data.weather[0].main.toLowerCase();
    const iconMap = {
      clear: "clear.png",
      clouds: "clouds.png",
      rain: "rain.png",
      drizzle: "drizzle.png",
      snow: "snow.png",
      mist: "mist.png"
    };

    weatherIcon.src = "images/" + (iconMap[weatherCondition] || "clear.png");

    console.log(data); // Logs full response for debugging

  } catch (error) {
    alert(error.message);
  }
}

// Search by button click
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value.trim());
});

// Search by Enter key
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(searchBox.value.trim());
  }
});


// searchBtn.addEventListener("keypress",(e)=>{
//          let inputValue = document.querySelector('.search input').value;
//          if(e.key === "Enter"){
//          if(inputValue.length>0){
//             checkWeather(inputValue);
//          }
//         }
// })
