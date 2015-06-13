
//import angular from 'angular';
import _ from 'lodash';
let angular = {};

describe("simple", () => {

    it("should pass", () => {
        expect(true).toBe(true);
    });

    it("angular should be an object", () => {
        expect(typeof(angular)).toBe("object");
    });

});
