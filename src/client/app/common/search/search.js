import angular from 'angular';

import searchConstants from './search.constants.js';
import searchConfig from './search.config.js';
import searchSvc from './search.service.js';




export default angular
    .module('search', [])
    .config(searchConfig)
    .constant('searchConstants', searchConstants)
    .service('searchSvc', searchSvc);
