import { FETCH_GIFS_SUCCEEDED, FETCH_GIFS_FAILED, FETCH_REQUESTED, INPUT_CHANGED } from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import { normalize, Schema, arrayOf } from 'normalizr';
const gif = new Schema('gif');
const pagination = new Schema('pagination');

const API_URL = "http://api.giphy.com/v1/gifs/search?limit=35&api_key=dc6zaTOxFJmzC";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const buildUrl = (payload) => {
  const {query, offset} = payload;
  return `${API_URL}&q=${query}&offset=${offset}`
}


function fetchGifs(payload) {
  return fetch(buildUrl(payload))
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
          id: payload.query,
          ...response.pagination
        }
      }, {
        gifs: arrayOf(gif),
        pagination
      })
    });
}

export function* fetchData(action) {
  const { payload } = action;
   try {
      const data = yield call(fetchGifs, payload);
      yield put({type: "FETCH_GIFS_SUCCEEDED", payload: data })
   } catch (error) {
      yield put({type: "FETCH_GIFS_FAILED", error})
   }
}

function* handleInput(action) {
  // debounce by 500ms
  yield call(delay, 500);
  yield call(fetchData, action);
}

function* watchInput() {
  // will cancel current running handleInput task
  yield takeLatest(INPUT_CHANGED, handleInput);
}


export default function* rootSaga() {
  yield watchInput();
  yield takeLatest(FETCH_REQUESTED, fetchData);
}
