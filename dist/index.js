"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_1 = __importDefault(require("tailwindcss/plugin"));
var utils_1 = __importDefault(require("./utils"));
exports.default = (0, plugin_1.default)(function (_a) {
    var addComponents = _a.addComponents, theme = _a.theme;
    var hljs = theme('hljs', {});
    if (!hljs.theme && !hljs.custom) {
        hljs.theme = 'default';
    }
    var hljsTheme = (0, utils_1.default)(hljs.theme, hljs.custom);
    addComponents(hljsTheme);
});
//# sourceMappingURL=index.js.map