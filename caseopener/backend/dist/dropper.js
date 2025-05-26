"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomDrop = getRandomDrop;
function getRandomDrop(items) {
    const roll = Math.random();
    let cumulative = 0;
    for (const item of items) {
        cumulative += item.probability;
        if (roll <= cumulative) {
            return item;
        }
    }
    return items[items.length - 1]; // fallback
}
