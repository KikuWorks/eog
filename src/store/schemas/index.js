import { schema } from 'normalizr';

export const MeasurmentSchema = new schema.Entity("Measurment");
export const MeasurmentsSchema = [MeasurmentSchema]
export const WeatherForecastSchema = new schema.Entity("WeatherForecast");
export const WeatherSchema = new schema.Object({consolidated_weather: new schema.Array(WeatherForecastSchema)});
export const WeatherLocationSchema = new schema.Entity("WeatherLocation",{},{ idAttribute: 'woe_id'});
export const LocationSchema = new schema.Entity("Location");
export const LocationsSchema = [LocationSchema];