import angular from 'angular';


import RootController from './root.controller';
import rootRouteConfig from './root.route';
import UserModule from 'common/services/user';


export default angular
    .module('gameCase.root', [
        UserModule.name
    ])
    .controller('RootController', RootController)
    .config(rootRouteConfig);



