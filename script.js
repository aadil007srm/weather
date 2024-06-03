let inputvalue = document.querySelector("#cityinput");
let btn = document.querySelector("#add");
let city = document.querySelector("#cityoutput");
let descrip = document.querySelector("#description");
let temp = document.querySelector("#temp");
let wind = document.querySelector("#wind");

let apik = "555dc527c0166037e3914b2a571e1698";

function conversion(val) {
    return (val - 273.15).toFixed(2);
}

btn.addEventListener("click", function() {
    let cityName = inputvalue.value;
    console.log("Fetching weather data for:", cityName); // Log city name
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apik)
        .then(res => {
            console.log("Response status:", res.status); // Log response status
            if (!res.ok) {
                throw new Error("Network response was not ok " + res.statusText);
            }
            return res.json();
        })
        .then(data => {
            console.log("API Response:", data); // Log API response
            let nameval = data["name"];
            let desc = data["weather"][0]["description"];
            let temperature = data["main"]["temp"];
            let windspeed = data["wind"]["speed"];

            city.innerHTML = `Weather of <span>${nameval}</span>`;
            temp.innerHTML = `Temperature: <span>${conversion(temperature)}°C</span>`;
            descrip.innerHTML = `Sky Conditions: <span>${desc}</span>`;
            wind.innerHTML = `Wind Speed: <span>${windspeed} km/h</span>`;
        })
        .catch(err => {
            console.error("Fetch error:", err); // Log the error
            alert("You entered wrong city name!!");
        });
});

