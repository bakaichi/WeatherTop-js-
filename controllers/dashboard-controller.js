import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { conversions } from "../utils/conversions.js";

export const dashboardController = {
    async index(request, response) {
      const loggedInUser = await accountsController.getLoggedInUser(request);
      const stations = await stationStore.getStationsByUserId(loggedInUser._id);
  
      // getting the latest readings for each station
      const stationsWithLatestReadings = await Promise.all(
        stations.map(async (station) => {
          const lastReading = conversions.getLatestReading(station);
          return { ...station, lastReading };
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