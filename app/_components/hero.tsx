import styles from '@/app/_components/hero.module.css';
import { siteLogo } from '@/app/_const/site-config';
import Image from 'next/image';

/**
 * Hero Component
 * Renders a hero section with an optional image, title, and subtitle.
 */
interface HeroProps {
  title: string; // The title of the hero section
  subtitle?: string; // The subtitle of the hero section (optional)
  imageOn?: boolean; // Whether to display the image or not (default: false)
}

/**
 * Renders the Hero component.
 * @param {HeroProps} props - The props for the Hero component.
 * @returns {React.ReactElement} The rendered Hero component.
 */
function Hero({ title, subtitle, imageOn = false }: HeroProps): React.ReactElement {
  const { image, width, height, alt, blurDataURL } = siteLogo;
  return (
    <div className={styles.flexContainer}>
      {imageOn && (
        <h1 className={styles.image}>
          <figure>
            <Image
              src={image}
              width={width}
              height={height}
              alt={alt}
              sizes="(max-width: 768px) 100vw, (max-width: 1220px) 50vw, 1220px"
              priority
              placeholder="blur"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
              blurDataURL={blurDataURL}
            />
          </figure>
        </h1>
      )}
      <div className={imageOn ? styles.textWithImage : styles.text}>
        {!imageOn && <h1 className={styles.title}>{title}</h1>}
        {subtitle && (
          <p className={imageOn ? styles.subtitleWithImage : styles.subtitle}>{subtitle}</p>
        )}
      </div>
    </div>
  );
}

export default Hero;
