import parse, { Element, HTMLReactParserOptions } from 'html-react-parser';
import Image from 'next/image';

export const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (!(domNode instanceof Element)) return;
    if (domNode.name === 'script') {
      // return <span>script</span>;
      return <></>;
    }
    if (domNode.attribs && domNode.attribs.class && domNode.attribs.class.includes('ad-area')) {
      // return <span>ad-area</span>;
      return <></>;
    }
    if (domNode.name === 'img') {
      const { src, alt, width, height } = domNode.attribs;
      return (
        <Image
          src={src}
          width={parseInt(width)}
          height={parseInt(height)}
          alt={alt}
          sizes="(min-width: 768px) 768px, 100vw"
          style={{ width: '100%', height: 'auto' }}
          placeholder="blur"
          blurDataURL={src}
        />
      );
    }
  },
};

interface ParseHTMLProps {
  contentHTML: string;
}

function ParseHTML({ contentHTML }: ParseHTMLProps): React.ReactElement {
  const contentReact = parse(contentHTML, options);
  return <>{contentReact}</>;
}

export default ParseHTML;
