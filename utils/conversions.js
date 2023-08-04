export const conversions = {
    getLatestReading(station) {
        let lastReading = null;

        if (station.readings.length > 0){
            lastReading = station.readings[0];
            for (let i = 0; i < station.readings.length; i++){
                lastReading = station.readings[i];
            }
        } else {
            return 0;
        }
        return lastReading;
    },
};