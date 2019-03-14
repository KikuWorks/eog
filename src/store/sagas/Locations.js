import { takeEvery, call, put, cancel, all, take, takeLatest } from "redux-saga/effects";
import API from "../api";
import * as actions from "../actions";
import { toast } from "react-toastify";

  function* watchFetchLocationData(action) {
    try{        
          const { latitude, longitude } = action;
          const { error, data } = yield call(
            API.findLocationByLatLng,
            latitude,
            longitude
          );
            if (error) {
              yield put({ type: actions.API_ERROR, code: error.code });
              yield cancel();
              return;
            }
            yield put({ type: actions.LOCATION_DATA_RECEIVED, data });
    }
    catch (err){
        console.log({ err });
        yield put({ type: actions.API_ERROR, code: err });
        yield cancel();
        return;
    }
    finally{

    }
  }
function* LocationsDataLoad(){
    yield all ([
        takeEvery(actions.FETCH_LOCATION_DATA, watchFetchLocationData)
    ])
}

export default [LocationsDataLoad];