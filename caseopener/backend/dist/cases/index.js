"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openCase = exports.getCaseData = exports.getCaseNames = void 0;
const chroma_json_1 = __importDefault(require("./chroma.json"));
const prisma_json_1 = __importDefault(require("./prisma.json"));
const dropper_1 = require("../dropper");
const cases = {
    chroma: chroma_json_1.default,
    prisma: prisma_json_1.default
};
const getCaseNames = () => Object.keys(cases);
exports.getCaseNames = getCaseNames;
const getCaseData = (name) => cases[name];
exports.getCaseData = getCaseData;
const openCase = (name) => {
    const caseData = (0, exports.getCaseData)(name);
    if (!caseData)
        return null;
    return (0, dropper_1.getRandomDrop)(caseData.items);
};
exports.openCase = openCase;
