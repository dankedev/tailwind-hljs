interface CustomTheme {
    [key: string]: any;
    base?: Record<string, string>;
}
export default function getTheme(theme?: string | null, custom?: CustomTheme | null): Record<string, any>;
export {};
//# sourceMappingURL=utils.d.ts.map