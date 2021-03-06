//import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { fetchAllGeneSymbols } from './actions'

let initState = {
  searchForm: {
    main: {
      query: "",
      suggestions: [],
      errorMessage: ""
    },
    header: {
      query: "",
      suggestions: [],
      errorMessage: ""
    }
  },
  searchResult: {
    currentTab: "glom",
    glomResults: [],
    tubResults: [],
    queryType: "",
    filters: {
      maxPVal: 0.05
    }
  },
  geneSummary: {
    currentTab: "glom",
    glomSummaries: [],
    tubSummaries: [],
    fdr: 0.01
  },
  gene: {
    symbols: []
  },
  geneAndVariantDetail: {
    variantDetail: {}
  }
};

const store = createStore(reducer,
  initState,
  applyMiddleware(thunkMiddleware)
);

store.dispatch(fetchAllGeneSymbols())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
document.title = "NephVS eQTL Browser"
