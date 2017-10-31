import { SET_SEARCH_QUERY } from "./consts.js"
import { SET_SEARCH_ERROR } from "./consts.js"
import { SET_SUGGESTIONS } from "./consts.js"

export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  query: query
})

export const setSearchError = (errorMessage, showErrorMessage) => ({
  type: SET_SEARCH_ERROR,
  errorMessage: errorMessage,
  showErrorMessage: showErrorMessage
})

export const setSuggestions = (suggestions) => ({
  type: SET_SUGGESTIONS,
  suggestions: suggestions
})
