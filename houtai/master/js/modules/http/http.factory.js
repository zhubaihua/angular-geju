(function() {
    'use strict';
    angular
        .module('app.http')
        .factory('httpInterceptor', ['$q', function ($q) {
            return {
                request: function(config) {
                    var defer = $q.defer();
                    var contentType = config.headers["Content-Type"];
                    if(contentType && contentType.indexOf("application/json") != -1){
                        if(config.url.indexOf('http://b.geju.com') === -1){
                            config.url = 'http://b.geju.com' + config.url;
                        }
                    }
                    defer.resolve(config);

                    return defer.promise;
                },
                requestError: function(rejection) {
                    // TODO 这里写错误提示框代码
                    return $q.reject(rejection);
                },
                response: function(response) {
                    var defer = $q.defer();
                    var contentType = response.config.headers["Content-Type"];

                    if(contentType && contentType.indexOf("application/json") != -1){
                        var data = response.data;
                        // switch (+data.code){
                        //     case 200: break;
                        //     case 401: break;
                        //     default:
                        // }
                        if(data.code !== 200){
                            // TODO 这里写错误提示框代码
                            // alert(data.msg || "接口報錯");
                            defer.reject(response);
                        } else {
                            defer.resolve(data);
                        }
                    } else {
                        defer.resolve(response);
                    }
                    return response || $q.when(reponse);
                },
                responseError: function(rejection) {
                    // TODO 这里写错误提示框代码
                    return $q.reject(rejection);
                }
            };
        }]);
})();