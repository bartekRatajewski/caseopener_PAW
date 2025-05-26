"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const databse_1 = __importDefault(require("./databse"));
require("./models/User");
require("./models/Skin");
require("./models/InventoryItem");
require("./models/Case");
const auth_1 = __importDefault(require("./routes/auth"));
const inventory_1 = __importDefault(require("./routes/inventory"));
const case_1 = __importDefault(require("./routes/case"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/auth', auth_1.default);
app.use('/inventory', inventory_1.default);
app.use('/cases', case_1.default);
databse_1.default.sync().then(() => {
    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
});
