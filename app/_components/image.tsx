import { API_BASE_URL } from '@/app/api/image-proxy/route';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

// Props for the CustomImage component
interface CustomImageProps {
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

/**
 * Component for displaying a custom image.
 * @param {CustomImageProps} props - The component props.
 * @returns {React.ReactElement} The rendered component.
 */
export function CustomImage({
  src,
  width,
  height,
  alt = '',
  fill = false,
  sizes = '100vw',
  priority = false,
  placeholder = 'blur',
  style = {},
  blurDataURL = src,
}: CustomImageProps): React.ReactElement {
  // Get the WordPress URL from the environment variables
  const wordpressUrl = process.env.WORDPRESS_URL || '';

  // Check if the WordPress URL is set
  if (!wordpressUrl) {
    const errorMessage ='The WordPress URL is required.'
    console.error(errorMessage);
    return <p>{errorMessage}</p>;
  }
  // Check if the image URL is set
  if (!src) {
    const errorMessage = 'The image URL is required.';
    console.error(errorMessage);
    return <p>{errorMessage}</p>;
  }
  // Check if the image URL is from the WordPress site
  if (src.startsWith('http') && !src.startsWith(wordpressUrl)) {
    const errorMessage = 'The image URL is not from the WordPress site.';
    console.error(errorMessage);
    return <p>{errorMessage}</p>;
  }
  const imagePath = src.replace(wordpressUrl, ''); // Remove the WordPress URL

  // Generate the image proxy URL
  const proxySrc = `${API_BASE_URL}${encodeURIComponent(imagePath)}`;

  // Render the image component
  return (
    <Image
      src={src.startsWith(wordpressUrl) ? proxySrc : src} // Use the image proxy URL for WordPress images
      width={width}
      height={height}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      placeholder={placeholder}
      style={style}
      blurDataURL={src === blurDataURL ? proxySrc : blurDataURL} // Use the image proxy URL for the blur data URL
    />
  );
}
