(function() {
    'use strict';

    angular
        .module('app.http')
        .config(function($httpProvider) {
            $httpProvider.interceptors.push("httpInterceptor");
        });
})();