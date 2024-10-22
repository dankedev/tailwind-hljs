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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = convertCSS;
var css = __importStar(require("css"));
function formatProperty(dec) {
    return dec.replace(/-(\w)/g, function (_, b) { return b.toUpperCase(); });
}
function buildDeclarations(declarations) {
    var formattedDeclarations = {};
    declarations.forEach(function (dec) {
        if (dec.type !== 'declaration')
            return;
        var property = formatProperty(dec.property);
        formattedDeclarations[property] = dec.value.replace(/"|'/g, '');
    });
    return formattedDeclarations;
}
function convertCSS(cssInput) {
    var ast = css.parse(cssInput);
    var cssInJs = {};
    ast.stylesheet.rules.forEach(function (rule) {
        if (rule.type !== 'rule')
            return;
        var declarations = buildDeclarations(rule.declarations);
        var selector = rule.selectors.join(',\n');
        cssInJs[selector] = declarations;
    });
    return cssInJs;
}
//# sourceMappingURL=converter.js.map