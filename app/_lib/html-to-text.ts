import { convert } from 'html-to-text';

export function htmlToText(html: string, length: number = 80, more: string = '...') {
  // Conversion options from HTML to text
  const options = {
    selectors: [
      { selector: 'img', format: 'skip' }, // Skip images
      { selector: 'a', options: { ignoreHref: true } }, // Ignore href in links
    ],
  };
  const text = convert(html, options).trim();

  // Ensure adding 'more' does not exceed specified length
  if (text.length > length) {
    return text.slice(0, length - more.length).trim() + more;
  }

  return text;
}
