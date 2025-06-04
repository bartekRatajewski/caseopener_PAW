import { getRandomDrop } from '../src/dropper';

describe('getRandomDrop', () => {
    const items = [
        { name: 'Item A', probability: 0.5 },
        { name: 'Item B', probability: 0.3 },
        { name: 'Item C', probability: 0.2 },
    ];

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return an item from the list', () => {
        const result = getRandomDrop(items);
        expect(items).toContainEqual(result);
    });

    it('should return the first item when roll is very low', () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.01);
        const result = getRandomDrop(items);
        expect(result.name).toBe('Item A');
    });

    it('should return the second item when roll is between 0.5 and 0.8', () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.6);
        const result = getRandomDrop(items);
        expect(result.name).toBe('Item B');
    });

    it('should return the third item when roll is between 0.8 and 1.0', () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.9);
        const result = getRandomDrop(items);
        expect(result.name).toBe('Item C');
    });

    it('should return the last item if roll is higher than cumulative probability', () => {
        const incomplete = [
            { name: 'Item A', probability: 0.2 },
            { name: 'Item B', probability: 0.3 }, // suma = 0.5
        ];
        jest.spyOn(Math, 'random').mockReturnValue(0.99);
        const result = getRandomDrop(incomplete);
        expect(result.name).toBe('Item B'); // fallback
    });
});
