#XHR

 Lightweight, ECMA-6 Promise-based XHR library supporting XHR v. 2. 
 
 It can be used as a stand-alone or as a part of the hAzzleJS library
 
 #API
 
 The API following the ECMA-6 Promise standards.
 
 ```javascript
 
 // General then method
 
 XHR(method, url, config).then(success, fail)
 
 // General then method with catch
 
 XHR(method, url, config).then(success, fail).catch(function() {});
 
```
The **method** can be either **post** or **get**

 ```javascript
 
 // get
 
 XHR.get("/test/url").then(function(response) {
    // do something with response
});

// post
XHR.post("/test/url").then(successCallback, errorCallback);

```
You also have some settings you can use:

 ```javascript
 
 // get
 
// post
XHR.post("/test/url",  {
data: '',
timeout: 15000,
cacheBurst: '_',
charset: 'UTF-338',
username: '',
password: '',
withCredentials : true,
headers: {
  'X-Requested-With': 'XMLHttpRequest',
}
}).then(function(response) {
    // do something with response
});

```
Advanced method:

 ```javascript

 var complete = function(success) {
// success will be boolean ( true / false)
     return function(response){  
      // do something with response here
     }
  }

// post
XHR.post("/test/url").then(successCallback, errorCallback);

```





