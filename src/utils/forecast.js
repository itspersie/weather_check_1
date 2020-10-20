const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=0f9b6e9b7c6d03f4b590e529916bc390&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("unable to connect to weather service app", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        "weather forcast => " +
          body.current.weather_descriptions[0] +
          "  its  " +
          body.current.temperature +
          " feels like " +
          body.current.feelslike
      );
    }
  });
};

module.exports = forecast;
