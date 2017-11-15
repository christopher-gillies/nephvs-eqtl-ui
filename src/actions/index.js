import fetch from 'isomorphic-fetch'

import { SET_SEARCH_QUERY } from "./consts.js"
import { SET_SEARCH_ERROR } from "./consts.js"
import { SET_SUGGESTIONS } from "./consts.js"

import { SET_TAB } from "./consts.js"
import { SET_FILTERS } from './consts';

import { REQUEST_ALL_GENE_SYMBOLS } from "./consts.js"
import { RECEIVE_ALL_GENE_SYMBOLS } from "./consts.js"

import { REQUEST_QUERY_RESULTS } from "./consts.js"
import { RECEIVE_QUERY_RESULTS } from "./consts.js"

import { REQUEST_VARIANT_DETAIL } from "./consts.js"
import { RECEIVE_VARIANT_DETAIL } from "./consts.js"


import QueryService from '../services/QueryService';
let queryService = new QueryService();

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

export const setFilters = (filters) => ({
  type: SET_FILTERS,
  visible: filters.visible,
  maxPVal: filters.maxPVal
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
  }
}

export function fetchAllGeneSymbols() {
  return function(dispatch) {
    dispatch(requestAllGeneSymbols());
    let url = queryService.makeQuery("gene/symbols");
    return fetch(url)
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



function requestQueryResults() {
  return {
    type: REQUEST_QUERY_RESULTS
  }
}

function receiveQueryResults(json) {
  return {
    type: RECEIVE_QUERY_RESULTS,
    glomResults: queryService.transformPeerEQTLResultList(json.glom),
    tubResults: queryService.transformPeerEQTLResultList(json.tub),
    queryType: json.query.type
  }
}


export function fetchQueryResults(query, maxPVal = 0.05) {
  return function(dispatch) {
    dispatch(requestQueryResults());
    let url = queryService.makeQuery("/query", {
      query: query,
      maxPVal: maxPVal
    });
    return fetch(url)
      .then(response => {
        let jsonRes = response.json();
        return jsonRes;
      },
        error => {
          console.log('An error occured.', error)
        })
      .then(json => {
        setTimeout(() => {
          dispatch(receiveQueryResults(json))
        }, 0)

      })
  }
}


function requestVariantDetail() {
  return {
    type: REQUEST_VARIANT_DETAIL
  }
}

function receiveVariantDetail(json) {
  return {
    type: RECEIVE_VARIANT_DETAIL,
    variantDetail: json
  }
}


export function fetchVariantDetail(entrezId, variantStr, tissue) {
  return function(dispatch) {
    dispatch(requestVariantDetail());
    let url = queryService.makeQuery("/query/detail", {
      entrezId: entrezId,
      variantStr: variantStr,
      tissue: tissue
    });
    return fetch(url)
      .then(response => {
        let jsonRes = response.json();
        return jsonRes;
      },
        error => {
          console.log('An error occured.', error)
        })
      .then(json => {
        setTimeout(() => {
          dispatch(receiveVariantDetail(json))
        }, 0)

      })
  }
}
