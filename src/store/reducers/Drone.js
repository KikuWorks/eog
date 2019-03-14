import * as actions from "../actions";
import { normalize } from "normalizr";
import { MeasurmentsSchema } from "../schemas";


const initialState = {
  loading: false,
  data: {}
};

const startLoading = (state, action) => {
    return { ...state, loading: true };
  };

const droneDataReceived = (state, action) => {

  const { data } = action.data;

  // Added id for the normalizing the data
 const indexedData = Object.keys(data).map((key,index) => Object.assign({},{ id : index}, data[index]));
 let normalizedData= normalize(indexedData, MeasurmentsSchema)

  return {
    ...state,
    loading: false,
    droneData: normalizedData
  };
};

const handlers = {
    [actions.FETCH_DRONE_DATA]: startLoading,
    [actions.DRONE_DATA_RECEIVED]: droneDataReceived
  };
  
  export default (state = initialState, action) => {
    const handler = handlers[action.type];
    if (typeof handler === "undefined") return state;
    return handler(state, action);
  };