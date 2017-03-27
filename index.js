const http = require('http');
const { firstLetterCapitalize, convertToCelcius } = require('./utils');
require('dotenv').config();

const getLocation = location => {
    const uri = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}`;
    const request = http.get(uri, res => {
        if (res.statusCode === 200) {
            let rawData = '';
            res.on('data', chunk => rawData += chunk);
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    if (parsedData.cod !== 200) {
                        console.log(parsedData.message);
                    } else {
                        const { weather, name, main, sys, wind } = parsedData;
                        const message = `${name} (${sys.country}) >> ${firstLetterCapitalize(weather[0].description)} | ${convertToCelcius(main.temp)}°C | Humidity: ${main.humidity}% | Wind speed: ${wind.speed} meter/sec`;
                        console.log(message);
                    }
                } catch (err) {
                    console.error(err.message);
                }
            });
        } else {
            const message = `There was an error getting weather for ${location} (${http.STATUS_CODES[res.statusCode]})`;
            console.error(message);
        }
    }).on('error', err => {
        console.error(`Got error: ${err.message}`);
    });
}

const location = process.argv.slice(2).join(' ');

if (location !== '') {
    getLocation(location);
} else {
    console.log("You must type a city/location on third arguments");
}
