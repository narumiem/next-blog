import { convert } from 'html-to-text';

/**
 * Converts HTML to plain text.
 * @param html - The HTML string to convert.
 * @param length - The maximum length of the resulting text. Default is 80.
 * @param more - The string to append if the resulting text is longer than the specified length. Default is '...'.
 * @returns The converted plain text.
 */
export function htmlToText(html: string, length: number = 80, more: string = '...') {
  // Define the options for the html-to-text library
  const options = {
    selectors: [
      { selector: 'img', format: 'skip' }, // Skip images
      { selector: 'a', options: { ignoreHref: true } }, // Ignore links
    ],
  };

  // Convert the HTML to plain text
  const text = convert(html, options).trim();

  // If the resulting text is longer than the specified length, truncate it and append the 'more' string
  if (text.length > length) {
    return text.slice(0, length - more.length).trim() + more;
  }

  return text;
}
