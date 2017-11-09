import fetch from 'isomorphic-fetch'
import { baseUrl } from './consts'

let instance = null;

class QueryService {

  constructor() {
    if(instance !== null) {
      return instance;
    }

    instance = this;
  }

  /*
  query = the query string
  success = success callback method
  failure = failure callback method
  */
  validateQuery = (query, success, failure) => {
    let url = this.makeQeury("/query/validate", { query: query});
    fetch(url)
      .then(response => {
        let jsonRes = response.json();
        return jsonRes;
      },
        error => {
          failure(error);
      }).then(json => success(json));
  }

  makeQeury = (method,params={}) => {
    let url = baseUrl + method;
    let keys = Object.keys(params);
    if(keys.length > 0) {
      url += '?'
    }
    for(let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = params[key];
      url += (key + "=" + value);
      if(i !== keys.length - 1) {
          url += '&'
      }
    }
    console.log(new Date())
    console.log(url);
    return url;
  }


}

export default QueryService
