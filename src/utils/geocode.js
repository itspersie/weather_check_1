const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiaXRzcGVyc2llIiwiYSI6ImNrZnkzdnl3bjI3ZXEyeG84aDVqN2E2d24ifQ.y2Y4yAcLzcGtIfI4c-bOTw&limit=1";

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("unable to find location! try another search", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
