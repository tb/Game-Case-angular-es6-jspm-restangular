// Have to import angular first before angular-mocks
// https://github.com/Workiva/karma-jspm/issues/23
import angular from 'angular';
import 'angular-mocks';
import NavbarModule from './navbar';
import NavbarController from './navbar.controller';
import NavbarComponent from './navbar.component';
import NavbarTemplate from './navbar.html!text';


describe('Navbar', ()=> {

    let $rootScope,
        makeController;

    beforeEach(angular.mock.module(NavbarModule.name));
    beforeEach(angular.mock.inject((_$rootScope_) => {
        $rootScope = _$rootScope_;
        makeController = ()=> new NavbarController();
    }));

    describe('Module', ()=> {
        // test things about the component module
        // checking to see if it registers certain things and what not
        // test for best practices with naming too
        // test for routing
    });

    describe('Controller', ()=> {

        let controller;

        it('should contain the app title', () => {

            controller = makeController();
            expect(controller).to.have.property('appTitle');
        });

        it('should contain metadata about its set of nav links', () => {
            controller = makeController();
            expect(controller).to.have.property('navLinks');
            expect(controller.navLinks).to.have.property('length');
            expect(controller.navLinks[0]).to.have.property('uiSref');
            expect(controller.navLinks[0]).to.have.property('title');
        });

    });

    describe('Template', ()=> {

        // test the template
        // use Regexes to test that we are using the right bindings {{  }}
        it('should have the appTitle in the template', ()=> {
            expect(NavbarTemplate).to.match(/{{\s?vm\.appTitle\s?}}/g);
        });

        it('should be repating over the controller\s navLinks', ()=> {
            expect(NavbarTemplate).to.match(/ng-repeat="\s?in vm\.navLinks\s?"/g);
        });
    });

    describe('Component', ()=> {
        // Tests for the component directive itself
        let component = NavbarComponent();

        it('should use the right template', ()=> {
            expect(component.template).to.equal(NavbarTemplate);
        });

        it('should use the right controller', ()=> {
            expect(component.controller).to.equal(NavbarController);
        });

        it('should use controllerAs', ()=> {
            expect(component).to.have.property('controllerAs');
        });
    });
});
