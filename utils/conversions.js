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

    celciusToFahrenheit(temp) {
        return (temp * 1.8) + 32;
    },

    codeToWeather(code){
        let s;

        switch (code) {
            case 800:
                s = 'Thunder';
                break;
            case 700:
                s = 'Snow';
                break;
            case 600:
                s = 'Rain';
                break;
            case 500:
                s = 'Heavy Showers';
            case 400:
                s = 'Light Showers';
                break;
            case 300:
                s = 'Cloudy';
                break;
            case 200:
                s = 'Partial Clouds';
                break;
            case 100:
                s = 'Clear';
                break;
            default:
                s = 'No weather data Available';             
        }
        return s;
    },

    convertToBeufort(windspeed){
        if (windspeed >= 103) {
            return 11;
        } else if (windspeed >= 89){
            return 10;
        } else if (windspeed >= 75){
            return 9;
        } else if (windspeed >= 62){
            return 8;
        } else if (windspeed >= 50){
            return 7;
        } else if (windspeed >= 39){
            return 6;
        } else if (windspeed >= 29){
            return 5;
        } else if (windspeed >= 20){
            return 4;
        } else if (windspeed >= 12){
            return 3;
        } else if (windspeed >= 6){
            return 2;
        } else if (windspeed >= 1){
            return 1;
        } else {
            return 0;
        }
    },
};