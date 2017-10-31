import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

const store = createStore(reducer, {
  searchForm: {
    query: "",
    suggestions: []
  }
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
document.title = "NephVS eQTL Browser"
