import Accordion from '@/app/_components/accordion';
import { versatileBlurData } from '@/app/_const/site-config';
import parse, { DOMNode, Element, HTMLReactParserOptions, domToReact } from 'html-react-parser';
import Image from 'next/image';

export const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (!(domNode instanceof Element)) return;
    if (domNode.type === 'tag' && domNode.name === 'script') {
      // return <span>script</span>;
      return <></>;
    }
    if (domNode.type === 'tag' && domNode.attribs?.class?.includes('ad-area')) {
      // return <span>ad-area</span>;
      return <></>;
    }
    if (domNode.type === 'tag' && domNode.name === 'img') {
      const { src, alt, width, height } = domNode.attribs;
      return (
        <Image
          src={src}
          width={parseInt(width)}
          height={parseInt(height)}
          alt={alt}
          sizes="(max-width: 768px) 100vw, 768px"
          placeholder="blur"
          style={{ width: '100%', height: 'auto' }}
          blurDataURL={versatileBlurData}
        />
      );
    }
    if (domNode.type === 'tag' && domNode.name === 'accordion') {
      const { attribs } = domNode;
      return (
        <Accordion heading={attribs.heading}>
          {domToReact(domNode.children as unknown as DOMNode[])}
        </Accordion>
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
