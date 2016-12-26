import { FETCH_GIFS_SUCCEEDED, FETCH_GIFS_FAILED, FETCH_REQUESTED, INPUT_CHANGED, BUTTON_CLICK, CLEAR_GIFS } from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import { call, put } from 'redux-saga/effects'
import { takeLatest, throttle } from 'redux-saga'
import { normalize, Schema, arrayOf } from 'normalizr';
const gif = new Schema('gif');
const pagination = new Schema('pagination');

const API_URL = "https://api.giphy.com/v1/gifs/search?limit=100&api_key=dc6zaTOxFJmzC";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const buildUrl = (payload) => {
  const {query, offset, other} = payload;
  let apiString = API_URL;
  apiString = other ? API_URL.replace('search', other) : apiString;
  return `${apiString}` + (query ? `&q=${encodeURI(query)}` : '') + (offset ? `&offset=${offset}` : '');
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
        gifs: data || {},
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
      yield put({type: FETCH_GIFS_SUCCEEDED, payload: data })
   } catch (error) {
      yield put({type: FETCH_GIFS_FAILED, error})
   }
}

function* handleDebounce(action) {
  // debounce by 500ms
  yield call(delay, 500);
  yield put({type: CLEAR_GIFS});
  yield call(fetchData, action);
}

function *handleInfiniteScroll(action) {
  console.log("test")
  yield call(fetchData, action);
}

function* watchInput() {
  yield takeLatest(INPUT_CHANGED, handleDebounce);
}

function* watchButtons() {
  yield takeLatest(BUTTON_CLICK, handleDebounce);
}

function* watchInfiniteScroll() {
  yield throttle(500, FETCH_REQUESTED, handleInfiniteScroll)
}


export default function* rootSaga() {
  yield [
    watchInput(),
    watchButtons(),
    watchInfiniteScroll()
  ];
}
