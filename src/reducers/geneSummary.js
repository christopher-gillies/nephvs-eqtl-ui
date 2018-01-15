import { SET_TAB_GENE_SUMMARY } from "../actions/consts.js"
import { REQUEST_GENE_SUMMARY } from "../actions/consts.js"
import { RECEIVE_GENE_SUMMARY } from "../actions/consts.js"
import { SET_FILTERS_GENE_SUMMARY } from "../actions/consts.js"

const geneSummary = (state = {}, action) => {
  let state_res = state
  switch(action.type) {
    case SET_TAB_GENE_SUMMARY:
      state_res = {
        ...state,
        currentTab: action.tab
      }
      break;
    case REQUEST_GENE_SUMMARY:
      state_res = {
        ...state,
        glomSummaries: [],
        tubSummaries: [],
        isFetching: true
      };
      break;
    case RECEIVE_GENE_SUMMARY:
      state_res = {
        ...state,
        glomSummaries: action.glomSummaries,
        tubSummaries: action.tubSummaries,
        isFetching: false
      };
      break;
    case SET_FILTERS_GENE_SUMMARY:
      state_res = {
        ...state,
        fdr:  action.fdr
      };
      break;
    default:
      state_res = state
  }

  return state_res;
}

export default geneSummary;
