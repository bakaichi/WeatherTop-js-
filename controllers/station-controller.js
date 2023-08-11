import {stationStore} from "../models/station-store.js";
import { conversions } from "../utils/conversions.js";

export const stationController = {
        async index(request, response) {
          
          const station = await stationStore.getStationById(request.params.id);
          const lastReading = conversions.getLatestReading(station);
          const secondLastReading = conversions.getSecondLatestReading(station);
          const toFahrenheit = conversions.celciusToFahrenheit(lastReading.temp);
          const codeToWeather = conversions.codeToWeather(lastReading.code);
          const toBeufort = conversions.convertToBeufort(lastReading.windspeed);
          const direction = conversions.convertWindDirection(lastReading.windDirection); 
          const windChill = conversions.windChill(lastReading.windspeed, lastReading.temp);

          const maxTemp = conversions.getMaxValue(station, 'temp');
          const maxWind = conversions.getMaxValue(station, 'windspeed');
          const maxWindBft = conversions.convertToBeufort(maxWind);
          const maxPressure = conversions.getMaxValue(station, 'pressure');

          const minTemp = conversions.getMinValue(station, 'temp');
          const minWind = conversions.getMinValue(station, 'windspeed');
          const minWindBft = conversions.convertToBeufort(minWind);
          const minPressure = conversions.getMinValue(station, 'pressure');

          // Getting latest temp, second latest and comparing them to get a trend
          const firstTemp = lastReading.temp;
          const secondTemp = secondLastReading.temp;          
          const tempTrend = conversions.getTrend(station, firstTemp, secondTemp);
          console.log('t trend ', tempTrend);

          // Pressure Trend
          const firstPressure = lastReading.pressure;
          const secondPressure = secondLastReading.pressure;
          const pressureTrend = conversions.getTrend(station, firstPressure, secondPressure);
          console.log('p trend ', pressureTrend );

          // Wind Trend
          let firstWindSpeed = lastReading.windspeed;
          let secondWindSpeed = secondLastReading.windspeed;
          const windTrend = conversions.getTrend(station, firstWindSpeed, secondWindSpeed);         
          


          const viewData = {
            title: "Station",
            station: station,
            lastReading: lastReading,
            toFahrenheit: toFahrenheit,
            codeToWeather: codeToWeather,
            toBeufort: toBeufort,
            direction: direction,
            windChill: windChill,

            maxTemp: maxTemp,
            maxWind: maxWind,
            maxWindBft: maxWindBft,
            maxPressure: maxPressure,

            minTemp: minTemp,
            minWind: minWind,
            minWindBft: minWindBft,
            minPressure: minPressure,

            tempTrend: tempTrend,
            windTrend: windTrend,
            pressureTrend: pressureTrend,
          };
          response.render("station-view", viewData);
        },

        async addReading(request, response) {
          const station = await stationStore.getStationById(request.params.id);
          const newReading = {
            code: Number(request.body.code),
            temp: Number(request.body.temp),
            windspeed: Number(request.body.windspeed),
            pressure: Number(request.body.pressure),
            windDirection: Number(request.body.windDirection),
          };
          await stationStore.addReading(station._id, newReading);
          response.redirect("/station/" + station._id);
        },

        async deleteReading(request, response) {
          const stationId = request.params.stationid;
          const readingId = request.params.readingid;
          console.log(`Deleting reading ${readingId} from Station ${stationId}`);
          await stationStore.deleteReading(readingId);
          response.redirect("/station/" + stationId);
        },

};
      