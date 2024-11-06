<script>
    async function getWeather() {
        const location = document.getElementById('location').value;
        const apiKey = 'YOUR_API_KEY'; // Replace with your API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&lang=vi&units=metric`;

        // Show loading message
        document.getElementById('weatherResult').innerHTML = '<p>Đang tải...</p>';
        
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Khu vực không hợp lệ hoặc không tìm thấy.");

            const weatherData = await response.json();
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const cityName = weatherData.name;

            document.getElementById('weatherResult').innerHTML = `
                <h3>Thời tiết tại ${cityName}</h3>
                <p>Nhiệt độ: ${temperature}°C</p>
                <p>Mô tả: ${description}</p>
            `;
            document.getElementById('weatherResult').classList.remove('error');

            // Save the last searched location to local storage
            localStorage.setItem('lastLocation', location);
        } catch (error) {
            document.getElementById('weatherResult').innerHTML = `<p class="error">${error.message}</p>`;
            document.getElementById('weatherResult').classList.add('error');
        }
    }

    // Load the last searched location on page load
    window.onload = function() {
        const lastLocation = localStorage.getItem('lastLocation');
        if (lastLocation) {
            document.getElementById('location').value = lastLocation;
            getWeather(); // Optionally fetch weather for last location
        }
    };
</script>
