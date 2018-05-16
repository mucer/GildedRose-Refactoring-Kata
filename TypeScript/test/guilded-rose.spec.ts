import { expect } from 'chai';
import { Item, GildedRose, Names } from '../app/gilded-rose';

class ItemTester {
    item = new Item('default', 0, 0);
    gildedRose = new GildedRose([this.item]);


    name(name: string): this {
        this.item.name = name;
        return this;
    }

    sellIn(sellIn: number): this {
        this.item.sellIn = sellIn;
        return this;
    }

    quality(quality: number): this {
        this.item.quality = quality;
        return this;
    }

    updates(days: number) {
        const updates: { sellIn: number, quality: number }[] = [];
        for (let i = 0; i < days; i++) {
            this.gildedRose.updateQuality();
            updates.push({ sellIn: this.item.sellIn, quality: this.item.quality });
        }
        return updates;
    }
}

describe('Gilded Rose', () => {
    let tester: ItemTester;
    beforeEach(() => {
        tester = new ItemTester();
    });

    it('should not change item without update', () => {
        expect(tester.item).to.eql({
            name: 'default',
            sellIn: 0,
            quality: 0
        });
    });

    describe('Default Items', () => {
        it('should decrease sellIn and quality', () => {
            tester
                .sellIn(1)
                .quality(1);

            expect(tester.updates(1)).to.eql([
                { sellIn: 0, quality: 0 }
            ])
        });

        it('should decrease sellIn below 0, but not quality', () => {
            tester
                .sellIn(1)
                .quality(1);

            expect(tester.updates(2)).to.eql([
                { sellIn: 0, quality: 0 },
                { sellIn: -1, quality: 0 }
            ]);
        });

        it('should decrease quality by 2 if sellIn is 0', () => {
            tester
                .sellIn(1)
                .quality(3);

            expect(tester.updates(2)).to.eql([
                { sellIn: 0, quality: 2 },
                { sellIn: -1, quality: 0 }
            ]);
        });
    });

    describe('"Aged Brie" Items', () => {
        it('should increase quality on update', () => {
            tester
                .name(Names.AGED_BRIE);

            expect(tester.updates(1)).to.eql([
                { sellIn: -1, quality: 1 }
            ]);
        });

        it('max quality should be 50', () => {
            tester
                .name(Names.AGED_BRIE)
                .sellIn(2)
                .quality(48);

            expect(tester.updates(3)).to.eql([
                { sellIn: 1, quality: 49 },
                { sellIn: 0, quality: 50 },
                { sellIn: -1, quality: 50 }
            ]);
        });
    });
});
