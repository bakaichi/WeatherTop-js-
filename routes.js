import express from "express";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { stationController } from "./controllers/station-controller.js";

export const router = express.Router();

router.get("/", accountsController.index);
router.get("/login", accountsController.login);
router.get("/signup", accountsController.signup);
router.get("/logout", accountsController.logout);
router.post("/register", accountsController.register);
router.post("/authenticate", accountsController.authenticate);

router.get("/usersettings", accountsController.settings);
router.post("/accountscontroller/update", accountsController.update);

router.get("/dashboard", dashboardController.index);
router.post("/dashboard/addstation", dashboardController.addStation);
router.get("/about", aboutController.index);
router.get("/station/:id", stationController.index);
router.post("/station/:id/addreadings", stationController.addReading);

router.get("/dashboard/deletestation/:id", dashboardController.deleteStation);
router.get("/station/:stationid/deletereading/:readingid", stationController.deleteReading);
