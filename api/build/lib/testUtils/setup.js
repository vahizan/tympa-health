"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaMock = void 0;
const jest_mock_extended_1 = require("jest-mock-extended");
const prismaClient_1 = __importDefault(require("../prismaClient"));
const API_URL = "http://fake-api.com";
process.env.API = API_URL;
jest.mock("../prismaClient", () => ({
    __esModule: true,
    default: (0, jest_mock_extended_1.mockDeep)(),
}));
beforeEach(() => {
    (0, jest_mock_extended_1.mockReset)(exports.prismaMock);
});
exports.prismaMock = prismaClient_1.default;
//# sourceMappingURL=setup.js.map