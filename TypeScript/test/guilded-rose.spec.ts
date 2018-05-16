import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', () => {

    it('should foo', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        gildedRose.updateQuality();
        expect(gildedRose.items[0].name).to.equal('foo');
    });

});
