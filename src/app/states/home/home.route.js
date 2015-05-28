import angular from 'angular';

/*@ngInject*/
function homeRouteConfig ($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: HomeTemplate.name,
        controller: HomeController,
        controllerAs: 'homeCtrl'
    });
}

export default homeRouteConfig;
