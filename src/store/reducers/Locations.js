import * as actions from "../actions";
import { normalize } from "normalizr";
import { LocationsSchema } from "../schemas";


const initialState = {
  loading: false,
  locations: {}
};

const startLoading = (state, action) => {
    return { ...state, loading: true };
  };

const locationsDataReceived = (state, action) => {

  // Added id for the normalizing the data
 const indexedData = Object.keys(action.data).map((key,index) => Object.assign({},{ id : index}, action.data[index]));
 let normalizedData= normalize(indexedData, LocationsSchema)
  return {
    ...state,
    loading: false,
    locations: normalizedData
  };
};

const handlers = {
    [actions.FETCH_LOCATION_DATA]: startLoading,
    [actions.LOCATION_DATA_RECEIVED]: locationsDataReceived
  };
  
  export default (state = initialState, action) => {
    const handler = handlers[action.type];
    if (typeof handler === "undefined") return state;
    return handler(state, action);
  };