import { expect } from 'chai';
import { Item, GildedRose, Names } from '../app/gilded-rose';

class Builder {
    private gildedRose = new GildedRose();

    add(name: string, sellIn: number, quality: number): this {
        this.items.push(new Item(name, sellIn, quality));
        return this;
    }

    update(): this {
        this.gildedRose.updateQuality();
        return this;
    }

    get items(): Item[] {
        return this.gildedRose.items;
    }

    get first(): Item {
        return this.items[0];
    }
}

describe('Gilded Rose', () => {
    let builder: Builder;
    beforeEach(() => {
        builder = new Builder();
    });

    it('should not change item without update', () => {
        builder.add('foo', 0, 0);

        expect(builder.first).to.eql({
            name: 'foo',
            sellIn: 0,
            quality: 0
        });
    });

    describe('Default Items', () => {
        it('should decrease sellIn and quality', () => {
            builder
                .add('foo', 2, 2)
                .update();

            expect(builder.first).to.eql({
                name: 'foo',
                sellIn: 1,
                quality: 1
            })
        });

        it('should decrease sellIn below 0, but not quality', () => {
            builder
                .add('foo', 0, 0)
                .update();

            expect(builder.first.sellIn).to.eq(-1);
            expect(builder.first.quality).to.eq(0);
        });

        it('should decrease quality by 2 if sellIn is 0', () => {
            builder
            .add('foo', 0, 10)
            .update();

            expect(builder.first.quality).to.eq(8);
        });
    });

    describe('"Aged Brie" Items', () => {
        it('should increase quality on update', () => {
            builder
            .add(Names.AGED_BRIE, 0, 0)
            .update();

            expect(builder.first.quality).to.eq(1);
        });

        it('max quality should be 50', () => {
            builder
            .add(Names.AGED_BRIE, 0, 50)
            .update();

            expect(builder.first.quality).to.eq(50);
        });
    });
});
