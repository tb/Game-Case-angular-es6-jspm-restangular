import angular from 'angular';
import SearchModule from './search/search';
import UserModule from './user/user';

var commonModule = angular.module('common', [
    SearchModule.name,
    UserModule.name
]);


export default commonModule;
