import {stationStore} from "../models/station-store.js";

export const stationController = {
        async index(request, response) {
          const station = await stationStore.getStationById(request.params.id);
          const viewData = {
            title: "Station",
            station: station,
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
      