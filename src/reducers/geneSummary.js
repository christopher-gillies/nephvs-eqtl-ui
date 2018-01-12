import { SET_TAB_GENE_SUMMARY } from "../actions/consts.js"


const geneSummary = (state = {}, action) => {
  let state_res = state
  switch(action.type) {
    case SET_TAB_GENE_SUMMARY:
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

export default geneSummary;
