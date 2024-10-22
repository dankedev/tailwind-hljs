import * as css from 'css';

interface Declaration {
  type: string;
  property: string;
  value: string;
}

interface Rule {
  type: string;
  selectors: string[];
  declarations: Declaration[];
}

function formatProperty(dec: string): string {
  return dec.replace(/-(\w)/g, (_, b) => b.toUpperCase());
}

function buildDeclarations(declarations: Declaration[]): Record<string, string> {
  const formattedDeclarations: Record<string, string> = {};
  declarations.forEach((dec) => {
    if (dec.type !== 'declaration') return;
    const property = formatProperty(dec.property);
    formattedDeclarations[property] = dec.value.replace(/"|'/g, '');
  });
  return formattedDeclarations;
}

export default function convertCSS(cssInput: string): Record<string, Record<string, string>> {
  const ast = css.parse(cssInput) as { stylesheet: { rules: Rule[] } };
  const cssInJs: Record<string, Record<string, string>> = {};

  ast.stylesheet.rules.forEach((rule) => {
    if (rule.type !== 'rule') return;

    const declarations = buildDeclarations(rule.declarations);
    const selector = rule.selectors.join(',\n');

    cssInJs[selector] = declarations;
  });

  return cssInJs;
}
