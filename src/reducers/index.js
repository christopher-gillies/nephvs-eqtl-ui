import { combineReducers } from 'redux'
import searchForm from './searchForm'
import searchResult from './searchResult'

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
  searchResult
})

export default nephqtlApp
