import angular from 'angular';

import SearchModule from 'common/services/search/search.module';
import HomeTemplate from './home.tpl';

//import homeRouteConfig from './home.route';   // TODO: Figure out why routing config only seems to register when inlined in the module file (like below)
import HomeController from './home.controller';

import './home.css!';


/*@ngInject*/
function homeRouteConfig ($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: HomeTemplate.name,
        controller: HomeController,
        controllerAs: 'homeCtrl'
    });
}



export default angular
    .module('home', [
        SearchModule.name,
        HomeTemplate.name
    ])
    .config(homeRouteConfig)
    .controller('HomeController', HomeController);

