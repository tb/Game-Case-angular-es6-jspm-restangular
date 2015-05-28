import angular from 'angular';


/*@ngInject*/
function loginRouteConfig($stateProvider) {

    return function () {
        $stateProvider.state('login', {
            url: '/login',
            controller: 'LoginController',
            controllerAs: 'loginCtrl',
            templateUrl: LoginTemplate.name
        });

        // TODO: Make separate signup submodule?
        $stateProvider.state('login.signup', {
            url: '/login/signup',
            templateUrl: SignupTemplate.name
        });
    };
}

export default loginRouteConfig;
