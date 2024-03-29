import parse from 'html-react-parser';
import Image from 'next/image';

interface ParseHTMLProps {
  contentHTML: string;
}

function ParseHTML({ contentHTML }: ParseHTMLProps): React.ReactElement {
  const contentReact = parse(contentHTML, {
    replace: (node: any) => {
      if (node.name === 'img') {
        const { src, alt, width, height } = node.attribs;
        return (
          <Image
            src={src}
            width={width}
            height={height}
            alt={alt}
            sizes="(min-width: 768px) 768px, 100vw"
            style={{ width: '100%', height: 'auto' }}
          />
        );
      }
    },
  });
  return <>{contentReact}</>;
}

export default ParseHTML;
