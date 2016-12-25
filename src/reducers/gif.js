import { FETCH_REQUESTED, FETCH_GIFS_SUCCEEDED, FETCH_GIFS_FAILED, INPUT_CHANGED } from '../constants/ActionTypes';

const initState = {
  loading: false,
  gifs: [],
  pagination:{},
  query: '',
  gif: {}
};

export default function gif(state = initState, action) {
  switch (action.type) {
    case INPUT_CHANGED: {
      const {query} = action.payload;
      return {
        ...state,
        loading: true,
        query
      }
    }
    case FETCH_REQUESTED: {
      const {query} = action.payload;
      return {
        ...state,
        loading: true,
        query
      };
    }
    case FETCH_GIFS_SUCCEEDED: {
      const {entities, result: {gifs, pagination}} = action.payload;
      return {
        ...state,
        ...entities,
        loading: false,
        gifs
      }
    }
    case FETCH_GIFS_FAILED:
    default:
      return state;
  }
}
