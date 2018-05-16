export class Item {
    constructor(public name: string, public sellIn: number, public quality: number) {
    }
}

export const Names = Object.freeze({
    AGED_BRIE: 'Aged Brie',
    BACKSTAGE: 'Backstage passes to a TAFKAL80ETC concert',
    SULFURAS: 'Sulfuras, Hand of Ragnaros'
});

export class GildedRose {

    constructor(public items: Item[] = []) {
    }

    updateQuality(): void {
        this.items.forEach(item => {
            if (item.name !== Names.AGED_BRIE && item.name !== Names.BACKSTAGE) {
                if (item.quality > 0 && item.name !== Names.SULFURAS) {
                    item.quality = item.quality - 1
                }
            } else if (item.quality < 50) {
                item.quality = item.quality + 1
                if (item.name === Names.BACKSTAGE) {
                    if (item.sellIn < 11 && item.quality < 50) {
                        item.quality = item.quality + 1
                    }
                    if (item.sellIn < 6 && item.quality < 50) {
                        item.quality = item.quality + 1
                    }
                }
            }
            if (item.name !== Names.SULFURAS) {
                item.sellIn = item.sellIn - 1;
            }
            if (item.sellIn < 0) {
                if (item.name !== Names.AGED_BRIE) {
                    if (item.name !== Names.BACKSTAGE) {
                        if (item.quality > 0 && item.name !== Names.SULFURAS) {
                            item.quality = item.quality - 1
                        }
                    } else {
                        item.quality = item.quality - item.quality
                    }
                } else if (item.quality < 50) {
                    item.quality = item.quality + 1
                }
            }
        });
    }
}
