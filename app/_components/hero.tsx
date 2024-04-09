import styles from '@/app/_components/hero.module.css';
import { siteLogo } from '@/app/_const/site-config';
import Image from 'next/image';

interface HeroProps {
  title: string;
  subtitle?: string;
  imageOn?: boolean;
}

function Hero({ title, subtitle, imageOn = false }: HeroProps): React.ReactElement {
  return (
    <div className={styles.flexContainer}>
      {imageOn && (
        <h1 className={styles.image}>
          <figure>
            <Image
              src={siteLogo.src}
              width={siteLogo.width}
              height={siteLogo.height}
              alt={siteLogo.alt}
              sizes="(max-width: 768px) 100vw, (max-width: 1220px) 50vw, 1220px"
              priority
              placeholder="blur"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
              blurDataURL={siteLogo.blurDataURL}
            />
          </figure>
        </h1>
      )}
      <div className={imageOn ? styles.textWithImage : styles.text}>
        {!imageOn && <h1 className={styles.title}>{title}</h1>}
        {subtitle && <p className={imageOn ? styles.subtitleWithImage : styles.subtitle}>{subtitle}</p>}
      </div>
    </div>
  );
}

export default Hero;
