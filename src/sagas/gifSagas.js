import { FETCH_GIFS_SUCCEEDED, FETCH_GIFS_FAILED, FETCH_REQUESTED, CLEAR_QUERY, INPUT_CHANGED, ENTER_PRESSED, BUTTON_CLICK, CLEAR_GIFS, ESC_PRESSED } from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import { call, put, race, take, cancel, cancelled } from 'redux-saga/effects'
import { takeLatest, takeEvery, throttle } from 'redux-saga'
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
  try {
    yield call(delay, 650);
    yield put({type: CLEAR_GIFS});
    const {query} = action.payload;
    if(query.length) {
      yield call(fetchData, action);
    } else {
      yield put({type: CLEAR_QUERY});
    }
  } finally {
    if (yield cancelled()) {
      console.log("Cancled debounce");
    }
  }
}

function* handleEsc(action) {
  yield put({type: CLEAR_GIFS});
  yield put({type: CLEAR_QUERY});
}

function* handleEnter(action) {
  // yield put({type: CLEAR_GIFS});
  const {query} = action.payload;
  if(query.length) {
    yield call(fetchData, action);
  }
}

function *handleNextPage(action) {
  yield call(fetchData, action);
}

function *watchEnter() {
  yield takeEvery(ENTER_PRESSED, handleEnter);
}

function* watchInput() {
  while(true) {
    const inputTask = yield takeLatest(INPUT_CHANGED, handleDebounce);
    yield take([ESC_PRESSED, ENTER_PRESSED]);
    yield cancel(inputTask)
  }
}

function* watchEsc() {
  yield takeEvery(ESC_PRESSED, handleEsc);
}

function* watchButtons() {
  yield takeLatest(BUTTON_CLICK, handleDebounce);
}

function* watchNextPage() {
  yield throttle(500, FETCH_REQUESTED, handleNextPage)
}


export default function* rootSaga() {
  yield [
    watchInput(),
    watchButtons(),
    watchEnter(),
    watchEsc(),
    watchNextPage()
  ];
}
