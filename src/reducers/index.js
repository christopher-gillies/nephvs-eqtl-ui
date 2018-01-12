import { combineReducers } from 'redux'
import searchForm from './searchForm'
import searchResult from './searchResult'
import geneSummary from './geneSummary'
import gene from './gene'
import geneAndVariantDetail from './geneAndVariantDetail'
/*
Example state::

{
  searchForm: {
    query: "",
    suggestions: [],
    message: "",
    showError
  }
}

*/

/*
Please note as a reminder. A reducer is basically a giant switch statement.
It performs a change to the state, based on the action and its value.
*/

const nephqtlApp = combineReducers({
  searchForm,
  searchResult,
  gene,
  geneAndVariantDetail,
  geneSummary,
})

export default nephqtlApp
