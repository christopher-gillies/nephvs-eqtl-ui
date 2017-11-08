import fetch from 'isomorphic-fetch'

import { SET_SEARCH_QUERY } from "./consts.js"
import { SET_SEARCH_ERROR } from "./consts.js"
import { SET_SUGGESTIONS } from "./consts.js"
import { SET_TAB } from "./consts.js"
import { REQUEST_ALL_GENE_SYMBOLS } from "./consts.js"
import { RECEIVE_ALL_GENE_SYMBOLS } from "./consts.js"

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


function requestAllGeneSymbols() {
  return {
    type: REQUEST_ALL_GENE_SYMBOLS
  }
}

function receiveAllGeneSymbols(json) {
  return {
    type: RECEIVE_ALL_GENE_SYMBOLS,
    symbols: json,
    receivedAt: Date.now()
  }
}

export function fetchAllGeneSymbols() {
  return function(dispatch) {
    dispatch(requestAllGeneSymbols())
    return fetch(`http://localhost:8080/gene/symbols`)
      .then(response => {
        let jsonRes = response.json();
        return jsonRes;
      },
        error => {
          console.log('An error occured.', error)
        })
      .then(json => {
         dispatch(receiveAllGeneSymbols(json))
      })
  }
}
