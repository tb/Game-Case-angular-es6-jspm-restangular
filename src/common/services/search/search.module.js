import angular from 'angular';

import searchConstants from './search.constants';
import searchConfig from './search.config';
import searchSvc from './search.service';




export default angular
    .module('search', [])
    .config(searchConfig)
    .constant('searchConstants', searchConstants)
    .service('searchSvc', searchSvc);
