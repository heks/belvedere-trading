import { FETCH_GIFS_SUCCEEDED, FETCH_GIFS_FAILED, FETCH_REQUESTED, INPUT_CHANGED } from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import { normalize, Schema, arrayOf } from 'normalizr';
const gif = new Schema('gif');
const pagination = new Schema('pagination');

const API_URL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

function *helloSaga() {
  console.log("hello saga")
}

function fetchGifs(query) {
  return fetch(`${API_URL}${query}`)
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    }).then(response => {
      const {data} = response;
      return normalize({
        gifs: data,
        pagination: {
          id: query,
          ...response.pagination
        }
      }, {
        gifs: arrayOf(gif),
        pagination
      })
    });
}

export function* fetchData(action) {
  const { query } = action.payload;
   try {
      // debounce input
      yield call(delay, 500);
      const data = yield call(fetchGifs, query);
      yield put({type: "FETCH_GIFS_SUCCEEDED", payload: data})
   } catch (error) {
      yield put({type: "FETCH_GIFS_FAILED", error})
   }
}

function* handleInput(action) {
  console.log(action);
  yield put(action);
  // debounce by 500ms
  yield call(delay, 500);
  yield call(fetchData, action);
}


export default function* rootSaga() {
  yield helloSaga();
  yield takeLatest(INPUT_CHANGED, handleInput);
  // yield takeLatest(FETCH_REQUESTED, fetchData);
}
