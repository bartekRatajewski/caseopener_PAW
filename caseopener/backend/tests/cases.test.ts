import * as CaseLogic from '../src/cases/index';
import * as Dropper from '../src/dropper';

describe('Case logic (from JSON data)', () => {
    it('returns all available case names', () => {
        const names = CaseLogic.getCaseNames();
        expect(names).toContain('chroma');
        expect(names).toContain('prisma');
    });

    it('returns case data when a valid name is given', () => {
        const data = CaseLogic.getCaseData('chroma');
        expect(data).toBeDefined();
        expect(Array.isArray(data.items)).toBe(true);
    });

    it('returns undefined when an invalid case name is given', () => {
        const data = CaseLogic.getCaseData('nonexistent');
        expect(data).toBeUndefined();
    });

    it('returns a random item when opening a valid case', () => {
        const result = CaseLogic.openCase('prisma');
        expect(result).toBeDefined();
        expect(result).toHaveProperty('name');
        expect(result).toHaveProperty('rarity');
    });

    it('returns null when opening a non-existent case', () => {
        const result = CaseLogic.openCase('nonexistent');
        expect(result).toBeNull();
    });

    it('calls getRandomDrop internally when opening a case', () => {
        const spy = jest.spyOn(Dropper, 'getRandomDrop').mockReturnValue({
            name: 'Mocked Drop',
            rarity: 'test',
        });

        const drop = CaseLogic.openCase('chroma');
        expect(spy).toHaveBeenCalled();
        expect(drop.name).toBe('Mocked Drop');

        spy.mockRestore();
    });
});
