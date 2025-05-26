export function getRandomDrop(items: any[]) {
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
