//__display__
describe('item list', () => {

    beforeEach(() => {
        browser.get('/examples/animation/without-animation.html');
    });

    it('has initial empty input.', () => {
        var value = element(by.model('vm.newItem')).getAttribute("value");
        expect(value).toBe("");
    });

    it('has initial list of items.', () => {
        var itemList = element.all(by.repeater('item in vm.items'));
        expect(itemList.count()).toEqual(3);
        expect(itemList.get(0).getText()).toEqual('x one');
        expect(itemList.get(1).getText()).toEqual('x two');
        expect(itemList.get(2).getText()).toEqual('x three');
    });

    it('can add a new item.', () => {
        element(by.model('vm.newItem')).sendKeys('four');
        element(by.buttonText('Add')).click();
        var itemList = element.all(by.repeater('item in vm.items'));
        expect(itemList.count()).toEqual(4);
        expect(itemList.get(3).getText()).toEqual('x four');
    });

    it('can delete an existing item.', () => {
        element.all(by.buttonText('x')).get(1).click();
        var itemList = element.all(by.repeater('item in vm.items'));
        expect(itemList.count()).toEqual(2);
        expect(itemList.get(0).getText()).toEqual('x one');
        expect(itemList.get(1).getText()).toEqual('x three');
    });

});
//__display__
