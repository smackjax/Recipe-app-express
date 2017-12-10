"use strict";
self.importScripts('/app/localforage/localforage.min.js');
// Minified app service worker. Must be replaced with new after each 'build'. 
// TODO gotta figure out a better flow. This sucks.
function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/app/index.html","7d213df876964fe6dee47b6a7f6ba49d"],["/app/static/css/main.89cbac0d.css","d0a107f4c8bfdcfb46914f68ebb8d8c3"],["/app/static/js/main.9e6fc354.js","6973d4519247ccbaca7229d48eb3819f"],["/app/static/media/breakfast-circle.fe6e18cc.svg","fe6e18cc7133a92d689f6b40fa1e030f"],["/app/static/media/chevron-down.1e47aae5.svg","1e47aae56fb52812f4d12de1d90acc52"],["/app/static/media/dessert-circle.5bebc8f4.svg","5bebc8f45d6b9390c76d8a0511839b20"],["/app/static/media/dinner-circle.43ae1fec.svg","43ae1fecdfc2cdc9d61fd098d8e39977"],["/app/static/media/drink-circle.efccca2b.svg","efccca2b90a73cf285dfd4223d2819d3"],["/app/static/media/fontawesome-webfont.674f50d2.eot","674f50d287a8c48dc19ba404d20fe713"],["/app/static/media/fontawesome-webfont.912ec66d.svg","912ec66d7572ff821749319396470bde"],["/app/static/media/fontawesome-webfont.af7ae505.woff2","af7ae505a9eed503f8b8e6982036873e"],["/app/static/media/fontawesome-webfont.b06871f2.ttf","b06871f281fee6b241d60582ae9369b9"],["/app/static/media/fontawesome-webfont.fee66e71.woff","fee66e712a8a08eef5805a46892932ad"],["/app/static/media/logo.0e4b027e.svg","0e4b027e00d2ac6ca3f5dd301240c2a5"],["/app/static/media/lunch-circle.6f0ad706.svg","6f0ad70604fce603cc83b4215bfa8398"],["/app/static/media/snack-circle.1ddd758e.svg","1ddd758e23d42fa2341935d4d0697f4c"],["/app/static/media/untyped-circle.5ef7b402.svg","5ef7b4020d21a52b76630edd066a2ea9"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL("/app/index.html",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/app/index.html","7d213df876964fe6dee47b6a7f6ba49d"],["/app/static/css/main.89cbac0d.css","d0a107f4c8bfdcfb46914f68ebb8d8c3"],["/app/static/js/main.9e6fc354.js","6973d4519247ccbaca7229d48eb3819f"],["/app/static/media/breakfast-circle.fe6e18cc.svg","fe6e18cc7133a92d689f6b40fa1e030f"],["/app/static/media/chevron-down.1e47aae5.svg","1e47aae56fb52812f4d12de1d90acc52"],["/app/static/media/dessert-circle.5bebc8f4.svg","5bebc8f45d6b9390c76d8a0511839b20"],["/app/static/media/dinner-circle.43ae1fec.svg","43ae1fecdfc2cdc9d61fd098d8e39977"],["/app/static/media/drink-circle.efccca2b.svg","efccca2b90a73cf285dfd4223d2819d3"],["/app/static/media/fontawesome-webfont.674f50d2.eot","674f50d287a8c48dc19ba404d20fe713"],["/app/static/media/fontawesome-webfont.912ec66d.svg","912ec66d7572ff821749319396470bde"],["/app/static/media/fontawesome-webfont.af7ae505.woff2","af7ae505a9eed503f8b8e6982036873e"],["/app/static/media/fontawesome-webfont.b06871f2.ttf","b06871f281fee6b241d60582ae9369b9"],["/app/static/media/fontawesome-webfont.fee66e71.woff","fee66e712a8a08eef5805a46892932ad"],["/app/static/media/logo.0e4b027e.svg","0e4b027e00d2ac6ca3f5dd301240c2a5"],["/app/static/media/lunch-circle.6f0ad706.svg","6f0ad70604fce603cc83b4215bfa8398"],["/app/static/media/snack-circle.1ddd758e.svg","1ddd758e23d42fa2341935d4d0697f4c"],["/app/static/media/untyped-circle.5ef7b402.svg","5ef7b4020d21a52b76630edd066a2ea9"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL("/app/index.html",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});


/* NOTES: 
'backlog' refers to the sync backlog,
which only holds arrays of data to pushed to different
endpoints on the server.

'cache' is whatever localForage is using.
cache data(not backlog) is returned to the client when offline.
CACHE SCHEMA: (and Main app data response) 
    {
        userInfo:{ // This user's info
            userId,
            username,
            displayName,
            recipes: {
                recipe-id-1: {}
                recipe-id-2: {}
                ...
            }
        },
        friendsInfo: [{userInfo}, {userInfo}...],
    } 
*/


var COMMON_API_HEADERS = { "Content-Type" : "application/json" };
// ** Api routes(need to be hardcoded for saving backlog)
var MAIN_APP_API_URL = "/api/user";
var RECIPES_SAVE_URL = "/api/recipes";
var RECIPES_DELETE_URL = "/api/recipes/delete";
var FRIENDS_DELETE_URL  = "/api/friends/delete";

// ** Local cache storage keys
var DB_NAME = "incooknitoDB";
var MAIN_APP_DATA_KEY = "main_app_data";
var RECIPES_SAVE_KEY = "recipes_to_save";
var RECIPES_DELETE_KEY = "recipes_to_delete"; 
var FRIENDS_DELETE_KEY = "friends_to_delete";
var TOKEN_KEY = "JWT";



// ** CACHE HANDLING FUNCTIONS
// Retrieves Auth JWT from whatever local storage is used
var getToken = function(){
    return getDbData(TOKEN_KEY);
}

var API_ROUTES_INFO = {
    "saveRecipes" : {
        pathname: RECIPES_SAVE_URL,
        // Prop key array is saved under
        requestSaveKey : "newRecipes",
        localKey : RECIPES_SAVE_KEY,
        method: "POST"
    },
    "deleteRecipes" : {
        pathname: RECIPES_DELETE_URL,
        requestSaveKey : "recipeIds",
        localKey : RECIPES_DELETE_KEY,
        method: "POST"
    },
    "deleteFriends" : {
        pathname: FRIENDS_DELETE_URL,
        requestSaveKey : "friendIds",
        localKey : FRIENDS_DELETE_KEY,
        method: "POST"
    }
};

// ** api routes to intercept
var API_BACKLOG_ROUTES = {
    [RECIPES_SAVE_URL] : API_ROUTES_INFO.saveRecipes,
    [RECIPES_DELETE_URL] : API_ROUTES_INFO.deleteRecipes,
    [FRIENDS_DELETE_URL] : API_ROUTES_INFO.deleteFriends
}




// Prep data for storage. 
function setDbData(dbKey, data){
    // JSON isn't required for the db, 
      // but with such tight control I figured why not.
    var JSONData = JSON.stringify(data);
    return localforage.setItem(dbKey, JSONData);
}
// Get data from storage
function getDbData(dbKey){
    return localforage.getItem(dbKey)
    .then(data=>{
        // Return parsed data
        return JSON.parse(data)
    })
    .catch(err=>{
        // Catch and throw for specificity
        console.log("getDbData couldn't retrieve "+ dbKey +" from cache");
        throw err;
    });
}


var setMainAppData = function (appData){
    setDbData(MAIN_APP_DATA_KEY, appData);
}

var getCachedAppData = function (){
    return getDbData(MAIN_APP_DATA_KEY)
    .then(function(appData){
        // If there is app data from a previous sync
        if(typeof appData === "object" && 
            Object.getOwnPropertyNames(appData).length > 0){
            return appData;
        } else {
            // If there is no data from an old sync, throw error
            throw Error("No app data found");
        }
    })
    // If there is appData, append changes not synced to server
    .then( function(appData){
        var userRecipes = appData.userInfo.recipes;
        // Combine last synced and unsynced recipes
        return getDbData(RECIPES_SAVE_KEY)
        .then(function(possibleRecipes){
            var unsyncedRecipes = possibleRecipes || [];
            var newRecipes = Object.assign({}, userRecipes);
            // Add/overwrite with new recipe values
            for(var r = 0; r < unsyncedRecipes.length; r++){
                var recipe = unsyncedRecipes[r];
                newRecipes[recipe.id] = recipe;
            }
            return newRecipes;
        })
        // Delete recipes not synced
        .then(function(userRecipes){
            return getDbData(RECIPES_DELETE_KEY)
            .then(function(possibleIds){
                var idsToDelete = possibleIds || [];
                // Gets all user recipe id's
                var allRecipeIds = Object.getOwnPropertyNames(userRecipes);
                // Holds updated recipes
                var newRecipes = {};
                for(var q = 0; q < allRecipeIds.length; q++){
                    var currentId = allRecipeIds[q];
                    // If id isn't being deleted
                    if(!idsToDelete.includes(currentId)){
                        // Add recipe to new recipes
                        newRecipes[currentId] = Object.assign({}, userRecipes[currentId]);
                    }
                }
                return newRecipes
            })
        })
        // Delete friends
        .then(function(cleanedRecipes){
            return getDbData(FRIENDS_DELETE_KEY)
            .then(function(possibleIds){

                var idsToDelete = possibleIds || [];
               
                var filteredFriends = appData.friendsInfo.filter(
                    function(friend){
                        return !idsToDelete.includes(friend.userId)
                    }
                )
                
                return filteredFriends;
            })
            .then( function(cleanedFriends){
                var updatedAppData = Object.assign({}, appData);
                updatedAppData.userInfo.recipes = cleanedRecipes;
                updatedAppData.friendsInfo = cleanedFriends;
                
                return updatedAppData
            })
        })  
    })
}




// Filters duplicates in arrays
// whether it's an object with an id prop 
// or an id string
var filterBacklogFromRequest = function(backlogData, requestValsArray){
    // Get filter criteria
    var idsToAdd = requestValsArray.map(function(item){
        if(typeof item === "object" && item.id){
            return item.id;
        } else { return item }
    });
    // Filter against the obj.id or the item(whatever it is)
    var filtered = backlogData.filter(function(item){
        var checkVal;
        if(typeof item === "object" && item.id){
            checkVal = item.id;
        } else { 
            checkVal = item;  
        }
        return !idsToAdd.includes(checkVal);
    });

    // Concat new values to filtered list
    return filtered.concat(requestValsArray);
};



// Saves all backlog arrays, clearing local data an each successful piece save
var saveBacklog = function(){
    // Get JWT (needed for api auth)
    return getToken()
    .then(token=>{
        if(token){
            // Save backlog, clearing each part on successful save
            return saveRecipes(token)
            .then(function(){
                // Clear save recipe backlog
                return setDbData(RECIPES_SAVE_KEY, []) 
            })
            .then(function(){ 
                // Attempt to delete recipe Ids in backlog
                return deleteRecipes(token) 
            })
            .then(function(){
                // Clear delete recipe backlog
                return setDbData(RECIPES_DELETE_KEY, []);
            })
            .then(function(){
                // Attempt to delete friend Ids
               return deleteFriends(token)
            })    
            .then(()=>{
                // Clear delete friend Ids from backlog
                return setDbData(FRIENDS_DELETE_KEY, []);
                // If all operations successful, final result true 
                return true;
            })
        } else {
            throw Error("No saved token found");
        }
    })
    // Catch for everything
    .catch(err=>{
        console.log("Error saving backlog: ", err);
        // Throws error for logic path that called for backlog save
            // I.E. Then the calling function will get last successful sync, 
            // or just pass it's request through 
        throw Error("Couldn't save backlog");
    });
}

// Uses API_ROUTES_INFO
// Couldn't think of a way without hardcoding api routes, 
// because these are called without an event path to rely on
// Resaves backlog with new attempted values on failure
var saveBacklogArray = function(token, apiRouteOpts, newValues){
    var pathname = apiRouteOpts.pathname;
    var method = apiRouteOpts.method;
    var localKey = apiRouteOpts.localKey;

    // Set JWT
    var Authorization = {"Authorization" : "Bearer " + token};
    // Append headers shared across requests
    var headers = Object.assign( Authorization, COMMON_API_HEADERS);

    return getDbData(localKey)
    .then(function(backlogData){
        // If no backlog data, use empty array
        var unsentData = backlogData || [];
        // If no new data, just concat empty array
        var newData = newValues || [];
        var newBacklog = filterBacklogFromRequest(unsentData, newData)
        return newBacklog;
    })
    // Take new updated data and send request
    .then(function(dataToSave){
        if(dataToSave.length > 0){
            
            var newBody = JSON.stringify({
                [apiRouteOpts.requestSaveKey]: dataToSave
            });
        
            var fetchInit = {
                method: method,
                headers: new Headers(headers),
                body: newBody
            }

            return fetch(pathname, fetchInit)
            .then(function(response){
                if(!response.ok){
                    throw Error("Server response not 200")
                }
            })
            .catch(function(err){
                // If something fails, 
                // resave unsynced values to local with updated values
                return setDbData(localKey, dataToSave)
                .then(function(){
                    throw Error("Couldn't clear " + localKey + ": ", err);    
                });
            })
        } else { 
            // If there are no values to save(no backlog or new values)
            return true
        }
    })
    // No error handling here,
    // saveBacklog needs to handle any errors by failing    
}

// These all return promises
var saveRecipes = function (token, newValueArray){
    // try to save to backlog
    return saveBacklogArray(
        // Auth JWT
        token, 
        // Object with api pathname, method, and local save key
        API_ROUTES_INFO.saveRecipes,
        // new values to append to backlog(not required)
        newValueArray
    )
}
var deleteRecipes = function (token, idsToDelete){
    // Sync recipes to server
    return saveBacklogArray( token, API_ROUTES_INFO.deleteRecipes, idsToDelete );    
}
var deleteFriends = function (token, idsToDelete){
    // Sync to server
    return saveBacklogArray( 
        token, 
        API_ROUTES_INFO.deleteFriends, 
        idsToDelete 
    ); 
}

var saveNewFriendToCache = function(friendData){
    return getCachedAppData()
    .then(function(appData){
        // Get current friend list
        var currentFriends;
        if(appData.friendsInfo){ currentFriends = appData.friendsInfo; }
        else { currentFriends = []; }
        var newFriends = [].concat(currentFriends, friendData);
        var newAppData = Object.assign({}, appData);
        newAppData.friendsInfo = newFriends;
        return setMainAppData(newAppData)
    })
    .catch(function(err){
        console.log("Error updating local cache friends: ", err);
        throw Error("Couldn't update local appData.friends cache");
    })
}

var resetLocalData = function(){
    return Promise.all([
        setDbData(MAIN_APP_DATA_KEY, {}),
        setDbData(RECIPES_SAVE_KEY, []),
        setDbData(RECIPES_DELETE_KEY, []),
        setDbData(FRIENDS_DELETE_KEY, []),
        setDbData(TOKEN_KEY, "")
    ])
    .then(()=>{ console.log("Local data reset successful") })
    .catch(err=>{ console.log("Local data reset failure: ", err) })
}


self.addEventListener("install", event=>{
    // Initialize needed data to minimize 'undefined' errors
    event.waitUntil( resetLocalData() )
});


// Handles caching/response of cachable app requests
self.addEventListener("fetch", function(event){
    const reqUrl = new URL(event.request.url);
    var pathname = reqUrl.pathname;
    
    // HANDLE SIGN-IN REQUEST
    if(/\/api\/login\//.test(pathname)){
        
        //TODO don't like this hardcoding
        // Catch logout route
        if(pathname === "/api/login/logout"){
            event.waitUntil( resetLocalData() )
        }   
        // Catches both login routes that return a token
        else if(pathname !== "/api/login/check-username"){
            event.respondWith(
                fetch(event.request)
                .then(function(response){
                    var signInResponse = response.clone();
                    return signInResponse.json()
                    .then(resJSON=>{
                        var JWT = resJSON.token;
                        return setDbData(TOKEN_KEY, JWT);
                    })
                    .catch(function(err){
                        console.log("Error storing token: ", err);
                    })
                    .then(function(){
                        // Always return original response
                        return response;
                    })
                })
            );
        }
    }


    // HANDLE MAIN DATA REQUEST
    if(pathname === MAIN_APP_API_URL ){
        event.respondWith(new Promise(function(resolve, reject){
            // save backlog(to update remote data)
            saveBacklog()
            // Then get fresh app data
            .then(function(){
                // TODO set timeout for like 5 seconds, 
                    // Then check for previous sync data,
                    // If found, return that
                    // If not, do nothing
                    // But still handle update
                // Send request
                return fetch(event.request)
                .then(function(response){
                    // Clone response for storage
                    var responseForLocal = response.clone();
                    // Parse cloned body info
                    responseForLocal.json()
                    .then(function(freshAppData){
                        // Store parsed info in local
                        return setDbData(MAIN_APP_DATA_KEY, freshAppData)
                        .then(function(){
                            // This is the ideal outcome
                            // Request successful; Save successful;
                            // Return response
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
                    throw Error("Fetch failed");
                })
            })
            .catch(function(err){
                // If fetch failed,
                // or the backlog changes couldn't be pushed
                console.log("There was a problem. Attempting to return local data: ", err);
                // Get last successful sync
                return getCachedAppData()
                .then(function(appData){
                    // Return last successful data for use
                    var jsonBody = JSON.stringify(appData); 
                    var cacheResponse = new Response( jsonBody );
                    resolve(cacheResponse);
                })
                // If the backlog couldn't save, and there was no old app data
                .catch(function(err){
                    console.log("Couldn't get app data from cache: ", err); 
                    console.log("Defaulting to original request");
                    // Default to sending request unmodified
                    resolve(fetch(event.request));
                })
                
            })
        }));
    }

    // If request path should interact with the sync backlog()
    var routeOpts = API_BACKLOG_ROUTES[pathname];
    if(routeOpts){
        // Get 
        var originalReq = event.request.clone(); 
        var dbKey = routeOpts.localKey;
        event.respondWith(
            // Get body vals(will be array)
            event.request.json()
            .then(function(reqBody){
                // Get current backlog vals for this route
                return getDbData(dbKey)
                .then(function(returnedVals){
                    var backlogValues = returnedVals || [];
                    // Pull values from this request.body prop
                    var reqValues = reqBody[routeOpts.requestSaveKey];
                    // Concat new values onto backlog
                    var newBacklog = 
                        // (Filter out duplicates)
                        filterBacklogFromRequest(backlogValues, reqValues);
                    // Save combined array
                    return setDbData(dbKey, newBacklog)
                    .then(function(){
                        // After backlog is updated, sync all backlog to server
                        return saveBacklog()
                        .catch(function(err){
                            console.log("Couldn't save to backlog(from secondary api route): ", err);
                        });
                    })
                })
            })
            .catch(function(err){
                // This shouldn't happen
                console.log("Fatal error in backlog api route: ", err);
                console.log("Defaulted to original request");
                // If this route is taken, 
                // return as though the sw never got involved
                return fetch(originalReq);
            })
            .then(function(){
                // If things are working properly, 
                // return good status code
                return new Response("", {status: 200});
            })
        )
    }
    
    if(pathname === "/api/friends"){
        var originalReq = event.request.clone();
        event.respondWith(
            fetch(event.request)
            .then(function(response){
                var originalRes = response.clone();
                if(response.ok){
                    // If response good, data will be returned
                    // Save new friend to main data
                    return response.json()
                    .then(function(newFriendData){
                        return saveNewFriendToCache(newFriendData)
                    })
                    .catch(function(err){
                        // Catch any problems saving new friend data
                        console.log("sw error in /api/friends - ", err);
                    })
                    // Always return original response
                    .then(function(){
                        return originalRes;
                    })
                } else {
                    // If response not good
                    return originalRes;
                }
            })
            .catch(function(fetchErr){
                // If fetch failed just return the error
                return fetchErr;
            })
        )
    }
});



