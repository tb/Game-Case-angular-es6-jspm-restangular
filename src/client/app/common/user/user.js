import angular from 'angular';
import CurrentUserFactory from 'current-user.factory.js';

let userModule = angular.module('user', [])
    .factory('CurrentUser', CurrentUserFactory);

export default userModule;
