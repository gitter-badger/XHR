// xhr.js
var _xhr = (function() {

    // Check for hAzzle namespace

    var ishAzzle = !!window.hAzzle && typeof window.hAzzle === 'function',

        // Promise library

        Promise = window.Promise,

        hA = ishAzzle ? hAzzle : null;

    // Included some Core modules if hAzzle are present

    if (ishAzzle) {

        var util = hA.require('util'),
            types = hA.require('types');
    }

    // ECMA-6 polyfill needed, check for that
    if (!window.Promise || (typeof window.Promise !== 'function')) {
        throw new TypeError('Failed to use \'hAzzle XHR\' because your browser doesn\'t supoport ECMA-6 ' +
            'Promises: You need to include hAzzle ECMA-6 Promise shim or another shim to get this working.');
    }

    return function() {

        // XHR main function

        function XHR(method, url, config) {

            config = config || {};
            method = method.toUpperCase();

            var headers = config.headers || {},
                charset = 'charset' in config ? config.charset : XHR.defaults.charset,
                cacheBurst = 'cacheBurst' in config ? config.cacheBurst : XHR.defaults.cacheBurst,
                withCredentials = config.withCredentials ? config.withCredentials : XHR.defaults.withCredentials,
                data = config.data;

            if (typeof data === 'object') {
                data = util.reduce(Object.keys(data), function(memo, key) {
                    var name = encodeURIComponent(key),
                        value = data[key];

                    if (types.isArray(value)) {
                        util.each(value, function(value) {
                            memo.push(name + '=' + encodeURIComponent(value));
                        });
                    } else {
                        memo.push(name + '=' + encodeURIComponent(value));
                    }

                    return memo;
                }, []).join('&').replace(/%20/g, '+');
            }

            if (typeof data === 'string') {
                if (method === 'GET') {
                    url += (~url.indexOf('?') ? '&' : '?') + data;

                    data = null;
                } else {

                    headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=' + charset;
                }
            }

            if (typeof config.json === 'json') {
                data = JSON.stringify(config.json);

                headers['Content-Type'] = 'application/json; charset=' + charset;
            }

            if (cacheBurst && method === 'GET') {
                url += (~url.indexOf('?') ? '&' : '?') + cacheBurst + '=' + Date.now();
            }

            return new Promise(function(resolve, reject) {

                // Create a new xhr request

                var xhr = new XMLHttpRequest();

                xhr.onabort = function() {
                    reject(new Error('abort'));
                };
                xhr.onerror = function() {
                    reject(new Error('fail'));
                };

                xhr.onreadystatechange = function() {
                    var responseHeaders = null,
                        response = null,
                        statusText = '';

                    if (xhr && xhr.readyState === 4) {

                        var status = xhr.status;

                        responseHeaders = xhr.getAllResponseHeaders();

                        response = ('response' in xhr) ? xhr.response : xhr.responseText;

                        // #IE9
                        //             if (features.ie === 9) {
                        //                 statusText = xhr.statusText
                        //           }
                        status = status === 1223 ? 204 : status;

                        statusText = statusText || '';

                        if (status >= 200 && status < 300 || status === 304) {
                            resolve(response);
                        } else {
                            reject(response);
                        }
                    }
                };


                xhr.open(method,
                        url,
                        true),
                    XHR.defaults.username,
                    XHR.defaults.password;

                xhr.timeout = config.timeout || XHR.defaults.timeout;

                xhr.ontimeout = function() {
                    reject(new Error('timeout'));
                };

                // Set default headers
                Object.keys(XHR.defaults.headers).forEach(function(key) {
                    if (!(key in headers)) {
                        headers[key] = XHR.defaults.headers[key];
                    }
                });
                Object.keys(headers).forEach(function(value, key) {
                    if (typeof value !== 'undefined') {
                        xhr.setRequestHeader(key, value);
                    }
                });

                if (withCredentials) {
                    xhr.withCredentials = true;
                }
                xhr.send(data || null);
            });
        }

        XHR.get = function(url, config) {
            return XHR('get', url, config);
        };

        XHR.post = function(url, config) {
            return XHR('post', url, config);
        };

        XHR.defaults = {
            timeout: 15000,
            cacheBurst: '_',
            charset: 'UTF-8',
            username: '',
            password: '',
            withCredentials: false,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        };

        // Expose to the window object

        window.XHR = XHR;
    };
}());

// Load as hAzzle module if hAzzle ae present,else as a stand-alone method

!!window.hAzzle && typeof window.hAzzle === 'function' ? hAzzle.define('xhr', _xhr) : _xhr();