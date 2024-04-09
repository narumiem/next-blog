import styles from '@/app/_components/post-eyecatch.module.css';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

interface PostEyecatchProps {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  placeholder?: PlaceholderValue;
  style?: React.CSSProperties;
  blurDataURL?: string;
}

function PostEyecatch({
  src,
  width,
  height,
  alt = '',
  fill = true,
  sizes = '(max-width: 1220px) 100vw, 1220px',
  priority = false,
  placeholder = 'blur',
  style = {},
  blurDataURL = src,
}: PostEyecatchProps): React.ReactElement {
  const { width: w, height: h, ...fillStyle } = style;
  const styleList = fill ? fillStyle : { width: '100%', height: 'auto', ...style };
  return (
    <figure className={styles.eyecatch}>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        placeholder={placeholder}
        style={styleList}
        blurDataURL={blurDataURL}
      />
    </figure>
  );
}
export default PostEyecatch;
