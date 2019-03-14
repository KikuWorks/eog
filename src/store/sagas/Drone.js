import { takeEvery, call, put, cancel, all, take, takeLatest } from "redux-saga/effects";
import API from "../api";
import * as actions from "../actions";
import { toast } from "react-toastify";
import countDown from './SetInterval';

  function* watchFetchDroneData(action) {
    const countchannel = yield call( countDown, 4000);
    try{while(true){
        let seconds = yield take(countchannel)
        console.log(`countdown: ${seconds}`)
            const { id } = action;
            const { error, data } = yield call(API.getDroneData);
            if (error) {
              yield put({ type: actions.API_ERROR, code: error.code });
              yield cancel();
              return;
            }
            yield put({ type: actions.DRONE_DATA_RECEIVED, data });
        }
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
function* DroneDataLoad(){
    yield all ([
        takeLatest(actions.FETCH_DRONE_DATA, watchFetchDroneData)
    ])
}

export default [DroneDataLoad];