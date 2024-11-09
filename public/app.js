// Personal API Key for OpenWeatherMap API
const apiKey = "5c7334e1dc366f51f527c233d1cd2adf";

// Event listener for the generate button
document.getElementById("generate").addEventListener("click", performAction);

function performAction() {
  const zip = document.getElementById("zip").value;
  const country = document.getElementById("country").value || "us"; // Default to 'us' if no input
  const feelings = document.getElementById("feelings").value;

  getWeatherData(zip, country).then((data) => {
    if (data) {
      // Only proceed if data is not null
      const date = new Date().toLocaleDateString();

      postData("/add", {
        date: date,
        temp: data.main.temp,
        content: feelings,
      }).then(updateUI);
    }
  });
}

// Fetch weather data from OpenWeatherMap
const getWeatherData = async (zip, country) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&appid=${apiKey}&units=imperial`
    );
    const data = await response.json();

    if (data.cod !== 200) {
      // Check if there was an error in the response
      console.log("Error:", data.message);
      alert(`Error: ${data.message}`);
      return null; // Return null if there was an error
    }

    return data; // Return data if successful
  } catch (error) {
    console.log("Error fetching weather data:", error);
    alert("Error fetching weather data. Please try again later.");
    return null; // Return null on error
  }
};

// POST data to the server
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    return await response.json();
  } catch (error) {
    console.log("Error posting data:", error);
  }
};

// Update UI with fetched data
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    if (allData) {
      document.getElementById("date").innerHTML = `Date: ${
        allData.date || "N/A"
      }`;
      document.getElementById("temp").innerHTML = `Temp: ${Math.round(
        allData.temp || 0
      )}°F`;
      document.getElementById("content").innerHTML = `Feeling: ${
        allData.content || "N/A"
      }`;
    }
  } catch (error) {
    console.log("Error updating UI:", error);
  }
};
