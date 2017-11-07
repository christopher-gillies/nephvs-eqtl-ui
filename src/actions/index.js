import { SET_SEARCH_QUERY } from "./consts.js"
import { SET_SEARCH_ERROR } from "./consts.js"
import { SET_SUGGESTIONS } from "./consts.js"
import { SET_TAB } from "./consts.js"

export const setSearchQuery = (query, key) => ({
  type: SET_SEARCH_QUERY,
  query: query,
  key: key
})

export const setSearchError = (errorMessage, key) => ({
  type: SET_SEARCH_ERROR,
  errorMessage: errorMessage,
  key: key
})

export const setSuggestions = (suggestions, key) => ({
  type: SET_SUGGESTIONS,
  suggestions: suggestions,
  key: key
})

export const setTab = (tab) => ({
  type: SET_TAB,
  tab: tab
})
