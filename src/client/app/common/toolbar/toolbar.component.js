import template from './toolbar.html.text!';
import controller from './toolbar.controller';
import './toolbar.css!';

let toolbarComponent = ()=> {
    return {
        template,
        controller,
        controllerAs: 'vm',
        scope: {},
        bindToController: true
    };
};

export default toolbarComponent;
