import 'babel/external-helpers';

import angular from 'angular';
import 'angular-ui-router';
import 'angular-animate';
import 'angular-aria';
import 'angular-touch';
import 'angular-sanitize';
import 'angular-material';
import _ from 'lodash';
window._ = _;
import 'restangular';
import 'ocLazyLoad';
import 'common/core';
import routing from 'common/utils/routing';

var app = angular.module('gameCase', [
    'ngAnimate',
    'ngAria',
    'ngTouch',
    'ngSanitize',
    'ngMaterial',
    'restangular',
    'ui.router',
    'oc.lazyLoad'
]);

app.config(routing(app));
app.config(function ($urlRouterProvider, $locationProvider, $stateProvider, $httpProvider) {
    //$locationProvider.html5Mode(true);
    $httpProvider.useApplyAsync(true);
    $urlRouterProvider.otherwise('/login');
});


angular.element(document).ready(function () {
    angular.bootstrap(document.body, [app.name], {
        // strictDi: true
    });
});

export default app;
