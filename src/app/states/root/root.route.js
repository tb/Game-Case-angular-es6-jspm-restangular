import angular from 'angular';


/*@ngInject*/
function rootRouteConfig ($stateProvider) {
    $stateProvider.state('root', {
        url: '/',
        controller: 'RootController',
        controllerAs: 'rootCtrl'
    });
}

export default rootRouteConfig;

