import * as fs from "fs";
import * as path from "path";
import appRoot from "app-root-path";
import fetch from "sync-fetch";
import {merge} from "lodash";
import convertCss from "./converter";

interface CustomTheme {
  [key: string]: any;
  base?: Record<string, string>;
}

export default function getTheme(
  theme: string | null = null,
  custom: CustomTheme | null = null
): Record<string, any> {
  let themeContents: Record<string, any> = {};
  let customTheme: Record<string, any> = {};

  if (theme) {
    themeContents = findTheme(theme);
  }

  if (custom) {
    customTheme = generateCustomTheme(custom);
  }

  return merge(themeContents, customTheme);
}

function findTheme(theme: string): Record<string, any> {
  return isThemeOfficial(theme)
    ? getOfficialTheme(theme)
    : getThemeFromLink(theme);
}

function generateCustomTheme(custom: CustomTheme): Record<string, any> {
  let baseStyles: Record<string, any> = {};
  let customStyles: Record<string, any> = {};

  if (custom.base) {
    baseStyles = generateBaseStyles(custom.base);
  }

  Object.entries(custom).forEach(([key, value]) => {
    if (key !== "base") {
      Object.entries(value).forEach(([subKey, subValue]) => {
        customStyles[`.hljs-${subKey}`] = subValue;
      });
    }
  });

  return merge(baseStyles, customStyles);
}

function generateBaseStyles(
  baseStyles: Record<string, string>
): Record<string, any> {
  const base = {
    ".hljs": {
      display: "block",
      overflowX: "auto",
      padding: "0.5em",
    },
  };

  const merged = merge(base[".hljs"], baseStyles);

  return {
    ".hljs": Object.assign(merged, {}),
  };
}

function isThemeOfficial(theme: string): boolean {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !pattern.test(theme);
}

function getOfficialTheme(theme: string): Record<string, any> {
  const themePath = path.resolve(
    `${appRoot}/node_modules/highlight.js/styles/${theme}.css`
  );
  const themeContents = fs.readFileSync(themePath, "utf8");
  return convertCss(themeContents);
}

function getThemeFromLink(theme: string): Record<string, any> {
  const css = fetch(theme).text();
  return convertCss(css);
}
