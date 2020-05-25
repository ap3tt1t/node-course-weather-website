# node-course-weather-website

Project developed as part of Andrew Mead's (mead.io) Node.js course on Udemy.com.
Currently deployed to: 

Fetches location data (latitude and longitude) from Mapbox (API Key needed for this) and then uses the data to provide weather data
from the Weatherstack API (also need API key for this).

For program to run, a .env file needs to be added in the root folder of the project.
The needs to have the following data.
MAP_API_KEY= Put mapbox api key here
WEATHER_API_KEY= Put weatherstack api key here

To start the server, type: npm start
To start a development mode of the server, type: npm run dev

