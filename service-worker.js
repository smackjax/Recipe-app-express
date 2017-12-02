"use strict";
self.importScripts('/app/localforage/localforage.min.js');
// Minified app service worker. Must be replaced with new after each 'build'. 
// TODO gotta figure out a better flow. This sucks.
function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/app/index.html","6358329d60b9ef3b2a97b6d06e9c9b85"],["/app/static/css/main.cbf756ba.css","aeaa4f1e71501b0b1ed352562bfc275c"],["/app/static/js/main.640d6495.js","780ec80784135c45ac027d4119310759"],["/app/static/media/breakfast-circle.fe6e18cc.svg","fe6e18cc7133a92d689f6b40fa1e030f"],["/app/static/media/chevron-down.1e47aae5.svg","1e47aae56fb52812f4d12de1d90acc52"],["/app/static/media/dessert-circle.5bebc8f4.svg","5bebc8f45d6b9390c76d8a0511839b20"],["/app/static/media/dinner-circle.43ae1fec.svg","43ae1fecdfc2cdc9d61fd098d8e39977"],["/app/static/media/drink-circle.efccca2b.svg","efccca2b90a73cf285dfd4223d2819d3"],["/app/static/media/fontawesome-webfont.674f50d2.eot","674f50d287a8c48dc19ba404d20fe713"],["/app/static/media/fontawesome-webfont.912ec66d.svg","912ec66d7572ff821749319396470bde"],["/app/static/media/fontawesome-webfont.af7ae505.woff2","af7ae505a9eed503f8b8e6982036873e"],["/app/static/media/fontawesome-webfont.b06871f2.ttf","b06871f281fee6b241d60582ae9369b9"],["/app/static/media/fontawesome-webfont.fee66e71.woff","fee66e712a8a08eef5805a46892932ad"],["/app/static/media/logo.1f0ee7bd.svg","1f0ee7bd37466f21677334ed0695e1be"],["/app/static/media/lunch-circle.6f0ad706.svg","6f0ad70604fce603cc83b4215bfa8398"],["/app/static/media/snack-circle.1ddd758e.svg","1ddd758e23d42fa2341935d4d0697f4c"],["/app/static/media/untyped-circle.5ef7b402.svg","5ef7b4020d21a52b76630edd066a2ea9"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL("/app/index.html",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});


// ** Api routes(need to be hardcoded for backlog)
var MAIN_APP_API_URL = "/api/user";
var RECIPES_SAVE_URL = "/api/recipes";
var RECIPES_DELETE_URL = "/api/recipes/delete";
var FRIENDS_DELETE_URL  = "/api/friends/delete";

// ** Local storage keys
var DB_NAME = "incooknitoDB";
var MAIN_APP_DATA_KEY = "main_app_data";
var RECIPES_SAVE_KEY = "recipes_to_save";
var RECIPES_DELETE_KEY = "recipes_to_delete"; 
var FRIENDS_DELETE_KEY = "friends_to_delete";
var TOKEN_KEY = "JWT";

// ** api routes to intercept
var API_ROUTES = {
    [RECIPES_SAVE_URL] : RECIPES_SAVE_KEY,
    [RECIPES_DELETE_URL] : RECIPES_DELETE_KEY,
    [FRIENDS_DELETE_URL] : FRIENDS_DELETE_KEY
}


// ** Service worker functions

function setDbData(dbKey, data){
    // Prep data for storage. 
    // JSON isn't required for the db, 
      // but with such tight control I figured why not.
    var JSONData = JSON.stringify(data);
    return localforage.setItem(dbKey, JSONData);
}


function getDbData(dbKey){
    // Get data from storage
    return localforage.getItem(dbKey)
    .then(data=>{
        // Return parsed data
        console.log("Local data under " + dbKey + " retrieve successful. JSON data: ", data);
        return data ? JSON.parse(data) : false;
    })
    .catch(err=>{
        // Catch and throw for specificity
        console.log("getDbData couldn't retrieve data from indexDB");
        throw err;
    });
}


var setMainAppData = function (appData){
    setDbData(MAIN_APP_DATA_KEY, appData);
}
var getMainAppData = function (){
    return getDbData(MAIN_APP_DATA_KEY);
}

var getToken = function(){
    return getDbData(TOKEN_KEY);
}

// Saves all backlog actions, clearing local data an each success
var saveBacklog = function(){
    return getToken()
    .then(token=>{
        return Promise.resolve("TODO success");
        console.log("This shouldn't run");
        if(token){
            saveRecipes(token)
            .then(()=>{
                setDbData(RECIPES_SAVE_KEY, []);
                deleteRecipes(token)
                .then(()=>{
                    setDbData(RECIPES_DELETE_KEY, []);
                    deleteFriends(token)
                    .then(()=>{
                        setDbData(FRIENDS_DELETE_KEY, []);
                        return true;
                    })
                })
            })  
            .catch(err=>{
                console.log("Error saving backlog: ", err);
            });
        } else {
            throw Error("No saved token");
        }
    })
    .catch(err=>{
        console.log("Problem getting local token: ", err);
        throw Error("Couldn't save backlog");
    });
}


var saveRecipes = function (token){
    Promise.resolve([]);
}
var deleteRecipes = function (token){
    Promise.resolve([]);
}
var deleteFriends = function (token){
    Promise.resolve([]);
}

self.addEventListener("install", event=>{
    // Initialize needed data to avoid any 'undefined' errors
    event.waitUntil(
        Promise.all([
            setDbData(MAIN_APP_DATA_KEY, {}),
            setDbData(RECIPES_SAVE_KEY, []),
            setDbData(RECIPES_DELETE_KEY, []),
            setDbData(FRIENDS_DELETE_KEY, []),
        ])
        .then(()=>{ console.log("Local data initialize successful") })
        .catch(err=>{ console.log("Local data initailize failure: ", err) })
    );
});
self.addEventListener("activate", event=>{
    console.log("Activated");
})


// Handles caching/response of cachable app requests
self.addEventListener("fetch", function(event){
    const reqUrl = new URL(event.request.url);
    var pathname = reqUrl.pathname;
    
    // HANDLE SIGN-IN REQUEST
    if(/\/api\/login\//.test(pathname)){
        if(pathname !== "/api/login/check-username"){//TODO
            event.respondWith(
                fetch(event.request)
                .then(function(response){
                    console.log("response: ", response );
                    var signInResponse = response.clone();
                    signInResponse.json()
                    .then(resJSON=>{
                        console.log("response token", resJSON.token);
                        setDbData(TOKEN_KEY, resJSON.token)
                        .then(function(){
                            console.log("Token saved");
                        }); 
                    })
                    return response;
                })
            );
        }
    }

    // event.respondWith(
    //     fetch(event.request)
    //     .then(function(response){
    //         console.log("server reponse: ", response);
    //         return response;
    //     })
    // );


    // HANDLE MAIN DATA REQUEST
    if(pathname === MAIN_APP_API_URL ){
        event.respondWith(new Promise(function(resolve, reject){
            // save backlog(to update remote data)

            saveBacklog()
            // Get app data
            .then(function(){
                console.log("Save backlog success");
                // TODO set timeout for like 5 seconds, 
                    // Then still try to update, but return last app sync data

                // Send request
                fetch(event.request)
                .then(function(response){
                    // Clone response for storage
                    var responseForLocal = response.clone();
                    // Parse cloned body info
                    responseForLocal.json()
                    .then(function(freshAppData){
                        console.log("Newest app data from SW: ", freshAppData);
                        // Store parsed info in local
                        setDbData(MAIN_APP_DATA_KEY, freshAppData)
                        .then(function(){
                            // This is the ideal outcome
                            // Request successful; Save successful;
                            // Return response
                            console.log("App data sync success");
                            resolve(response);
                        }); 
                    })
                    // If there's a problem saving new data to local
                    .catch(function(err){
                        console.log("Error saving new app data: ", err);
                        // Just return response
                        resolve(response);
                    })
                    
                })
                .catch(function(err){
                    console.log("Error in service worker: ", err);
                    resolve(response);
                })
            })
            .catch(function(err){
                // If the current changes couldn't be pushed, don't pull down the old data
                console.log("Could't save backlog before main data retrieval: ", err);
                // Get last successful sync
                getDbData(MAIN_APP_DATA_KEY)
                .then(function(appData){
                    // If there is data retrieved
                    if(appData){
                        // Return that data for use
                        resolve(appData);
                    } else {
                        // If there is no data from an old sync, throw error
                        throw Error("No app data found");
                    }
                })
                // If the backlog couldn't save, but there was no old app data
                .catch(function(err){
                    console.log("Couldn't get app data from cache. Error: ", err); 
                    console.log("Defaulting to original request");
                    // Just default to sending as a typical function
                    resolve(fetch(event.request));
                })
                
            })
        }));
    }

    // HANDLE SECONDARY API REQUESTS
    // If request path has a local key
    var dbKey = API_ROUTES[pathname];
    if(dbKey){
        // Get body(will be one item in an array)
        event.request.json()
        .then(reqBody=>{
            // Get current backlog for route
            getDbData(dbKey)
            .then(backlogValues=>{
                // Concat new value onto backlog
                backlogValues.concat(reqBody);
                // Save updated array
                setDbData(dbKey, backlogValues)
                .then(()=>{
                    // After backlog is updated, save all backlog
                    saveBacklog();
                });
            })
            .catch(err=>{
                console.log("Error getting backlog: ", err);
            });
        })
        .catch(err=>{
            console.log("Body is not JSON")
        })
    }
});

