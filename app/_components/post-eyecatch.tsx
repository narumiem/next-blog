import styles from '@/app/_components/post-eyecatch.module.css';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

// Props for the PostEyecatch component
interface PostEyecatchProps {
  src: string; // Source URL of the image
  width?: number; // Width of the image
  height?: number; // Height of the image
  alt?: string; // Alternative text for the image
  fill?: boolean; // Whether to fill the container or maintain aspect ratio
  sizes?: string; // Sizes attribute for responsive images
  priority?: boolean; // Whether to prioritize loading the image
  placeholder?: PlaceholderValue; // Placeholder value for the image
  style?: React.CSSProperties; // Custom styles for the image container
  blurDataURL?: string; // Base64-encoded blurred image data URL
}

/**
 * Component for displaying an eyecatch image in a post.
 * @param {PostEyecatchProps} props - The component props.
 * @returns {React.ReactElement} The rendered component.
 */
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
