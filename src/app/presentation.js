
import bespoke from 'bespoke';
import bespokeBullets from 'bespoke-bullets';
import bespokeClasses from 'bespoke-classes';
import bespokeHash from 'bespoke-hash';
import bespokeKeys from 'bespoke-keys';
import bespokeScale from 'bespoke-scale';

class Presentation {

    constructor() {
        this.deck = bespoke.from('article', [
            //bespokeScale('zoom'),
            bespokeClasses(),
            bespokeKeys(),
            bespokeHash(),
            bespokeBullets('.bullet')
        ]);
    }

}

export default new Presentation();
