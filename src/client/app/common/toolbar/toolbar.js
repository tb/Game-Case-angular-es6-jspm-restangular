import angular from 'angular';
import 'angular-ui-router';
import ToolbarComponent from './toolbar.component';

let toolbarModule = angular.module('toolbar', [
        'ui-router'
    ]
)
    .directive('bsToolbar', ToolbarComponent);

export default toolbarModule;


