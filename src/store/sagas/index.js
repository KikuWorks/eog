import WeatherSagas from "./Weather";
import ApiErrors from "./ApiErrors";
import DroneSagas from "./Drone";
import LocationSagas from "./Locations";

export default [...ApiErrors, ...WeatherSagas, ...DroneSagas, ...LocationSagas];
