const fs = require('fs');
const path = require('path');
const fetch = require('sync-fetch');
const convertCss = require('./converter');

module.exports = function getTheme(theme) {
  return isThemeOfficial(theme)
    ? getOfficialTheme(theme)
    : getThemeFromLink(theme);
};

function isThemeOfficial(theme) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !pattern.test(theme);
}

function getOfficialTheme(theme) {
  const themePath = path.resolve(
    `${__dirname}/../node_modules/highlight.js/styles/${theme}.css`,
  );
  const themeContents = fs.readFileSync(themePath, 'utf8');

  const styles = convertCss(themeContents);

  return styles;
}

function getThemeFromLink(theme) {
  const css = fetch(theme).text();

  return convertCss(css);
}
