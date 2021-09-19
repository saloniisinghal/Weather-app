const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=e776f98c25897e81e1b305bb53ee9100&query=" +
    longitude +
    ",";
  latitude + "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) callback("Unable to connect to weather services!", undefined);
    else if (body.error) callback("Unable to find the location!", undefined);
    else
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degrees out.There is " +
          body.current.feelslike +
          "% chance of rain"
      );
  });
};

module.exports = forecast;
