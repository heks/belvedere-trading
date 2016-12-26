import { FETCH_REQUESTED, FETCH_GIFS_SUCCEEDED, FETCH_GIFS_FAILED, INPUT_CHANGED, CLEAR_GIFS, BUTTON_CLICK } from '../constants/ActionTypes';

const initState = {
  loading: false,
  gifs: [],
  pagination:undefined,
  query: '',
  gif: undefined,
  isInfiniteLoading: false
};

export default function gif(state = initState, action) {
  switch (action.type) {
    case BUTTON_CLICK:
    case INPUT_CHANGED: {
      const {query} = action.payload;
      return {
        ...state,
        loading: true,
        query,
        isInfiniteLoading: false
      }
    }
    case FETCH_REQUESTED: {
      const {query} = action.payload;
      return {
        ...state,
        query,
        isInfiniteLoading: true
      };
    }
    case FETCH_GIFS_SUCCEEDED: {
      const {entities: {gif, pagination}, result: {gifs}} = action.payload;
      return {
        ...state,
        gif: {
          ...state.gif,
          ...gif
        },
        pagination,
        loading: false,
        isInfiniteLoading: false,
        gifs: [...new Set([...state.gifs, ...gifs])]
      }
    }
    case CLEAR_GIFS:
      return {
        ...state,
        gifs: [],
        gif: undefined,
        isInfiniteLoading: false,
        pagination:undefined,
      };
    case FETCH_GIFS_FAILED:
    default:
      return state;
  }
}
