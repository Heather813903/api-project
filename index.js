document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("checkButton").addEventListener("click", checkSnowDepth);
    document.getElementById("checkTemperatureButton").addEventListener("click", checkTemperature);
    document.getElementById("resetButton").addEventListener("click", reset);
    document.getElementById("nav").addEventListener("click", function() {
        document.getElementById("location").focus();
    })
});


async function getCoordinates(cityName) {
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&format=json`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const { latitude, longitude } = data.results[0];
            return { latitude, longitude };
        } else {
            throw new Error("Location not found");
        }
    } catch (error) {
        throw new Error("Error fetching coordinates");
    }
}

async function checkSnowDepth() {
    const location = document.getElementById("location").value;
    const resultElement = document.getElementById("result");
    const snowDepthElement = document.getElementById("snow-depth");
    const temperatureElement = document.getElementById("temperature");

if (!location) {
    resultElement.textContent = "Please enter a location";
    return;
}
resultElement.textContent = "Fetching snow data...";

try {
    const {latitude, longitude} = await getCoordinates(location);
    const response = await 
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=snow_depth,temperature_2m&temperature_unit=fahrenheit&precipitation_unit=inch`);
    const data = await response.json();
    // Process and display data

    const snowDepth = data.hourly.snow_depth[0];
    const temperature = data.hourly.temperature_2m[0];
        if (temperature > 30) {
        resultElement.innerHTML = `<span class="not-good">Conditions are not good<br>Temperature:${temperature} \u00B0F</span`;
    }else{snowDepthElement.innerHTML = `<span class="good">Go grab your gear!<br>Snow Depth: ${snowDepth} inches<br>Temperature: ${temperature} \u00B0F`;
          resultElement.textContent = ""; 
    }

}catch (error) {
    resultElement.textContent = "Error fetching data";
}
;

   
}

async function checkTemperature() {
    const location = document.getElementById("location").value;
    const resultElement = document.getElementById("result");
    const temperatureElement = document.getElementById("temperature");

    if (!location) {
        resultElement.textContent = "Please enter a location";
        return;
    }
    resultElement.textContent = "Fetching temperature data..."
    
    try {
        const { latitude, longitude } = await getCoordinates(location);
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&temperature_unit=fahrenheit&precipitation_unit=inch`);
        const data = await response.json();
        const temperature = data.hourly.temperature_2m[0];

        temperatureElement.textContent = `Temperature: ${temperature} \u00B0F`;
        resultElement.textContent = "";
    }   catch(error) {
            resultElement.textContent = "Error fetching temperature data";
    }
}


function reset() {
    document.getElementById("location").value = ""; 
    document.getElementById("result").textContent = "Check conditions"; 
    document.getElementById("snow-depth").textContent = ""; 
    document.getElementById("temperature").textContent = "";
}
