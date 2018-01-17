//we may be able to convert this to be window.location.href
let port = 8080;
let re = /^(http(s)?[:][/][/])([^:]+)([:]\d+)?([/].+)?/;
//export const baseUrl = "http://localhost:8080/";
let m = re.exec(window.location.href);

export const baseUrl = m[1] + m[3] + ":" + port + "/";
console.log(baseUrl)
