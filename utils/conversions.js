export const conversions = {
    getLatestReading(station) {
        let lastReading = null;

        if (station.readings.length > 0) {
            lastReading = station.readings[0];
            for (let i = 0; i < station.readings.length; i++){
                lastReading = station.readings[i];
            }
        } else {
            return 0;
        }
        return lastReading;
    },

    getSecondLatestReading(station) {
        let reading = null;

        if (station.readings.length > 0){
            reading = station.readings[0];
            for (let i = 0; i < station.readings.length; i++){
                reading = station.readings[i - 1];
            }
        } else {
            return 'n/a';
        }
        return reading;
    },

    getMaxValue(station, property) {
        if (station.readings.length < 2) {
          return 'not enough data';
        }
    
        let maxVal = station.readings[0][property];

        for (let i = 1; i < station.readings.length; i++) {
          const value = station.readings[i][property];
          if (value > maxVal) {
            maxVal = value;
          }
        }
    
        return maxVal; 
    },

    getMinValue(station, property) {
        if (station.readings.length < 2) {
          return 'not enough data';
        } else {
            
          let minVal = station.readings[0][property];
    
          for (let i = 1; i < station.readings.length; i++) {
            const value = station.readings[i][property];
            if (value < minVal) {
              minVal = value;
            }
          }    
          return minVal; 
        }
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

    convertToBeufort(windspeed) {
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
            return 'No Weather Data Available';
        }
    },

    convertWindDirection(windDirection) {
        if (windDirection >= 326.25){
            return 'North North West';
        } else if (windDirection >= 303.75){
            return 'North West';
        } else if (windDirection >= 281.25){
            return 'West North West';
        } else if (windDirection >= 258.75){
            return 'West';
        } else if (windDirection >= 236.25){
            return 'West South West';
        } else if (windDirection >= 213.75){
            return 'South West';
        } else if (windDirection >= 191.25){
            return 'South South West';
        } else if (windDirection >= 168.75){
            return 'South';
        } else if (windDirection >= 146.25){
            return 'South South East';
        } else if (windDirection >= 123.75){
            return 'South East';
        } else if (windDirection >= 101.26){
            return 'East South East';
        } else if (windDirection >= 78.75){
            return 'East';
        } else if (windDirection >= 56.25){
            return 'East North East';
        } else if (windDirection >= 33.75){
            return 'North East';
        } else if (windDirection >= 11.25){
            return 11.25;
        } else {
            return 'North';
        }
    },

     windChill(windspeed, temp) {
        let windChill = 13.12 + 0.6215 * temp - 11.37 * Math.pow(windspeed, 0.16) + 0.3965
                        * temp * Math.pow(windspeed, 0.16);

        windChill = Math.round(windChill * 10) / 10.0; // rounds the answer to 1 decimal point
        return windChill;
    },  

     getTrend(station, lastReading, secondLastReading) {
        if (station.readings.size < 2){
          return ' ';
        } else {
          const firstReading = lastReading;
          const secondReading = secondLastReading;

          if (firstReading > secondReading) {
            return 'fa-arrow-up fa-fade';
          } else if (firstReading < secondReading){
            return 'fa-arrow-down fa-fade';
          } else {
            return 'fa-minus fa-beat';
          }
        }
      },

    convertToTempIcon(temp){
        let s = null;
                
        if (temp >= 30){
            s = 'fa-xl fa-temperature-high';

        } else if (temp >= 20){
            s = 'fa-xl fa-temperature-half';
        } else if (temp >= 10){
            s = 'fa-xl fa-temperature-quarter';
        } else {
            s = 'fa-xl fa-temperature-low';
        }
        return s;
    },     

    convertToWeatherIcon(code){
        let s = null;

        switch(code) {
            case 800:
                s = "fa-solid fa-xl fa-cloud-bolt";
                break;
              case 700:
                s = "fa-solid fa-xl fa-cloud-meatball";
                break;
              case 600:
                s = "fa-solid fa-xl fa-cloud-rain";
                break;
              case 500:
                s = "fa-solid fa-xl fa-cloud-showers-water";
                break;
              case 400:
                s = "fa-solid fa-xl fa-cloud-showers-heavy";
                break;
              case 300:
                s = "fa-solid fa-xl fa-cloud";
                break;
              case 200:
                s = "fa-solid fa-xl fa-cloud-sun";
                break;
              case 100:
                s = "fa-solid fa-xl fa-sun";
        }
        return s;
    },
};