import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";

const db = initStore("stations");

export const stationStore = {
  async getAllStations() {
    await db.read();
    return db.data.stations;
  },

  async addStation(station) {
    await db.read();
    station._id = v4();
    station.readings = []; // Initialize readings as an empty array
    db.data.stations.push(station);
    await db.write();
    return station;
  },

  async getStationById(id) {
    await db.read();
    const station = db.data.stations.find((station) => station._id === id);

    if (!station) {
      return null; // Return null or throw an error depending on your use case
    }

    return station;
  },

  async deleteStationById(id) {
    await db.read();
    const index = db.data.stations.findIndex((station) => station._id === id);
    db.data.stations.splice(index, 1);
    await db.write();
  },

  async deleteAllStations() {
    db.data.stations = [];
    await db.write();
  },

  async addReading(stationId, reading) {
    await db.read();
    reading.id = v4();
    const station = db.data.stations.find((station) => station._id === stationId);

    if (!station) {
      throw new Error("Station not found"); // or handle it in any other way
    }

    station.readings.push(reading);
    await db.write();
    return reading;
  },

  async getReadingsByStationId(stationId) {
    await db.read();
    const station = db.data.stations.find((station) => station.id === stationId);

    return station ? station.readings : [];
  },

  async getReadingById(id) {
    await db.read();
    for (const station of db.data.stations) {
      const reading = station.readings.find((reading) => reading.id === id);
      if (reading) {
        return reading;
      }
    }
    return null;
  },

  async deleteReading(id) {
    await db.read();
    for (const station of db.data.stations) {
      const index = station.readings.findIndex((reading) => reading.id === id);
      if (index !== -1) {
        station.readings.splice(index, 1);
        await db.write();
        return;
      }
    }
  },

  async deleteAllReadings() {
    db.data.stations.forEach((station) => {
      station.readings = [];
    });
    await db.write();
  },

  async updateReading(reading, updatedReading) {
    reading.code = updatedReading.code;
    reading.temp = updatedReading.temp;
    reading.windspeed = updatedReading.windspeed;
    reading.pressure = updatedReading.pressure;
    reading.windDirection = updatedReading.windDirection;

    await db.write();
  },

  async getStationsByUserId(userid) {
    await db.read();
    return db.data.stations.filter((station) => station.userid === userid);
  },
};