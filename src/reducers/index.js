import { combineReducers } from 'redux'
import searchForm from './searchForm'


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
})

export default nephqtlApp
