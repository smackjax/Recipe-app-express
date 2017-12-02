
"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/app/index.html","4c7fe8d18f7f907aaa811fe7f7a71fbd"],["/app/static/css/main.33ef59b3.css","9a1c6b3750c31b662017d0478952e11b"],["/app/static/js/main.a7834814.js","4fd99230c8f6831ad2fec0c0dbfdc72d"],["/app/static/media/breakfast-circle.fe6e18cc.svg","fe6e18cc7133a92d689f6b40fa1e030f"],["/app/static/media/chevron-down.1e47aae5.svg","1e47aae56fb52812f4d12de1d90acc52"],["/app/static/media/dessert-circle.5bebc8f4.svg","5bebc8f45d6b9390c76d8a0511839b20"],["/app/static/media/dinner-circle.43ae1fec.svg","43ae1fecdfc2cdc9d61fd098d8e39977"],["/app/static/media/drink-circle.efccca2b.svg","efccca2b90a73cf285dfd4223d2819d3"],["/app/static/media/fontawesome-webfont.674f50d2.eot","674f50d287a8c48dc19ba404d20fe713"],["/app/static/media/fontawesome-webfont.912ec66d.svg","912ec66d7572ff821749319396470bde"],["/app/static/media/fontawesome-webfont.af7ae505.woff2","af7ae505a9eed503f8b8e6982036873e"],["/app/static/media/fontawesome-webfont.b06871f2.ttf","b06871f281fee6b241d60582ae9369b9"],["/app/static/media/fontawesome-webfont.fee66e71.woff","fee66e712a8a08eef5805a46892932ad"],["/app/static/media/logo.1f0ee7bd.svg","1f0ee7bd37466f21677334ed0695e1be"],["/app/static/media/lunch-circle.6f0ad706.svg","6f0ad70604fce603cc83b4215bfa8398"],["/app/static/media/snack-circle.1ddd758e.svg","1ddd758e23d42fa2341935d4d0697f4c"],["/app/static/media/untyped-circle.5ef7b402.svg","5ef7b4020d21a52b76630edd066a2ea9"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL("/app/index.html",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});

self.addEventListener("install", (e)=>{
    console.log("Hello smackyyazx")
});

// TODO
if ( !window.indexedDB) window.alert("Sorry, your browser doesn't seem to support the offline database. Offline capabilities are disabled."); 


var DB_NAME = "incooknitoDB";
var API_URL_PATH = "/api";
var MAIN_APP_DATA_KEY = "main_app_data";
var RECIPES_SAVE_KEY = "recipes_to_save";
var RECIPES_SAVE_URL_PATH = "/recipes/"; //(POST)
var RECIPES_DELETE_KEY = "recipes_to_delete"; 
var RECIPES_DELETE_URL_PATH = "/recipes/delete" //(POST)
var FRIENDS_DELETE_KEY = "friends_to_delete";
var FRIENDS_DELETE_URL_PATH = "/friends/delete"; //(POST)
var TOKEN_KEY = "JWT";

// function createDB(){}
/* function setDbData(dbKey, data){
    // Prep data for storage. 
    // JSON isn't required for the db, 
    // but with such tight control I figured why not.
    var JSONData = JSON.stringify(data);
    TODOsetDBData(dbKey, JSONData);
}*/

/* function getDbData(dbKey){
    var data = TODOgetDBData(dbKey)
    .then(data=>JSON.parse(data))
    .catch(err=>{
        console.log("getDbData couldn't retrieve data from indexDB");
        throw err});
}*/

/* function attemptAction(dbKey, newValue, url){
    var apiActionValues = getDbData(dbkey);
    // delete old
    setDbData(dbKey, []);
    // Add new value(if this was a triggered event)
    if ( newValue ) apiActionValues.push(newValue) 
    // try api+url with new array
    (something like event.body = apiActionValues; event.send; )
    // (on success) do nothing
    // (on fail) 
    .catch(err){
        // save new array back
        setDbData(dbKey, apiActionValues);
        // queue for network reconnect 
        (however you do that)
        // throw error
        throw Error('Event failed'); // <-- Might not need this
    }
}*/


/*function setMainAppData(appData){
    setDbData(MAIN_APP_DATA_KEY, appData);
}*/

/* function getMainAppData(){
    return getDbData(MAIN_APP_DATA_KEY);
}*/

/* function saveRecipes(newVal){
    return attemptAction(RECIPES_SAVE_KEY, newVal, RECIPES_SAVE_URL_PATH)
}*/
/* function deleteRecipes(newVal){
    return attemptAction(RECIPES_DELETE_KEY, newVal, RECIPES_DELETE_URL_PATH)
}*/
/* function deleteFriends(newVal){
    return attemptAction(FRIENDS_DELETE_KEY, newVal, FRIENDS_DELETE_URL_PATH)
}*/