import angular from 'angular';

class LoginController {

    /*@ngInject*/
    constructor ($scope, $state) {
        $scope.loggedIn = false;
        $scope.$watch('theme', function (newVal, oldVal, ev) {
            if (!newVal) return;
            System.import('assets/' + newVal + '.css!').then(loaded => {
                angular.element(document.body).addClass(newVal);
            });
        });

        $state.go('home');


    }
}

export default LoginController;





