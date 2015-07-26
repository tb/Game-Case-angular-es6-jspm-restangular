import template from './navbar.html!text';
import controller from './navbar.controller';
import './navbar.css!';

let navbarComponent = () => {

    return {
        template,
        controller,
        controllerAs: 'vm',
        scope: {},
        bindToController: true
    };
};

export default navbarComponent;
