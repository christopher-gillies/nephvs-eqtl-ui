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

  validateQuery = (query, success, failure) => {
    fetch(baseUrl + `/query/validate?query=`+ query)
      .then(response => {
        let jsonRes = response.json();
        return jsonRes
      },
        error => {
          failure(error);
      }).then(json => success(json));
  }


}

export default QueryService
