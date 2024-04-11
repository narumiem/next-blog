import Accordion from '@/app/_components/accordion';
import { versatileBlurData } from '@/app/_const/site-config';
import parse, { DOMNode, Element, HTMLReactParserOptions, domToReact } from 'html-react-parser';
import Image from 'next/image';

// Options for parsing HTML content to React components.
export const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (!(domNode instanceof Element) || domNode.type !== 'tag') return;

    // Removes script tags from the output.
    if (domNode.name === 'script') {
      return <></>;
    }

    // Converts img tags to Next.js Image component.
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

    // Converts custom accordion tags to Accordion components.
    if (domNode.name === 'accordion') {
      return (
        <Accordion heading={domNode.attribs.heading}>
          {domToReact(domNode.children as unknown as DOMNode[])}
        </Accordion>
      );
    }
  },
};

interface ParseHTMLProps {
  contentHTML: string;
}

// Parses HTML string into React elements using configured options.
function ParseHTML({ contentHTML }: ParseHTMLProps): React.ReactElement {
  return <>{parse(contentHTML, options)}</>;
}

export default ParseHTML;
