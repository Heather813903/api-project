document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("checkButton").addEventListener("click", checkSnow);
    document.getElementById("checkTemperatureButton").addEventListener("click", checkTemperature);
    document.getElementById("resetButton").addEventListener("click", reset);
});
async function checkSnow() {
    const location = document.getElementById("location").value;
    const resultElement = document.getElementById("result");
    const snowFallElement = document.getElementById("snow-fall");
    const temperatureElement = document.getElementById("temperature");

if (!location) {
    resultElement.textContent = "Please enter a location";
    return;
}
resultElement.textContent = "Fetching snow data...";

try {
    const response = await 
    fetch("https://api.open-meteo.com/v1/forecast?latitude=37.9375&longitude=-107.8123&hourly=snowfall&temperature_unit=fahrenheit&precipitation_unit=inch");
    const data = await response.json();
    // Process and display data

    const snowfall = data.hourly.snowfall[0];
    
    if (temperature > 30) {
        resultElement.textContent = "The temperature is above ideal conditions"
    }else snowFallElement.textContent = `Snowfall: ${snowfall} inches`;
          temperatureElement.textContent = `Temperature: ${temperature} \u00B0F`;
          resultElement.textContent = "";  
    }

catch (error) {
    resultElement.textContent = "Error fetching data";
}

};

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
        const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=37.9375&longitude=-107.8123&hourly=temperature_2m&temperature_unit=fahrenheit&precipitation_unit=inch");
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
    document.getElementById("snow-fall").textContent = ""; 
    document.getElementById("temperature").textContent = "";
}
