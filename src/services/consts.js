//we may be able to convert this to be window.location.href
let port = 8080;
const dropConsole = true;
let re = /^(http(s)?[:][/][/])([^:/]+)([:]\d+)?([/].+)?/;
//export const baseUrl = "http://localhost:8080/";
let m = re.exec(window.location.href);
let host = m[3];
let baseUrlTmp = m[1] + m[3] + ":" + port + "/";

if(host !== "localhost") {
  //if this is not running on local host
  //assume a reverse proxy is running
  baseUrlTmp = m[1] + host + "/";
  console.log("using reverse proxy")
} else {
  console.log("localhost")
}

console.log(baseUrlTmp)

if(dropConsole) {
  console.log = function() { }
}

export const baseUrl = baseUrlTmp;
