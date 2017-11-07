import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

const store = createStore(reducer, {
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
    currentTab: "glom"
  }
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
document.title = "NephVS eQTL Browser"
