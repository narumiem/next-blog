import Accordion from '@/app/_components/accordion';
import { versatileBlurData } from '@/app/_const/site-config';
import parse, { DOMNode, Element, HTMLReactParserOptions, domToReact } from 'html-react-parser';
import Image from 'next/image';

// Define the options for html-react-parser
export const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    // Skip processing if the node is not an Element or not a tag
    if (!(domNode instanceof Element) || domNode.type !== 'tag') return;

    // Skip processing if the node is a script tag
    if (domNode.name === 'script') {
      return <></>;
    }

    // Replace image tags with Next.js Image component
    if (domNode.name === 'img') {
      const { src, alt, width, height } = domNode.attribs;
      const parsedWidth = parseInt(width, 10);
      const parsedHeight = parseInt(height, 10);
      if (isNaN(parsedWidth) || isNaN(parsedHeight)) {
        console.error('Invalid image dimensions');
        return null;
      }
      return (
        <Image
          src={src}
          width={parsedWidth}
          height={parsedHeight}
          alt={alt || ''}
          sizes="(max-width: 768px) 100vw, 768px"
          placeholder="blur"
          blurDataURL={versatileBlurData}
        />
      );
    }

    // Replace accordion tags with custom Accordion component
    if (domNode.name === 'accordion') {
      return (
        <Accordion heading={domNode.attribs.heading}>
          {domToReact(domNode.children as unknown as DOMNode[])}
        </Accordion>
      );
    }
  },
};

/**
 * Props for the ParseHTML component.
 */
interface ParseHTMLProps {
  contentHTML: string; // The HTML content to parse
}

/**
 * Component that parses HTML content and renders it as React elements.
 * @param {ParseHTMLProps} props - The component props.
 * @returns {React.ReactElement} The rendered React element.
 */
function ParseHTML({ contentHTML }: ParseHTMLProps): React.ReactElement {
  return <>{parse(contentHTML, options)}</>;
}

export default ParseHTML;
