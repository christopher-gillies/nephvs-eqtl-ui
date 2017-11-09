import { REQUEST_ALL_GENE_SYMBOLS } from "../actions/consts.js"
import { RECEIVE_ALL_GENE_SYMBOLS } from "../actions/consts.js"


function gene(state={}, action) {
  let state_res = state;
  switch(action.type) {

    case REQUEST_ALL_GENE_SYMBOLS:
      state_res = {
        ...state,
        symbols: [],
        isFetching: true
      };
      break;
    case RECEIVE_ALL_GENE_SYMBOLS:
      state_res = {
        ...state,
        symbols: action.symbols,
        isFetching: false
      };
      break;
    default:
      break;
  }

  return state_res;
}

export default gene;
