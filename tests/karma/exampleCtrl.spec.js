//__display__
import angular from 'angular';
import 'angular-mocks';

import ctrl from 'examples/animation/without-animation';

describe("example controller", () => {

    var ctrl;

    beforeEach(angular.mock.module('exampleApp'));

    beforeEach(inject($controller => {
        ctrl = $controller('exampleCtrl', {
        });
    }));

    it("should have an initial set of three items.", () => {
        expect(ctrl.items.length).toBe(3);
    });

    it("should have an initial set of containing expected text values.", () => {
        expect(ctrl.items[0].text).toBe("one");
        expect(ctrl.items[1].text).toBe("two");
        expect(ctrl.items[2].text).toBe("three");
    });

    it("should add item.", () => {
        ctrl.addItem("four");
        expect(ctrl.items.length).toBe(4);
        expect(ctrl.items[3].text).toBe("four");
    });

    it("should remove item.", () => {
        ctrl.removeItem(ctrl.items[1]);
        expect(ctrl.items.length).toBe(2);
    });

    it("should ignore removing unknown item.", () => {
        ctrl.removeItem({ id: 12345, text: "Unknown" });
        expect(ctrl.items.length).toBe(3);
    });

});
//__display__
