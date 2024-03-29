import { convert } from 'html-to-text';

export function htmlToText(
  html: string,
  length: number = 80,
  more: string = '...'
) {
  const text = convert(html, {
    selectors: [
      { selector: 'img', format: 'skip' },
      { selector: 'a', options: { ignoreHref: true } },
    ],
  });
  // 指定された長さより短い場合はそのまま返す
  if (text.length <= length) {
    return text.trim();
  }
  // 指定された長さで切って返す
  const truncatedText = text.slice(0, length).trim();
  
  return truncatedText + more;
}
