import styles from '@/app/_components/hero.module.css';
import Image from 'next/image';

interface HeroProps {
  title: string;
  subtitle: string;
  imageOn?: boolean;
}

function Hero({
  title,
  subtitle,
  imageOn = false,
}: HeroProps): React.ReactElement {
  return (
    <div className={styles.flexContainer}>
      {imageOn && (
        <h1>
          <figure>
            <Image
              src="/images/site-logo.webp"
              width={720}
              height={640}
              alt="Next Blog"
              sizes="(min-width: 1152px) 576px, (min-width: 768px) 50vw, 100vw"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
              priority
              placeholder="blur"
              blurDataURL="/images/site-logo.webp"
            />
          </figure>
        </h1>
      )}
      <div className={styles.text}>
        {!imageOn && <h1 className={styles.title}>{title}</h1>}
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </div>
  );
}

export default Hero;
