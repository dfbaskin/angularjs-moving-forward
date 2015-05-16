
import bespoke from 'bespoke';
import bespokeBullets from 'bespoke-bullets';
import bespokeClasses from 'bespoke-classes';
import bespokeHash from 'bespoke-hash';
import bespokeKeys from 'bespoke-keys';

class Presentation {

    constructor() {
        this.deck = bespoke.from('article', [
            bespokeClasses(),
            bespokeKeys(),
            bespokeHash(),
            bespokeBullets('.bullet')
        ]);
    }

}

export default new Presentation();
