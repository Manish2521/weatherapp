import React, { useState } from 'react';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async (e) => {
    e.preventDefault();
    setError('');
    setWeather(null);

    try {
      const response = await fetch(`https://weatherapp-hxvr.onrender.com/weather?city=${city}`);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        setError(data.error || 'City not found');
      }
    } catch (err) {
      setError('Unable to fetch weather data');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Weather App</h1>

      <form
        onSubmit={fetchWeather}
        className="flex flex-col sm:flex-row items-center gap-4 mb-8"
      >
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          required
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {weather && (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-4">
            Weather in {weather.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-blue-100 text-blue-800 p-4 rounded-lg">
              <h3 className="font-semibold text-lg">Temperature</h3>
              <p className="text-xl">{weather.main.temp}°C</p>
            </div>
            <div className="bg-blue-100 text-blue-800 p-4 rounded-lg">
              <h3 className="font-semibold text-lg">Humidity</h3>
              <p className="text-xl">{weather.main.humidity}%</p>
            </div>
            <div className="bg-blue-100 text-blue-800 p-4 rounded-lg">
              <h3 className="font-semibold text-lg">Wind Speed</h3>
              <p className="text-xl">
                {(weather.wind.speed * 3.6).toFixed(1)} km/h
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
