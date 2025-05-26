import chroma from './chroma.json';
import prisma from "./prisma.json";
import { getRandomDrop } from '../dropper';

const cases: Record<string, any> = {
    chroma,
    prisma
};

export const getCaseNames = () => Object.keys(cases);

export const getCaseData = (name: string) => cases[name];

export const openCase = (name: string) => {
    const caseData = getCaseData(name);
    if (!caseData) return null;
    return getRandomDrop(caseData.items);
};
