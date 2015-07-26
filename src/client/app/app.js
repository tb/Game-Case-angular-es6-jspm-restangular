import angular from 'angular';
import 'angular-ui-router';
import 'angular-animate';
import 'angular-aria';
import 'angular-touch';
import 'angular-sanitize';
import _ from 'lodash';
window._ = _;
import 'restangular';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import 'normalize.css';

let appModule = angular.module('gameCase', [
    'ngAnimate',
    'ngAria',
    'ngTouch',
    'ngSanitize',
    'ngMaterial',
    'restangular',
    'ui.router',
    Common.name,
    Components.name,
    AppComponent.name
])
    .directive('gc-app', AppComponent);

angular.element(document).ready(() => {
   angular.bootstrap(document, [appModule.name], {
       strictDi: true
   });
});



//TODO: RouterHelperProvider? (https://github.com/johnpapa/angular-styleguide#routing)
//app.config(routing(app));
//app.config(function ($urlRouterProvider, $locationProvider, $stateProvider, $httpProvider) {
//    //$locationProvider.html5Mode(true);
//    $httpProvider.useApplyAsync(true);
//    $urlRouterProvider.otherwise('/login');
//});
//
//

export default appModule;
