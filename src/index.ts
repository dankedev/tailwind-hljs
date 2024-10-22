import plugin from 'tailwindcss/plugin';
import getTheme from './utils';

interface HljsTheme {
  theme?: string;
  custom?: Record<string, any>;
}

export default plugin(({ addComponents, theme }) => {
  const hljs: HljsTheme = theme('hljs', {});

  if (!hljs.theme && !hljs.custom) {
    hljs.theme = 'default';
  }

  const hljsTheme = getTheme(hljs.theme, hljs.custom);

  addComponents(hljsTheme);
});
