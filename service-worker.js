"use strict";
self.importScripts('/app/localforage/localforage.min.js');
// Minified app service worker. Must be replaced with new after each 'build'. 
// TODO gotta figure out a better flow. This sucks.
function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/app/index.html","6358329d60b9ef3b2a97b6d06e9c9b85"],["/app/static/css/main.cbf756ba.css","aeaa4f1e71501b0b1ed352562bfc275c"],["/app/static/js/main.640d6495.js","780ec80784135c45ac027d4119310759"],["/app/static/media/breakfast-circle.fe6e18cc.svg","fe6e18cc7133a92d689f6b40fa1e030f"],["/app/static/media/chevron-down.1e47aae5.svg","1e47aae56fb52812f4d12de1d90acc52"],["/app/static/media/dessert-circle.5bebc8f4.svg","5bebc8f45d6b9390c76d8a0511839b20"],["/app/static/media/dinner-circle.43ae1fec.svg","43ae1fecdfc2cdc9d61fd098d8e39977"],["/app/static/media/drink-circle.efccca2b.svg","efccca2b90a73cf285dfd4223d2819d3"],["/app/static/media/fontawesome-webfont.674f50d2.eot","674f50d287a8c48dc19ba404d20fe713"],["/app/static/media/fontawesome-webfont.912ec66d.svg","912ec66d7572ff821749319396470bde"],["/app/static/media/fontawesome-webfont.af7ae505.woff2","af7ae505a9eed503f8b8e6982036873e"],["/app/static/media/fontawesome-webfont.b06871f2.ttf","b06871f281fee6b241d60582ae9369b9"],["/app/static/media/fontawesome-webfont.fee66e71.woff","fee66e712a8a08eef5805a46892932ad"],["/app/static/media/logo.1f0ee7bd.svg","1f0ee7bd37466f21677334ed0695e1be"],["/app/static/media/lunch-circle.6f0ad706.svg","6f0ad70604fce603cc83b4215bfa8398"],["/app/static/media/snack-circle.1ddd758e.svg","1ddd758e23d42fa2341935d4d0697f4c"],["/app/static/media/untyped-circle.5ef7b402.svg","5ef7b4020d21a52b76630edd066a2ea9"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL("/app/index.html",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});


// ** Api routes(need to be hardcoded for saving backlog)
var COMMON_API_HEADERS = { "Content-Type" : "application/json" };
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

/* Main app response data schema is 
{
    user:{},
    friends: [{}],
}
*/
var setMainAppData = function (appData){
    setDbData(MAIN_APP_DATA_KEY, appData);
}
var getMainAppData = function (){
    return getDbData(MAIN_APP_DATA_KEY);
}

// Retrieves Auth JWT from whatever local storage is used
var getToken = function(){
    return getDbData(TOKEN_KEY);
}

var getLocalUserRecipes = function(){
    return getDbData(MAIN_APP_DATA_KEY)
    .then(function(appData){
        if(appData && appData.userInfo && appdata.userInfo.recipes){
            console.log("Retrieved user recipes");
            return appData.userInfo.recipes;
        }
        else { 
            console.log("No local user recipes retrieved");
            return [];
        }
    })
}

// Saves regardless of a previous successful sync 
var setLocalUserRecipes = function(newRecipes){
    return getDbData(MAIN_APP_DATA_KEY)
    .then(function(appData){
        var newAppData = appData || {};
        var newUserInfo = appData.userInfo || {};
        var finalUserInfo = Object.assign({}, newUserInfo, newRecipes);
        var finalAppData = Object.assign({}, newAppData, finalUserInfo);
        return setDbData(MAIN_APP_DATA_KEY, finalAppData);
    })
}

var getCachedFriends = function(){
    return getDbData(MAIN_APP_DATA_KEY)
    .then(function(appData){
        if(appData && appData.friends){
            console.log("Retrieved friends array");
            return appData.friends;
        } else {
            console.log("No friend array found");
            return [];
        }
    })
}

// Saves all backlog arrays, clearing local data an each successful piece save
var saveBacklog = function(){
    // Get JWT (needed for api auth)
    return getToken()
    .then(token=>{
        if(token){
            // Save backlog, clearing each part on successful save
            return saveRecipes(token)
            .then(function(){
                console.log("Saved recipe backlog cleared")
                // Clear save recipe backlog
                return setDbData(RECIPES_SAVE_KEY, []) 
            })
            .then(function(){ 
                // Attempt to delete recipe Ids in backlog
                return deleteRecipes(token) 
            })
            .then(function(){
                console.log("Delete recipe backlog cleared")
                // Clear delete recipe backlog
                return setDbData(RECIPES_DELETE_KEY, []);
            })
            .then(function(){
                // Attempt to delete friend Ids
               return deleteFriends(token)
            })    
            .then(()=>{
                console.log("Delete friends backlog cleared")
                // Clear delete friend Ids from backlog
                setDbData(FRIENDS_DELETE_KEY, []);
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
            // I.E. for it to get last successful sync, or just pass request through 
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
        var newBacklog = backlogData.concat(newData);
        return newBacklog;
    })
    // Take new updated data and send request
    .then(function(dataToSave){
        if(dataToSave.length > 0){
            var JSONData = dataToSave;
            return fetch(pathname, {
                method,
                headers,
                body: JSONData
            })
            .catch(function(err){
                // If something fails, 
                // resave to local with updated values
                setDbData(localKey, dataToSave);
                throw Error("Couldn't clear " + localKey);
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
    
    return Promise.resolve([]) // TODO <-- A bit hacky. There has to be a better way.
    .then(function(){
        // If there are new values
        if(newValueArray && newValueArray.length > 0){
            // Get local recipes
            return  getLocalUserRecipes()
            .then(function(userRecipes){
                // Initialize container
                var newRecipes; 
                // If there is an array, and it has recipes
                if(userRecipes && userRecipes.length > 0){
                        // Get id's of new/modified recipes
                    var idsToAdd = newValueArray.map(function(recipe){ return recipe.id });
                    // Filter out recipes about to be added
                    var filteredRecipes = userRecipes.filter(function(recipe){ return !idsToAdd.includes(recipe.id) });
                    // Add new/modified recipes
                    newRecipes = filteredRecipes.concat(newValueArray);
                } else {
                    // If no recipe array, or array empty,
                    // create new array with new values 
                    newRecipes = [].concat(newValueArray);    
                }
                // Save new array to local data    
                return setLocalUserRecipes(newRecipes);
            })
        } else { 
            // If no new values, just carry on
            return true 
        }
    })
    .catch(function(err){
        // Catch any errors updating local cached data
        console.log("Couldn't save local data user recipes: ", err);
    })

    // No matter if the local update works, try to save the backlog
    .then(function(){
        return saveBacklogArray(
            // Auth JWT
            token, 
            // Object with api pathname, method, and local save key
            API_ROUTES_INFO.saveRecipes,
            // new values to append to backlog(not required)
            newValueArray
        )
    })
     
}
var deleteRecipes = function (token, idsToDelete){
    // Delete recipe from local Cache
    return Promise.resolve([])
    .then(function(){
        // If there are new ids to delete
        if(idsToDelete && idsToDelete.length > 0){
            // Get cached recipes
            return getLocalUserRecipes()
            .then(function(userRecipes){
                // If there are stored user recipes
                if(userRecipes && Object.getOwnPropertyNames(userData).length > 0){
                    // Filter out recipes to be deleted
                    var filteredRecipes = userRecipes.filter(
                        function(recipe){ return !idsToDelete.includes(recipe.id) }
                    );
                    // Save new array to local data
                    return setLocalUserRecipes(newRecipes);
                } else {
                    // If no local recipes, just carry on
                    return true;
                }
            })
        } else {
            // If no ids to delete, carry on
            return true;
        }
    })
    .catch(function(err){
        // Catch any errors updating local cached data
        console.log("Couldn't delete local data user recipes: ", err);
    })

    // Add delete ids to backlog
    .then(function(){
        return saveBacklogArray( token, API_ROUTES_INFO.deleteRecipes, idsToDelete );
    })
    
}
var deleteFriends = function (token, idsToDelete){
    // Delete from local
    return Promise.resolve([])
    .then(function(){
        if(idsToDelete && idsToDelete.length > 0){
            return getCachedFriends()
            .then(function(friendArray){
                if(friendArray && friendArray.length > 0){
                    // Filter out delete friends
                    var filteredFriendArray = 
                        friendArray.filter(function(friend){ 
                            return idsToDelete.includes(friend.userId) 
                        })
                    return setCachedFriends(filteredFriendArray);
                } else {
                    // If no friends to delete, carry on 
                    return true; 
                }
            })                    
        } else {
            // No id's to delete, carry on
            return true
        }
    })
    .catch(function(err){
        // Catch any errors updating local cached data
        console.log("Couldn't delete local friends: ", err);
    })

    .then(function(){
        return saveBacklogArray( 
            token, 
            API_ROUTES_INFO.deleteFriends, 
            idsToDelete 
        ); 
    })
    
    
}


self.addEventListener("install", event=>{
    // Initialize needed data to avoid any 'undefined' errors
    event.waitUntil(
        Promise.all([
            setDbData(MAIN_APP_DATA_KEY, {}),
            setDbData(RECIPES_SAVE_KEY, []),
            setDbData(RECIPES_DELETE_KEY, []),
            setDbData(FRIENDS_DELETE_KEY, []),
            setDbData(TOKEN_KEY, "")
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
        if(pathname !== "/api/login/check-username"){//TODO don't like this hardcoding
            event.respondWith(
                fetch(event.request)
                .then(function(response){
                    var signInResponse = response.clone();
                    return signInResponse.json()
                    .then(resJSON=>{
                        return setDbData(TOKEN_KEY, resJSON.token);
                    })
                    .catch(function(err){
                        console.log("Error storing token: ", err);
                    })
                    .then(function(){
                        // Always return response
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
            // Get app data
            .then(function(){
                console.log("Fetching main app data");
                // TODO set timeout for like 5 seconds, 
                    // Then check for previous sync data,
                    // If found, return that
                    // If not, do nothing
                    // But still handle update
                // Send request
                fetch(event.request)
                .then(function(response){
                    // Clone response for storage
                    var responseForLocal = response.clone();
                    // Parse cloned body info
                    responseForLocal.json()
                    .then(function(freshAppData){
                        // Store parsed info in local
                        setDbData(MAIN_APP_DATA_KEY, freshAppData)
                        .then(function(){
                            // This is the ideal outcome
                            // Request successful; Save successful;
                            // Return response
                            console.log("Success: App synced with fresh data");
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
                return getDbData(MAIN_APP_DATA_KEY)
                .then(function(appData){
                    // If there is previous app data retrieved
                    if(Object.getOwnPropertyNames(appData).length > 0){
                        // Return that data for use
                        resolve(appData);
                    } else {
                        // If there is no data from an old sync, throw error
                        throw Error("No app data found");
                    }
                })
                // If the backlog couldn't save, and there was no old app data
                .catch(function(err){
                    console.log("Couldn't get app data from cache. ", err); 
                    console.log("Defaulting to original request");
                    // Default to sending request unmodified
                    resolve(fetch(event.request));
                })
                
            })
        }));
    }

    // If request path might have backlog to save
    var routeOpts = API_BACKLOG_ROUTES[pathname];

    if(routeOpts){
        console.log("ROUTE HAS OPTS");
        var dbKey = routeOpts.localKey;
        // Get body(will be one item in an array)
        event.request.json()
        .then(function(reqBody){
            // Get current backlog for route
            getDbData(dbKey)
            .then(function(returnedVals){
                var backlogValues = returnedVals || [];
                console.log("Current backlog values: ", backlogValues);
                // Concat new value onto backlog
                console.log("newValues: ", reqBody);
                var newBacklog = backlogValues.concat(reqBody);
                // Save updated array
                setDbData(dbKey, newBacklog)
                .then(function(){
                    console.log("New values saved to backlog: ", newBacklog);
                    // After backlog is updated, save all backlog
                    saveBacklog();
                })
            })
        })
        .catch(function(err){
            console.log("Error in api route with backlog: ", err);
            console.log("Defaulted to original request");
            return fetch(event.request);
        })

    }
});