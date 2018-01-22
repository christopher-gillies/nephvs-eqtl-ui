//we may be able to convert this to be window.location.href
let port = 8080;
let re = /^(http(s)?[:][/][/])([^:\/]+)([:]\d+)?([/].+)?/;
//export const baseUrl = "http://localhost:8080/";
let m = re.exec(window.location.href);
let host = m[3];
let baseUrl = m[1] + m[3] + ":" + port + "/";

if(host !== "localhost") {
  //if this is not running on local host
  //assume a reverse proxy is running
  baseUrl = m[1] + m[3] + "/";
}

export baseUrl;
console.log(baseUrl)
