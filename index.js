async function checkSnow() {
    const location = document.getElementById("location").value;
    const resultElement = document.getElementById("result");
    const snowLevelElement = document.getElementById("snow-level");
    const temperature = document.getElementById("temperature");

if (!location) {
    resultElement.textContent = "Please enter a location";
    return;
}
resultElement.textContent = "Fetching data...";

try {
    const response = await 
    fetch("https://open-meteo.com/en/docs#latitude=&longitude=&current=&minutely_15=&hourly=temperature_2m,snowfall&daily=&temperature_unit=fahrenheit&precipitation_unit=inch&models=");
    const data = await response.json();
    // Process and display data
    const temperature = data.hourly.temperature_2m[0];
    const snowfall = data.hourly.snowfall[0];
    
    if (temperature > 30) {
        resultElement.textContent = "The temperature is above ideal conditions"
    }else snowLevelElement.textContent = `Snowfall: ${snowfall} inches`;
          temperatureElement.textContent = `Temperature: ${temperature} \u00B0F`;
          resultElement.textContent = "";  
    }

catch (error) {
    resultElement.textContent = "Error fetching data";
}

function reset() {
    console.log("Reset button clicked");
    document.getElementById("location").value = ""; 
    document.getElementById("result").textContent = ""; 
    document.getElementById("snow-level").textContent = ""; 
    document.getElementById("temperature").textContent = "";
}
};