import { combineReducers } from 'redux'
import searchForm from './searchForm'
import searchResult from './searchResult'
import gene from './gene'

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

const nephqtlApp = combineReducers({
  searchForm,
  searchResult,
  gene
})

export default nephqtlApp
