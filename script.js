// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData(city) {
    // IMPORTANT: Make sure this key is correct and wait 1-2 hours for it to activate.
    const apiKey = '7049bd7d9e61f8a31edde0fde4549087'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl); // Fetch weather data
        const data = await response.json();   // Parse JSON data

        // --- IMPROVED ERROR CHECKING ---
        // A successful API call has data.cod === 200 (a number)
        // An error call has a string code like "401" or "404"
        if (data.cod !== 200) {
            if (data.cod === "404") {
                document.getElementById('weather-result').innerHTML =
                    `<p style="color:red;">City not found. Please enter a valid city name.</p>`;
            } else if (data.cod === "401") {
                document.getElementById('weather-result').innerHTML =
                    `<p style="color:red;">Invalid API Key. Please wait for your key to activate (can take 1-2 hours).</p>`;
            } else {
                // Catch any other API errors
                document.getElementById('weather-result').innerHTML =
                    `<p style="color:red;">Error: ${data.message}</p>`;
            }
            console.error("API Error:", data.message); // Log the specific error
            return; // Stop the function here
        }
        // --- END OF ERROR CHECKING ---

        console.log("Weather data:", data); // For console checking

        // This part will only run if data.cod === 200
        document.getElementById('weather-result').innerHTML = `
            <h3>Weather in ${data.name}</h3>
            <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
            <p><strong>Condition:</strong> ${data.weather[0].description}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `;
    } catch (error) {
        // This 'catch' block handles network failures (e.g., no internet)
        console.error("Network or parsing error:", error);
        document.getElementById('weather-result').innerHTML =
            `<p style="color:red;">Error fetching weather data. Please check your internet connection and try again.</p>`;
    }
}

// Event listener for Search button
document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value.trim();
    if (city === "") {
        document.getElementById('weather-result').innerHTML =
            `<p style="color:red;">Please enter a city name.</p>`;
        return;
    }
    fetchWeatherData(city);
});



