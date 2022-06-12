import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest'
import camelCaseKeys from 'camelcase-keys'

const ACCESS_KEY = '9d8910ead74d9a3e0931ca9881f4b9cd'
const API_URL = 'https://api.openweathermap.org/data/2.5/'
const MATRIC ="metric";
export class WeatherAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = API_URL
  }

  willSendRequest(request: RequestOptions) {
    request.params.set('appid', ACCESS_KEY);
    request.params.set('units', MATRIC);
  }

  async withCoords(lat: number, lon: number) {
    const data = await this.get('weather', { lat, lon })
    console.log(data);
    
    return camelCaseKeys(data, { deep: true })
  }

  async withCity(city: string) {
    const data = await this.get('weather', { q: city })
    return camelCaseKeys(data, { deep: true })
  }
}

export const dataSources = () => ({ weatherAPI: new WeatherAPI() })
