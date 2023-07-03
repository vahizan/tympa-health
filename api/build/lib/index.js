"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const recordsRouter_1 = require("./routers/recordsRouter");
const app = (0, express_1.default)();
const PORT = process.env.NODE_DOCKER_PORT || 6868;
let corsOptions = {
    origin: "http://localhost:8081",
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(recordsRouter_1.recordsRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map