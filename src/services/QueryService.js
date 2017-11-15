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
    let url = this.makeQuery("/query/validate", { query: query});
    fetch(url)
      .then(response => {
        let jsonRes = response.json();
        return jsonRes;
      },
        error => {
          failure(error);
      }).then(json => success(json));
  }

  makeQuery = (method,params={}) => {
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

  /**
  *
  * Converts a result from QueryController query method to have
  * chrom, pos, ref, alt values
  * @param List<EQTLEntry> peerEQTLResultList - List of results from service
  */
  transformPeerEQTLResultList = (peerEQTLResultList) => {
    if(!peerEQTLResultList) {
      return peerEQTLResultList;
    }

    for(let i = 0; i < peerEQTLResultList.length; i++) {
      let res = peerEQTLResultList[i];
      let variantStr = res.variantStr;
      let re = /([^:]+)[:](\d+)[_]([^/]+)[/]([^/]+)/;
      let match = re.exec(variantStr);
      if(match.length === 5) {
        res['chrom'] = match[1];
        res['pos'] = parseInt(match[2], 10);
        res['ref'] = match[3];
        res['alt'] = match[4];
      }
    }
    return peerEQTLResultList;
  }

}

export default QueryService
