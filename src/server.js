import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'; 

dotenv.config(); 

const app = express();
const PORT = 5000;
const API_KEY = process.env.OPENWEATHER_API_KEY;

// Middleware
app.use(bodyParser.json()); 
app.use(cors({
  origin: ['https://weatherapp10y7.netlify.app', 'http://localhost:5173'], 
  credentials: true, 
}));
app.use(cookieParser()); 

// Handle weather requests
app.get('/weather', async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return res.status(404).json({ error: 'City not found' });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Unable to fetch weather data', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
