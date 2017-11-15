import { REQUEST_VARIANT_DETAIL } from "../actions/consts.js"
import { RECEIVE_VARIANT_DETAIL } from "../actions/consts.js"


const geneAndVariantDetail = (state = {}, action) => {
  let state_res = state
  switch(action.type) {
    case REQUEST_VARIANT_DETAIL:
      state_res = {
        ...state,
        isFetching: true
      }
      break;
    case RECEIVE_VARIANT_DETAIL:
      state_res = {
        ...state,
        isFetching: false,
        variantDetail: action.variantDetail
      }
      break;
    default:
      state_res = state
  }

  return state_res;
}

export default geneAndVariantDetail;
