import {stationStore} from "../models/station-store.js";
import { conversions } from "../utils/conversions.js";

export const stationController = {
        async index(request, response) {
          const station = await stationStore.getStationById(request.params.id);
          const lastReading = conversions.getLatestReading(station);
          const celciusToFahrenheit = conversions.celciusToFahrenheit(lastReading.temp);
          const codeToWeather = conversions.codeToWeather(lastReading.code);
          const convertToBeufort = conversions.convertToBeufort(lastReading.windspeed);
          const viewData = {
            title: "Station",
            station: station,
            lastReading: lastReading,
            celciusToFahrenheit: celciusToFahrenheit,
            codeToWeather: codeToWeather,
            convertToBeufort: convertToBeufort,
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
          };
          await stationStore.addReading(station._id, newReading);
          response.redirect("/station/" + station._id);
        },
      };
      