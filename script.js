async function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) {
        alert("Enter city name");
        return;
    }

    try {
        // GEO LOCATION
        const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
        const geoData = await geo.json();

        if (!geoData.results) {
            alert("City not found");
            return;
        }

        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;

        // WEATHER DATA
        const weather = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,apparent_temperature`
        );
        const data = await weather.json();

        const temp = data.current_weather.temperature;
        const wind = data.current_weather.windspeed;
        const code = data.current_weather.weathercode;
        const humidity = data.hourly.relativehumidity_2m[0];
        const feels = data.hourly.apparent_temperature[0];

        let condition = "";
        let icon = "";
        let bg = "";

        if (code === 0) {
            condition = "Clear Sky";
            icon = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
            bg = "linear-gradient(to right, #fbc2eb, #a6c1ee)";
        } else if (code <= 3) {
            condition = "Cloudy";
            icon = "https://cdn-icons-png.flaticon.com/512/414/414825.png";
            bg = "linear-gradient(to right, #d7d2cc, #304352)";
        } else {
            condition = "Rainy";
            icon = "https://cdn-icons-png.flaticon.com/512/3076/3076129.png";
            bg = "linear-gradient(to right, #4e54c8, #8f94fb)";
        }

        document.body.style.background = bg;

        document.getElementById("location").innerText = city;
        document.getElementById("time").innerText = new Date().toLocaleString();
        document.getElementById("weather-icon").src = icon;
        document.getElementById("temp").innerText = `${temp}°C`;
        document.getElementById("condition").innerText = condition;
        document.getElementById("feels").innerText = `🤗 Feels like: ${feels}°C`;
        document.getElementById("humidity").innerText = `💧 Humidity: ${humidity}%`;
        document.getElementById("wind").innerText = `💨 Wind: ${wind} km/h`;

    } catch {
        alert("Something went wrong");
    }
}
