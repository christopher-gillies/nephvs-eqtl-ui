import { SET_TAB } from "../actions/consts.js"


const searchResult = (state = {}, action) => {
  let state_res = state
  switch(action.type) {
    case SET_TAB:
      state_res = {
        ...state,
        currentTab: action.tab
      }
      break;
    default:
      state_res = state
  }

  return state_res;
}

export default searchResult
