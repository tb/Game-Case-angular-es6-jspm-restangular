import angular from 'angular';

import SelectModule from 'common/components/select';
import DateModule from 'common/components/date';
import ModalModule from 'common/components/modal';
import UserModule from 'common/services/user/user';
import LoginTemplate from './login.tpl';
import SignupTemplate from './signup.tpl';
import './login.css!';

import LoginController from './login.controller';
//import loginRouteConfig from './login.route';    // TODO: Figure out why routing config only seems to register when inlined in the module file (like below)



/*@ngInject*/
function loginRouteConfig($stateProvider) {
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
}


export default angular
    .module('login', [
        SelectModule.name,
        DateModule.name,
        ModalModule.name,
        UserModule.name,
        LoginTemplate.name,
        SignupTemplate.name
    ])
    .config(loginRouteConfig)
    .controller('LoginController', LoginController);


