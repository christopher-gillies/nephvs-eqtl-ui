import { SET_TAB } from "../actions/consts.js"
import { REQUEST_QUERY_RESULTS } from "../actions/consts.js"
import { RECEIVE_QUERY_RESULTS } from "../actions/consts.js"


const searchResult = (state = {}, action) => {
  let state_res = state
  switch(action.type) {
    case SET_TAB:
      state_res = {
        ...state,
        currentTab: action.tab
      }
      break;

    case REQUEST_QUERY_RESULTS:
      state_res = {
        ...state,
        glomResults: [],
        tubResults: [],
        isFetching: true
      };
      break;
    case RECEIVE_QUERY_RESULTS:
      state_res = {
        ...state,
        glomResults: action.glomResults,
        tubResults: action.tubResults,
        queryType: action.queryType,
        isFetching: false
      };
      break;
    default:
      state_res = state
  }

  return state_res;
}

export default searchResult
