#XHR ECMA-6 Promise-based library
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/hazzlejs/XHR?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

 Lightweight, ECMA-6 Promise-based XHR library supporting XHR v. 2. 
 
 It can be used as a stand-alone or as a part of the hAzzleJS library
 
 All responses are sent back as **raw data** meaning it is not handling **jsonP** or converting **XML** or other 
 things. For this it need to be developed a **AJAX framework** dealing with this things on top of the **XHR skeleton**.
 
#API
 
 The API following the **ECMA-6 Promise** standards.
 
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





