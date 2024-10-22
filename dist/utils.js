"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getTheme;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var app_root_path_1 = __importDefault(require("app-root-path"));
var sync_fetch_1 = __importDefault(require("sync-fetch"));
var lodash_1 = require("lodash");
var converter_1 = __importDefault(require("./converter"));
function getTheme(theme, custom) {
    if (theme === void 0) { theme = null; }
    if (custom === void 0) { custom = null; }
    var themeContents = {};
    var customTheme = {};
    if (theme) {
        themeContents = findTheme(theme);
    }
    if (custom) {
        customTheme = generateCustomTheme(custom);
    }
    return (0, lodash_1.merge)(themeContents, customTheme);
}
function findTheme(theme) {
    return isThemeOfficial(theme)
        ? getOfficialTheme(theme)
        : getThemeFromLink(theme);
}
function generateCustomTheme(custom) {
    var baseStyles = {};
    var customStyles = {};
    if (custom.base) {
        baseStyles = generateBaseStyles(custom.base);
    }
    Object.entries(custom).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        if (key !== "base") {
            Object.entries(value).forEach(function (_a) {
                var subKey = _a[0], subValue = _a[1];
                customStyles[".hljs-".concat(subKey)] = subValue;
            });
        }
    });
    return (0, lodash_1.merge)(baseStyles, customStyles);
}
function generateBaseStyles(baseStyles) {
    var base = {
        ".hljs": {
            display: "block",
            overflowX: "auto",
            padding: "0.5em",
        },
    };
    var merged = (0, lodash_1.merge)(base[".hljs"], baseStyles);
    return {
        ".hljs": Object.assign(merged, {}),
    };
}
function isThemeOfficial(theme) {
    var pattern = new RegExp("^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$", "i");
    return !pattern.test(theme);
}
function getOfficialTheme(theme) {
    var themePath = path.resolve("".concat(app_root_path_1.default, "/node_modules/highlight.js/styles/").concat(theme, ".css"));
    var themeContents = fs.readFileSync(themePath, "utf8");
    return (0, converter_1.default)(themeContents);
}
function getThemeFromLink(theme) {
    var css = (0, sync_fetch_1.default)(theme).text();
    return (0, converter_1.default)(css);
}
//# sourceMappingURL=utils.js.map