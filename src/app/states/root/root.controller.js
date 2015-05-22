import angular from 'angular';

class RootController {

    /*@ngInject*/
    constructor ($scope, $state) {

        $scope.loggedIn = false;

        $state.go('login');

    }
}

export default RootController;
