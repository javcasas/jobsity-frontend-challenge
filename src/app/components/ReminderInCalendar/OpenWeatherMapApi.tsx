import { Moment, utc } from 'moment';

interface ForecastRequest {
  list: {
    dt_txt: string;
    weather: {
      main: string;
    }[]
  }[]
}

type FetchForecastFn = (API_KEY: string) => (city: string, date: Moment) => Promise<string>
export const fetchForecast : FetchForecastFn = (API_KEY: string) => (city: string, date: Moment) => 
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}`)
      .then(response => {
        if(response.ok) {
          return response.json();
        } else {
          return Promise.reject(new Error("fetch failed"))
        }
      })
      .then((content: ForecastRequest) => content.list.find(item => {
          const start = utc(item.dt_txt);
          const end = utc(item.dt_txt).add(3, "hours");
          return (start.isBefore(date) && end.isAfter(date))
        }))
      .then(item => {
        if(item && item.weather && item.weather[0]) {
          return Promise.resolve(item.weather[0].main)
        } else {
          return Promise.reject(new Error("No data available"))
        }
      })
