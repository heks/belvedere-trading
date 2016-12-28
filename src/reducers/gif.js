import { FETCH_REQUESTED, FETCH_GIFS_SUCCEEDED, FETCH_GIFS_FAILED, INPUT_CHANGED, CLEAR_GIFS, BUTTON_CLICK, CLEAR_QUERY } from '../constants/ActionTypes';

const initState = {
  loading: false,
  gifs: [],
  pagination:undefined,
  query: '',
  gif: undefined,
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
      }
    }
    case FETCH_REQUESTED: {
      const {query} = action.payload;
      return {
        ...state,
        query,
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
        gifs: [...new Set([...state.gifs, ...gifs])]
      }
    }
    case CLEAR_QUERY:
      return {
        ...state,
        loading: false,
        query:''
      }
    case CLEAR_GIFS:
      return {
        ...state,
        gifs: [],
        gif: undefined,
        pagination:undefined,
      };
    case FETCH_GIFS_FAILED:
    default:
      return state;
  }
}
