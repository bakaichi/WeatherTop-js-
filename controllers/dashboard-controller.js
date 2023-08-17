import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { conversions } from "../utils/conversions.js";

export const dashboardController = {
    async index(request, response) {
      const loggedInUser = await accountsController.getLoggedInUser(request);
      const stations = await stationStore.getStationsByUserId(loggedInUser._id);

      // sorting station names alphabetically on dashboard
      stations.sort((a,b) => a.name !== b.name ? a.name < b.name ? -1 : 1 : 0); 
  
      // getting the latest readings for each station
      const stationsWithLatestReadings = await Promise.all(
        stations.map(async (station) => {

          const lastReading = conversions.getLatestReading(station);
          const secondLastReading = conversions.getSecondLatestReading(station);
          const codeToWeatherDescription = conversions.codeToWeather(lastReading.code);
          
          const celciusToFahrenheit = conversions.celciusToFahrenheit(lastReading.temp);
          const maxTemp = conversions.getMaxValue(station, `temp`);
          const minTemp = conversions.getMinValue(station, `temp`);

          const windToBeufort = conversions.convertToBeufort(lastReading.windspeed);
          const feelsLikeWind = conversions.windChill(lastReading.windspeed, lastReading.temp);
          const maxWind = conversions.getMaxValue(station, `windspeed`);
          const minWind = conversions.getMinValue(station, `windspeed`);

          const maxPressure = conversions.getMaxValue(station, `pressure`);
          const minPressure = conversions.getMinValue(station, `pressure`);

          // Getting latest temp, second latest and comparing them to get a trend
          let firstTemp = lastReading.temp;
          let secondTemp = secondLastReading ? secondLastReading.temp : "n/a";          
          const tempTrend = conversions.getTrend(station, firstTemp, secondTemp);

          // Pressure Trend
          let firstPressure = lastReading.pressure;
          let secondPressure = secondLastReading ? secondLastReading.pressure : "n/a";
          const pressureTrend = conversions.getTrend(station, firstPressure, secondPressure);


          // Wind Trend
          let firstWindSpeed = lastReading.windspeed;
          let secondWindSpeed = secondLastReading ? secondLastReading.windspeed : "n/a";
          const windTrend = conversions.getTrend(station, firstWindSpeed, secondWindSpeed);

          // Temp icons
          const latestTemp = lastReading.temp;
          const tempIcon = conversions.convertToTempIcon(latestTemp);

          // Weather Icons
          const latestCode = lastReading.code;
          const weatherIcon = conversions.convertToWeatherIcon(latestCode);

          return { ...station, lastReading, codeToWeatherDescription, celciusToFahrenheit, maxTemp, minTemp,
                  windToBeufort, feelsLikeWind, maxWind, minWind, maxPressure, minPressure, tempTrend, pressureTrend,
                  windTrend, tempIcon, weatherIcon};
        })
      );
  
      const viewData = {
        title: "Station Dashboard",
        stations: stationsWithLatestReadings,
      };
        console.log("dashboard rendering");
        response.render("dashboard-view", viewData);
    },

    async addStation(request, response) {
        const loggedInUser = await accountsController.getLoggedInUser(request);
            const newStation = {
            name: request.body.name,
            userid: loggedInUser._id,
            latitude: request.body.latitude,
            longitude: request.body.longitude,
        };
        console.log(`adding station ${newStation.name}`);
        await stationStore.addStation(newStation);
        response.redirect("/dashboard");
    },

    async deleteStation(request, response) {
        const stationId = request.params.id;
        console.log(`Deleting Station ${stationId}`);
        await stationStore.deleteStationById(stationId);
        response.redirect("/dashboard");
    }    
};