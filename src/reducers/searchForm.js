import { SET_SEARCH_QUERY } from "../actions/consts.js"
import { SET_SEARCH_ERROR } from "../actions/consts.js"
import { SET_SUGGESTIONS } from "../actions/consts.js"

const searchForm = (state = {}, action) => {
  let state_res = state
  switch(action.type) {
    case SET_SEARCH_QUERY:
      state_res = {
        ...state,
        query: action.query
      }
      break;

    case SET_SEARCH_ERROR:
      state_res = {
        ...state,
        showErrorMessage: action.showErrorMessage,
        errorMessage: action.errorMessage
      }
      break;

    case SET_SUGGESTIONS:
      state_res = {
        ...state,
        suggestions: action.suggestions
      }
      break;


    default:
      state_res = state
  }
  //console.log(state_res)
  return state_res;
}

export default searchForm
